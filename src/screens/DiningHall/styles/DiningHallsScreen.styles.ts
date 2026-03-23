import { StyleSheet } from 'react-native';
import { C } from '../theme';

export const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: C.bg },
    screenHeader: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 0 },
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
    sortRow: { paddingHorizontal: 20, paddingTop: 14, zIndex: 100 },
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
    },
    sortLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: C.inkMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    sortValue: { fontSize: 11, fontWeight: '900', color: C.ink },
    scrollBody: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 24 },
});