// src/screens/LoadingScreen.js
// شاشة انتظار بسيطة أثناء تحميل البيانات المحفوظة

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, FONT, SPACING } from '../constants/theme';

export default function LoadingScreen() {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>جارِ تحميل البيانات...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: FONT.size.sm,
    marginTop: SPACING.md,
  },
});
