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

type AllergensScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Allergens'>;
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
};

// ─── Allergen Data ────────────────────────────────────────────────────────────
// Images located in: assets/Reference Images/
const ALLERGENS = [
  {
    id: 'none',
    label: 'Not a picky eater!',
    image: null,
    emoji: '😄',
  },
  {
    id: 'soy',
    label: 'Soy',
    image: require('../../assets/Reference Images/Soy.png'),
    emoji: null,
  },
  {
    id: 'peanuts',
    label: 'Peanuts',
    image: require('../../assets/Reference Images/Peanuts.png'),
    emoji: null,
  },
  {
    id: 'treenuts',
    label: 'Tree nuts',
    image: require('../../assets/Reference Images/Tree nuts.png'),
    emoji: null,
  },
  {
    id: 'halal',
    label: 'Halal',
    image: require('../../assets/Reference Images/Halal.png'),
    emoji: null,
  },
  {
    id: 'kosher',
    label: 'Kosher',
    image: require('../../assets/Reference Images/Kosher.png'),
    emoji: null,
  },
  {
    id: 'dairy',
    label: 'Dairy Free',
    image: require('../../assets/Reference Images/Dairy Free.png'),
    emoji: null,
  },
  {
    id: 'gluten',
    label: 'Gluten Free',
    image: require('../../assets/Reference Images/Gluten Free.png'),
    emoji: null,
  },
  {
    id: 'shellfish',
    label: 'Shellfish Free',
    image: require('../../assets/Reference Images/Shellfish Free.png'),
    emoji: null,
  },
  {
    id: 'fish',
    label: 'Fish Free',
    image: require('../../assets/Reference Images/Fish Free.png'),
    emoji: null,
  },
  {
    id: 'egg',
    label: 'Egg Free',
    image: require('../../assets/Reference Images/Egg Free.png'),
    emoji: null,
  },
  {
    id: 'other',
    label: 'Other',
    image: null,
    emoji: '···',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AllergensScreen({ navigation }: AllergensScreenProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back ── */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      {/* ── Progress ── */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '82%' }]} />
        </View>
        <Text style={styles.progressLabel}>Step 9 of 11</Text>
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>Allergens</Text>
        <Text style={styles.subtitle}>
          Select foods that you avoid for faith or allergy reasons.
        </Text>
      </View>

      {/* ── Grid ── */}
      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        {Array.from({ length: Math.ceil(ALLERGENS.length / 2) }, (_, rowIdx) => (
          <View key={rowIdx} style={styles.gridRow}>
            {ALLERGENS.slice(rowIdx * 2, rowIdx * 2 + 2).map(item => {
              const isSel = selected.has(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.allergenCard, isSel && styles.allergenCardSelected]}
                  onPress={() => toggle(item.id)}
                  activeOpacity={0.85}
                >
                  {/* Check badge */}
                  <View style={[styles.checkBadge, isSel && styles.checkBadgeSel]}>
                    {isSel && <Text style={styles.checkMark}>✓</Text>}
                  </View>

                  {/* Name */}
                  <Text style={styles.allergenName}>{item.label}</Text>

                  {/* Image or emoji */}
                  {item.image ? (
                    <Image
                      source={item.image}
                      style={styles.allergenImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.allergenEmoji}>{item.emoji}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* ── Continue ── */}
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => navigation.navigate('DiningHall')}
        activeOpacity={0.85}
      >
        <Text style={styles.continueBtnText}>Continue →</Text>
      </TouchableOpacity>

      {/* ── Back + Skip ── */}
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.bottomRowText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DiningHall')} activeOpacity={0.7}>
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
  title: { fontSize: 26, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 4 },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 20 },

  scrollBody: { flex: 1, paddingHorizontal: 22, marginTop: 14 },
  gridContainer: { paddingBottom: 16, gap: 12 },
  gridRow: { flexDirection: 'row', gap: 12 },

  allergenCard: {
    flex: 1, height: 120,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 20, padding: 12,
    justifyContent: 'space-between',
    position: 'relative',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  allergenCardSelected: {
    backgroundColor: COLORS.greenSelected,
    borderColor: COLORS.greenBorder,
  },

  checkBadge: {
    position: 'absolute', top: 10, right: 10,
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: COLORS.border,
    backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center',
  },
  checkBadgeSel: { backgroundColor: COLORS.greenBorder, borderColor: COLORS.greenBorder },
  checkMark: { fontSize: 10, fontWeight: '900', color: 'white' },

  allergenName: {
    fontSize: 13, fontWeight: '800', color: COLORS.ink,
    letterSpacing: -0.3, lineHeight: 17,
    paddingRight: 24,
  },
  allergenImage: {
    width: 52, height: 52,
    alignSelf: 'flex-end',
  },
  allergenEmoji: {
    fontSize: 32, textAlign: 'right',
    alignSelf: 'flex-end',
  },

  continueBtn: {
    height: 54, backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, marginHorizontal: 22,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },

  bottomRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginHorizontal: 22, marginTop: 10, marginBottom: 20,
  },
  bottomRowText: { fontSize: 13, fontWeight: '700', color: COLORS.inkMuted },
  skipText: { fontSize: 13, fontWeight: '700', color: COLORS.inkMuted },
});