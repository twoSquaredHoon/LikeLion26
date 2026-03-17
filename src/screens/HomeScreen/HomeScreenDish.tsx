import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = {
  red: '#FF3347',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
  green: '#22C55E',
};

// ─── Plate illustration ───────────────────────────────────────────────────────
const PlateIllustration = () => (
  <View style={styles.plateOuter}>
    <View style={styles.plateRim} />
    <View style={styles.plateInner}>
      <View style={[styles.food, { width: 48, height: 38, top: 10, left: 10, backgroundColor: '#B8562A', borderRadius: 28, borderWidth: 2.5, borderColor: 'rgba(0,0,0,0.2)' }]} />
      <View style={[styles.food, { width: 44, height: 34, top: 8, right: 8, backgroundColor: '#E8C87A', borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' }]} />
      <View style={[styles.food, { width: 40, height: 32, bottom: 14, left: 10, backgroundColor: '#F5D050', borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' }]} />
      <View style={[styles.food, { width: 36, height: 28, bottom: 12, right: 8, backgroundColor: '#FF8800', borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' }]} />
      <View style={[styles.food, { width: 24, height: 22, bottom: 36, alignSelf: 'center', left: 46, backgroundColor: '#FFD700', borderRadius: 999, borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' }]} />
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HomeScreenDish() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero card ── */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <Text style={styles.heroTag}>⭐ Best pick · High Protein Lean Bulk</Text>
            <View style={styles.loggedBadge}>
              <Text style={styles.loggedBadgeText}>Logged</Text>
            </View>
          </View>

          <Text style={styles.heroName}>Roasted Turkey{'\n'}Recovery</Text>

          <View style={styles.plateWrap}>
            <PlateIllustration />
          </View>

          <View style={styles.macroRow}>
            {[
              { val: '875',  label: 'kcal',    bg: '#FFE8EA', border: '#FF3347' },
              { val: '65g',  label: 'protein', bg: '#FFE0EE', border: '#FF6B9D' },
              { val: '98g',  label: 'carbs',   bg: '#FFF2DC', border: '#FF9F1C' },
              { val: '22g',  label: 'fats',    bg: '#D8F5F3', border: '#2EC4B6' },
            ].map((m, i) => (
              <View key={i} style={[styles.mpill, { backgroundColor: m.bg, borderColor: m.border }]}>
                <Text style={styles.mpillVal}>{m.val}</Text>
                <Text style={styles.mpillLabel}>{m.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Continue button ── */}
        <View style={styles.btnWrap}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Review')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.beige },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },

  heroCard: {
    marginHorizontal: 20, marginTop: 16,
    backgroundColor: '#FFBFC7',
    borderWidth: 3, borderColor: COLORS.border, borderRadius: 24,
    shadowColor: COLORS.border, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6,
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: 18, paddingTop: 14,
  },
  heroTag: {
    fontSize: 10, fontWeight: '700', letterSpacing: 0.6,
    textTransform: 'uppercase', color: COLORS.inkMuted, flex: 1,
  },
  loggedBadge: {
    backgroundColor: COLORS.green, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3,
    shadowColor: COLORS.border, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0,
  },
  loggedBadgeText: {
    fontSize: 10, fontWeight: '700', color: 'white',
    letterSpacing: 0.4, textTransform: 'uppercase',
  },
  heroName: {
    fontSize: 28, fontWeight: '900', color: COLORS.ink,
    letterSpacing: -0.8, lineHeight: 30,
    paddingHorizontal: 18, paddingTop: 8,
  },
  plateWrap: { alignItems: 'center', paddingVertical: 16 },

  plateOuter: {
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: '#F5EFE0', borderWidth: 4, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  plateRim: {
    position: 'absolute', top: 12, left: 12, right: 12, bottom: 12,
    borderRadius: 999, borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)', borderStyle: 'dashed',
  },
  plateInner: {
    width: 138, height: 138, borderRadius: 69,
    backgroundColor: '#EDE6D4', overflow: 'hidden', position: 'relative',
  },
  food: { position: 'absolute' },

  macroRow: { flexDirection: 'row', gap: 7, paddingHorizontal: 16, paddingBottom: 16 },
  mpill: {
    flex: 1, borderWidth: 2, borderRadius: 14,
    paddingVertical: 6, paddingHorizontal: 10, alignItems: 'center',
  },
  mpillVal: { fontSize: 15, fontWeight: '800', color: COLORS.ink, lineHeight: 18, marginBottom: 2 },
  mpillLabel: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4, color: COLORS.inkMuted },

  btnWrap: { paddingHorizontal: 20, paddingTop: 16 },
  btn: {
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.red, borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 16,
    shadowColor: COLORS.border, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6,
  },
  btnText: { fontSize: 16, fontWeight: '900', color: 'white', letterSpacing: -0.1 },
});