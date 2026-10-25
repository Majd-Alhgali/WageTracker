// src/components/PayoutRow.js
// صف يمثّل سلفة أو دفعة واحدة ضمن القوائم

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, FONT } from '../constants/theme';
import { formatArabicDateWithDay, formatCurrency } from '../utils/dates';

export default function PayoutRow({ entry, onDelete }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => onDelete?.(entry)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={19} color={COLORS.danger} />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.date}>{formatArabicDateWithDay(entry.date)}</Text>
        {entry.note ? (
          <Text style={styles.note} numberOfLines={1}>
            {entry.note}
          </Text>
        ) : (
          <Text style={styles.note} numberOfLines={1}>
            بدون ملاحظة
          </Text>
        )}
      </View>

      <Text style={styles.amount}>- {formatCurrency(entry.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  info: {
    flex: 1,
    marginRight: SPACING.md,
  },
  date: {
    color: COLORS.textPrimary,
    fontSize: FONT.size.md,
    fontWeight: FONT.weight.semibold,
    textAlign: 'right',
  },
  note: {
    color: COLORS.textSecondary,
    fontSize: FONT.size.xs,
    marginTop: 2,
    textAlign: 'right',
  },
  amount: {
    color: COLORS.warning,
    fontSize: FONT.size.md,
    fontWeight: FONT.weight.bold,
    writingDirection: 'rtl',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
});
