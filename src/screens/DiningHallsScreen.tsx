import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Platform,
  Linking,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Theme ────────────────────────────────────────────────────────────────────

const C = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg: '#F5ECD7',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  green: '#22C55E',
  greenLight: '#DCFCE7',
  yellow: '#FF9F1C',
  yellowLight: '#FFF2DC',
  menuItem: '#FFF0F0',
  categoryLine: '#F0E0E0',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusType = 'open' | 'soon' | 'closed';
type SortOption = 'Relevance' | 'Open Now' | 'Closest';
type MealType = 'breakfast' | 'lunch' | 'dinner';

interface MenuItem {
  name: string;
  starred?: boolean;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface MealMenu {
  count: number;
  categories: MenuCategory[];
}

interface DiningHall {
  id: string;
  name: string;
  emoji: string;
  emojiBg: string;
  status: StatusType;
  hours: string;
  aiPickLabel: string;
  aiPickName: string;
  closedNote?: string;
  mapsUrl: string;
  menus: Record<MealType, MealMenu>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DINING_HALLS: DiningHall[] = [
  {
    id: 'gordon',
    name: 'Gordon Avenue Market',
    emoji: '🏛️',
    emojiBg: '#FFE8D6',
    status: 'open',
    hours: 'Closes 8:00 PM',
    aiPickLabel: 'AI Pick · High Protein',
    aiPickName: 'Roasted Turkey Recovery',
    mapsUrl: 'https://www.google.com/maps/place/Gordon+Dining+and+Event+Center/@43.0711999,-89.4011868,16z/data=!3m1!4b1!4m6!3m5!1s0x8807acccaa79ac4b:0xc41dfe34820883a9!8m2!3d43.071196!4d-89.3986119!16s%2Fg%2F11b7r6fxl7?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D',
    menus: {
      breakfast: {
        count: 8,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Scrambled Eggs' },
              { name: 'Hard Cooked Eggs' },
              { name: 'Waffles', starred: true },
              { name: 'French Toast' },
            ],
          },
          {
            category: 'Sides',
            items: [{ name: 'Hashbrown' }, { name: 'Bacon' }],
          },
          {
            category: 'Buckingham Bakery',
            items: [{ name: 'Donuts' }, { name: 'Chocolate Muffin' }],
          },
        ],
      },
      lunch: {
        count: 5,
        categories: [
          {
            category: 'Entree',
            items: [{ name: 'BBQ Pulled Chicken' }, { name: 'Veggie Burger' }],
          },
          {
            category: 'Sides',
            items: [
              { name: 'Brown Rice', starred: true },
              { name: 'Sweet Corn' },
              { name: 'Garden Salad' },
            ],
          },
        ],
      },
      dinner: {
        count: 5,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Roasted Turkey Breast', starred: true },
              { name: 'Herb Roasted Salmon' },
            ],
          },
          {
            category: 'Sides',
            items: [
              { name: 'Roasted Baby Potatoes' },
              { name: 'Honey Glazed Carrots' },
              { name: 'Lemon Blueberry Cake' },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'rheta',
    name: "Rheta's Market",
    emoji: '🍜',
    emojiBg: '#E8F4FF',
    status: 'open',
    hours: 'Closes 9:00 PM',
    aiPickLabel: 'AI Pick · Balanced Meal',
    aiPickName: 'Giardiniera Chicken Pasta',
    mapsUrl: 'https://www.google.com/maps/place/Rheta\'s+Market/@43.073974,-89.404274,16z/data=!3m1!4b1!4m6!3m5!1s0x8807acca4b2a8c4b:0x8769af98847c0415!8m2!3d43.0739701!4d-89.4016991!16s%2Fg%2F11c58twwd0?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D',
    menus: {
      breakfast: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Breakfast Burrito' },
              { name: 'Oatmeal' },
              { name: 'Yogurt Parfait' },
              { name: 'Bagel & Cream Cheese' },
            ],
          },
        ],
      },
      lunch: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Grilled Chicken' },
              { name: 'Giardiniera Pasta' },
              { name: 'Dinner Roll' },
              { name: 'Sweet Corn' },
            ],
          },
        ],
      },
      dinner: {
        count: 3,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Pad Thai', starred: true },
              { name: 'Miso Soup' },
              { name: 'Edamame' },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'liz',
    name: "Liz's Market",
    emoji: '🥗',
    emojiBg: '#E8FFE8',
    status: 'soon',
    hours: 'Closes 2:30 PM',
    aiPickLabel: 'AI Pick · Lean & Clean',
    aiPickName: 'Atlantic Salmon Power Bowl',
    mapsUrl: 'https://www.google.com/maps/place/Liz\'s+Market/@43.0767289,-89.4095358,16z/data=!3m1!4b1!4m6!3m5!1s0x8807adcdda80c29d:0xe3f83313cf2d6a59!8m2!3d43.076725!4d-89.4069609!16s%2Fg%2F12ml2vlyd?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D',
    menus: {
      breakfast: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Acai Bowl' },
              { name: 'Avocado Toast', starred: true },
              { name: 'Granola & Berries' },
              { name: 'Smoothie' },
            ],
          },
        ],
      },
      lunch: {
        count: 5,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Atlantic Salmon' },
              { name: 'Tofu Stir Fry' },
              { name: 'Quinoa', starred: true },
              { name: 'Steamed Broccoli' },
            ],
          },
        ],
      },
      dinner: {
        count: 2,
        categories: [
          {
            category: 'Entree',
            items: [{ name: 'Poke Bowl' }, { name: 'Veggie Sushi Roll' }],
          },
        ],
      },
    },
  },
  {
    id: 'fourlakes',
    name: 'Four Lakes Market',
    emoji: '🏔️',
    emojiBg: '#E8F0FF',
    status: 'open',
    hours: 'Closes 7:30 PM',
    aiPickLabel: 'AI Pick · Comfort Fuel',
    aiPickName: 'Beef Stew & Sourdough',
    mapsUrl: 'https://www.google.com/maps/place/Four+Lakes+Market/@43.0777477,-89.4203371,17z/data=!3m1!4b1!4m6!3m5!1s0x8807ac9566b34807:0x16e0208ca98cbfa!8m2!3d43.0777438!4d-89.4177622!16s%2Fg%2F11bc7ryb0g?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D',
    menus: {
      breakfast: {
        count: 3,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Pancakes' },
              { name: 'Biscuits & Gravy' },
              { name: 'Fruit Cup' },
            ],
          },
        ],
      },
      lunch: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Mac & Cheese' },
              { name: 'Chicken Sandwich' },
              { name: 'Sourdough Bread' },
              { name: 'Coleslaw' },
            ],
          },
        ],
      },
      dinner: {
        count: 3,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Hearty Beef Stew' },
              { name: 'Lentil Soup' },
              { name: 'Sourdough Bread' },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'carson',
    name: "Carson's Market",
    emoji: '🌮',
    emojiBg: '#FFF0E8',
    status: 'closed',
    hours: 'Opens 5:00 PM',
    aiPickLabel: 'AI Pick · Bold Flavors',
    aiPickName: 'Taco Night Combo',
    closedNote: 'Closed · Opens today at 5:00 PM',
    mapsUrl: 'https://www.google.com/maps/place/Carson\'s+Market/@43.0767289,-89.4095358,16z/data=!4m6!3m5!1s0x8807acb895b5c825:0x560f53526b34c7b0!8m2!3d43.0771572!4d-89.4113975!16s%2Fg%2F1q6cn9qrx?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D',
    menus: {
      breakfast: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Huevos Rancheros' },
              { name: 'Breakfast Quesadilla' },
              { name: 'Chilaquiles' },
              { name: 'Refried Beans' },
            ],
          },
        ],
      },
      lunch: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Chicken Burrito Bowl' },
              { name: 'Veggie Tacos' },
              { name: 'Spanish Rice' },
              { name: 'Black Bean Salad' },
            ],
          },
        ],
      },
      dinner: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Carne Asada Tacos', starred: true },
              { name: 'Enchiladas' },
              { name: 'Elote Corn' },
              { name: 'Guacamole & Chips' },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'lowell',
    name: 'Lowell Market',
    emoji: '🌿',
    emojiBg: '#F5E8FF',
    status: 'closed',
    hours: 'Opens 11:00 AM',
    aiPickLabel: 'AI Pick · Plant Based',
    aiPickName: 'Garden Power Bowl',
    closedNote: 'Closed · Opens tomorrow at 11:00 AM',
    mapsUrl: 'https://www.google.com/maps/place/Lowell+Market/@43.0762606,-89.3983387,17z/data=!3m1!4b1!4m6!3m5!1s0x88065319694f98ad:0xcc0cdb26603e741a!8m2!3d43.0762567!4d-89.3957638!16s%2Fg%2F11rrrmprcf?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D',
    menus: {
      breakfast: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Veggie Omelette' },
              { name: 'Steel Cut Oatmeal' },
              { name: 'Fresh Fruit Bowl' },
              { name: 'Whole Grain Toast' },
            ],
          },
        ],
      },
      lunch: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Falafel Wrap' },
              { name: 'Lentil Soup', starred: true },
              { name: 'Roasted Beets' },
              { name: 'Hummus & Pita' },
            ],
          },
        ],
      },
      dinner: {
        count: 4,
        categories: [
          {
            category: 'Entree',
            items: [
              { name: 'Garden Power Bowl' },
              { name: 'Stuffed Bell Peppers' },
              { name: 'Wild Rice Pilaf' },
              { name: 'Roasted Cauliflower' },
            ],
          },
        ],
      },
    },
  },
];

