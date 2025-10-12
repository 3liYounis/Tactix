import { useTheme } from '@/hooks/useTheme';
import { CheckCircle2, Info, XCircle } from 'lucide-react-native';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastType = 'success' | 'error' | 'info';

type ToastState = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastState | null>(null);
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;
  const counterRef = useRef(0);

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.spring(translateY, { toValue: 40, useNativeDriver: true, damping: 16, stiffness: 160, mass: 0.9 }),
      Animated.timing(scale, { toValue: 0.98, duration: 200, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
    ]).start(() => setToast(null));
  }, [opacity, translateY, scale]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++counterRef.current;
    setToast({ id, message, type });

    translateY.setValue(40);
    opacity.setValue(0);
    scale.setValue(0.96);

    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 260, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 12, stiffness: 180, mass: 0.9 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 200, mass: 0.9 }),
    ]).start();

    const timeout = setTimeout(() => {
      hide();
    }, 2200);

    return () => clearTimeout(timeout);
  }, [hide, opacity, translateY]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  const backgroundFor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return colors.ratingGreen;
      case 'error':
        return colors.ratingRed;
      default:
        return colors.chart4;
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toastContainer,
            {
              bottom: Math.max(insets.bottom, 8) + 72,
              transform: [{ translateY }, { scale }],
              opacity,
            }
          ]}
        >
          <View
            style={[
              styles.toast,
              {
                backgroundColor: backgroundFor(toast.type),
              }
            ]}
          >
            <View style={styles.toastContent}>
              {toast.type === 'success' && <CheckCircle2 size={18} color={colors.primaryForeground} />}
              {toast.type === 'error' && <XCircle size={18} color={colors.primaryForeground} />}
              {toast.type === 'info' && <Info size={18} color={colors.primaryForeground} />}
              <Text style={[styles.toastText, { color: colors.primaryForeground }]}>
                {toast.message}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: 12,
    right: 12,
  },
  toast: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toastText: {
    marginLeft: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
});
