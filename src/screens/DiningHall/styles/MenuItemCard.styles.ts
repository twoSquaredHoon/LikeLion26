import { StyleSheet } from 'react-native';
import { C } from '../theme';

export const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 11,
        paddingHorizontal: 14,
        borderBottomWidth: 1.5,
        borderBottomColor: '#F0E0E0',
    },
    menuItemLast: {
        borderBottomWidth: 0,
    },
    menuItemName: {
        fontSize: 13,
        fontWeight: '600',
        color: C.ink,
        flex: 1,
        lineHeight: 18,
        marginRight: 10,
    },
    heartBtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: C.border,
        backgroundColor: C.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    heartBtnFavorited: {
        backgroundColor: '#FFE0E3',
        borderColor: C.red,
    },
});