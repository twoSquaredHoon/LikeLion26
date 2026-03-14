import React, { useState, useRef } from 'react';
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
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

// ─── Types ────────────────────────────────────────────────────────────────────
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
   Welcome: undefined;
};

type SignupScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Signup'>;
};

// ─── Design Tokens (mirrors LoginScreen) ─────────────────────────────────────
const COLORS = {
  red: '#FF3347',
  redLight: '#FFE0E3',
  bg2: '#FFF5F5',
  ink: '#1A0A0A',
  inkMuted: '#9A7070',
  border: '#2A1A1A',
  beige: '#F5ECD7',
  green: '#22C55E',
  background: '#e8e8e8',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [nameErr, setNameErr]     = useState('');
  const [emailErr, setEmailErr]   = useState('');
  const [pwErr, setPwErr]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);

  const emailRef    = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleNameBlur = () => {
    if (name.trim().length > 0 && name.trim().length < 2) {
      setNameErr('Name must be at least 2 characters');
    } else {
      setNameErr('');
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailErr('Please enter a valid email address');
    } else {
      setEmailErr('');
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSignup = async () => {
    let valid = true;

    if (name.trim().length < 2) {
      setNameErr('Please enter your full name');
      valid = false;
    } else {
      setNameErr('');
    }

    if (!validateEmail(email)) {
      setEmailErr('Please enter a valid email address');
      valid = false;
    } else {
      setEmailErr('');
    }

    if (password.length < 6) {
      setPwErr('Password must be at least 6 characters');
      valid = false;
    } else {
      setPwErr('');
    }

    if (!valid) return;

    setLoading(true);
    try {
      // TODO: replace with real auth call, e.g. useAuthStore().signup(name, email, password)
      await new Promise(resolve => setTimeout(resolve, 1600));
      setSuccess(true);
      setTimeout(() => navigation.replace('Welcome'), 600);
    } catch (err) {
      setEmailErr('An account with this email already exists');
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

          {/* ── Hero ── */}
          <View style={styles.hero}>
            <View style={styles.appIcon}>
              <Text style={styles.appIconEmoji}>🍽️</Text>
            </View>
            <Text style={styles.appTitle}>
              What<Text style={styles.appTitleAccent}>To</Text>Eat
            </Text>
            <Text style={styles.appTagline}>Your campus dining companion</Text>
          </View>

          {/* ── Form Card ── */}
          <View style={styles.formCard}>
            <View style={styles.formCardHeader}>
              <Text style={styles.formCardTitle}>Create Account</Text>
              <Text style={styles.formCardSubtitle}>
                Fill your information below or register with your social account
              </Text>
            </View>

            {/* Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={[styles.fieldInput, !!nameErr && styles.fieldInputError]}
                placeholder="Your full name"
                placeholderTextColor={COLORS.inkMuted}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                value={name}
                onChangeText={v => { setName(v); setNameErr(''); }}
                onBlur={handleNameBlur}
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              {!!nameErr && <Text style={styles.fieldError}>{nameErr}</Text>}
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                ref={emailRef}
                style={[styles.fieldInput, !!emailErr && styles.fieldInputError]}
                placeholder="you@university.edu"
                placeholderTextColor={COLORS.inkMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                value={email}
                onChangeText={v => { setEmail(v); setEmailErr(''); }}
                onBlur={handleEmailBlur}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              {!!emailErr && <Text style={styles.fieldError}>{emailErr}</Text>}
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.fieldWrap}>
                <TextInput
                  ref={passwordRef}
                  style={[styles.fieldInput, !!pwErr && styles.fieldInputError, { paddingRight: 44 }]}
                  placeholder="Min. 6 characters"
                  placeholderTextColor={COLORS.inkMuted}
                  secureTextEntry={!showPw}
                  returnKeyType="done"
                  value={password}
                  onChangeText={v => { setPassword(v); setPwErr(''); }}
                  onSubmitEditing={handleSignup}
                />
                <Pressable style={styles.eyeToggle} onPress={() => setShowPw(p => !p)} hitSlop={8}>
                  <Text style={styles.eyeToggleText}>{showPw ? '🙈' : '👁️'}</Text>
                </Pressable>
              </View>
              {!!pwErr && <Text style={styles.fieldError}>{pwErr}</Text>}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.btnPrimary, success && styles.btnSuccess]}
              onPress={handleSignup}
              disabled={loading || success}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : success ? (
                <Text style={styles.btnPrimaryText}>✓  Account Created!</Text>
              ) : (
                <Text style={styles.btnPrimaryText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or register with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Button */}
            <TouchableOpacity
              style={styles.btnGoogle}
              activeOpacity={0.85}
              // TODO: hook up Google OAuth, e.g. useGoogleAuth().promptAsync()
            >
              <Text style={styles.googleLetter}>G</Text>
              <Text style={styles.btnGoogleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          {/* ── Sign In Row ── */}
          <View style={styles.signinRow}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <Text style={styles.signinLink}>Sign in →</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.terms}>
            By creating an account you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

        </ScrollView>
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

  // Hero
  hero: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
    gap: 8,
  },
  appIcon: {
    width: 72,
    height: 72,
    backgroundColor: COLORS.red,
    borderWidth: 3,
    borderColor: COLORS.border,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  appIconEmoji: {
    fontSize: 36,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -1,
    lineHeight: 32,
  },
  appTitleAccent: {
    color: COLORS.red,
  },
  appTagline: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // Form Card
  formCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 20,
    gap: 14,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  formCardHeader: {
    gap: 4,
    marginBottom: 2,
  },
  formCardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  formCardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.inkMuted,
    lineHeight: 17,
  },

  // Field
  fieldGroup: {
    gap: 5,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fieldWrap: {
    position: 'relative',
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
    backgroundColor: '#FFF5F5',
  },
  fieldError: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.red,
  },
  eyeToggle: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  eyeToggleText: {
    fontSize: 16,
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
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    minHeight: 50,
    marginTop: 2,
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

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 2,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#F0E0E0',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // Google Button
  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 13,
    backgroundColor: COLORS.beige,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    shadowColor: COLORS.border,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  googleLetter: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.red,
  },
  btnGoogleText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },

  // Sign In
  signinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  signinText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },
  signinLink: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.red,
    letterSpacing: -0.3,
  },

  // Terms
  terms: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.inkMuted,
    lineHeight: 16,
    paddingTop: 12,
  },
  termsLink: {
    fontWeight: '700',
    color: COLORS.inkMuted,
  },
});