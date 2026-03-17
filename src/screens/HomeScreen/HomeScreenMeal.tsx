import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 3;

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
interface MacroEntry {
  label: string;
  value: string;
  type: 'p' | 'c' | 'f';
}

interface FoodVariant {
  name: string;
  sub: string;
  kcal: number;
  dotBg: string;
  dotBorder: string;
  blobColor: string;
  blobStyle: object;
  macros: MacroEntry[];
}

interface FoodItem extends FoodVariant {
  alternatives: FoodVariant[];
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

// ─── Food card ────────────────────────────────────────────────────────────────
const FoodCard = ({
  item,
  isActive = false,
  onPress,
}: {
  item: FoodVariant;
  isActive?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={onPress ? 0.72 : 1}
    style={[styles.foodItem, isActive && styles.foodItemActive]}
  >
    <View style={[styles.foodDot, { backgroundColor: item.dotBg, borderColor: item.dotBorder }]}>
      <View style={[styles.foodDotBlob, { backgroundColor: item.blobColor, ...item.blobStyle }]} />
    </View>
    <View style={styles.foodItemInfo}>
      <Text style={styles.foodItemName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.foodItemSub}>{item.sub}</Text>
    </View>
    <View style={styles.foodItemRight}>
      <Text style={styles.foodKcal}>{item.kcal} kcal</Text>
      <View style={styles.foodMacros}>
        {item.macros.map((m, j) => (
          <View key={j} style={[styles.fmacro, { backgroundColor: MACRO_TAG_COLORS[m.type] }]}>
            <Text style={styles.fmacroText}>{m.value} {m.label}</Text>
          </View>
        ))}
      </View>
    </View>
    {isActive && <View style={styles.activeDot} />}
  </TouchableOpacity>
);

// ─── Swipeable food item ──────────────────────────────────────────────────────
const SwipeableFoodItem = ({
  item,
  altIndex,
  onSwap,
}: {
  item: FoodItem;
  altIndex: number;
  onSwap: (selectedAltIndex: number) => void;
}) => {
  const current: FoodVariant = altIndex === 0 ? item : item.alternatives[altIndex - 1];
  const [expanded, setExpanded] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;

  const openPicker = () => {
    setExpanded(true);
    Animated.spring(expandAnim, { toValue: 1, useNativeDriver: true, bounciness: 4 }).start();
  };

  const closePicker = () => {
    Animated.timing(expandAnim, { toValue: 0, duration: 180, useNativeDriver: true })
      .start(() => setExpanded(false));
  };

  const snapBack = () => {
    Animated.spring(translateX, { toValue: 0, useNativeDriver: true, bounciness: 10 }).start();
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .failOffsetY([-8, 8])
    .runOnJS(true)
    .onUpdate((e) => {
      if (e.translationX < 0) translateX.setValue(e.translationX * 0.3);
    })
    .onEnd((e) => {
      snapBack();
      if (e.translationX < -SWIPE_THRESHOLD) openPicker();
    })
    .onFinalize(() => snapBack());

  const allOptions: FoodVariant[] = [item, ...item.alternatives];

  return (
    <View style={styles.swipeRow}>
      <GestureDetector gesture={pan}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <FoodCard item={current} />
        </Animated.View>
      </GestureDetector>

      {expanded && (
        <Animated.View
          style={[
            styles.pickerWrap,
            {
              opacity: expandAnim,
              transform: [{
                translateY: expandAnim.interpolate({ inputRange: [0, 1], outputRange: [-6, 0] }),
              }],
            },
          ]}
        >
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>Choose an alternative</Text>
            <TouchableOpacity
              onPress={closePicker}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.pickerClose}>✕</Text>
            </TouchableOpacity>
          </View>
          {allOptions.map((opt, idx) => (
            <FoodCard
              key={idx}
              item={opt}
              isActive={idx === altIndex}
              onPress={() => { onSwap(idx); closePicker(); }}
            />
          ))}
        </Animated.View>
      )}
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HomeScreenMealConfirmed() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [altIndices, setAltIndices] = React.useState<number[]>(INITIAL_ITEMS.map(() => 0));

  const handleSwap = (itemIndex: number, selectedAltIndex: number) => {
    setAltIndices(prev => {
      const next = [...prev];
      next[itemIndex] = selectedAltIndex;
      return next;
    });
  };

  const getCurrentItem = (i: number): FoodVariant => {
    const alt = altIndices[i];
    return alt === 0 ? INITIAL_ITEMS[i] : INITIAL_ITEMS[i].alternatives[alt - 1];
  };

  const totalKcal = INITIAL_ITEMS.reduce((sum, _, i) => sum + getCurrentItem(i).kcal, 0);

  const totalMacros = INITIAL_ITEMS.reduce(
    (acc, _, i) => {
      getCurrentItem(i).macros.forEach(m => { acc[m.type] += parseInt(m.value, 10); });
      return acc;
    },
    { p: 0, c: 0, f: 0 } as Record<'p' | 'c' | 'f', number>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />
        <View style={styles.container}>

          {/* ── Total row — now at the top ── */}
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalKcal}>{totalKcal} kcal</Text>
            </View>
            <View style={styles.totalMacros}>
              {[
                { val: `${totalMacros.p}g`, label: 'Protein', color: '#FF9FBF' },
                { val: `${totalMacros.c}g`, label: 'Carbs',   color: '#FFD080' },
                { val: `${totalMacros.f}g`, label: 'Fats',    color: '#80E8E0' },
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

          {/* ── Scrollable food list ── */}
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
                  onSwap={(selectedAltIndex) => handleSwap(i, selectedAltIndex)}
                />
              ))}
            </View>

            {/* ── Log button ── */}
            <View style={styles.logBtnWrap}>
              <TouchableOpacity
                style={styles.logBtn}
                onPress={() => navigation.navigate('Confirm')}
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
    </GestureHandlerRootView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea:  { flex: 1, backgroundColor: COLORS.beige },
  container: { flex: 1, backgroundColor: COLORS.beige },

  // ── Total row (top) ──
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginHorizontal: 20, marginTop: 10,
    backgroundColor: COLORS.ink, borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  totalLabel: { fontSize: 12, fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.7 },
  totalKcal: { fontSize: 22, fontWeight: '900', color: 'white', letterSpacing: -0.6, lineHeight: 24 },
  totalMacros: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  totalSep: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.15)' },
  totalMacro: { alignItems: 'center' },
  totalMacroVal: { fontSize: 14, fontWeight: '800', lineHeight: 16 },
  totalMacroLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 2 },

