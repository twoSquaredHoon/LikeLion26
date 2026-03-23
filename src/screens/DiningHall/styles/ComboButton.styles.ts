import { StyleSheet, Platform } from 'react-native';
import { C } from '../theme';

export const styles = StyleSheet.create({
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
});