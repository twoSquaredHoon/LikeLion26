import { StyleSheet } from 'react-native';
import { C } from '../theme';

export const styles = StyleSheet.create({
    section: {
        marginBottom: 12,
    },
    categoryName: {
        fontSize: 10,
        fontWeight: '800',
        color: C.inkMuted,
        letterSpacing: 1,
        marginBottom: 6,
    },
    itemsCard: {
        backgroundColor: C.bg2,
        borderWidth: 2,
        borderColor: C.border,
        borderRadius: 14,
        overflow: 'hidden',
    },
});