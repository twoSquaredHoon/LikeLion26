import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  VerifyEmail: undefined;  
};

type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

// ─── Design Tokens (mirrors LoginScreen.tsx) ──────────────────────────────────
const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
  green: '#22C55E',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [email, setEmail]       = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────
  const handleSend = async () => {
    // Empty check
    if (!email.trim()) {
      setEmailErr('Please enter your email address');
      return;
    }

    // @ check
    if (!email.includes('@')) {
      setEmailErr('Invalid format - Please enter valid email address');
      return;
    }

    setEmailErr('');
    setLoading(true);

    try {
      // TODO: replace with real API call e.g. sendPasswordResetEmail(email)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSent(true);
      setTimeout(() => navigation.navigate('VerifyEmail'), 600);
    } catch (err) {
      setEmailErr('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ── Back Button ── */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>

          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.title}>Forgot Password</Text>
            <View style={styles.dividerLine} />
            <Text style={styles.subtitle}>
              Enter your registered email address and we'll send you a link to reset your password.
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View style={styles.formCard}>
            <Text style={styles.fieldLabel}>Enter your email</Text>

            {/* Email Input */}
            <TextInput
              style={[styles.fieldInput, !!emailErr && styles.fieldInputError]}
              placeholder="likelion@wisc.edu"
              placeholderTextColor={COLORS.inkMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              value={email}
              onChangeText={v => { setEmail(v); setEmailErr(''); }}
              onSubmitEditing={handleSend}
              editable={!sent}
            />

            {/* Hint / Error text */}
            <Text style={[styles.hintText, !!emailErr && styles.hintTextError]}>
              {emailErr ? emailErr : 'Enter the email you used for sign up'}
            </Text>

            {/* Send Button */}
            <TouchableOpacity
              style={[styles.btnPrimary, sent && styles.btnSuccess]}
              onPress={handleSend}
              disabled={loading || sent}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : sent ? (
                <Text style={styles.btnPrimaryText}>✓  Code sent!</Text>
              ) : (
                <Text style={styles.btnPrimaryText}>Send code</Text>
              )}
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* ── Return to Login (pinned at bottom) ── */}
        <TouchableOpacity
          style={styles.returnRow}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <View style={styles.returnIconCircle}>
            <Text style={styles.returnIconText}>‹</Text>
          </View>
          <Text style={styles.returnText}>Return to login</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Back Button
  backBtn: {
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: COLORS.bg2,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink,
  },

  // Header
  header: {
    paddingTop: 28,
    paddingBottom: 8,
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.8,
  },
  dividerLine: {
    height: 2,
    backgroundColor: COLORS.border,
    opacity: 0.12,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.inkMuted,
    lineHeight: 20,
  },

  // Form Card
  formCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 20,
    gap: 10,
    marginTop: 20,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  // Field
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fieldInput: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: COLORS.beige,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
  },
  fieldInputError: {
    borderColor: COLORS.red,
    backgroundColor: COLORS.redLight,
  },

  // Hint / Error
  hintText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.inkMuted,
    marginTop: -4,
  },
  hintTextError: {
    color: COLORS.red,
    fontWeight: '600',
  },

  // Primary Button
  btnPrimary: {
    backgroundColor: COLORS.red,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    minHeight: 50,
  },
  btnSuccess: {
    backgroundColor: COLORS.green,
  },
  btnPrimaryText: {
    fontSize: 15,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -0.3,
  },

  // Return to Login
  returnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderTopWidth: 2,
    borderTopColor: 'rgba(42,26,26,0.1)',
  },
  returnIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnIconText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
    lineHeight: 18,
  },
  returnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
});