import React from 'react';
import { View, Text } from 'react-native';
import { StatusType } from '../types';
import { styles } from '../styles/StatusBadge.styles';

interface Props {
    status: StatusType;
    }

    export const StatusBadge = ({ status }: Props) => {
    const badgeStyle =
        status === 'open' ? styles.badgeOpen :
        status === 'soon' ? styles.badgeSoon : styles.badgeClosed;
    const dotStyle =
        status === 'open' ? styles.dotOpen :
        status === 'soon' ? styles.dotSoon : styles.dotClosed;
    const textStyle =
        status === 'open' ? styles.badgeTextOpen :
        status === 'soon' ? styles.badgeTextSoon : styles.badgeTextClosed;
    const label =
        status === 'open' ? 'Open' :
        status === 'soon' ? 'Closes Soon' : 'Closed';

    return (
        <View style={[styles.statusBadge, badgeStyle]}>
        <View style={[styles.statusDot, dotStyle]} />
        <Text style={[styles.statusBadgeText, textStyle]}>{label}</Text>
        </View>
    );
};