const SORT_OPTIONS: SortOption[] = ['Relevance', 'Open Now', 'Closest'];

// ─── Small reusable components ────────────────────────────────────────────────

const ChevronIcon = ({ color = C.inkMuted }: { color?: string }) => (
  <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
    <Path d="M2 3.5l3 3 3-3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const ArrowRightIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="white" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill={filled ? '#FF9F1C' : 'none'}>
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
      stroke={filled ? '#CC6600' : C.inkMuted}
      strokeWidth={1.8}
    />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
    <Path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// ─── MenuItem row ─────────────────────────────────────────────────────────────

const MenuItemCard = ({
  name,
  initialStarred = false,
}: {
  name: string;
  initialStarred?: boolean;
}) => {
  const [starred, setStarred] = useState(initialStarred);

  return (
    <View style={styles.menuItem}>
      <TouchableOpacity
        style={[styles.starBtn, starred && styles.starBtnStarred]}
        onPress={() => setStarred(s => !s)}
        activeOpacity={0.7}
      >
        <StarIcon filled={starred} />
      </TouchableOpacity>
      <Text style={styles.menuItemName}>{name}</Text>
    </View>
  );
};

// ─── Menu category section ────────────────────────────────────────────────────

const MenuCategorySection = ({ category, items }: MenuCategory) => (
  <View>
    <View style={styles.categoryHeader}>
      <View style={styles.categoryLine} />
      <Text style={styles.categoryName}>{category.toUpperCase()}</Text>
      <View style={styles.categoryLine} />
    </View>
    <View style={styles.menuGrid}>
      {items.map((item, i) => (
        <MenuItemCard key={i} name={item.name} initialStarred={item.starred} />
      ))}
    </View>
  </View>
);

// ─── Meal pane ────────────────────────────────────────────────────────────────

const MealPane = ({
  meal,
  menu,
}: {
  meal: MealType;
  menu: MealMenu;
}) => (
  <View>
    <View style={styles.menuSectionLabel}>
      <Text style={styles.menuSectionTitle}>
        {meal.charAt(0).toUpperCase() + meal.slice(1)} Menu
      </Text>
      <Text style={styles.menuCount}>{menu.count} items</Text>
    </View>
    <View style={styles.menuItems}>
      {menu.categories.map((cat, i) => (
        <MenuCategorySection key={i} {...cat} />
      ))}
    </View>
  </View>
);

// ─── Status badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: StatusType }) => {
  const badgeStyle =
    status === 'open'
      ? styles.badgeOpen
      : status === 'soon'
      ? styles.badgeSoon
      : styles.badgeClosed;
  const dotStyle =
    status === 'open'
      ? styles.dotOpen
      : status === 'soon'
      ? styles.dotSoon
      : styles.dotClosed;
  const textStyle =
    status === 'open'
      ? styles.badgeTextOpen
      : status === 'soon'
      ? styles.badgeTextSoon
      : styles.badgeTextClosed;
  const label = status === 'open' ? 'Open' : status === 'soon' ? 'Closes Soon' : 'Closed';

  return (
    <View style={[styles.statusBadge, badgeStyle]}>
      <View style={[styles.statusDot, dotStyle]} />
      <Text style={[styles.statusBadgeText, textStyle]}>{label}</Text>
    </View>
  );
};

