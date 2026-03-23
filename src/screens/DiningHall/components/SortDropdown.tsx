import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SortOption } from '../types';
import { styles } from '../styles/SortDropdown.styles';

const SORT_OPTIONS: SortOption[] = ['Relevance', 'Open Now', 'Closest'];

const CheckIcon = () => (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
        <Path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth={2} strokeLinecap="round" />
    </Svg>
    );

    interface Props {
    visible: boolean;
    current: SortOption;
    onSelect: (o: SortOption) => void;
    onClose: () => void;
    }

    export const SortDropdown = ({ visible, current, onSelect, onClose }: Props) => (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
        <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <View style={styles.sortDropdown}>
            {SORT_OPTIONS.map((opt, i) => (
            <TouchableOpacity
                key={opt}
                style={[styles.sortOption, i < SORT_OPTIONS.length - 1 && styles.sortOptionBorder]}
                onPress={() => { onSelect(opt); onClose(); }}
                activeOpacity={0.7}
            >
                <Text style={[styles.sortOptionText, current === opt && styles.sortOptionTextSelected]}>
                {opt}
                </Text>
                <View style={[styles.sortCheck, current === opt && styles.sortCheckSelected]}>
                {current === opt && <CheckIcon />}
                </View>
            </TouchableOpacity>
            ))}
        </View>
        </Pressable>
    </Modal>
);