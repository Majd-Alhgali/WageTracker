// src/components/StatCard.js
// بطاقة إحصائية صغيرة تُستخدم في الشاشة الرئيسية

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, FONT, SHADOW } from '../constants/theme';

export default function StatCard({
  icon,
  iconColor = COLORS.primary,
  iconBackground = COLORS.primarySoft,
  label,
  value,
  valueColor = COLORS.textPrimary,
}) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: iconBackground }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT.size.sm,
    fontWeight: FONT.weight.medium,
    marginBottom: 4,
    textAlign: 'right',
  },
  value: {
    fontSize: FONT.size.xl,
    fontWeight: FONT.weight.extrabold,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
