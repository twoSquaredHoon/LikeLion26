import { StyleSheet } from 'react-native';
import { C } from '../theme';

export const styles = StyleSheet.create({
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
    statusDot: { width: 7, height: 7, borderRadius: 3.5 },
    dotOpen: { backgroundColor: C.green },
    dotSoon: { backgroundColor: C.yellow },
    dotClosed: { backgroundColor: C.inkMuted },
});