// src/components/PrimaryButton.js
// زر أساسي قابل لإعادة الاستخدام بأشكال مختلفة

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, FONT } from '../constants/theme';

const VARIANTS = {
  primary: {
    background: COLORS.primary,
    text: '#0B1410',
  },
  danger: {
    background: COLORS.danger,
    text: COLORS.white,
  },
  outline: {
    background: 'transparent',
    text: COLORS.textPrimary,
    borderColor: COLORS.surfaceBorder,
  },
  soft: {
    background: COLORS.surfaceElevated,
    text: COLORS.textPrimary,
  },
};

export default function PrimaryButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}) {
  const styleConfig = VARIANTS[variant] || VARIANTS.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: styleConfig.background,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: styleConfig.borderColor,
          opacity: disabled ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={styleConfig.text} />
      ) : (
        <View style={styles.content}>
          {icon ? (
            <Ionicons
              name={icon}
              size={18}
              color={styleConfig.text}
              style={styles.icon}
            />
          ) : null}
          <Text style={[styles.label, { color: styleConfig.text }]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  icon: {
    marginLeft: SPACING.sm,
  },
  label: {
    fontSize: FONT.size.md,
    fontWeight: FONT.weight.semibold,
    textAlign: 'center',
  },
});
