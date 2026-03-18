import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FoodVariant } from './foodData';

export const MACRO_TAG_COLORS = { p: '#FF6B9D', c: '#FF9F1C', f: '#2EC4B6' };

const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

export default function FoodCard({
  item,
  isActive = false,
  onPress,
}: {
  item: FoodVariant;
  isActive?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.72 : 1}
      style={[styles.foodItem, isActive && styles.foodItemActive]}
    >
      <View style={[styles.foodDot, { backgroundColor: item.dotBg, borderColor: item.dotBorder }]}>
        <View style={[styles.foodDotBlob, { backgroundColor: item.blobColor, ...item.blobStyle }]} />
      </View>
      <View style={styles.foodItemInfo}>
        <Text style={styles.foodItemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.foodItemSub}>{item.sub}</Text>
      </View>
      <View style={styles.foodItemRight}>
        <Text style={styles.foodKcal}>{item.kcal} kcal</Text>
        <View style={styles.foodMacros}>
          {item.macros.map((m, j) => (
            <View key={j} style={[styles.fmacro, { backgroundColor: MACRO_TAG_COLORS[m.type] }]}>
              <Text style={styles.fmacroText}>{m.value} {m.label}</Text>
            </View>
          ))}
        </View>
      </View>
      {isActive && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 16, paddingHorizontal: 12, paddingVertical: 9,
    shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3,
  },
  foodItemActive: {
    backgroundColor: COLORS.redLight,
    borderColor: COLORS.red,
  },
  activeDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.red, flexShrink: 0,
  },
  foodDot: { width: 40, height: 40, borderRadius: 14, borderWidth: 2.5, alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' },
  foodDotBlob: { position: 'absolute' },
  foodItemInfo: { flex: 1, minWidth: 0 },
  foodItemName: { fontSize: 13, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.1, marginBottom: 3 },
  foodItemSub: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted },
  foodItemRight: { alignItems: 'flex-end', gap: 4, flexShrink: 0 },
  foodKcal: { fontSize: 13, fontWeight: '800', color: COLORS.ink, letterSpacing: -0.1 },
  foodMacros: { flexDirection: 'row', gap: 5 },
  fmacro: { borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  fmacroText: { fontSize: 10, fontWeight: '700', color: 'white', letterSpacing: 0.2 },
});