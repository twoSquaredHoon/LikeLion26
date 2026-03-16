import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  Welcome: undefined;
  Birthday: undefined;
  Gender: undefined;
  Height: undefined;
  Weight: undefined;
};

type WeightScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Weight'>;
};

// ─── Design Tokens ────────────────────────────────────────────────────────────
const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

// ─── Ruler config ─────────────────────────────────────────────────────────────
const TICK_W = 8; // px per tick

const KG_MIN = 30.0;
const KG_MAX = 200.0;
const KG_STEP = 0.1;
const KG_COUNT = Math.round((KG_MAX - KG_MIN) / KG_STEP) + 1;

const LB_MIN = 66;
const LB_MAX = 440;
const LB_COUNT = LB_MAX - LB_MIN + 1;

function getTickCount(unit: 'kg' | 'lb') {
  return unit === 'kg' ? KG_COUNT : LB_COUNT;
}

function getValueFromIndex(unit: 'kg' | 'lb', idx: number): number {
  if (unit === 'kg') return Math.round((KG_MIN + idx * KG_STEP) * 10) / 10;
  return LB_MIN + idx;
}

function getIndexFromValue(unit: 'kg' | 'lb', val: number): number {
  if (unit === 'kg') return Math.round((val - KG_MIN) / KG_STEP);
  return Math.round(val - LB_MIN);
}

function isLabelTick(unit: 'kg' | 'lb', idx: number): boolean {
  if (unit === 'kg') return idx % 20 === 0; // every 2kg
  return (LB_MIN + idx) % 10 === 0;
}

function isMajorTick(unit: 'kg' | 'lb', idx: number): boolean {
  if (unit === 'kg') return idx % 5 === 0;
  return (LB_MIN + idx) % 5 === 0;
}

