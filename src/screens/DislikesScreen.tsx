import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
};

type DislikesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Dislikes'>;
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

// ─── Category Data ────────────────────────────────────────────────────────────
type Category = {
  id: string;
  emoji: string;
  name: string;
  items: string[];
};

const CATEGORIES: Category[] = [
  {
    id: 'veg', emoji: '🥦', name: 'Vegetables',
    items: ['Broccoli', 'Mushroom', 'Eggplant', 'Garlic', 'Bell Peppers', 'Onions', 'Brussels sprouts'],
  },
  {
    id: 'pro', emoji: '🍖', name: 'Proteins',
    items: ['Chicken', 'Beef', 'Pork', 'Fish', 'Eggs', 'Tofu', 'Greek Yogurt', 'Beans / Legumes'],
  },
  {
    id: 'dai', emoji: '🥛', name: 'Dairy',
    items: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream'],
  },
  {
    id: 'her', emoji: '🌿', name: 'Herbs & Spices',
    items: ['Cilantro', 'Ginger', 'Spicy food / Chili', 'Basil', 'Parsley', 'Mint', 'Green Onions'],
  },
  {
    id: 'gra', emoji: '🌾', name: 'Grains & Carbs',
    items: ['White Rice', 'Bread', 'Pasta', 'Oats', 'Quinoa'],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DislikesScreen({ navigation }: DislikesScreenProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  const countForCategory = (cat: Category) =>
    cat.items.filter(item => selected.has(item)).length;

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Back Button ── */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      {/* ── Progress ── */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '73%' }]} />
        </View>
        <Text style={styles.progressLabel}>Step 8 of 11</Text>
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>Dislikes</Text>
        <Text style={styles.subtitle}>Select any ingredients you'd like to avoid.</Text>
      </View>

      {/* ── Scroll Body ── */}
      <ScrollView
        style={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {CATEGORIES.map(cat => {
          const count = countForCategory(cat);
          return (
            <View key={cat.id} style={styles.categoryCard}>

              {/* Category Header */}
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={styles.categoryName}>{cat.name}</Text>
                {count > 0 && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{count} selected</Text>
                  </View>
                )}
              </View>

              {/* Tags */}
              <View style={styles.tagsWrap}>
                {cat.items.map(item => {
                  const isSel = selected.has(item);
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[styles.tag, isSel && styles.tagSelected]}
                      onPress={() => toggleItem(item)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.tagText, isSel && styles.tagTextSelected]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

            </View>
          );
        })}
      </ScrollView>

      {/* ── Bottom ── */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('Allergens')}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>Continue →</Text>
        </TouchableOpacity>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.backRowText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Allergens')} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
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
  progressTrack: { height: 6, backgroundColor: 'rgba(42,26,26,0.1)', borderRadius: 6, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.red, borderRadius: 6 },
  progressLabel: { fontSize: 10, fontWeight: '700', color: COLORS.inkMuted, textAlign: 'right', marginTop: 4 },

  header: { paddingHorizontal: 22, marginTop: 20 },
  title: { fontSize: 26, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.8, marginBottom: 4 },
  subtitle: { fontSize: 13, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 20 },

  scrollBody: { flex: 1, paddingHorizontal: 22, marginTop: 14 },

  // Category Card
  categoryCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 20, padding: 14,
    marginBottom: 12,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  categoryHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12,
  },
  categoryEmoji: { fontSize: 18 },
  categoryName: { fontSize: 14, fontWeight: '900', color: COLORS.ink, letterSpacing: -0.3, flex: 1 },
  countBadge: {
    backgroundColor: COLORS.red, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 2, paddingHorizontal: 10,
  },
  countBadgeText: { fontSize: 10, fontWeight: '800', color: 'white' },

  // Tags
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  tag: {
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, backgroundColor: COLORS.beige,
    shadowColor: COLORS.border, shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 2,
  },
  tagSelected: {
    backgroundColor: COLORS.greenSelected,
    borderColor: COLORS.greenBorder,
  },
  tagText: { fontSize: 11, fontWeight: '700', color: COLORS.ink },
  tagTextSelected: { color: COLORS.ink },

  // Bottom
  bottomSection: { paddingHorizontal: 22, paddingBottom: 20, paddingTop: 12 },
  continueBtn: {
    height: 54, backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  continueBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  backRowText: { fontSize: 13, fontWeight: '700', color: COLORS.inkMuted },
  skipText: { fontSize: 13, fontWeight: '700', color: COLORS.inkMuted },
});