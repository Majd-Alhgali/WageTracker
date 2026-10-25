// src/constants/theme.js
// نظام الألوان والمقاسات الموحّد للتطبيق (Dark Mode)

export const COLORS = {
  // خلفيات
  background: '#0F1115',
  surface: '#1A1D24',
  surfaceElevated: '#22262F',
  surfaceBorder: '#2E333D',

  // ألوان النصوص
  textPrimary: '#F5F6F8',
  textSecondary: '#9AA1AC',
  textMuted: '#6B7280',

  // الألوان الأساسية
  primary: '#3DDC97',
  primaryDark: '#2CB881',
  primarySoft: 'rgba(61, 220, 151, 0.14)',

  // ألوان الحالة
  danger: '#FF5D5D',
  dangerSoft: 'rgba(255, 93, 93, 0.14)',
  warning: '#F5A623',
  warningSoft: 'rgba(245, 166, 35, 0.14)',
  info: '#4EA1FF',
  infoSoft: 'rgba(78, 161, 255, 0.14)',

  // أخرى
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.6)',
  shadow: '#000000',
};

export const RADIUS = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const FONT = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 34,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const SHADOW = {
  card: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
};
