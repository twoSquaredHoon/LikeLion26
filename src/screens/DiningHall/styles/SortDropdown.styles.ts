import { StyleSheet, Platform } from 'react-native';
import { C } from '../theme';

export const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        paddingTop: 160,
        paddingHorizontal: 20,
    },
    sortDropdown: {
        alignSelf: 'flex-start',
        backgroundColor: C.bg2,
        borderWidth: 2.5,
        borderColor: C.border,
        borderRadius: 18,
        overflow: 'hidden',
        minWidth: 165,
        ...Platform.select({
        ios: { shadowColor: C.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0 },
        android: { elevation: 5 },
        }),
    },
    sortOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 11,
        paddingHorizontal: 16,
    },
    sortOptionBorder: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#F0E0E0',
    },
    sortOptionText: {
        fontSize: 13,
        fontWeight: '700',
        color: C.ink,
    },
    sortOptionTextSelected: {
        color: C.red,
    },
    sortCheck: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: C.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortCheckSelected: {
        backgroundColor: C.red,
        borderColor: C.red,
    },
});