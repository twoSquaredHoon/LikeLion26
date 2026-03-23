import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Platform,
    Linking,
    } from 'react-native';
    import Svg, { Path } from 'react-native-svg';
    import { useNavigation } from '@react-navigation/native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { RootStackParamList } from '../../../../App';
    import { DiningHall, MealType } from '../types';
    import { C } from '../theme';
    import { StatusBadge } from './StatusBadge';
    import { ComboButton } from './ComboButton';
    import { MealPane } from './MealPane';
    import { styles } from '../styles/DiningHallCard.styles';

    interface Props {
    hall: DiningHall;
    }

    const ChevronIcon = ({ color = C.inkMuted }: { color?: string }) => (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
        <Path d="M2 3.5l3 3 3-3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
    );

    const MEALS: MealType[] = ['breakfast', 'lunch', 'dinner'];

    export const DiningHallCard = ({ hall }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [activeMeal, setActiveMeal] = useState<MealType>('breakfast');
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
            <View style={styles.hallChevron}>
                <Animated.View style={{ transform: [{ rotate }] }}>
                <ChevronIcon />
                </Animated.View>
            </View>
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

            {/* AI combo recommendation button */}
            {/* TODO: aiPickLabel and aiPickName should come from GET /api/recommendations?hallId=hall.id&userId=currentUser */}
            <ComboButton
                label={hall.aiPickLabel}
                title={hall.aiPickName}
                onPress={() => navigation.navigate('Meal')}
            />

            {/* Meal tabs */}
            <View style={styles.mealTabs}>
                {MEALS.map(meal => (
                <TouchableOpacity
                    key={meal}
                    style={[styles.mealTab, activeMeal === meal && styles.mealTabActive]}
                    onPress={() => setActiveMeal(meal)}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.mealTabText, activeMeal === meal && styles.mealTabTextActive]}>
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>

            {/* Active meal pane */}
            {/* TODO: menus should come from GET /api/dining-halls/hall.id/menu?date=today&meal=activeMeal */}
            <MealPane meal={activeMeal} menu={hall.menus[activeMeal]} />
            </View>
        )}
        </View>
    );
};