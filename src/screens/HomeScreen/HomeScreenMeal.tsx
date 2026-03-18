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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import SwipeableFoodItem from './components/SwipeableFoodItem';
import { INITIAL_ITEMS, FoodVariant } from './components/foodData';

const COLORS = {
  red: '#FF3347',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

export default function HomeScreenMeal() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [altIndices, setAltIndices] = React.useState<number[]>(INITIAL_ITEMS.map(() => 0));
  const [anyExpanded, setAnyExpanded] = React.useState(false);

  const handleSwap = (itemIndex: number, selectedAltIndex: number) => {
    setAltIndices(prev => {
      const next = [...prev];
      next[itemIndex] = selectedAltIndex;
      return next;
    });
  };

  const getCurrentItem = (i: number): FoodVariant => {
    const alt = altIndices[i];
    return alt === 0 ? INITIAL_ITEMS[i] : INITIAL_ITEMS[i].alternatives[alt - 1];
  };

  const totalKcal = INITIAL_ITEMS.reduce((sum, _, i) => sum + getCurrentItem(i).kcal, 0);

  const totalMacros = INITIAL_ITEMS.reduce(
    (acc, _, i) => {
      getCurrentItem(i).macros.forEach(m => { acc[m.type] += parseInt(m.value, 10); });
      return acc;
    },
    { p: 0, c: 0, f: 0 } as Record<'p' | 'c' | 'f', number>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.beige} />
        <View style={styles.container}>

          {/* ── Total row ── */}
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalKcal}>{totalKcal} kcal</Text>
            </View>
            <View style={styles.totalMacros}>
              {[
                { val: `${totalMacros.p}g`, label: 'Protein', color: '#FF9FBF' },
                { val: `${totalMacros.c}g`, label: 'Carbs',   color: '#FFD080' },
                { val: `${totalMacros.f}g`, label: 'Fats',    color: '#80E8E0' },
              ].map((m, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <View style={styles.totalSep} />}
                  <View style={styles.totalMacro}>
                    <Text style={[styles.totalMacroVal, { color: m.color }]}>{m.val}</Text>
                    <Text style={styles.totalMacroLabel}>{m.label}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* ── Food list ── */}
          <ScrollView
            style={styles.scrollBody}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            scrollEnabled={!anyExpanded}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>What's on the plate</Text>
              <Text style={styles.sectionHint}>← swipe to swap</Text>
            </View>

            {/* Overlay lives here as a sibling to swipeRow items so zIndex works */}
            <View style={styles.foodList}>
              {INITIAL_ITEMS.map((item, i) => (
                <SwipeableFoodItem
                  key={i}
                  item={item}
                  altIndex={altIndices[i]}
                  onSwap={(selectedAltIndex) => handleSwap(i, selectedAltIndex)}
                  onExpandChange={(open) => setAnyExpanded(open)}
                />
              ))}
              {anyExpanded && (
                <View style={styles.overlay} pointerEvents="none" />
              )}
            </View>

            {/* ── Log button ── */}
            <View style={styles.logBtnWrap}>
              <TouchableOpacity
                style={styles.logBtn}
                onPress={() => navigation.navigate('Confirm')}
                activeOpacity={0.85}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  <Path d="M12 5v14M5 12h14" stroke="white" strokeWidth={2.5} strokeLinecap="round" fill="none" />
                </Svg>
                <Text style={styles.logBtnText}>Log This Meal</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea:  { flex: 1, backgroundColor: COLORS.beige },
  container: { flex: 1, backgroundColor: COLORS.beige },

  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginHorizontal: 20, marginTop: 10,
    backgroundColor: COLORS.ink, borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  totalLabel: { fontSize: 12, fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.7 },
  totalKcal: { fontSize: 22, fontWeight: '900', color: 'white', letterSpacing: -0.6, lineHeight: 24 },
  totalMacros: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  totalSep: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.15)' },
  totalMacro: { alignItems: 'center' },
  totalMacroVal: { fontSize: 14, fontWeight: '800', lineHeight: 16 },
  totalMacroLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 2 },

  scrollBody: { flex: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: 10, paddingBottom: 8 },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: COLORS.ink, textTransform: 'uppercase', letterSpacing: 0.6 },
  sectionHint: { fontSize: 10, fontWeight: '600', color: COLORS.inkMuted },

  foodList: {
    paddingHorizontal: 20,
    gap: 7,
    position: 'relative',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 10, 10, 0.5)',
    zIndex: 10,
    borderRadius: 16,
  },

  logBtnWrap: { paddingHorizontal: 20, paddingTop: 8 },
  logBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: COLORS.red, borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 16,
    shadowColor: COLORS.border, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6,
  },
  logBtnText: { fontSize: 16, fontWeight: '900', color: 'white', letterSpacing: -0.1 },
});