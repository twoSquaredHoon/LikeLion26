import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { C } from '../theme';
import { styles } from '../styles/MenuItemCard.styles';

interface Props {
    name: string;
    initialFavorited?: boolean;
    isLast?: boolean;
    }

    const HeartIcon = ({ filled }: { filled: boolean }) => (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill={filled ? '#FF3347' : 'none'}>
        <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={filled ? '#CC0020' : C.inkMuted}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        />
    </Svg>
    );

    export const MenuItemCard = ({ name, initialFavorited = false, isLast = false }: Props) => {
    const [favorited, setFavorited] = useState(initialFavorited);

    // TODO: persist favorite state to backend → PATCH /api/user/favorites
    // payload: { itemName: name, favorited: !favorited }

    return (
        <View style={[styles.menuItem, isLast && styles.menuItemLast]}>
        <Text style={styles.menuItemName}>{name}</Text>
        <TouchableOpacity
            style={[styles.heartBtn, favorited && styles.heartBtnFavorited]}
            onPress={() => setFavorited(f => !f)}
            activeOpacity={0.7}
        >
            <HeartIcon filled={favorited} />
        </TouchableOpacity>
        </View>
    );
};