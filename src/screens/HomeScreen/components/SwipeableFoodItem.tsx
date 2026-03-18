import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import FoodCard from './FoodCard';
import { FoodItem, FoodVariant } from './foodData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 3;

const COLORS = {
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

export default function SwipeableFoodItem({
  item,
  altIndex,
  onSwap,
  onExpandChange,
}: {
  item: FoodItem;
  altIndex: number;
  onSwap: (selectedAltIndex: number) => void;
  onExpandChange?: (open: boolean) => void;
}) {
  const current: FoodVariant = altIndex === 0 ? item : item.alternatives[altIndex - 1];
  const [expanded, setExpanded] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;

  const openPicker = () => {
    setExpanded(true);
    onExpandChange?.(true);
    Animated.spring(expandAnim, { toValue: 1, useNativeDriver: true, bounciness: 4 }).start();
  };

  const closePicker = () => {
    onExpandChange?.(false);
    Animated.timing(expandAnim, { toValue: 0, duration: 180, useNativeDriver: true })
      .start(() => setExpanded(false));
  };

  const snapBack = () => {
    Animated.spring(translateX, { toValue: 0, useNativeDriver: true, bounciness: 10 }).start();
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .failOffsetY([-8, 8])
    .runOnJS(true)
    .onUpdate((e) => {
      if (e.translationX < 0) translateX.setValue(e.translationX * 0.3);
    })
    .onEnd((e) => {
      snapBack();
      if (e.translationX < -SWIPE_THRESHOLD) openPicker();
    })
    .onFinalize(() => snapBack());

  const allOptions: FoodVariant[] = [item, ...item.alternatives];

  return (
    // When expanded, zIndex 30 lifts this row above the overlay (zIndex 10)
    // When not expanded, zIndex 0 so it sits beneath the overlay
    <View style={[styles.swipeRow, expanded && styles.swipeRowExpanded]}>
      <GestureDetector gesture={pan}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <FoodCard item={current} />
        </Animated.View>
      </GestureDetector>

      {expanded && (
        <Animated.View
          style={[
            styles.pickerWrap,
            {
              opacity: expandAnim,
              transform: [{
                translateY: expandAnim.interpolate({ inputRange: [0, 1], outputRange: [-6, 0] }),
              }],
            },
          ]}
        >
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>Choose an alternative</Text>
            <TouchableOpacity
              onPress={closePicker}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.pickerClose}>✕</Text>
            </TouchableOpacity>
          </View>
          {allOptions.map((opt, idx) => (
            <FoodCard
              key={idx}
              item={opt}
              isActive={idx === altIndex}
              onPress={() => { onSwap(idx); closePicker(); }}
            />
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  swipeRow: {
    gap: 6,
    zIndex: 0,
  },
  swipeRowExpanded: {
    zIndex: 30,
    elevation: 30,
  },
  pickerWrap: {
    backgroundColor: COLORS.beige,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, padding: 10, gap: 6,
    shadowColor: COLORS.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0,
    elevation: 30,
    zIndex: 30,
  },
  pickerHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 2, paddingBottom: 6,
  },
  pickerTitle: { fontSize: 11, fontWeight: '800', color: COLORS.inkMuted, textTransform: 'uppercase', letterSpacing: 0.7 },
  pickerClose: { fontSize: 14, fontWeight: '700', color: COLORS.inkMuted },
});