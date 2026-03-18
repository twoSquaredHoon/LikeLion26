// ─── Types ────────────────────────────────────────────────────────────────────
export interface MacroEntry {
  label: string;
  value: string;
  type: 'p' | 'c' | 'f';
}

export interface FoodVariant {
  name: string;
  sub: string;
  kcal: number;
  dotBg: string;
  dotBorder: string;
  blobColor: string;
  blobStyle: object;
  macros: MacroEntry[];
}

export interface FoodItem extends FoodVariant {
  alternatives: FoodVariant[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
export const INITIAL_ITEMS: FoodItem[] = [
  {
    name: 'Roasted Turkey Breast',
    sub: '5 oz · Dining Hall Station 2',
    kcal: 215,
    dotBg: '#FDEBD6', dotBorder: '#B8562A', blobColor: '#B8562A',
    blobStyle: { borderRadius: 28, width: 26, height: 22 },
    macros: [{ label: 'P', value: '44g', type: 'p' }, { label: 'F', value: '4g', type: 'f' }],
    alternatives: [
      { name: 'Grilled Chicken Breast', sub: '5 oz · Grill Station', kcal: 195, dotBg: '#FDEBD6', dotBorder: '#C8782A', blobColor: '#C8784A', blobStyle: { borderRadius: 28, width: 26, height: 20 }, macros: [{ label: 'P', value: '40g', type: 'p' }, { label: 'F', value: '3g', type: 'f' }] },
      { name: 'Baked Salmon Fillet', sub: '4 oz · Seafood Station', kcal: 230, dotBg: '#FFE8DC', dotBorder: '#E87040', blobColor: '#E87040', blobStyle: { borderRadius: 28, width: 26, height: 18 }, macros: [{ label: 'P', value: '32g', type: 'p' }, { label: 'F', value: '12g', type: 'f' }] },
    ],
  },
  {
    name: 'Brown Rice',
    sub: '¾ cup cooked · Grain Station',
    kcal: 165,
    dotBg: '#FDF6E0', dotBorder: '#C8982A', blobColor: '#E8C87A',
    blobStyle: { borderRadius: 999, width: 26, height: 20 },
    macros: [{ label: 'C', value: '34g', type: 'c' }, { label: 'P', value: '4g', type: 'p' }],
    alternatives: [
      { name: 'Quinoa', sub: '¾ cup · Grain Station', kcal: 180, dotBg: '#F5F0E0', dotBorder: '#A09060', blobColor: '#D8C890', blobStyle: { borderRadius: 999, width: 24, height: 22 }, macros: [{ label: 'C', value: '30g', type: 'c' }, { label: 'P', value: '6g', type: 'p' }] },
      { name: 'Pasta', sub: '¾ cup · Pasta Station', kcal: 220, dotBg: '#FDF6E0', dotBorder: '#C8982A', blobColor: '#E8C87A', blobStyle: { borderRadius: 999, width: 28, height: 20 }, macros: [{ label: 'C', value: '44g', type: 'c' }, { label: 'P', value: '7g', type: 'p' }] },
    ],
  },
  {
    name: 'Roasted Baby Potatoes',
    sub: '4 oz · Herb-seasoned',
    kcal: 190,
    dotBg: '#FEFCE0', dotBorder: '#C8A800', blobColor: '#F5D050',
    blobStyle: { borderRadius: 999, width: 24, height: 20 },
    macros: [{ label: 'C', value: '42g', type: 'c' }, { label: 'F', value: '2g', type: 'f' }],
    alternatives: [
      { name: 'Mashed Potatoes', sub: '½ cup · Hot Station', kcal: 210, dotBg: '#FEFCE0', dotBorder: '#C8A800', blobColor: '#F0E080', blobStyle: { borderRadius: 999, width: 28, height: 22 }, macros: [{ label: 'C', value: '38g', type: 'c' }, { label: 'F', value: '6g', type: 'f' }] },
      { name: 'Sweet Potato', sub: '4 oz · Veggie Station', kcal: 170, dotBg: '#FFE8DC', dotBorder: '#CC6600', blobColor: '#FF8040', blobStyle: { borderRadius: 999, width: 26, height: 20 }, macros: [{ label: 'C', value: '36g', type: 'c' }, { label: 'F', value: '1g', type: 'f' }] },
    ],
  },
  {
    name: 'Honey-Glazed Carrots',
    sub: '3 oz · Veggie Station',
    kcal: 80,
    dotBg: '#FFF0DC', dotBorder: '#CC6600', blobColor: '#FF8800',
    blobStyle: { borderRadius: 999, width: 24, height: 18 },
    macros: [{ label: 'C', value: '16g', type: 'c' }, { label: 'F', value: '2g', type: 'f' }],
    alternatives: [
      { name: 'Steamed Broccoli', sub: '1 cup · Veggie Station', kcal: 60, dotBg: '#DCFCE7', dotBorder: '#16A34A', blobColor: '#5DAF6E', blobStyle: { borderRadius: 999, width: 24, height: 20 }, macros: [{ label: 'C', value: '10g', type: 'c' }, { label: 'P', value: '4g', type: 'p' }] },
      { name: 'Green Beans', sub: '3 oz · Veggie Station', kcal: 50, dotBg: '#DCFCE7', dotBorder: '#16A34A', blobColor: '#7CC870', blobStyle: { borderRadius: 999, width: 22, height: 16 }, macros: [{ label: 'C', value: '8g', type: 'c' }, { label: 'P', value: '2g', type: 'p' }] },
    ],
  },
  {
    name: 'Sweet Corn Kernels',
    sub: '½ cup · Salad Bar',
    kcal: 70,
    dotBg: '#FFFBE0', dotBorder: '#C8A800', blobColor: '#FFD700',
    blobStyle: { borderRadius: 999, width: 22, height: 22 },
    macros: [{ label: 'C', value: '16g', type: 'c' }, { label: 'P', value: '3g', type: 'p' }],
    alternatives: [
      { name: 'Edamame', sub: '½ cup · Salad Bar', kcal: 120, dotBg: '#DCFCE7', dotBorder: '#16A34A', blobColor: '#86C890', blobStyle: { borderRadius: 999, width: 22, height: 18 }, macros: [{ label: 'P', value: '10g', type: 'p' }, { label: 'C', value: '10g', type: 'c' }] },
      { name: 'Black Beans', sub: '½ cup · Salad Bar', kcal: 110, dotBg: '#E8E0F0', dotBorder: '#604880', blobColor: '#806090', blobStyle: { borderRadius: 999, width: 22, height: 20 }, macros: [{ label: 'P', value: '7g', type: 'p' }, { label: 'C', value: '20g', type: 'c' }] },
    ],
  },
];