import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
  green: '#22C55E',
};

const MACRO_TAG_COLORS = { p: '#FF6B9D', c: '#FF9F1C', f: '#2EC4B6' };

// ─── Types ────────────────────────────────────────────────────────────────────
interface FoodItem {
  name: string;
  sub: string;
  kcal: number;
  dotBg: string;
  dotBorder: string;
  blobColor: string;
  blobStyle: object;
  macros: { label: string; value: string; type: 'p' | 'c' | 'f' }[];
  alternatives: {
    name: string;
    sub: string;
    kcal: number;
    dotBg: string;
    dotBorder: string;
    blobColor: string;
    blobStyle: object;
    macros: { label: string; value: string; type: 'p' | 'c' | 'f' }[];
  }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const INITIAL_ITEMS: FoodItem[] = [
  {
    name: 'Roasted Turkey Breast',
    sub: '5 oz · Dining Hall Station 2',
    kcal: 215,
    dotBg: '#FDEBD6', dotBorder: '#B8562A', blobColor: '#B8562A',
    blobStyle: { borderRadius: 28, width: 26, height: 22 },
    macros: [{ label: 'P', value: '44g', type: 'p' }, { label: 'F', value: '4g', type: 'f' }],
    alternatives: [
      { name: 'Grilled Chicken Breast', sub: '5 oz · Grill Station', kcal: 195, dotBg: '#FDEBD6', dotBorder: '#C8782A', blobColor: '#C8784A', blobStyle: { borderRadius: 28, width: 26, height: 20 }, macros: [{ label: 'P', value: '40g', type: 'p' }, { label: 'F', value: '3g', type: 'f' }] },
      { name: 'Baked Salmon Fillet',    sub: '4 oz · Seafood Station', kcal: 230, dotBg: '#FFE8DC', dotBorder: '#E87040', blobColor: '#E87040', blobStyle: { borderRadius: 28, width: 26, height: 18 }, macros: [{ label: 'P', value: '32g', type: 'p' }, { label: 'F', value: '12g', type: 'f' }] },
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
      { name: 'Quinoa',        sub: '¾ cup · Grain Station',  kcal: 180, dotBg: '#F5F0E0', dotBorder: '#A09060', blobColor: '#D8C890', blobStyle: { borderRadius: 999, width: 24, height: 22 }, macros: [{ label: 'C', value: '30g', type: 'c' }, { label: 'P', value: '6g', type: 'p' }] },
      { name: 'Pasta',         sub: '¾ cup · Pasta Station',  kcal: 220, dotBg: '#FDF6E0', dotBorder: '#C8982A', blobColor: '#E8C87A', blobStyle: { borderRadius: 999, width: 28, height: 20 }, macros: [{ label: 'C', value: '44g', type: 'c' }, { label: 'P', value: '7g', type: 'p' }] },
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
      { name: 'Mashed Potatoes', sub: '½ cup · Hot Station',    kcal: 210, dotBg: '#FEFCE0', dotBorder: '#C8A800', blobColor: '#F0E080', blobStyle: { borderRadius: 999, width: 28, height: 22 }, macros: [{ label: 'C', value: '38g', type: 'c' }, { label: 'F', value: '6g', type: 'f' }] },
      { name: 'Sweet Potato',    sub: '4 oz · Veggie Station',  kcal: 170, dotBg: '#FFE8DC', dotBorder: '#CC6600', blobColor: '#FF8040', blobStyle: { borderRadius: 999, width: 26, height: 20 }, macros: [{ label: 'C', value: '36g', type: 'c' }, { label: 'F', value: '1g', type: 'f' }] },
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
      { name: 'Steamed Broccoli', sub: '1 cup · Veggie Station', kcal: 60,  dotBg: '#DCFCE7', dotBorder: '#16A34A', blobColor: '#5DAF6E', blobStyle: { borderRadius: 999, width: 24, height: 20 }, macros: [{ label: 'C', value: '10g', type: 'c' }, { label: 'P', value: '4g', type: 'p' }] },
      { name: 'Green Beans',      sub: '3 oz · Veggie Station',  kcal: 50,  dotBg: '#DCFCE7', dotBorder: '#16A34A', blobColor: '#7CC870', blobStyle: { borderRadius: 999, width: 22, height: 16 }, macros: [{ label: 'C', value: '8g',  type: 'c' }, { label: 'P', value: '2g', type: 'p' }] },
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
      { name: 'Edamame',     sub: '½ cup · Salad Bar',      kcal: 120, dotBg: '#DCFCE7', dotBorder: '#16A34A', blobColor: '#86C890', blobStyle: { borderRadius: 999, width: 22, height: 18 }, macros: [{ label: 'P', value: '10g', type: 'p' }, { label: 'C', value: '10g', type: 'c' }] },
      { name: 'Black Beans', sub: '½ cup · Salad Bar',      kcal: 110, dotBg: '#E8E0F0', dotBorder: '#604880', blobColor: '#806090', blobStyle: { borderRadius: 999, width: 22, height: 20 }, macros: [{ label: 'P', value: '7g',  type: 'p' }, { label: 'C', value: '20g', type: 'c' }] },
    ],
  },
];

// ─── Plate illustration ───────────────────────────────────────────────────────
const PlateIllustration = () => (
  <View style={styles.plateOuter}>
    <View style={styles.plateRim} />
    <View style={styles.plateInner}>
      <View style={[styles.food, { width: 48, height: 38, top: 10, left: 10, backgroundColor: '#B8562A', borderRadius: 28, borderWidth: 2.5, borderColor: 'rgba(0,0,0,0.2)' }]} />
      <View style={[styles.food, { width: 44, height: 34, top: 8, right: 8, backgroundColor: '#E8C87A', borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' }]} />
      <View style={[styles.food, { width: 40, height: 32, bottom: 14, left: 10, backgroundColor: '#F5D050', borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' }]} />
      <View style={[styles.food, { width: 36, height: 28, bottom: 12, right: 8, backgroundColor: '#FF8800', borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' }]} />
      <View style={[styles.food, { width: 24, height: 22, bottom: 36, alignSelf: 'center', left: 46, backgroundColor: '#FFD700', borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' }]} />
    </View>
  </View>
);

// ─── Swipeable food item ──────────────────────────────────────────────────────
const SwipeableFoodItem = ({
  item,
  altIndex,
  onSwap,
}: {
  item: typeof INITIAL_ITEMS[0];
  altIndex: number;
  onSwap: () => void;
}) => {
  const swipeableRef = useRef<Swipeable>(null);
  const current = altIndex === 0 ? item : item.alternatives[altIndex - 1];

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.swipeAction}
      onPress={() => {
        onSwap();
        swipeableRef.current?.close();
      }}
    >
      <Text style={styles.swipeActionIcon}>🔄</Text>
      <Text style={styles.swipeActionText}>Swap</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
      onSwipeableOpen={() => {
        onSwap();
        swipeableRef.current?.close();
      }}
    >
      <View style={styles.foodItem}>
        <View style={[styles.foodDot, { backgroundColor: current.dotBg, borderColor: current.dotBorder }]}>
          <View style={[styles.foodDotBlob, { backgroundColor: current.blobColor, ...current.blobStyle }]} />
        </View>
        <View style={styles.foodItemInfo}>
          <Text style={styles.foodItemName} numberOfLines={1}>{current.name}</Text>
          <Text style={styles.foodItemSub}>{current.sub}</Text>
        </View>
        <View style={styles.foodItemRight}>
          <Text style={styles.foodKcal}>{current.kcal} kcal</Text>
          <View style={styles.foodMacros}>
            {current.macros.map((m, j) => (
              <View key={j} style={[styles.fmacro, { backgroundColor: MACRO_TAG_COLORS[m.type] }]}>
                <Text style={styles.fmacroText}>{m.value} {m.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HomeScreenMealConfirmed() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [altIndices, setAltIndices] = React.useState<number[]>(INITIAL_ITEMS.map(() => 0));

  const handleSwap = (itemIndex: number) => {
    setAltIndices(prev => {
      const next = [...prev];
      const maxAlts = INITIAL_ITEMS[itemIndex].alternatives.length;
      next[itemIndex] = (prev[itemIndex] + 1) % (maxAlts + 1);
      return next;
    });
  };

  const getCurrentItem = (i: number) => {
    const alt = altIndices[i];
    return alt === 0 ? INITIAL_ITEMS[i] : INITIAL_ITEMS[i].alternatives[alt - 1];
  };

  const totalKcal = INITIAL_ITEMS.reduce((sum, _, i) => sum + getCurrentItem(i).kcal, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />
      <View style={styles.container}>

        {/* ── Confirmed Banner ── */}
        <View style={styles.confirmedBanner}>
          <View style={styles.confirmedCheck}>
            <Svg width={18} height={18} viewBox="0 0 18 18">
              <Path d="M3.5 9.5l4 4 7-8" stroke={COLORS.green} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </Svg>
          </View>
          <View>
            <Text style={styles.confirmedLabel}>Meal Selected</Text>
            <Text style={styles.confirmedTitle}>Roasted Turkey Recovery</Text>
          </View>
        </View>

        {/* ── Dish Hero Card ── */}
        <View style={styles.dishHero}>
          <View style={styles.dishHeroTop}>
            <Text style={styles.dishTag}>⭐ Best pick · High Protein Lean Bulk</Text>
            <View style={styles.loggedBadge}>
              <Text style={styles.loggedBadgeText}>Logged</Text>
            </View>
          </View>
          <Text style={styles.dishName}>Roasted Turkey{'\n'}Recovery</Text>
          <View style={styles.plateCenterWrap}>
            <PlateIllustration />
          </View>
          <View style={styles.macroRow}>
            {[
              { val: '875', label: 'kcal',    bg: '#FFE8EA', border: '#FF3347' },
              { val: '65g', label: 'protein', bg: '#FFE0EE', border: '#FF6B9D' },
              { val: '98g', label: 'carbs',   bg: '#FFF2DC', border: '#FF9F1C' },
              { val: '22g', label: 'fats',    bg: '#D8F5F3', border: '#2EC4B6' },
            ].map((m, i) => (
              <View key={i} style={[styles.mpill, { backgroundColor: m.bg, borderColor: m.border }]}>
                <Text style={styles.mpillVal}>{m.val}</Text>
                <Text style={styles.mpillLabel}>{m.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Scrollable section ── */}
        <ScrollView
          style={styles.scrollBody}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>What's on the plate</Text>
            <Text style={styles.sectionHint}>← swipe to swap</Text>
          </View>

          <View style={styles.foodList}>
            {INITIAL_ITEMS.map((item, i) => (
              <SwipeableFoodItem
                key={i}
                item={item}
                altIndex={altIndices[i]}
                onSwap={() => handleSwap(i)}
              />
            ))}
          </View>

          {/* Total row */}
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalKcal}>{totalKcal} kcal</Text>
            </View>
            <View style={styles.totalMacros}>
              {[
                { val: '65g', label: 'Protein', color: '#FF9FBF' },
                { val: '98g', label: 'Carbs',   color: '#FFD080' },
                { val: '22g', label: 'Fats',    color: '#80E8E0' },
              ].map((m, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <View style={styles.totalSep} />}
                  <View style={styles.totalMacro}>
                    <Text style={[styles.totalMacroVal, { color: m.color }]}>{m.val}</Text>
                    <Text style={styles.totalMacroLabel}>{m.label}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Log button */}
          <View style={styles.logBtnWrap}>
            <TouchableOpacity
              style={styles.logBtn}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.85}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24">
                <Path d="M12 5v14M5 12h14" stroke="white" strokeWidth={2.5} strokeLinecap="round" fill="none" />
              </Svg>
              <Text style={styles.logBtnText}>Log This Meal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },
  container: { flex: 1, backgroundColor: COLORS.beige },

  confirmedBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: 20, marginTop: 10,
    backgroundColor: COLORS.green, borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 20, paddingHorizontal: 18, paddingVertical: 10,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  confirmedCheck: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: 'white',
    borderWidth: 2.5, borderColor: COLORS.border,
    shadowColor: COLORS.border, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  confirmedLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: 2 },
  confirmedTitle: { fontSize: 17, fontWeight: '900', color: 'white', letterSpacing: -0.3, lineHeight: 18 },

  dishHero: {
    marginHorizontal: 20, marginTop: 10, backgroundColor: '#FFBFC7',
    borderWidth: 3, borderColor: COLORS.border, borderRadius: 24,
    shadowColor: COLORS.border, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6, overflow: 'hidden',
  },
  dishHeroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 18, paddingTop: 10 },
  dishTag: { fontSize: 10, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase', color: COLORS.inkMuted, flex: 1 },
  loggedBadge: { backgroundColor: COLORS.green, borderWidth: 2, borderColor: COLORS.border, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, shadowColor: COLORS.border, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0 },
  loggedBadgeText: { fontSize: 10, fontWeight: '700', color: 'white', letterSpacing: 0.4, textTransform: 'uppercase' },
  dishName: { fontSize: 22, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.6, lineHeight: 24, paddingHorizontal: 18, paddingTop: 6 },
  plateCenterWrap: { alignItems: 'center', paddingVertical: 8 },
  plateOuter: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#F5EFE0', borderWidth: 4, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  plateRim: { position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.08)', borderStyle: 'dashed' },
  plateInner: { width: 116, height: 116, borderRadius: 58, backgroundColor: '#EDE6D4', overflow: 'hidden', position: 'relative' },
  food: { position: 'absolute' },
  macroRow: { flexDirection: 'row', gap: 7, paddingHorizontal: 16, paddingBottom: 10 },
  mpill: { flex: 1, borderWidth: 2, borderRadius: 14, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  mpillVal: { fontSize: 14, fontWeight: '800', color: COLORS.ink, lineHeight: 16, marginBottom: 2 },
  mpillLabel: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4, color: COLORS.inkMuted },

  scrollBody: { flex: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: 10, paddingBottom: 8 },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: COLORS.ink, textTransform: 'uppercase', letterSpacing: 0.6 },
  sectionHint: { fontSize: 10, fontWeight: '600', color: COLORS.inkMuted },

  foodList: { paddingHorizontal: 20, gap: 7 },

  swipeAction: {
    backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border, borderRadius: 16,
    marginLeft: 8,
    width: 70, alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3,
  },
  swipeActionIcon: { fontSize: 18 },
  swipeActionText: { fontSize: 10, fontWeight: '800', color: 'white', marginTop: 2 },

  foodItem: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFF5F5', borderWidth: 2.5, borderColor: COLORS.border, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 9, shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
  foodDot: { width: 40, height: 40, borderRadius: 14, borderWidth: 2.5, alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' },
  foodDotBlob: { position: 'absolute' },
  foodItemInfo: { flex: 1, minWidth: 0 },
  foodItemName: { fontSize: 13, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.1, marginBottom: 3 },
  foodItemSub: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted },
  foodItemRight: { alignItems: 'flex-end', gap: 4, flexShrink: 0 },
  foodKcal: { fontSize: 13, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.1 },
  foodMacros: { flexDirection: 'row', gap: 5 },
  fmacro: { borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  fmacroText: { fontSize: 10, fontWeight: '700', color: 'white', letterSpacing: 0.2 },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 8, backgroundColor: COLORS.ink, borderWidth: 3, borderColor: COLORS.border, borderRadius: 18, paddingHorizontal: 16, paddingVertical: 10, shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 },
  totalLabel: { fontSize: 12, fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.7 },
  totalKcal: { fontSize: 22, fontWeight: '900', color: 'white', letterSpacing: -0.6, lineHeight: 24 },
  totalMacros: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  totalSep: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.15)' },
  totalMacro: { alignItems: 'center' },
  totalMacroVal: { fontSize: 14, fontWeight: '800', lineHeight: 16 },
  totalMacroLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 2 },

  logBtnWrap: { paddingHorizontal: 20, paddingTop: 8 },
  logBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: COLORS.red, borderWidth: 3, borderColor: COLORS.border, borderRadius: 20, paddingVertical: 16, shadowColor: COLORS.border, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6 },
  logBtnText: { fontSize: 16, fontWeight: '900', color: 'white', letterSpacing: -0.1 },
});