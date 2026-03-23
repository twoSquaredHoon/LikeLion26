import React from 'react';
import { View } from 'react-native';
import { MealType, MealMenu } from '../types';
import { MenuCategorySection } from './MenuCategorySection';
import { styles } from '../styles/MealPane.styles';

interface Props {
    meal: MealType;
    menu: MealMenu;
    }

    export const MealPane = ({ meal, menu }: Props) => (
    <View style={styles.container}>
        {menu.categories.map((cat, i) => (
        <MenuCategorySection key={i} {...cat} />
        ))}
    </View>
);