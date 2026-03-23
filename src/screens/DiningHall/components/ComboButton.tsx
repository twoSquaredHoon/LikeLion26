import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { C } from '../theme';
import { styles } from '../styles/ComboButton.styles';

interface Props {
    label: string;
    title: string;
    onPress: () => void;
    }

    const ArrowRightIcon = () => (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
        <Path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="white" strokeWidth={2} strokeLinecap="round" />
    </Svg>
    );

    export const ComboButton = ({ label, title, onPress }: Props) => (
    <View style={styles.comboBtnWrap}>
        <TouchableOpacity style={styles.comboBtn} activeOpacity={0.85} onPress={onPress}>
        <View style={styles.comboBtnLeft}>
            <View style={styles.comboIconWrap}>
            {/* TODO: replace ⭐ with a dynamic icon based on aiPickLabel category */}
            <Text style={styles.comboIcon}>⭐</Text>
            </View>
            <View>
            <Text style={styles.comboBtnLabel}>{label}</Text>
            <Text style={styles.comboBtnTitle}>{title}</Text>
            </View>
        </View>
        <View style={styles.comboBtnArrow}>
            <ArrowRightIcon />
        </View>
        </TouchableOpacity>
    </View>
);