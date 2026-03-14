import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerifyEmail: undefined;
  Birthday: undefined;
  Welcome: undefined;
};

type WelcomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

// ─── Design Tokens ────────────────────────────────────────────────────────────
const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Main Content ── */}
      <View style={styles.content}>

        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoEmoji}>🍽️</Text>
          </View>
          <Text style={styles.logoTitle}>
            What<Text style={styles.logoAccent}>To</Text>Eat
          </Text>
          <Text style={styles.logoTagline}>Your campus dining companion</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        <Text style={styles.description}>
          Discover{' '}
          <Text style={styles.descriptionBold}>what's being served</Text>
          {' '}at your campus dining halls — personalized just for you.
        </Text>

      </View>

      {/* ── Bottom Section ── */}
      <View style={styles.bottomSection}>

        {/* Get Started */}
        <TouchableOpacity
          style={styles.getStartedBtn}
          onPress={() => navigation.navigate('Birthday')}
          activeOpacity={0.85}
        >
          <Text style={styles.getStartedBtnText}>Get Started →</Text>
        </TouchableOpacity>

        {/* Login */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.loginBtnText}>I already have an account</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>

      </View>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },

  // Content
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // Logo
  logoWrap: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 88, height: 88,
    backgroundColor: COLORS.red,
    borderWidth: 3, borderColor: COLORS.border,
    borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  logoEmoji: { fontSize: 44 },
  logoTitle: {
    fontSize: 34, fontWeight: '900',
    color: COLORS.ink, letterSpacing: -1.5,
    lineHeight: 36,
  },
  logoAccent: { color: COLORS.red },
  logoTagline: {
    fontSize: 11, fontWeight: '700',
    color: COLORS.inkMuted, letterSpacing: 1.5,
    textTransform: 'uppercase', marginTop: 8,
  },

  // Divider
  divider: {
    width: 40, height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2, opacity: 0.12,
    marginBottom: 40,
  },

  // Description
  description: {
    fontSize: 15, fontWeight: '500',
    color: COLORS.inkMuted, lineHeight: 26,
    textAlign: 'center',
  },
  descriptionBold: {
    fontWeight: '800', color: COLORS.ink,
  },

  // Bottom Section
  bottomSection: {
    paddingHorizontal: 28,
    paddingBottom: 36,
    gap: 14,
  },

  // Get Started Button
  getStartedBtn: {
    height: 56,
    backgroundColor: COLORS.red,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  getStartedBtnText: {
    fontSize: 16, fontWeight: '900',
    color: 'white', letterSpacing: -0.3,
  },

  // Login Button
  loginBtn: {
    height: 52,
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 2,
  },
  loginBtnText: {
    fontSize: 15, fontWeight: '800',
    color: COLORS.ink, letterSpacing: -0.3,
  },

  // Terms
  terms: {
    fontSize: 10, fontWeight: '500',
    color: COLORS.inkMuted, textAlign: 'center', lineHeight: 16,
  },
  termsLink: { fontWeight: '700', color: COLORS.inkMuted },
});