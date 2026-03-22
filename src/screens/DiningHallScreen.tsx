import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
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
  GoalWeight: undefined;
  Diet: undefined;
  Dislikes: undefined;
  Allergens: undefined;
  DiningHall: undefined;
};

type DiningHallScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DiningHall'>;
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
  greenSelected: '#BBFAD4',
  greenBorder: '#4ADE80',
  green: '#22C55E',
};

const MAX_SELECTIONS = 3;

// ─── Dining Hall Data ─────────────────────────────────────────────────────────
// 📁 Place your logo files inside: assets/logos/
// Rename each file exactly as below:
//   download4.png → gordon.png
//   download5.png → fourlakes.png
//   download3.png → liz.png
//   download1.png → rheta.png
//   download6.png → carson.png
//   download2.png → lowell.png

const HALLS = [
  {
    id: 'gordon',
    name: 'Gordon Avenue Market',
    logo: require('../../assets/Reference Images/Gordon Avenue Market.png'),
  },
  {
    id: 'fourlakes',
    name: 'Four Lakes Market',
    logo: require('../../assets/Reference Images/Four Lakes Market.png'),
  },
  {
    id: 'liz',
    name: "Liz's Market",
    logo: require("../../assets/Reference Images/Liz's Market.png"),
  },
  {
    id: 'rheta',
    name: "Rheta's Market",
    logo: require("../../assets/Reference Images/Rheta's Market.png"),
  },
  {
    id: 'carson',
    name: "Carson's Market",
    logo: require("../../assets/Reference Images/Carson's Market.png"),
  },
  {
    id: 'lowell',
    name: 'Lowell Market',
    logo: require('../../assets/Reference Images/Lowell Market.png'),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DiningHallScreen({ navigation }: DiningHallScreenProps) {
  const [order, setOrder] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOrder(prev => {
      const idx = prev.indexOf(id);
      if (idx !== -1) return prev.filter(h => h !== id);
      if (prev.length >= MAX_SELECTIONS) return prev;
      return [...prev, id];
    });
  };

  const getOrderNum = (id: string) => {
    const idx = order.indexOf(id);
    return idx !== -1 ? idx + 1 : null;
  };

  const isMaxed = order.length >= MAX_SELECTIONS;

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back ── */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      {/* ── Progress ── */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '91%' }]} />
        </View>
        <Text style={styles.progressLabel}>Step 10 of 11</Text>
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Where is your favorite{'\n'}dining hall?</Text>
          {order.length > 0 && (
            <View style={[
              styles.counterBadge,
              order.length === MAX_SELECTIONS && styles.counterBadgeFull,
            ]}>
              <Text style={styles.counterBadgeText}>{order.length} / {MAX_SELECTIONS}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>Choose up to 3 dining halls in order.</Text>
      </View>

      {/* ── Grid ── */}
      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        {Array.from({ length: Math.ceil(HALLS.length / 2) }, (_, rowIdx) => (
          <View key={rowIdx} style={styles.gridRow}>
            {HALLS.slice(rowIdx * 2, rowIdx * 2 + 2).map(hall => {
              const num = getOrderNum(hall.id);
              const isSel = num !== null;
              const isDisabled = !isSel && isMaxed;
              return (
                <TouchableOpacity
                  key={hall.id}
                  style={[
                    styles.hallCard,
                    isSel && styles.hallCardSelected,
                    isDisabled && styles.hallCardMaxed,
                  ]}
                  onPress={() => toggle(hall.id)}
                  activeOpacity={isDisabled ? 1 : 0.85}
                  disabled={isDisabled}
                >
                  {/* Order number badge */}
                  <View style={[styles.badge, isSel && styles.badgeSelected]}>
                    {isSel && <Text style={styles.badgeText}>{num}</Text>}
                  </View>

                  {/* Logo */}
                  <Image
                    source={hall.logo}
                    style={styles.hallLogo}
                    resizeMode="contain"
                  />

                  {/* Name */}
                  <Text style={styles.hallName}>{hall.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* ── Let's Go Button ── */}
      <TouchableOpacity
        style={[styles.letsgoBtn, order.length === 0 && styles.letsgoBtnDisabled]}
        onPress={() => order.length > 0 && navigation.navigate('Home')}
        disabled={order.length === 0}
        activeOpacity={0.85}
      >
        <Text style={styles.letsgoBtnText}>Let's Go! 🎉</Text>
      </TouchableOpacity>

      {/* ── Back + Skip ── */}
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.bottomRowText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },

  backBtn: {
    alignSelf: 'flex-start', marginTop: 14, marginLeft: 22,
    paddingVertical: 8, paddingHorizontal: 14,
    backgroundColor: COLORS.bg2, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 12, shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3,
  },
  backBtnText: { fontSize: 13, fontWeight: '800', color: COLORS.ink },

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

  header: { paddingHorizontal: 22, marginTop: 20 },
  headerRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', gap: 10,
  },
  title: {
    fontSize: 24, fontWeight: '900', color: COLORS.ink,
    letterSpacing: -0.8, flex: 1,
  },
  subtitle: {
    fontSize: 13, fontWeight: '500',
    color: COLORS.inkMuted, marginTop: 4,
  },

  counterBadge: {
    backgroundColor: COLORS.red,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10,
    marginTop: 4,
  },
  counterBadgeFull: { backgroundColor: COLORS.green },
  counterBadgeText: { fontSize: 11, fontWeight: '800', color: 'white' },

  scrollBody: { flex: 1, paddingHorizontal: 22, marginTop: 14 },
  gridContainer: { paddingBottom: 16, gap: 12 },
  gridRow: { flexDirection: 'row', gap: 12 },

  hallCard: {
    flex: 1, height: 145,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 20, padding: 14,
    alignItems: 'center', justifyContent: 'space-between',
    position: 'relative',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  hallCardSelected: {
    backgroundColor: COLORS.greenSelected,
    borderColor: COLORS.greenBorder,
  },
  hallCardMaxed: { opacity: 0.4 },

  badge: {
    position: 'absolute', top: 10, right: 10,
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: COLORS.border,
    backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeSelected: { backgroundColor: COLORS.red, borderColor: COLORS.border },
  badgeText: { fontSize: 11, fontWeight: '900', color: 'white' },

  hallLogo: { width: 72, height: 72 },
  hallName: {
    fontSize: 12, fontWeight: '800', color: COLORS.ink,
    textAlign: 'center', lineHeight: 16, letterSpacing: -0.3,
  },

  letsgoBtn: {
    height: 54, backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, marginHorizontal: 22,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  letsgoBtnDisabled: { opacity: 0.4 },
  letsgoBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },

  bottomRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginHorizontal: 22, marginTop: 10, marginBottom: 20,
  },
  bottomRowText: { fontSize: 13, fontWeight: '700', color: COLORS.inkMuted },
  skipText: { fontSize: 13, fontWeight: '700', color: COLORS.inkMuted },
});