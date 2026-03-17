import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
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
};

type DietScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Diet'>;
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
  orange: '#FF9F1C',
  teal: '#2EC4B6',
};

// ─── Diet Data ────────────────────────────────────────────────────────────────
type Diet = {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  shortDesc: string;
  desc: string;
  protein: number;
  carbs: number;
  fat: number;
  btnLabel: string;
};

const DIETS: Diet[] = [
  {
    id: 'balanced', emoji: '🥗',
    name: 'Balanced Diet', tagline: 'Well-rounded, everyday nutrition',
    shortDesc: 'Thoughtful, flexible portions',
    desc: 'A well-balanced diet for everyday health. Combines carbohydrates, protein, and fats in optimal proportions. Designed for sustainable and long-term nutrition.',
    protein: 25, carbs: 45, fat: 30, btnLabel: 'Select Balanced',
  },
  {
    id: 'highprotein', emoji: '🍗',
    name: 'High Protein Diet', tagline: 'Muscle support, high satiety',
    shortDesc: 'Build muscle, stay full longer',
    desc: 'A protein-focused diet to support muscle and recovery. Helps increase satisfaction and maintain lean body mass. Ideal for strength, fitness, and active lifestyles.',
    protein: 40, carbs: 35, fat: 25, btnLabel: 'Select High Protein',
  },
  {
    id: 'vegan', emoji: '🌱',
    name: 'Vegan Diet', tagline: 'Plant-based, nutrient-rich',
    shortDesc: '100% plant-based, balanced nutrition',
    desc: 'A fully plant-based diet with no animal products. Focused on whole foods like vegetables, fruits, legumes, and grains. Supports balanced nutrition with high fiber and essential nutrients.',
    protein: 15, carbs: 55, fat: 30, btnLabel: 'Select Vegan',
  },
  {
    id: 'vegetarian', emoji: '🥦',
    name: 'Vegetarian Diet', tagline: 'Plant-forward, flexible nutrition',
    shortDesc: 'Plant-based, complex carbs',
    desc: 'A plant-forward diet that includes dairy and eggs. Provides balanced nutrition with a variety of plant and animal-based foods. A flexible option for healthy everyday eating.',
    protein: 20, carbs: 50, fat: 30, btnLabel: 'Select Vegetarian',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DietScreen({ navigation }: DietScreenProps) {
  const [selected, setSelected]     = useState<string | null>(null);
  const [detailDiet, setDetailDiet] = useState<Diet | null>(null);

  const handleConfirm = () => {
    if (detailDiet) {
      setSelected(detailDiet.id);
      setTimeout(() => setDetailDiet(null), 400);
    }
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
          <View style={[styles.progressFill, { width: '64%' }]} />
        </View>
        <Text style={styles.progressLabel}>Step 7 of 11</Text>
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>Select your diet</Text>
        <Text style={styles.subtitle}>Which diet best fits your preference?</Text>
      </View>

      {/* ── List ── */}
      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
        {DIETS.map(diet => {
          const isSel = selected === diet.id;
          return (
            <TouchableOpacity
              key={diet.id}
              style={[styles.dietRow, isSel && styles.dietRowSelected]}
              onPress={() => setSelected(diet.id)}
              activeOpacity={0.85}
            >
              <Text style={styles.dietEmoji}>{diet.emoji}</Text>
              <View style={styles.dietInfo}>
                <Text style={styles.dietName}>{diet.name.replace(' Diet', '')}</Text>
                <Text style={styles.dietDesc}>{diet.shortDesc}</Text>
                <TouchableOpacity onPress={() => setDetailDiet(diet)} activeOpacity={0.7}>
                  <Text style={styles.viewLink}>View diet →</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.checkBadge, isSel && styles.checkBadgeSel]}>
                {isSel && <Text style={styles.checkMark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Continue ── */}
      <TouchableOpacity
        style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
        onPress={() => selected && navigation.navigate('Dislikes')}
        disabled={!selected}
        activeOpacity={0.85}
      >
        <Text style={styles.continueBtnText}>Continue →</Text>
      </TouchableOpacity>

      {/* ── Detail Modal ── */}
      <Modal visible={!!detailDiet} animationType="slide" onRequestClose={() => setDetailDiet(null)}>
        {detailDiet && (
          <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.backBtn} onPress={() => setDetailDiet(null)} activeOpacity={0.7}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>

            <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
              <Text style={styles.detailEmoji}>{detailDiet.emoji}</Text>

              <View style={styles.detailCard}>
                <Text style={styles.detailName}>{detailDiet.name}</Text>
                <Text style={styles.detailTagline}>{detailDiet.tagline}</Text>

                {/* Macro Bar */}
                <View style={styles.macroBar}>
                  <View style={[styles.macroSeg, { backgroundColor: COLORS.red,    flex: detailDiet.protein }]} />
                  <View style={[styles.macroSeg, { backgroundColor: COLORS.orange, flex: detailDiet.carbs }]} />
                  <View style={[styles.macroSeg, { backgroundColor: COLORS.teal,   flex: detailDiet.fat }]} />
                </View>
                <View style={styles.macroLabels}>
                  {[
                    { color: COLORS.red,    label: `${detailDiet.protein}% Protein` },
                    { color: COLORS.orange, label: `${detailDiet.carbs}% Carbs` },
                    { color: COLORS.teal,   label: `${detailDiet.fat}% Fat` },
                  ].map(m => (
                    <View key={m.label} style={styles.macroLabelItem}>
                      <View style={[styles.macroLabelDot, { backgroundColor: m.color }]} />
                      <Text style={styles.macroLabelText}>{m.label}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.detailDivider} />
                <Text style={styles.detailDesc}>{detailDiet.desc}</Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.continueBtn, selected === detailDiet.id && styles.continueBtnGreen]}
              onPress={handleConfirm}
              activeOpacity={0.85}
            >
              <Text style={styles.continueBtnText}>
                {selected === detailDiet.id
                  ? `✓ ${detailDiet.name.replace(' Diet', '')} Selected`
                  : detailDiet.btnLabel}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </Modal>

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
  progressTrack: { height: 6, backgroundColor: 'rgba(42,26,26,0.1)', borderRadius: 6, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.red, borderRadius: 6 },
  progressLabel: { fontSize: 10, fontWeight: '700', color: COLORS.inkMuted, textAlign: 'right', marginTop: 4 },

  header: { paddingHorizontal: 22, marginTop: 20 },
  title: { fontSize: 26, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 4 },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted },

  scrollBody: { flex: 1, paddingHorizontal: 22, marginTop: 14 },

  dietRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, padding: 14, marginBottom: 10,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  dietRowSelected: { backgroundColor: COLORS.greenSelected, borderColor: COLORS.greenBorder },
  dietEmoji: { fontSize: 40, width: 52, textAlign: 'center' },
  dietInfo: { flex: 1 },
  dietName: { fontSize: 15, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.3, marginBottom: 2 },
  dietDesc: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted, marginBottom: 5 },
  viewLink: { fontSize: 11, fontWeight: '800', color: COLORS.red },

  checkBadge: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: COLORS.border,
    backgroundColor: COLORS.beige,
    alignItems: 'center', justifyContent: 'center',
  },
  checkBadgeSel: { backgroundColor: COLORS.greenBorder, borderColor: COLORS.greenBorder },
  checkMark: { fontSize: 11, fontWeight: '900', color: 'white' },

  continueBtn: {
    height: 54, backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, marginHorizontal: 22, marginBottom: 8,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnDisabled: { opacity: 0.4 },
  continueBtnGreen: { backgroundColor: COLORS.green },
  continueBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },

  // Detail
  detailEmoji: { fontSize: 90, textAlign: 'center', marginBottom: 16 },
  detailCard: {
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 24, padding: 20,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  detailName: { fontSize: 22, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 4 },
  detailTagline: { fontSize: 12, fontWeight: '600', color: COLORS.inkMuted, marginBottom: 16 },
  macroBar: {
    height: 10, borderRadius: 8, borderWidth: 2, borderColor: COLORS.border,
    overflow: 'hidden', flexDirection: 'row', marginBottom: 8,
  },
  macroSeg: { height: '100%' },
  macroLabels: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  macroLabelItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  macroLabelDot: { width: 8, height: 8, borderRadius: 2 },
  macroLabelText: { fontSize: 9, fontWeight: '700', color: COLORS.inkMuted },
  detailDivider: { height: 1.5, backgroundColor: 'rgba(42,26,26,0.08)', marginVertical: 14 },
  detailDesc: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 22 },    
});