function getLabelText(unit: 'kg' | 'lb', idx: number): string {
  if (unit === 'kg') return `${Math.round(KG_MIN + idx * KG_STEP)}`;
  return `${LB_MIN + idx}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function WeightScreen({ navigation }: WeightScreenProps) {
  const [unit, setUnitState] = useState<'kg' | 'lb'>('kg');
  const [kgValue, setKgValue] = useState(71.2);
  const [lbValue, setLbValue] = useState(157);

  const scrollRef = useRef<ScrollView>(null);
  const [rulerWidth, setRulerWidth] = useState(0);

  const currentValue = unit === 'kg' ? kgValue : lbValue;
  const displayText = unit === 'kg' ? kgValue.toFixed(1) : lbValue.toFixed(0);

  const handleScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / TICK_W);
    const clamped = Math.max(0, Math.min(idx, getTickCount(unit) - 1));
    const val = getValueFromIndex(unit, clamped);
    if (unit === 'kg') setKgValue(val);
    else setLbValue(val);
  }, [unit]);

  const handleUnitChange = (u: 'kg' | 'lb') => {
    setUnitState(u);
    const val = u === 'kg' ? kgValue : lbValue;
    setTimeout(() => {
      const idx = getIndexFromValue(u, val);
      scrollRef.current?.scrollTo({ x: idx * TICK_W, animated: false });
    }, 50);
  };

  const PAD = rulerWidth / 2;

  const tickCount = getTickCount(unit);

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back Button ── */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      {/* ── Progress Bar ── */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '45%' }]} />
        </View>
        <Text style={styles.progressLabel}>Step 5 of 11</Text>
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>What is your weight?</Text>
        <Text style={styles.subtitle}>
          Knowing your current weight helps us calculate your personalised calorie goals
        </Text>
      </View>

      {/* ── Unit Toggle ── */}
      <View style={styles.unitToggleWrap}>
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitBtn, unit === 'kg' && styles.unitBtnActive]}
            onPress={() => handleUnitChange('kg')}
            activeOpacity={0.8}
          >
            <Text style={[styles.unitBtnText, unit === 'kg' && styles.unitBtnTextActive]}>kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitBtn, unit === 'lb' && styles.unitBtnActive]}
            onPress={() => handleUnitChange('lb')}
            activeOpacity={0.8}
          >
            <Text style={[styles.unitBtnText, unit === 'lb' && styles.unitBtnTextActive]}>lb</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Value Card ── */}
      <View style={styles.valueCard}>

        {/* Value Display */}
        <View style={styles.valueDisplay}>
          <Text style={styles.valueNumber}>{displayText}</Text>
          <Text style={styles.valueUnit}>{unit}</Text>
        </View>

        {/* Ruler */}
        <View
          style={styles.rulerWrap}
          onLayout={e => setRulerWidth(e.nativeEvent.layout.width)}
        >
          {/* Center indicator */}
          <View style={styles.rulerIndicator} pointerEvents="none" />

          {/* Scrollable ruler */}
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={TICK_W}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScrollEnd}
            onScrollEndDrag={handleScrollEnd}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: PAD }}
            onLayout={() => {
              const idx = getIndexFromValue(unit, currentValue);
              setTimeout(() => {
                scrollRef.current?.scrollTo({ x: idx * TICK_W, animated: false });
              }, 80);
            }}
          >
            {Array.from({ length: tickCount }, (_, i) => {
              const isLabel = isLabelTick(unit, i);
              const isMajor = isMajorTick(unit, i);
              const tickH = isLabel ? 24 : isMajor ? 16 : 10;
              return (
                <View key={i} style={styles.tickWrap}>
                  <View style={[
                    styles.tick,
                    isLabel && styles.tickLabel,
                    isMajor && !isLabel && styles.tickMajor,
                    { height: tickH },
                  ]} />
                  {isLabel && (
                    <Text style={styles.tickText}>{getLabelText(unit, i)}</Text>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* ── Continue Button ── */}
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.85}
      >
        <Text style={styles.continueBtnText}>Continue →</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },

  // Back Button
  backBtn: {
    alignSelf: 'flex-start', marginTop: 14, marginLeft: 22,
    paddingVertical: 8, paddingHorizontal: 14,
    backgroundColor: COLORS.bg2, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 12,
    shadowColor: COLORS.border, shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 3,
  },
  backBtnText: { fontSize: 13, fontWeight: '800', color: COLORS.ink },

  // Progress
  progressWrap: { paddingHorizontal: 22, marginTop: 14 },
  progressTrack: {
    height: 6, backgroundColor: 'rgba(42,26,26,0.1)',
    borderRadius: 6, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: COLORS.red, borderRadius: 6 },
  progressLabel: {
    fontSize: 10, fontWeight: '700',
    color: COLORS.inkMuted, textAlign: 'right', marginTop: 4,
  },

  // Header
  header: { paddingHorizontal: 22, marginTop: 22 },
  title: { fontSize: 26, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 8 },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 20 },

  // Unit Toggle
  unitToggleWrap: { alignItems: 'center', marginTop: 20 },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg2,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 14, padding: 3, gap: 2,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  unitBtn: {
    paddingVertical: 6, paddingHorizontal: 20,
    borderRadius: 10, borderWidth: 2, borderColor: 'transparent',
  },
  unitBtnActive: { backgroundColor: COLORS.red, borderColor: COLORS.border },
  unitBtnText: { fontSize: 12, fontWeight: '800', color: COLORS.inkMuted },
  unitBtnTextActive: { color: 'white' },

  // Value Card
  valueCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 22, marginHorizontal: 22, marginTop: 16,
    padding: 22,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  valueDisplay: {
    flexDirection: 'row', alignItems: 'flex-end',
    justifyContent: 'center', gap: 6,
  },
  valueNumber: {
    fontSize: 38, fontWeight: '900', color: COLORS.ink, letterSpacing: -1.5,
  },
  valueUnit: {
    fontSize: 15, fontWeight: '700', color: COLORS.inkMuted, marginBottom: 4,
  },

  // Ruler
  rulerWrap: {
    height: 60, marginTop: 20,
    position: 'relative', overflow: 'hidden',
  },
  rulerIndicator: {
    position: 'absolute',
    left: '50%', top: 0,
    width: 2.5, height: 30,
    backgroundColor: COLORS.red,
    borderRadius: 2, zIndex: 2,
    marginLeft: -1.25,
  },
  tickWrap: {
    width: TICK_W,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  tick: {
    width: 1.5,
    backgroundColor: 'rgba(42,26,26,0.25)',
    borderRadius: 1,
  },
  tickMajor: { width: 2, backgroundColor: 'rgba(42,26,26,0.5)' },
  tickLabel: { width: 2.5, backgroundColor: COLORS.border },
  tickText: {
    fontSize: 9, fontWeight: '700',
    color: COLORS.inkMuted, marginTop: 4,
    minWidth: 24, textAlign: 'center',
  },

  // Continue Button
  continueBtn: {
    height: 54, backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, marginHorizontal: 22, marginBottom: 8,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },
});