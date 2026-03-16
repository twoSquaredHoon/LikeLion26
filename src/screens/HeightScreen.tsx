import React, { useState, useRef, useCallback, useEffect } from 'react';
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

type HeightScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Height'>;
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

const ITEM_H = 44;

// ─── Generate values ──────────────────────────────────────────────────────────
const CM_VALUES = Array.from({ length: 101 }, (_, i) => `${i + 130}`);
const FT_VALUES: string[] = [];
for (let ft = 4; ft <= 7; ft++) {
  for (let inch = 0; inch < 12; inch++) {
    FT_VALUES.push(`${ft}' ${inch}"`);
    if (ft === 7 && inch === 0) break;
  }
}

// ─── Picker Column ────────────────────────────────────────────────────────────
type PickerColProps = {
  items: string[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
};

function PickerCol({ items, selectedIdx, onSelect }: PickerColProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [colHeight, setColHeight] = useState(0);
  const PAD = colHeight > 0 ? Math.round((colHeight - ITEM_H) / 2) : ITEM_H * 3;

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: selectedIdx * ITEM_H, animated: false });
    }, 80);
  }, [colHeight, items]);

  const handleScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = Math.round(y / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    onSelect(clamped);
  }, [items.length, onSelect]);

  return (
    <View
      style={{ flex: 1 }}
      onLayout={e => setColHeight(e.nativeEvent.layout.height)}
    >
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_H}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: PAD }}
      >
        {items.map((item, i) => {
          const dist = Math.abs(i - selectedIdx);
          return (
            <TouchableOpacity
              key={i}
              style={styles.pickerItem}
              onPress={() => {
                onSelect(i);
                scrollRef.current?.scrollTo({ y: i * ITEM_H, animated: true });
              }}
              activeOpacity={1}
            >
              <Text style={[
                styles.pickerText,
                dist === 0 && styles.pickerSel,
                dist === 1 && styles.pickerN2,
                dist === 2 && styles.pickerN1,
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeightScreen({ navigation }: HeightScreenProps) {
  const [unit, setUnit]       = useState<'cm' | 'ft'>('cm');
  const [selIdx, setSelIdx]   = useState(50); // default 180cm
  const [colHeight, setColHeight] = useState(0);

  const values = unit === 'cm' ? CM_VALUES : FT_VALUES;
  const displayVal = values[selIdx] ?? '180';
  const displayUnit = unit === 'cm' ? 'cm' : '';

  const handleUnitChange = (u: 'cm' | 'ft') => {
    setUnit(u);
    setSelIdx(u === 'cm' ? 50 : 10);
  };

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
          <View style={[styles.progressFill, { width: '36%' }]} />
        </View>
        <Text style={styles.progressLabel}>Step 4 of 11</Text>
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>How tall are you?</Text>
        <Text style={styles.subtitle}>
          This helps us estimate your body composition and provide accurate calorie calculations
        </Text>
      </View>

      {/* ── Unit Toggle ── */}
      <View style={styles.unitToggleWrap}>
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitBtn, unit === 'ft' && styles.unitBtnActive]}
            onPress={() => handleUnitChange('ft')}
            activeOpacity={0.8}
          >
            <Text style={[styles.unitBtnText, unit === 'ft' && styles.unitBtnTextActive]}>ft</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitBtn, unit === 'cm' && styles.unitBtnActive]}
            onPress={() => handleUnitChange('cm')}
            activeOpacity={0.8}
          >
            <Text style={[styles.unitBtnText, unit === 'cm' && styles.unitBtnTextActive]}>cm</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Selected Display ── */}
      <View style={styles.selectedDisplay}>
        <Text style={styles.selectedVal}>{displayVal}</Text>
        <Text style={styles.selectedUnit}>{displayUnit}</Text>
      </View>

      {/* ── Picker Card ── */}
      <View style={styles.pickerCard}>
        {/* Highlight box */}
        {colHeight > 0 && (
          <View
            style={[styles.pickerHighlight, { top: (colHeight - ITEM_H - 4) / 2 }]}
            pointerEvents="none"
          />
        )}
        <View
          style={{ flex: 1 }}
          onLayout={e => setColHeight(e.nativeEvent.layout.height)}
        >
          <PickerCol
            key={unit}
            items={values}
            selectedIdx={selIdx}
            onSelect={setSelIdx}
          />
        </View>
      </View>

      {/* ── Continue Button ── */}
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => navigation.navigate('Weight')}
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
  unitBtnActive: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.border,
  },
  unitBtnText: { fontSize: 12, fontWeight: '800', color: COLORS.inkMuted },
  unitBtnTextActive: { color: 'white' },

  // Selected Display
  selectedDisplay: {
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center',
    gap: 6, marginHorizontal: 22, marginTop: 16,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, padding: 14,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  selectedVal: { fontSize: 32, fontWeight: '900', color: COLORS.ink, letterSpacing: -1 },
  selectedUnit: { fontSize: 14, fontWeight: '700', color: COLORS.inkMuted, marginBottom: 4 },

  // Picker Card
  pickerCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 24, marginHorizontal: 22, marginTop: 16,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    flex: 1, overflow: 'hidden', position: 'relative',
  },
  pickerHighlight: {
    position: 'absolute', left: 20, right: 20,
    height: ITEM_H + 4,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 14, backgroundColor: 'transparent', zIndex: 10,
  },
  pickerItem: {
    height: ITEM_H, alignItems: 'center', justifyContent: 'center',
  },
  pickerText: {
    fontSize: 13, fontWeight: '400', color: COLORS.inkMuted, opacity: 0.3,
  },
  pickerN1: { fontSize: 14, fontWeight: '500', opacity: 0.55 },
  pickerN2: { fontSize: 15, fontWeight: '600', opacity: 0.75 },
  pickerSel: {
    fontSize: 20, fontWeight: '900', color: COLORS.ink, opacity: 1, letterSpacing: -0.5,
  },

  // Continue Button
  continueBtn: {
    height: 54, backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, marginHorizontal: 22, marginTop: 16, marginBottom: 8,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },
});