// ─── Dining Hall Card ─────────────────────────────────────────────────────────

const DiningHallCard = ({ hall }: { hall: DiningHall }) => {
  const [expanded, setExpanded] = useState(hall.id === 'gordon');
  const [activeMeal, setActiveMeal] = useState<MealType>('breakfast');
  const rotateAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(rotateAnim, {
      toValue,
      duration: 280,
      useNativeDriver: true,
    }).start();
    setExpanded(e => !e);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const MEALS: MealType[] = ['breakfast', 'lunch', 'dinner'];

  return (
    <View style={styles.hallCard}>
      {/* Header row */}
      <TouchableOpacity style={styles.hallHeader} onPress={toggleExpand} activeOpacity={0.8}>
        <View style={[styles.hallEmojiWrap, { backgroundColor: hall.emojiBg }]}>
          <Text style={styles.hallEmoji}>{hall.emoji}</Text>
        </View>

        <View style={styles.hallInfo}>
          <Text style={styles.hallName} numberOfLines={1}>{hall.name}</Text>
          <View style={styles.hallMeta}>
            <StatusBadge status={hall.status} />
            <Text style={styles.hallHours}>{hall.hours}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL(hall.mapsUrl)}
            activeOpacity={0.7}
            style={styles.locationBtn}
          >
            <Text style={styles.locationBtnText}>📍 See Location</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hallRight}>
          <Animated.View style={[styles.hallChevron, { transform: [{ rotate }] }]}>
            <ChevronIcon />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Expanded content */}
      {expanded && (
        <View style={styles.hallExpandInner}>
          {/* Closed note */}
          {hall.closedNote && (
            <View style={styles.closedNote}>
              <Text style={styles.closedNoteText}>🔒  {hall.closedNote}</Text>
            </View>
          )}

          {/* AI combo button */}
          <View style={styles.comboBtnWrap}>
            <TouchableOpacity style={styles.comboBtn} activeOpacity={0.85}>
              <View style={styles.comboBtnLeft}>
                <View style={styles.comboIconWrap}>
                  <Text style={styles.comboIcon}>⭐</Text>
                </View>
                <View>
                  <Text style={styles.comboBtnLabel}>{hall.aiPickLabel}</Text>
                  <Text style={styles.comboBtnTitle}>{hall.aiPickName}</Text>
                </View>
              </View>
              <View style={styles.comboBtnArrow}>
                <ArrowRightIcon />
              </View>
            </TouchableOpacity>
          </View>

          {/* Meal tabs */}
          <View style={styles.mealTabs}>
            {MEALS.map(meal => (
              <TouchableOpacity
                key={meal}
                style={[styles.mealTab, activeMeal === meal && styles.mealTabActive]}
                onPress={() => setActiveMeal(meal)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.mealTabText, activeMeal === meal && styles.mealTabTextActive]}
                >
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Active meal pane */}
          <MealPane meal={activeMeal} menu={hall.menus[activeMeal]} />
        </View>
      )}
    </View>
  );
};

