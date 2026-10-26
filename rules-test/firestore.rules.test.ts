import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  Timestamp,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { getMetadata, ref, uploadBytes } from 'firebase/storage';

let env: RulesTestEnvironment;

const VO = { role: 'vo', name: 'An' };
const CHONG = { role: 'chong', name: 'Bình' };
const CON = { role: 'con', name: 'Bé Na' };
const inMinutes = (m: number) => Timestamp.fromMillis(Date.now() + m * 60_000);

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'di-cho-chung',
    firestore: { rules: readFileSync('../firestore.rules', 'utf8') },
    storage: { rules: readFileSync('../storage.rules', 'utf8') },
  });
});

afterAll(async () => {
  await env?.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.clearStorage();
});

async function seed(path: string, data: Record<string, unknown>) {
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), path), data);
  });
}

const db = (uid: string) => env.authenticatedContext(uid).firestore();

async function seedInvite(code: string, over: Record<string, unknown> = {}) {
  await seed(`invites/${code}`, {
    homeId: 'h1', replace: false, expiresAt: inMinutes(15), used: false, createdBy: 'alice', ...over,
  });
}

/** What the app sends to join: add itself to members and burn the invite, in one batch. */
function joinBatch(uid: string, code: string, member: object, removeUid?: string) {
  const d = db(uid);
  const b = writeBatch(d);
  const update: Record<string, unknown> = { [`members.${uid}`]: member, joinCode: code };
  if (removeUid) update[`members.${removeUid}`] = deleteField();
  b.update(doc(d, 'homes/h1'), update);
  b.update(doc(d, `invites/${code}`), { used: true });
  return b.commit();
}

describe('firestore', () => {
  test('owner_canCreateHome_withOnlySelf', async () => {
    await assertSucceeds(setDoc(doc(db('alice'), 'homes/h1'), { members: { alice: VO }, createdAt: serverTimestamp() }));
    await assertFails(setDoc(doc(db('alice'), 'homes/h2'), { members: { alice: VO, bob: CHONG }, createdAt: serverTimestamp() }));
    await assertFails(setDoc(doc(db('alice'), 'homes/h3'), { members: { bob: CHONG }, createdAt: serverTimestamp() }));
  });

  test('stranger_cannotReadHome', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    await assertSucceeds(getDoc(doc(db('alice'), 'homes/h1')));
    await assertFails(getDoc(doc(db('carol'), 'homes/h1')));
  });

  test('member_canWriteList', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    await assertSucceeds(setDoc(doc(db('alice'), 'homes/h1/list/e1'), { itemId: 'trung_ga', qty: 10, status: 'NEED' }));
  });

  test('stranger_cannotWriteList', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    await assertFails(setDoc(doc(db('carol'), 'homes/h1/list/e1'), { itemId: 'trung_ga', qty: 10, status: 'NEED' }));
    await assertFails(getDocs(collection(db('carol'), 'homes/h1/list')));
  });

  test('join_withValidInvite_succeeds', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    await seedInvite('123456');
    await assertSucceeds(joinBatch('bob', '123456', CHONG));
    await assertSucceeds(getDoc(doc(db('bob'), 'homes/h1')));
  });

  test('join_withExpiredInvite_fails', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    await seedInvite('123456', { expiresAt: inMinutes(-1) });
    await assertFails(joinBatch('bob', '123456', CHONG));
  });

  test('join_withUsedInvite_fails', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    await seedInvite('123456', { used: true });
    await assertFails(joinBatch('bob', '123456', CHONG));
  });

  test('join_invalidRole_fails', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    await seedInvite('123456');
    await assertFails(joinBatch('bob', '123456', { role: 'x', name: 'Bình' }));
  });

  test('join_sameRoleTwice_succeeds', async () => {
    await seed('homes/h1', { members: { alice: VO, bob: CON } });
    await seedInvite('123456');
    await assertSucceeds(joinBatch('carol', '123456', CON));
  });

  test('join_upToSixMembers_seventhFails', async () => {
    const five = { m1: VO, m2: CHONG, m3: CON, m4: CON, m5: { role: 'ba', name: 'Bà' } };
    await seed('homes/h1', { members: five });
    await seedInvite('111111');
    await assertSucceeds(joinBatch('m6', '111111', { role: 'ong', name: 'Ông' }));
    await seedInvite('222222');
    await assertFails(joinBatch('m7', '222222', { role: 'khac', name: 'Người nhà' }));
  });

  test('join_replace_removesOnlyNamedMember', async () => {
    await seed('homes/h1', { members: { alice: VO, bob: CHONG } });
    await seedInvite('123456', { replace: true, replaceUid: 'bob' });
    await assertFails(joinBatch('carol', '123456', CHONG, 'alice'));
    await assertFails(joinBatch('carol', '123456', CHONG));
    await assertSucceeds(joinBatch('carol', '123456', CHONG, 'bob'));
    await assertFails(getDoc(doc(db('bob'), 'homes/h1')));
  });

  test('invite_create_byMember_replaceMustNameMember', async () => {
    await seed('homes/h1', { members: { alice: VO, bob: CHONG } });
    const inv = (over: object) => ({
      homeId: 'h1', replace: false, expiresAt: inMinutes(15), used: false, createdBy: 'alice', ...over,
    });
    await assertSucceeds(setDoc(doc(db('alice'), 'invites/100001'), inv({})));
    await assertSucceeds(setDoc(doc(db('alice'), 'invites/100002'), inv({ replace: true, replaceUid: 'bob' })));
    await assertFails(setDoc(doc(db('alice'), 'invites/100003'), inv({ replace: true, replaceUid: 'zed' })));
    await assertFails(setDoc(doc(db('carol'), 'invites/100004'), inv({ createdBy: 'carol' })));
  });

  test('invite_listForbidden', async () => {
    await seedInvite('123456');
    await assertSucceeds(getDoc(doc(db('carol'), 'invites/123456')));
    await assertFails(getDocs(collection(db('carol'), 'invites')));
    await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(), 'invites/123456')));
  });
});

describe('storage', () => {
  const image = (bytes: number) => new Uint8Array(bytes);
  const jpeg = { contentType: 'image/jpeg' };

  test('storage_member_canUpload_under1MB', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    const st = env.authenticatedContext('alice').storage();
    await assertSucceeds(uploadBytes(ref(st, 'homes/h1/items/a.jpg'), image(50_000), jpeg));
    await assertFails(uploadBytes(ref(st, 'homes/h1/items/big.jpg'), image(1024 * 1024 + 1), jpeg));
    await assertFails(uploadBytes(ref(st, 'homes/h1/items/a.txt'), image(10), { contentType: 'text/plain' }));
  });

  test('storage_stranger_cannotRead', async () => {
    await seed('homes/h1', { members: { alice: VO } });
    await env.withSecurityRulesDisabled(async (ctx) => {
      await uploadBytes(ref(ctx.storage(), 'homes/h1/items/a.jpg'), image(100), jpeg);
    });
    await assertSucceeds(getMetadata(ref(env.authenticatedContext('alice').storage(), 'homes/h1/items/a.jpg')));
    await assertFails(getMetadata(ref(env.authenticatedContext('carol').storage(), 'homes/h1/items/a.jpg')));
    await assertFails(uploadBytes(ref(env.authenticatedContext('carol').storage(), 'homes/h1/items/b.jpg'), image(100), jpeg));
  });
});
