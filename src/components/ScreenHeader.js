// src/components/ScreenHeader.js
// رأس موحّد للشاشات مع عنوان ووصف اختياري

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../constants/theme';

export default function ScreenHeader({ title, subtitle }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.extrabold,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT.size.sm,
    marginTop: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
