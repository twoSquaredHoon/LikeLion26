import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

// ─── Constants ───────────────────────────────────────────────────────────────
const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── Types ────────────────────────────────────────────────────────────────────
interface ComboItem {
  name: string;
  kcal: number;
}

interface MacroPill {
  val: string;
  label: string;
  bg: string;
  borderColor: string;
}

interface DiningHall {
  id: number;
  emoji: string;
  bgColor: string;
  comboName: string;
  hallName: string;
  status: 'green' | 'yellow' | 'red';
  kcal: number;
  items: ComboItem[];
  macros: MacroPill[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const DINING_HALLS: DiningHall[] = [
  {
    id: 0,
    emoji: '🏛️',
    bgColor: '#FFE8D6',
    comboName: 'Roasted Turkey Recovery',
    hallName: 'Gordon Dining',
    status: 'green',
    kcal: 875,
    items: [
      { name: 'Roasted Turkey Breast', kcal: 215 },
      { name: 'Brown Rice', kcal: 165 },
      { name: 'Roasted Potatoes', kcal: 190 },
      { name: 'Glazed Carrots', kcal: 80 },
      { name: 'Sweet Corn', kcal: 70 },
    ],
    macros: [
      { val: '875', label: 'kcal', bg: '#FFE8EA', borderColor: '#FF3347' },
      { val: '65g', label: 'protein', bg: '#FFE0EE', borderColor: '#FF6B9D' },
      { val: '98g', label: 'carbs', bg: '#FFF2DC', borderColor: '#FF9F1C' },
      { val: '22g', label: 'fats', bg: '#D8F5F3', borderColor: '#2EC4B6' },
    ],
  },
  {
    id: 1,
    emoji: '🍜',
    bgColor: '#E8F4FF',
    comboName: 'Giardiniera Chicken Pasta',
    hallName: "Rheta's Market",
    status: 'green',
    kcal: 800,
    items: [
      { name: 'Giardiniera Pasta', kcal: 320 },
      { name: 'Grilled Chicken', kcal: 240 },
      { name: 'Dinner Roll', kcal: 140 },
      { name: 'Sweet Corn', kcal: 70 },
    ],
    macros: [
      { val: '800', label: 'kcal', bg: '#FFE8EA', borderColor: '#FF3347' },
      { val: '50g', label: 'protein', bg: '#FFE0EE', borderColor: '#FF6B9D' },
      { val: '110g', label: 'carbs', bg: '#FFF2DC', borderColor: '#FF9F1C' },
      { val: '18g', label: 'fats', bg: '#D8F5F3', borderColor: '#2EC4B6' },
    ],
  },
  {
    id: 2,
    emoji: '🥗',
    bgColor: '#E8FFE8',
    comboName: 'Atlantic Salmon Power Bowl',
    hallName: "Liz's Market",
    status: 'yellow',
    kcal: 720,
    items: [
      { name: 'Atlantic Salmon', kcal: 280 },
      { name: 'Quinoa', kcal: 180 },
      { name: 'Steamed Broccoli', kcal: 60 },
      { name: 'Edamame', kcal: 120 },
    ],
    macros: [
      { val: '720', label: 'kcal', bg: '#FFE8EA', borderColor: '#FF3347' },
      { val: '58g', label: 'protein', bg: '#FFE0EE', borderColor: '#FF6B9D' },
      { val: '62g', label: 'carbs', bg: '#FFF2DC', borderColor: '#FF9F1C' },
      { val: '28g', label: 'fats', bg: '#D8F5F3', borderColor: '#2EC4B6' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusLight = ({ status }: { status: 'green' | 'yellow' | 'red' }) => {
  const colorMap = {
    green: '#22C55E',
    yellow: '#FF9F1C',
    red: '#FF3347',
  };
  return (
    <View
      style={[
        styles.statusLight,
        { backgroundColor: colorMap[status] },
      ]}
    />
  );
};

const DateStrip = () => {
  const today = new Date();
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + (i - 1));
    return d;
  });

  return (
    <View style={styles.dateNav}>
      <View style={styles.dateStrip}>
        {dates.map((d, i) => {
          const isToday = i === 1;
          const isPast = i === 0;
          const isFuture = i > 1;

          let pillStyle = styles.datePillDefault;
          let dayColor = COLORS.inkMuted;
          let numColor = COLORS.ink;

          if (isToday) {
            pillStyle = styles.datePillActive;
            dayColor = 'rgba(255,255,255,0.8)';
            numColor = 'white';
          } else if (isPast) {
            pillStyle = styles.datePillMuted;
            dayColor = 'rgba(255,255,255,0.5)';
            numColor = 'rgba(255,255,255,0.8)';
          } else if (isFuture) {
            pillStyle = styles.datePillFuture;
            dayColor = '#9A8A80';
            numColor = '#6A5A54';
          }

          return (
            <TouchableOpacity key={i} style={[styles.datePill, pillStyle]}>
              <Text style={[styles.dateDay, { color: dayColor }]}>
                {DAYS[d.getDay()]}
              </Text>
              <Text style={[styles.dateNum, { color: numColor }]}>
                {d.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const GoalsCard = () => {
  const [expanded, setExpanded] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const toggle = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 260],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const chevronRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const MacroBar = ({
    label,
    current,
    goal,
    unit,
    fillColor,
    pct,
  }: {
    label: string;
    current: string;
    goal: string;
    unit: string;
    fillColor: string;
    pct: number;
  }) => (
    <View style={styles.macroInlineItem}>
      <View style={styles.macroInlineTop}>
        <Text style={styles.macroInlineLabel}>{label}</Text>
        <Text style={styles.macroInlineNums}>
          {current}/{goal}{unit}
        </Text>
      </View>
      <View style={styles.goalBarBg}>
        <View
          style={[
            styles.goalBarFill,
            { width: `${pct}%` as any, backgroundColor: fillColor },
          ]}
        />
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.goalCard}
      onPress={toggle}
      activeOpacity={0.9}
    >
      <View style={styles.goalCardHeader}>
        <View style={styles.goalHeaderLeft}>
          <Text style={styles.goalCardTitle}>Today's Goals</Text>
          <Text style={styles.goalCalInline}>500 / 2,800 kcal</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={styles.goalCardOverallWrap}>
            <Text style={styles.goalCardOverall}>18%</Text>
          </View>
          <Animated.View
            style={[
              styles.goalChevron,
              { transform: [{ rotate: chevronRotation }] },
            ]}
          >
            <Svg width={10} height={10} viewBox="0 0 10 10">
              <Path
                d="M2 3.5l3 3 3-3"
                stroke={COLORS.inkMuted}
                strokeWidth={1.8}
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
          </Animated.View>
        </View>
      </View>

      <Animated.View style={{ maxHeight, opacity, overflow: 'hidden' }}>
        {/* Calories bar */}
        <View style={styles.goalRow}>
          <View style={styles.goalRowTop}>
            <Text style={styles.goalRowLabel}>Calories</Text>
            <Text style={styles.goalRowNums}>500 / 2,800 kcal</Text>
          </View>
          <View style={styles.goalBarBg}>
            <View
              style={[
                styles.goalBarFill,
                { width: '18%', backgroundColor: COLORS.red },
              ]}
            />
          </View>
        </View>

        <View style={styles.goalDivider} />

        {/* Macro bars inline */}
        <View style={styles.macroInlineRow}>
          <MacroBar label="Protein" current="44" goal="180" unit="g" fillColor="#FF6B9D" pct={24} />
          <View style={styles.macroInlineSep} />
          <MacroBar label="Carbs" current="60" goal="320" unit="g" fillColor="#FF9F1C" pct={19} />
          <View style={styles.macroInlineSep} />
          <MacroBar label="Fats" current="18" goal="90" unit="g" fillColor="#2EC4B6" pct={20} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const HallCard = ({ hall, navigation }: { hall: DiningHall; navigation: StackNavigationProp<RootStackParamList> }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const toggle = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0, 1],
  });

  const chevronRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      style={styles.hallCard}
      onPress={toggle}
      activeOpacity={0.95}
    >
      {/* Image / emoji area */}
      <View style={[styles.hallCardImg, { backgroundColor: hall.bgColor }]}>
        <Text style={styles.hallEmoji}>{hall.emoji}</Text>
        <Animated.View
          style={[
            styles.expandBtn,
            { transform: [{ rotate: chevronRotation }] },
          ]}
        >
          <Svg width={10} height={10} viewBox="0 0 10 10">
            <Path
              d="M2 3.5l3 3 3-3"
              stroke={COLORS.inkMuted}
              strokeWidth={1.8}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </Animated.View>
      </View>

      {/* Body */}
      <View style={styles.hallCardBody}>
        <View style={styles.hallInfo}>
          <Text style={styles.hallName}>{hall.comboName}</Text>
          <View style={styles.hallMeta}>
            <StatusLight status={hall.status} />
            <Text style={styles.hallHours}>{hall.hallName}</Text>
          </View>
        </View>
        <Text style={styles.hallKcalRow}>{hall.kcal} kcal</Text>
      </View>

      {/* Expanded detail */}
      <Animated.View style={{ maxHeight, opacity, overflow: 'hidden' }}>
        <View style={styles.comboDetailBorder}>
          <View style={styles.comboDetailInner}>
            <Text style={styles.comboName}>{hall.comboName}</Text>

            {/* Items list */}
            <View style={styles.comboItems}>
              {hall.items.map((item, i) => (
                <View
                  key={i}
                  style={[
                    styles.comboItemRow,
                    i === hall.items.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.comboItemName}>{item.name}</Text>
                  <Text style={styles.comboItemKcal}>{item.kcal} kcal</Text>
                </View>
              ))}
            </View>

            {/* Macro pills */}
            <View style={styles.macroPills}>
              {hall.macros.map((m, i) => (
                <View
                  key={i}
                  style={[
                    styles.mpill,
                    { backgroundColor: m.bg, borderColor: m.borderColor },
                  ]}
                >
                  <Text style={styles.mpillVal}>{m.val}</Text>
                  <Text style={styles.mpillLabel}>{m.label}</Text>
                </View>
              ))}
            </View>

            {/* Log button */}
            <TouchableOpacity style={styles.logBtn} onPress={() => navigation.navigate('Meal')} activeOpacity={0.85}>
              <Svg width={16} height={16} viewBox="0 0 24 24">
                <Path
                  d="M12 5v14M5 12h14"
                  stroke="white"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>
              <Text style={styles.logBtnText}>Log This Meal</Text>
              <View style={styles.logBtnKcalWrap}>
                <Text style={styles.logBtnKcal}>{hall.kcal} kcal</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />
      <View style={styles.container}>

        <DateStrip />
        <GoalsCard />

        {/* Section label */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>Your Top Picks Today</Text>
          <Text style={styles.sectionLabelSub}>Based on your preferences</Text>
        </View>

        {/* Scrollable hall cards */}
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {DINING_HALLS.map((hall) => (
            <HallCard key={hall.id} hall={hall} navigation={navigation} />
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },

  // Date strip
  dateNav: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  dateStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  datePill: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  datePillDefault: {
    backgroundColor: COLORS.beige,
  },
  datePillActive: {
    backgroundColor: COLORS.red,
  },
  datePillMuted: {
    backgroundColor: '#3A2A2A',
  },
  datePillFuture: {
    backgroundColor: '#E0D8D0',
  },
  dateDay: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  dateNum: {
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 16,
  },

  // Goals card
  goalCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 3,
    borderColor: COLORS.border,
    borderRadius: 22,
    padding: 14,
    marginHorizontal: 20,
    marginTop: 12,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  goalCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalCardTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
  goalCalInline: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },
  goalCardOverallWrap: {
    backgroundColor: COLORS.red,
    borderWidth: 2,
    borderColor: COLORS.border,
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 20,
  },
  goalCardOverall: {
    fontSize: 11,
    fontWeight: '800',
    color: 'white',
  },
  goalChevron: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.redLight,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalRow: {
    marginTop: 12,
  },
  goalRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  goalRowLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.ink,
  },
  goalRowNums: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink,
  },
  goalBarBg: {
    height: 9,
    backgroundColor: '#F0E0E0',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  goalBarFill: {
    height: '100%',
    borderRadius: 6,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  goalDivider: {
    height: 1.5,
    backgroundColor: '#F0E0E0',
    marginVertical: 12,
  },
  macroInlineRow: {
    flexDirection: 'row',
  },
  macroInlineItem: {
    flex: 1,
  },
  macroInlineSep: {
    width: 1.5,
    backgroundColor: '#F0E0E0',
    marginHorizontal: 10,
  },
  macroInlineTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  macroInlineLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.ink,
  },
  macroInlineNums: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.ink,
  },

  // Section label
  sectionLabel: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabelText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: COLORS.inkMuted,
  },
  sectionLabelSub: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },

  // Scroll body
  scrollBody: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Hall card
  hallCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 22,
    marginBottom: 12,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    overflow: 'hidden',
  },
  hallCardImg: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: COLORS.border,
  },
  hallEmoji: {
    fontSize: 56,
  },
  expandBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.redLight,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hallCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  hallInfo: {
    flex: 1,
    minWidth: 0,
  },
  hallName: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  hallMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusLight: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  hallHours: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },
  hallKcalRow: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.ink,
  },

  // Combo detail (expanded)
  comboDetailBorder: {
    borderTopWidth: 2.5,
    borderTopColor: COLORS.border,
  },
  comboDetailInner: {
    padding: 13,
  },
  comboName: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  comboItems: {
    marginBottom: 12,
  },
  comboItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  comboItemName: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.ink,
  },
  comboItemKcal: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkMuted,
  },

  // Macro pills
  macroPills: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  mpill: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 11,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  mpillVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink,
    lineHeight: 16,
    marginBottom: 2,
  },
  mpillLabel: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: COLORS.inkMuted,
  },

  // Log button
  logBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.red,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 13,
    shadowColor: COLORS.border,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  logBtnText: {
    fontSize: 15,
    fontWeight: '900',
    color: 'white',
  },
  logBtnKcalWrap: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  logBtnKcal: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
  },

});