import React from 'react';
import { View, Text } from 'react-native';
import { MenuCategory } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { styles } from '../styles/MenuCategorySection.styles';

export const MenuCategorySection = ({ category, items }: MenuCategory) => (
    <View style={styles.section}>
        <Text style={styles.categoryName}>{category.toUpperCase()}</Text>
        <View style={styles.itemsCard}>
        {items.map((item, i) => (
            <MenuItemCard
            key={i}
            name={item.name}
            initialFavorited={item.favorited}
            isLast={i === items.length - 1}
            />
        ))}
        </View>
    </View>
);