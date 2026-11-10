import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { SpotlightOverlay } from './SpotlightOverlay';

const rect = (left: number, top: number, width = 30, height = 20) =>
  ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON() {} }) as DOMRect;

/** ResizeObserver giả: jsdom không có, và ta cần biết nó được observe/disconnect. */
class FakeRO {
  static all: FakeRO[] = [];
  observed: Element[] = [];
  disconnected = false;
  constructor(public cb: ResizeObserverCallback) {
    FakeRO.all.push(this);
  }
  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve(el: Element) {
    this.observed = this.observed.filter((e) => e !== el);
  }
  disconnect() {
    this.disconnected = true;
  }
  fire() {
    this.cb([], this as unknown as ResizeObserver);
  }
}

function mount(html: string) {
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.appendChild(root);
  return root;
}

const overlay = () => document.querySelector<HTMLElement>('.spotlight-ring')?.parentElement ?? null;

describe('SpotlightOverlay – bám theo sự kiện, không hỏi vòng', () => {
  beforeEach(() => {
    FakeRO.all = [];
    vi.stubGlobal('ResizeObserver', FakeRO);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('không dùng setInterval', () => {
    const spy = vi.spyOn(window, 'setInterval');
    const root = mount('<button data-help-id="x">B</button>');
    render(<SpotlightOverlay target={{ helpId: 'x' }} root={root} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('đổi cỡ cửa sổ thì khung cập nhật', async () => {
    const root = mount('<button data-help-id="x">B</button>');
    const btn = root.querySelector('button')!;
    btn.getBoundingClientRect = () => rect(10, 20);
    render(<SpotlightOverlay target={{ helpId: 'x' }} root={root} />);
    await waitFor(() => expect(overlay()?.style.left).toBe('4px'));
    btn.getBoundingClientRect = () => rect(110, 20);
    window.dispatchEvent(new Event('resize'));
    await waitFor(() => expect(overlay()?.style.left).toBe('104px'));
  });

  it('cuộn một vùng bên trong (vd. lưới Excel) thì khung cập nhật', async () => {
    const root = mount('<div class="scroller"><span data-cell="B5">x</span></div>');
    const cell = root.querySelector('span')!;
    cell.getBoundingClientRect = () => rect(50, 200);
    render(<SpotlightOverlay target={{ cell: 'B5' }} root={root} />);
    await waitFor(() => expect(overlay()?.style.top).toBe('194px'));
    cell.getBoundingClientRect = () => rect(50, 120);
    root.querySelector('.scroller')!.dispatchEvent(new Event('scroll'));
    await waitFor(() => expect(overlay()?.style.top).toBe('114px'));
  });

  it('phần tử đích đổi cỡ (ResizeObserver) thì khung cập nhật', async () => {
    const root = mount('<button data-help-id="x">B</button>');
    const btn = root.querySelector('button')!;
    btn.getBoundingClientRect = () => rect(10, 20, 30);
    render(<SpotlightOverlay target={{ helpId: 'x' }} root={root} />);
    await waitFor(() => expect(overlay()?.style.width).toBe('42px'));
    expect(FakeRO.all.at(-1)!.observed).toContain(btn);
    btn.getBoundingClientRect = () => rect(10, 20, 80);
    FakeRO.all.at(-1)!.fire();
    await waitFor(() => expect(overlay()?.style.width).toBe('92px'));
  });

  it('phần tử đích xuất hiện sau (MutationObserver) thì khung hiện ra', async () => {
    const root = mount('<div></div>');
    render(<SpotlightOverlay target={{ helpId: 'later' }} root={root} />);
    expect(overlay()).toBeNull();
    const btn = document.createElement('button');
    btn.dataset.helpId = 'later';
    btn.getBoundingClientRect = () => rect(10, 20);
    root.appendChild(btn);
    await waitFor(() => expect(overlay()).not.toBeNull());
  });

  it('gỡ ra thì mọi observer disconnect, không còn nghe sự kiện', async () => {
    const mo = vi.spyOn(MutationObserver.prototype, 'disconnect');
    const removed = vi.spyOn(window, 'removeEventListener');
    const root = mount('<button data-help-id="x">B</button>');
    const { unmount } = render(<SpotlightOverlay target={{ helpId: 'x' }} root={root} />);
    unmount();
    expect(mo).toHaveBeenCalled();
    expect(FakeRO.all.every((r) => r.disconnected)).toBe(true);
    expect(removed.mock.calls.map((c) => c[0])).toEqual(expect.arrayContaining(['resize', 'scroll']));
  });

  it('spotlight ô Excel tìm được ô của lưới (ô mang data-testid="cell-B5", không có data-cell)', async () => {
    const root = mount('<button data-testid="cell-B4">x</button><button data-testid="cell-B5">y</button>');
    root.querySelector<HTMLElement>('[data-testid="cell-B5"]')!.getBoundingClientRect = () => rect(70, 90);
    render(<SpotlightOverlay target={{ cell: 'B5' }} root={root} />);
    await waitFor(() => expect(overlay()?.style.left).toBe('64px'));
  });

  it('không có spotlight thì không tạo observer nào', () => {
    const root = mount('<button data-help-id="x">B</button>');
    render(<SpotlightOverlay target={null} root={root} />);
    expect(FakeRO.all).toHaveLength(0);
  });
});
