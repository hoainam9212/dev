import type { BjtBundle } from '@nihongo/shared';
import { BJT_WEEKS } from './plan';
import { BJT_GUIDES } from './guides';
import { BJT_DEMO } from './demo';
import { BJT_CHOKAI } from './chokai';
import { BJT_CHODOKKAI } from './chodokkai';
import { BJT_DOKKAI } from './dokkai';
import { BJT_VOCAB } from './goi';

export const BJT: BjtBundle = {
  weeks: BJT_WEEKS,
  guides: BJT_GUIDES,
  items: [...BJT_DEMO, ...BJT_CHOKAI, ...BJT_CHODOKKAI, ...BJT_DOKKAI],
  vocab: BJT_VOCAB,
};
