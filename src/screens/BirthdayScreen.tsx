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
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerifyEmail: undefined;
  Welcome: undefined;
  Birthday: undefined;
};

type BirthdayScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Birthday'>;
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

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const ITEM_H = 36;

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

// ─── Picker Column ────────────────────────────────────────────────────────────
type PickerColProps = {
  items: string[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
  flex: number;
  colHeight: number;
  paddingLeft?: number;
  paddingRight?: number;
};

function PickerCol({ items, selectedIdx, onSelect, flex, colHeight, paddingLeft = 0, paddingRight = 0 }: PickerColProps) {
  const scrollRef = useRef<ScrollView>(null);
  const PAD = colHeight > 0 ? Math.round((colHeight - ITEM_H) / 2) : ITEM_H * 3;

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: selectedIdx * ITEM_H, animated: false });
    }, 80);
  }, [colHeight]);

  const handleScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = Math.round(y / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    onSelect(clamped);
  }, [items.length, onSelect]);

  return (
    <View style={{ flex, paddingLeft, paddingRight }}>
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
                dist === 1 && styles.pickerN4,
                dist === 2 && styles.pickerN3,
                dist === 3 && styles.pickerN2,
                dist >= 4 && dist <= 5 && styles.pickerN1,
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
export default function BirthdayScreen({ navigation }: BirthdayScreenProps) {
  const [selMonth, setSelMonth] = useState(5);
  const [selDay,   setSelDay]   = useState(4);
  const [selYear,  setSelYear]  = useState(67);
  const [colHeight, setColHeight] = useState(0);

  const days  = Array.from({ length: getDaysInMonth(selMonth, 1940 + selYear) }, (_, i) => String(i + 1));
  const years = Array.from({ length: 80 }, (_, i) => String(1940 + i));

  const displayDate = `${MONTHS[selMonth]} ${selDay + 1}, ${1940 + selYear}`;

  const handleMonthChange = (idx: number) => {
    setSelMonth(idx);
    const maxDay = getDaysInMonth(idx, 1940 + selYear) - 1;
    if (selDay > maxDay) setSelDay(maxDay);
  };

  const handleYearChange = (idx: number) => {
    setSelYear(idx);
    const maxDay = getDaysInMonth(selMonth, 1940 + idx) - 1;
    if (selDay > maxDay) setSelDay(maxDay);
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
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressLabel}>Step 1 of 3</Text>
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>When is your birthday?</Text>
        <Text style={styles.subtitle}>This helps us personalize your plan</Text>
      </View>

      {/* ── Date Badge ── */}
      <View style={styles.dateBadge}>
        <View style={styles.dateBadgeIcon}>
          <Text style={styles.dateBadgeEmoji}>🎂</Text>
        </View>
        <View>
          <Text style={styles.dateBadgeLabel}>Selected date</Text>
          <Text style={styles.dateBadgeValue}>{displayDate}</Text>
        </View>
      </View>

      {/* ── Picker Card ── */}
      <View style={styles.pickerCard}>

        {/* Labels */}
        <View style={styles.pickerLabels}>
          <Text style={[styles.pickerLabel, { flex: 1.8, paddingLeft: 10 }]}>Month</Text>
          <Text style={[styles.pickerLabel, { flex: 0.7, paddingRight: 8 }]}>Day</Text>
          <Text style={[styles.pickerLabel, { flex: 1.1, paddingRight: 16 }]}>Year</Text>
        </View>

        {/* Columns */}
        <View
          style={styles.pickerColumnsWrap}
          onLayout={e => setColHeight(e.nativeEvent.layout.height)}
        >

          {/* Highlight box — centered using measured height */}
          {colHeight > 0 && (
            <View
              style={[
                styles.pickerHighlight,
                { top: (colHeight - ITEM_H - 4) / 2 }
              ]}
              pointerEvents="none"
            />
          )}

          {/* Month */}
          <PickerCol
            items={MONTHS}
            selectedIdx={selMonth}
            onSelect={handleMonthChange}
            flex={1.8}
            colHeight={colHeight}
            paddingLeft={10}
          />

          {/* Day */}
          <PickerCol
            items={days}
            selectedIdx={selDay}
            onSelect={setSelDay}
            flex={0.7}
            colHeight={colHeight}
            paddingRight={8}
          />

          {/* Year */}
          <PickerCol
            items={years}
            selectedIdx={selYear}
            onSelect={handleYearChange}
            flex={1.1}
            colHeight={colHeight}
            paddingRight={16}
          />

        </View>
      </View>

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
  progressFill: {
    width: '33%', height: '100%',
    backgroundColor: COLORS.red, borderRadius: 6,
  },
  progressLabel: {
    fontSize: 10, fontWeight: '700',
    color: COLORS.inkMuted, textAlign: 'right', marginTop: 4,
  },

  // Header
  header: { paddingHorizontal: 22, marginTop: 18 },
  title: {
    fontSize: 26, fontWeight: '900', color: COLORS.ink,
    letterSpacing: -0.8, marginBottom: 6,
  },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted },

  // Date Badge
  dateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 16, padding: 12,
    marginHorizontal: 22, marginTop: 16,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  dateBadgeIcon: {
    width: 38, height: 38,
    backgroundColor: COLORS.redLight,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  dateBadgeEmoji: { fontSize: 18 },
  dateBadgeLabel: {
    fontSize: 10, fontWeight: '800', color: COLORS.inkMuted,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2,
  },
  dateBadgeValue: { fontSize: 15, fontWeight: '900', color: COLORS.ink },

  // Picker Card
  pickerCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 24, marginHorizontal: 22, marginTop: 16,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    flex: 1, overflow: 'hidden',
  },
  pickerLabels: {
    flexDirection: 'row',
    paddingTop: 10, paddingHorizontal: 4,
  },
  pickerLabel: {
    fontSize: 9, fontWeight: '800',
    color: COLORS.inkMuted, textTransform: 'uppercase',
    letterSpacing: 1, textAlign: 'center',
  },
  pickerColumnsWrap: {
    flex: 1, flexDirection: 'row',
    position: 'relative',
  },
  pickerHighlight: {
    position: 'absolute',
    left: 12, right: 12,
    height: ITEM_H + 4,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  pickerItem: {
    height: ITEM_H,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text distance styles (from HTML)
  pickerText: {
    fontSize: 12, fontWeight: '400',
    color: COLORS.inkMuted, opacity: 0.2,
  },
  pickerN1: { fontSize: 13, fontWeight: '500', opacity: 0.38 },
  pickerN2: { fontSize: 14, fontWeight: '500', opacity: 0.55 },
  pickerN3: { fontSize: 15, fontWeight: '600', opacity: 0.72 },
  pickerN4: { fontSize: 16, fontWeight: '600', opacity: 0.88 },
  pickerSel: {
    fontSize: 19, fontWeight: '800',
    color: COLORS.ink, opacity: 1,
    letterSpacing: -0.3,
  },

  // Continue Button
  continueBtn: {
    height: 54,
    backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18,
    marginHorizontal: 22, marginTop: 16, marginBottom: 8,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnText: {
    fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3,
  },
});