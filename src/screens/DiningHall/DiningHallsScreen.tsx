import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { C } from './theme';
import { SortOption, StatusType } from './types';
import { DINING_HALLS } from './data/diningHallsData';
// TODO: Replace DINING_HALLS import above with a TanStack Query hook:
//   const { data: halls } = useQuery({ queryKey: ['diningHalls'], queryFn: fetchDiningHalls })
//   where fetchDiningHalls → GET /api/dining-halls

import { DiningHallCard } from './components/DiningHallCard';
import { SortDropdown } from './components/SortDropdown';
import { styles } from './styles/DiningHallsScreen.styles';

export default function DiningHallsScreen() {
  const insets = useSafeAreaInsets();
  const [sortBy, setSortBy] = useState<SortOption>('Relevance');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const sortedHalls = [...DINING_HALLS].sort((a, b) => {
    if (sortBy === 'Open Now') {
      const rank = (s: StatusType) => (s === 'open' ? 0 : s === 'soon' ? 1 : 2);
      return rank(a.status) - rank(b.status);
    }
    if (sortBy === 'Closest') {
      // TODO: replace with real distance sort using device GPS
      // import * as Location from 'expo-location';
      // sort by haversine(userCoords, hall.coords)
      return Math.random() - 0.5;
    }
    return 0;
  });

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Dining Halls</Text>
        <Text style={styles.screenSubtitle}>6 locations on campus · Updated just now</Text>
        {/* TODO: replace subtitle with live "last fetched" timestamp from API response */}
      </View>

      {/* Sort trigger */}
      <View style={styles.sortRow}>
        <TouchableOpacity
          style={styles.sortTrigger}
          onPress={() => setDropdownVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.sortLabel}>Sorted by:</Text>
          <Text style={styles.sortValue}>{sortBy}</Text>
          <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
            <Path d="M2 4l4 4 4-4" stroke={C.inkMuted} strokeWidth={2} strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Sort dropdown modal */}
      <SortDropdown
        visible={dropdownVisible}
        current={sortBy}
        onSelect={setSortBy}
        onClose={() => setDropdownVisible(false)}
      />

      {/* Hall list */}
      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedHalls.map(hall => (
          <DiningHallCard key={hall.id} hall={hall} />
        ))}
      </ScrollView>
    </View>
  );
}