// ─── Sort Dropdown ────────────────────────────────────────────────────────────

const SortDropdown = ({
  visible,
  current,
  onSelect,
  onClose,
}: {
  visible: boolean;
  current: SortOption;
  onSelect: (o: SortOption) => void;
  onClose: () => void;
}) => (
  <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
    <Pressable style={styles.modalBackdrop} onPress={onClose}>
      <View style={styles.sortDropdown}>
        {SORT_OPTIONS.map((opt, i) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.sortOption,
              i < SORT_OPTIONS.length - 1 && styles.sortOptionBorder,
            ]}
            onPress={() => { onSelect(opt); onClose(); }}
            activeOpacity={0.7}
          >
            <Text style={[styles.sortOptionText, current === opt && styles.sortOptionTextSelected]}>
              {opt}
            </Text>
            <View style={[styles.sortCheck, current === opt && styles.sortCheckSelected]}>
              {current === opt && <CheckIcon />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  </Modal>
);

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

// ─── Main Screen ──────────────────────────────────────────────────────────────

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
      // Placeholder: shuffle once per render (in production, use real distances)
      return Math.random() - 0.5;
    }
    return 0; // Relevance: keep original order
  });

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Dining Halls</Text>
        <Text style={styles.screenSubtitle}>6 locations on campus · Updated just now</Text>
      </View>

      {/* Sort row */}
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Screen
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  screenHeader: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 0,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: C.ink,
    letterSpacing: -0.8,
    lineHeight: 28,
  },
  screenSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: C.inkMuted,
    marginTop: 4,
  },

  // Sort row
  sortRow: {
    paddingHorizontal: 20,
    paddingTop: 14,
    zIndex: 100,
  },
  sortTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderWidth: 2.5,
    borderColor: C.border,
    borderRadius: 22,
    backgroundColor: C.bg2,
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 3 },
    }),
  },
  sortLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: C.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sortValue: {
    fontSize: 11,
    fontWeight: '900',
    color: C.ink,
  },

  // Dropdown modal
  modalBackdrop: {
    flex: 1,
    paddingTop: 160, // approximate position below the sort trigger
    paddingHorizontal: 20,
  },
  sortDropdown: {
    alignSelf: 'flex-start',
    backgroundColor: C.bg2,
    borderWidth: 2.5,
    borderColor: C.border,
    borderRadius: 18,
    overflow: 'hidden',
    minWidth: 165,
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 5 },
    }),
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  sortOptionBorder: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#F0E0E0',
  },
  sortOptionText: {
    fontSize: 13,
    fontWeight: '700',
    color: C.ink,
  },
  sortOptionTextSelected: {
    color: C.red,
  },
  sortCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortCheckSelected: {
    backgroundColor: C.red,
    borderColor: C.red,
  },

  // Scroll
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },

  // Hall card
  hallCard: {
    backgroundColor: C.bg2,
    borderWidth: 2.5,
    borderColor: C.border,
    borderRadius: 22,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 3 },
    }),
  },
  hallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
  },
  hallEmojiWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 2 },
    }),
  },
  hallEmoji: {
    fontSize: 30,
  },
  hallInfo: {
    flex: 1,
    minWidth: 0,
  },
  hallName: {
    fontSize: 16,
    fontWeight: '900',
    color: C.ink,
    letterSpacing: -0.3,
    marginBottom: 7,
  },
  hallMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  hallHours: {
    fontSize: 11,
    fontWeight: '600',
    color: C.inkMuted,
  },
  locationBtn: {
    alignSelf: 'flex-start',
    marginTop: 9,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: C.bg,
  },
  locationBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.ink,
  },
  hallRight: {
    alignItems: 'flex-end',
    gap: 10,
    flexShrink: 0,
  },
  hallChevron: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.redLight,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 2 },
    }),
  },

  // Status badge
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: C.border,
  },
  badgeOpen: { backgroundColor: C.greenLight },
  badgeSoon: { backgroundColor: C.yellowLight },
  badgeClosed: { backgroundColor: '#F0E0E0' },
  statusBadgeText: { fontSize: 11, fontWeight: '800' },
  badgeTextOpen: { color: '#15803D' },
  badgeTextSoon: { color: '#92400E' },
  badgeTextClosed: { color: C.inkMuted },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotOpen: { backgroundColor: C.green },
  dotSoon: { backgroundColor: C.yellow },
  dotClosed: { backgroundColor: C.inkMuted },

  // Expanded
  hallExpandInner: {
    borderTopWidth: 2.5,
    borderTopColor: C.border,
  },

  // Closed note
  closedNote: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  closedNoteText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.inkMuted,
  },

  // Combo button
  comboBtnWrap: {
    padding: 12,
    paddingBottom: 0,
  },
  comboBtn: {
    backgroundColor: C.red,
    borderWidth: 2.5,
    borderColor: C.border,
    borderRadius: 16,
    padding: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 3 },
    }),
  },
  comboBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  comboIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comboIcon: { fontSize: 16 },
  comboBtnLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  comboBtnTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -0.3,
  },
  comboBtnArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Meal tabs
  mealTabs: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  mealTab: {
    flex: 1,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: C.border,
    borderRadius: 22,
    alignItems: 'center',
    backgroundColor: C.bg,
  },
  mealTabActive: {
    backgroundColor: C.ink,
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 2 },
    }),
  },
  mealTabText: {
    fontSize: 11,
    fontWeight: '800',
    color: C.ink,
  },
  mealTabTextActive: {
    color: 'white',
  },

  // Menu section
  menuSectionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 6,
  },
  menuSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: C.inkMuted,
  },
  menuCount: {
    fontSize: 10,
    fontWeight: '700',
    color: C.inkMuted,
  },
  menuItems: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    paddingBottom: 6,
  },
  categoryLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#F0E0E0',
  },
  categoryName: {
    fontSize: 9,
    fontWeight: '800',
    color: C.inkMuted,
    letterSpacing: 1,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 2,
  },
  menuItem: {
    width: '47.5%',
    backgroundColor: C.menuItem,
    borderWidth: 2,
    borderColor: C.border,
    borderRadius: 14,
    padding: 9,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 2 },
    }),
  },
  menuItemName: {
    fontSize: 11,
    fontWeight: '700',
    color: C.ink,
    flex: 1,
    lineHeight: 15,
  },
  starBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: C.border,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...Platform.select({
      ios: { shadowColor: C.border, shadowOffset: { width: 1, height: 1 }, shadowOpacity: 1, shadowRadius: 0 },
      android: { elevation: 1 },
    }),
  },
  starBtnStarred: {
    backgroundColor: '#FFF2DC',
    borderColor: C.yellow,
  },

});