  // ── Scroll body ──
  scrollBody: { flex: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: 10, paddingBottom: 8 },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: COLORS.ink, textTransform: 'uppercase', letterSpacing: 0.6 },
  sectionHint: { fontSize: 10, fontWeight: '600', color: COLORS.inkMuted },
  foodList: { paddingHorizontal: 20, gap: 7 },

  swipeRow: { gap: 6 },

  // ── Food card ──
  foodItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 16, paddingHorizontal: 12, paddingVertical: 9,
    shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3,
  },
  foodItemActive: {
    backgroundColor: COLORS.redLight,
    borderColor: COLORS.red,
  },
  activeDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.red, flexShrink: 0,
  },
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

  // ── Inline picker ──
  pickerWrap: {
    backgroundColor: COLORS.beige,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, padding: 10, gap: 6,
    shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  pickerHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 2, paddingBottom: 6,
  },
  pickerTitle: { fontSize: 11, fontWeight: '800', color: COLORS.inkMuted, textTransform: 'uppercase', letterSpacing: 0.7 },
  pickerClose: { fontSize: 14, fontWeight: '700', color: COLORS.inkMuted },

  // ── Log button ──
  logBtnWrap: { paddingHorizontal: 20, paddingTop: 8 },
  logBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: COLORS.red, borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 16,
    shadowColor: COLORS.border, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6,
  },
  logBtnText: { fontSize: 16, fontWeight: '900', color: 'white', letterSpacing: -0.1 },
});
