import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

const COLORS = {
  ink: '#1A0A0A',
  inkMuted: '#A06030',
  border: '#2A1A0A',
  bg: '#FFF4DC',
};

const MEAL_OPTIONS = [
  { emoji: '🍳', name: 'Scrambled Eggs & Toast', cardBg: '#FFF9F0', iconBg: '#FFF3DC', iconBorder: '#C8A800' },
  { emoji: '🥞', name: 'Pancakes & Syrup',        cardBg: '#FFF9E0', iconBg: '#FFF3DC', iconBorder: '#C8A800' },
  { emoji: '🥑', name: 'Avocado Toast',            cardBg: '#F0FFF6', iconBg: '#DCFCE7', iconBorder: '#16A34A' },
  { emoji: '🥣', name: 'Greek Yogurt Parfait',     cardBg: '#FFF5F0', iconBg: '#FFE8DC', iconBorder: '#C86030' },
];

const QUICK_ADDONS = [
  { emoji: '🍌', name: 'Banana' },
  { emoji: '☕', name: 'Latte' },
  { emoji: '🧃', name: 'Orange Juice' },
  { emoji: '🍞', name: 'Toast Slice' },
];

export default function HomeScreenReview() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFD166" />
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.pageHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pageTitle}>Eat anything{'\n'}else at breakfast?</Text>
            <Text style={styles.pageSub}>We'll add it to this morning's totals ☀️</Text>
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.popToTop()}
            activeOpacity={0.8}
          >
            <Svg width={14} height={14} viewBox="0 0 24 24">
              <Path
                d="M18 6L6 18M6 6l12 12"
                stroke={COLORS.ink}
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollBody}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* 2-column grid */}
          <View style={styles.optionsGrid}>
            {MEAL_OPTIONS.map((opt, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.optionCard, { backgroundColor: opt.cardBg }]}
                activeOpacity={0.85}
              >
                <View style={[styles.optionIcon, { backgroundColor: opt.iconBg, borderColor: opt.iconBorder }]}>
                  <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                </View>
                <Text style={styles.optionName}>{opt.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick add-ons */}
          <Text style={styles.sectionLabel}>Quick Add-ons</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.snacksRow}
          >
            {QUICK_ADDONS.map((snack, i) => (
              <TouchableOpacity
                key={i}
                style={styles.snackChip}
                activeOpacity={0.85}
              >
                <Text style={styles.snackEmoji}>{snack.emoji}</Text>
                <Text style={styles.snackChipName}>{snack.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFD166',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.bg,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#E8400A',
    letterSpacing: -0.7,
    lineHeight: 30,
    marginBottom: 4,
  },
  pageSub: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.inkMuted,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    marginTop: 2,
    flexShrink: 0,
    backgroundColor: 'rgba(255, 200, 80, 0.5)',
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  scrollBody: {
    flex: 1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  optionCard: {
    width: '47.5%',
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 10,
    shadowColor: COLORS.border,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionEmoji: {
    fontSize: 26,
  },
  optionName: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.2,
    lineHeight: 18,
    textAlign: 'center',
  },
  sectionLabel: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  snacksRow: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  snackChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    shadowColor: COLORS.border,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  snackEmoji: {
    fontSize: 16,
  },
  snackChipName: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink,
    lineHeight: 16,
  },
});