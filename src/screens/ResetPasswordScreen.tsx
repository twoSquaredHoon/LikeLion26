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
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerifyEmail: undefined;
};

type ResetPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ResetPassword'>;
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
  green: '#22C55E',
  greenLight: '#DCFCE7',
};

// ─── Requirement Check Row ─────────────────────────────────────────────────────
function ReqItem({ met, label }: { met: boolean; label: string }) {
  return (
    <View style={styles.reqItem}>
      <View style={[styles.reqCheck, met && styles.reqCheckMet]}>
        {met && (
          <Text style={styles.reqCheckTick}>✓</Text>
        )}
      </View>
      <Text style={[styles.reqText, met && styles.reqTextMet]}>{label}</Text>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ResetPasswordScreen({ navigation }: ResetPasswordScreenProps) {
  const [newPw, setNewPw]       = useState('');
  const [confPw, setConfPw]     = useState('');
  const [showNew, setShowNew]   = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [confHint, setConfHint] = useState<'idle' | 'match' | 'mismatch'>('idle');
  const [newError, setNewError] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  // ── Requirements ────────────────────────────────────────────────────────────
  const req = {
    len:     newPw.length >= 8,
    case:    /[a-z]/.test(newPw) && /[A-Z]/.test(newPw),
    num:     /[0-9]/.test(newPw),
    special: /[!@#$%^&*?[\]{}|]/.test(newPw),
  };
  const allReqMet = Object.values(req).every(Boolean);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleNewPwChange = (val: string) => {
    setNewPw(val);
    setNewError(false);
    // re-check confirm match live
    if (confPw) {
      setConfHint(val === confPw ? 'match' : 'mismatch');
    }
  };

  const handleConfPwChange = (val: string) => {
    setConfPw(val);
    if (!val) { setConfHint('idle'); return; }
    setConfHint(newPw === val ? 'match' : 'mismatch');
  };

  const handleReset = async () => {
    if (!newPw || !allReqMet) { setNewError(true); return; }
    if (newPw !== confPw)     { setConfHint('mismatch'); return; }

    setLoading(true);
    try {
      // TODO: replace with real API call e.g. resetPassword(newPw)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => navigation.navigate('Login'), 1200);
    } catch {
      setNewError(true);
    } finally {
      setLoading(false);
    }
  };

  const confHintText =
    confHint === 'match'    ? '✓ Passwords match' :
    confHint === 'mismatch' ? 'Passwords do not match' :
    'Re-enter your new password';

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        {/* ── Back Button ── */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <View style={styles.dividerLine} />
            <Text style={styles.subtitle}>Choose a strong new password for your account.</Text>
          </View>

          {/* ── New Password Section ── */}
          <View style={styles.fieldSection}>
            <Text style={styles.sectionLabel}>New Password</Text>
            <View style={styles.fieldCard}>

              {/* Input */}
              <View style={styles.inputWrap}>
                <TextInput
                  style={[
                    styles.fieldInput,
                    newError && styles.fieldInputError,
                    allReqMet && newPw.length > 0 && styles.fieldInputValid,
                  ]}
                  placeholder="••••••••••••••"
                  placeholderTextColor={COLORS.inkMuted}
                  secureTextEntry={!showNew}
                  value={newPw}
                  onChangeText={handleNewPwChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Pressable style={styles.eyeBtn} onPress={() => setShowNew(p => !p)} hitSlop={8}>
                  <Text style={[styles.eyeIcon, !showNew && styles.eyeIconOff]}>
                    {showNew ? '👁️' : '🙈'}
                  </Text>
                </Pressable>
              </View>

              {/* Requirements nested card */}
              <View style={styles.reqCard}>
                <Text style={styles.reqCardTitle}>Requirements</Text>
                <ReqItem met={req.len}     label="At least 8 characters" />
                <ReqItem met={req.case}    label="Upper & lower case letters" />
                <ReqItem met={req.num}     label="At least one number" />
                <ReqItem met={req.special} label="One special character (! @ # ? ])" />
              </View>

            </View>
          </View>

          {/* ── Confirm Password Section ── */}
          <View style={styles.fieldSection}>
            <Text style={styles.sectionLabel}>Confirm Password</Text>
            <View style={styles.fieldCard}>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[
                    styles.fieldInput,
                    confHint === 'mismatch' && styles.fieldInputError,
                    confHint === 'match'    && styles.fieldInputValid,
                  ]}
                  placeholder="••••••••••••••"
                  placeholderTextColor={COLORS.inkMuted}
                  secureTextEntry={!showConf}
                  value={confPw}
                  onChangeText={handleConfPwChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={handleReset}
                />
                <Pressable style={styles.eyeBtn} onPress={() => setShowConf(p => !p)} hitSlop={8}>
                  <Text style={[styles.eyeIcon, !showConf && styles.eyeIconOff]}>
                    {showConf ? '👁️' : '🙈'}
                  </Text>
                </Pressable>
              </View>
              <Text style={[
                styles.hintText,
                confHint === 'mismatch' && styles.hintError,
                confHint === 'match'    && styles.hintSuccess,
              ]}>
                {confHintText}
              </Text>
            </View>
          </View>

          {/* ── Reset Button ── */}
          <TouchableOpacity
            style={[styles.resetBtn, success && styles.resetBtnSuccess]}
            onPress={handleReset}
            disabled={loading || success}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : success ? (
              <Text style={styles.resetBtnText}>✓  Password reset!</Text>
            ) : (
              <Text style={styles.resetBtnText}>Reset password</Text>
            )}
          </TouchableOpacity>

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
    paddingHorizontal: 22,
    paddingBottom: 24,
  },

  // Back Button
  backBtn: {
    alignSelf: 'flex-start',
    marginTop: 14,
    marginLeft: 22,
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
    paddingTop: 22,
    paddingBottom: 4,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -1,
  },
  dividerLine: {
    height: 2,
    backgroundColor: COLORS.border,
    opacity: 0.1,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.inkMuted,
    lineHeight: 18,
  },

  // Field Section
  fieldSection: {
    marginTop: 22,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingLeft: 2,
  },
  fieldCard: {
    backgroundColor: COLORS.bg2,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 14,
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    gap: 12,
  },

  // Input
  inputWrap: {
    position: 'relative',
  },
  fieldInput: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    paddingRight: 46,
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
    backgroundColor: '#FFF8F8',
  },
  fieldInputValid: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.greenLight,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  eyeIcon: { fontSize: 16 },
  eyeIconOff: { opacity: 0.4 },

  // Requirements Card
  reqCard: {
    backgroundColor: COLORS.beige,
    borderWidth: 1.5,
    borderColor: 'rgba(42,26,26,0.12)',
    borderRadius: 14,
    padding: 12,
    gap: 6,
  },
  reqCardTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reqCheck: {
    width: 17, height: 17,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.inkMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reqCheckMet: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  reqCheckTick: {
    fontSize: 9,
    fontWeight: '900',
    color: 'white',
    lineHeight: 11,
  },
  reqText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkMuted,
  },
  reqTextMet: {
    color: COLORS.green,
  },

  // Hint
  hintText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.inkMuted,
    paddingLeft: 2,
  },
  hintError: {
    color: COLORS.red,
    fontWeight: '700',
  },
  hintSuccess: {
    color: COLORS.green,
    fontWeight: '700',
  },

  // Reset Button
  resetBtn: {
    marginTop: 24,
    height: 54,
    backgroundColor: COLORS.red,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  resetBtnSuccess: {
    backgroundColor: COLORS.green,
  },
  resetBtnText: {
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
    width: 24, height: 24,
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