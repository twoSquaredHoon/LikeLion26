import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
};

type GenderScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Gender'>;
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

const GENDERS = [
  { id: 'male',   label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other',  label: 'Other' },
  { id: 'prefer', label: 'Prefer Not To Say' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function GenderScreen({ navigation }: GenderScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);

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
          <View style={[styles.progressFill, { width: '30%' }]} />
        </View>
        <Text style={styles.progressLabel}>Step 3 of 11</Text>
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>What is your gender?</Text>
        <Text style={styles.subtitle}>
          We use this to better estimate your calorie needs
        </Text>
      </View>

      {/* ── Gender Grid ── */}
      <View style={styles.grid}>
        {GENDERS.map((g) => {
          const isSelected = selected === g.id;
          return (
            <TouchableOpacity
              key={g.id}
              style={[styles.genderBtn, isSelected && styles.genderBtnSelected]}
              onPress={() => setSelected(g.id)}
              activeOpacity={0.85}
            >
              {/* Check badge */}
              <View style={[styles.checkBadge, isSelected && styles.checkBadgeSelected]}>
                {isSelected && <Text style={styles.checkMark}>✓</Text>}
              </View>

              {/* Label */}
              <Text style={[styles.genderLabel, isSelected && styles.genderLabelSelected]}>
                {g.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Spacer ── */}
      <View style={{ flex: 1 }} />

      {/* ── Continue Button ── */}
      <TouchableOpacity
        style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
        onPress={() => selected && navigation.navigate('Height')}
        activeOpacity={0.85}
        disabled={!selected}
      >
        <Text style={styles.continueBtnText}>Continue →</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },

  // Back Button
  backBtn: {
    alignSelf: 'flex-start',
    marginTop: 14, marginLeft: 22,
    paddingVertical: 8, paddingHorizontal: 14,
    backgroundColor: COLORS.bg2,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 12,
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
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
    height: '100%',
    backgroundColor: COLORS.red,
    borderRadius: 6,
  },
  progressLabel: {
    fontSize: 10, fontWeight: '700',
    color: COLORS.inkMuted, textAlign: 'right', marginTop: 4,
  },

  // Header
  header: { paddingHorizontal: 22, marginTop: 22 },
  title: {
    fontSize: 26, fontWeight: '900', color: COLORS.ink,
    letterSpacing: -0.8, marginBottom: 8,
  },
  subtitle: {
    fontSize: 13, fontWeight: '500',
    color: COLORS.inkMuted, lineHeight: 20,
  },

  // Gender Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 22,
    marginTop: 22,
  },
  genderBtn: {
    width: '47%',
    minHeight: 100,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'flex-end',
    position: 'relative',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  genderBtnSelected: {
    backgroundColor: COLORS.greenSelected,
    borderColor: COLORS.greenBorder,
  },

  // Check Badge
  checkBadge: {
    position: 'absolute',
    top: 12, right: 12,
    width: 22, height: 22,
    borderRadius: 11,
    borderWidth: 2, borderColor: COLORS.border,
    backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center',
  },
  checkBadgeSelected: {
    backgroundColor: COLORS.greenBorder,
    borderColor: COLORS.greenBorder,
  },
  checkMark: {
    fontSize: 11, fontWeight: '900', color: 'white',
  },

  // Label
  genderLabel: {
    fontSize: 15, fontWeight: '800',
    color: COLORS.ink, letterSpacing: -0.3,
  },
  genderLabelSelected: {
    color: COLORS.ink,
  },

  // Continue Button
  continueBtn: {
    height: 54,
    backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18,
    marginHorizontal: 22, marginBottom: 8,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnDisabled: { opacity: 0.4 },
  continueBtnText: {
    fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3,
  },
});