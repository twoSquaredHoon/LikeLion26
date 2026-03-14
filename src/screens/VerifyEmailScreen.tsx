import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
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

type VerifyEmailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'VerifyEmail'>;
  route?: { params?: { email?: string } };
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

const CODE_LENGTH = 6;
const TIMER_SECONDS = 12 * 60 + 55;
const RESEND_COOLDOWN = 30;

// ─── Component ────────────────────────────────────────────────────────────────
export default function VerifyEmailScreen({ navigation, route }: VerifyEmailScreenProps) {
  const email = route?.params?.email ?? '*******@wisc.edu';

  const [code, setCode]               = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [status, setStatus]           = useState<'idle' | 'error' | 'success'>('idle');
  const [hintText, setHintText]       = useState('');
  const [loading, setLoading]         = useState(false);
  const [timeLeft, setTimeLeft]       = useState(TIMER_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN);
  const [resendLabel, setResendLabel] = useState('Resend code?');

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const allFilled = code.every(c => c.length === 1);

  // ── Countdown Timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  // ── Resend Cooldown ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // ── Shake Animation ──────────────────────────────────────────────────────────
  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -8,  duration: 60,  useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  8,  duration: 60,  useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6,  duration: 60,  useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  6,  duration: 60,  useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  0,  duration: 60,  useNativeDriver: true }),
    ]).start();
  };

  // ── OTP Input ────────────────────────────────────────────────────────────────
  const handleCodeChange = (val: string, idx: number) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const updated = [...code];
    updated[idx] = digit;
    setCode(updated);
    setStatus('idle');
    setHintText('');
    if (digit && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[idx] && idx > 0) {
      const updated = [...code];
      updated[idx - 1] = '';
      setCode(updated);
      inputRefs.current[idx - 1]?.focus();
    }
  };

  // ── Verify ───────────────────────────────────────────────────────────────────
  const handleVerify = async () => {
    if (!allFilled || loading) return;
    setLoading(true);
    try {
      // TODO: replace with real API call e.g. verifyEmail(code.join(''))
      await new Promise(resolve => setTimeout(resolve, 1400));
      const entered = code.join('');
      if (entered === '123456') {
        setStatus('success');
        setHintText('✓ Email verified successfully!');
        setTimeout(() => navigation.navigate('ResetPassword'), 1200);
      } else {
        setStatus('error');
        setHintText('Invalid code — please try again');
        shake();
        setTimeout(() => {
          setCode(Array(CODE_LENGTH).fill(''));
          setStatus('idle');
          setHintText('');
          inputRefs.current[0]?.focus();
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Resend ───────────────────────────────────────────────────────────────────
  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendLabel('Sent!');
    setResendCooldown(RESEND_COOLDOWN);
    setCode(Array(CODE_LENGTH).fill(''));
    setStatus('idle');
    setHintText('');
    setTimeout(() => setResendLabel('Resend code?'), 2000);
    // TODO: trigger real resend API call
  };

  // ── Box Style ────────────────────────────────────────────────────────────────
  const boxStyle = (idx: number) => [
    styles.otpBox,
    code[idx] && status === 'idle'    && styles.otpBoxFilled,
    status === 'error'                && styles.otpBoxError,
    status === 'success'              && styles.otpBoxSuccess,
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
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
            <Text style={styles.title}>Verify Email Address</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ── Email Badge ── */}
          <View style={styles.emailBadge}>
            <View style={styles.emailBadgeIcon}>
              <Text style={styles.emailBadgeEmoji}>✉️</Text>
            </View>
            <View style={styles.emailBadgeText}>
              <Text style={styles.emailBadgeLabel}>Verification sent to</Text>
              <Text style={styles.emailBadgeValue}>{email}</Text>
            </View>
          </View>

          {/* ── Code Card ── */}
          <View style={styles.codeCard}>
            <Text style={styles.codeCardLabel}>Enter verification code</Text>
            <Text style={styles.codeCardHint}>
              Please check your inbox and enter the 6-digit code. Expires in{' '}
              <Text style={styles.codeCardHintBold}>{fmtTime(timeLeft)}</Text>.
            </Text>

            {/* OTP Boxes */}
            <Animated.View style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}>
              {code.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={el => { inputRefs.current[idx] = el; }}
                  style={boxStyle(idx)}
                  value={digit}
                  onChangeText={val => handleCodeChange(val, idx)}
                  onKeyPress={e => handleKeyPress(e, idx)}
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                  editable={status !== 'success'}
                />
              ))}
            </Animated.View>

            {/* Timer Badge */}
            <View style={styles.timerRow}>
              <Text style={styles.timerLabel}>Code expires in</Text>
              <View style={[styles.timerBadge, timeLeft <= 60 && styles.timerBadgeUrgent]}>
                <Text style={[styles.timerText, timeLeft <= 60 && styles.timerTextUrgent]}>
                  {fmtTime(timeLeft)}
                </Text>
              </View>
            </View>

            {/* Hint */}
            {!!hintText && (
              <Text style={[
                styles.codeHint,
                status === 'error'   && styles.codeHintError,
                status === 'success' && styles.codeHintSuccess,
              ]}>
                {hintText}
              </Text>
            )}
          </View>

          {/* ── Verify Button ── */}
          <TouchableOpacity
            style={[
              styles.verifyBtn,
              !allFilled && styles.verifyBtnDisabled,
              status === 'success' && styles.verifyBtnSuccess,
            ]}
            onPress={handleVerify}
            disabled={!allFilled || loading || status === 'success'}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : status === 'success' ? (
              <Text style={styles.verifyBtnText}>✓  Verified!</Text>
            ) : (
              <Text style={styles.verifyBtnText}>Verify</Text>
            )}
          </TouchableOpacity>

          {/* ── Action Row ── */}
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={handleResend} disabled={resendCooldown > 0} activeOpacity={0.7}>
              <Text style={[styles.actionLink, resendCooldown > 0 && styles.actionLinkDisabled]}>
                {resendLabel}{resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Text style={styles.actionLinkMuted}>Change email</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* ── Return to Login ── */}
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
  safeArea: { flex: 1, backgroundColor: COLORS.beige },
  kav: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingBottom: 24 },

  // Back Button
  backBtn: {
    alignSelf: 'flex-start', marginTop: 14, marginLeft: 22,
    paddingVertical: 8, paddingHorizontal: 14,
    backgroundColor: COLORS.bg2, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 12, shadowColor: COLORS.border,
    shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3,
  },
  backBtnText: { fontSize: 13, fontWeight: '800', color: COLORS.ink },

  // Header
  header: { paddingTop: 22, paddingBottom: 4, gap: 10 },
  title: { fontSize: 28, fontWeight: '900', color: COLORS.ink, letterSpacing: -1 },
  dividerLine: { height: 2, backgroundColor: COLORS.border, opacity: 0.1, borderRadius: 2 },

  // Email Badge
  emailBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 16, padding: 12, marginTop: 18,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  emailBadgeIcon: {
    width: 38, height: 38, backgroundColor: COLORS.redLight,
    borderWidth: 2, borderColor: COLORS.border, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  emailBadgeEmoji: { fontSize: 18 },
  emailBadgeText: { flex: 1 },
  emailBadgeLabel: { fontSize: 10, fontWeight: '800', color: COLORS.inkMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  emailBadgeValue: { fontSize: 13, fontWeight: '700', color: COLORS.ink, letterSpacing: -0.3 },

  // Code Card
  codeCard: {
    backgroundColor: COLORS.bg2, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 22, padding: 20, marginTop: 16,
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
    gap: 14,
  },
  codeCardLabel: { fontSize: 11, fontWeight: '800', color: COLORS.inkMuted, textTransform: 'uppercase', letterSpacing: 1 },
  codeCardHint: { fontSize: 11, fontWeight: '500', color: COLORS.inkMuted, lineHeight: 17 },
  codeCardHintBold: { fontWeight: '800', color: COLORS.ink },

  // OTP Row
  otpRow: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  otpBox: {
    width: 44, height: 52,
    borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 14, backgroundColor: COLORS.beige,
    fontSize: 22, fontWeight: '900', color: COLORS.ink,
    textAlign: 'center',
  },
  otpBoxFilled: { backgroundColor: COLORS.bg2 },
  otpBoxError: { borderColor: COLORS.red, backgroundColor: '#FFF8F8' },
  otpBoxSuccess: { borderColor: COLORS.green, backgroundColor: COLORS.greenLight },

  // Timer
  timerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  timerLabel: { fontSize: 11, fontWeight: '600', color: COLORS.inkMuted },
  timerBadge: {
    backgroundColor: COLORS.redLight, borderWidth: 2, borderColor: COLORS.border,
    borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10,
  },
  timerBadgeUrgent: { backgroundColor: '#FFE0E3' },
  timerText: { fontSize: 12, fontWeight: '800', color: COLORS.red },
  timerTextUrgent: { color: COLORS.red },

  // Hint
  codeHint: { fontSize: 11, fontWeight: '600', color: COLORS.inkMuted, textAlign: 'center' },
  codeHintError: { color: COLORS.red, fontWeight: '700' },
  codeHintSuccess: { color: COLORS.green, fontWeight: '700' },

  // Verify Button
  verifyBtn: {
    marginTop: 20, height: 54,
    backgroundColor: COLORS.red, borderWidth: 2.5, borderColor: COLORS.border,
    borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  verifyBtnDisabled: { opacity: 0.45 },
  verifyBtnSuccess: { backgroundColor: COLORS.green },
  verifyBtnText: { fontSize: 15, fontWeight: '900', color: 'white', letterSpacing: -0.3 },

  // Action Row
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingHorizontal: 2 },
  actionLink: { fontSize: 12, fontWeight: '700', color: COLORS.red },
  actionLinkDisabled: { opacity: 0.4 },
  actionLinkMuted: { fontSize: 12, fontWeight: '700', color: COLORS.inkMuted },

  // Return to Login
  returnRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 16, borderTopWidth: 2, borderTopColor: 'rgba(42,26,26,0.1)',
  },
  returnIconCircle: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  returnIconText: { fontSize: 16, fontWeight: '800', color: COLORS.ink, lineHeight: 18 },
  returnText: { fontSize: 14, fontWeight: '700', color: COLORS.ink, letterSpacing: -0.3 },
});