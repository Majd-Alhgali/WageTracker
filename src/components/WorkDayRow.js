// src/components/WorkDayRow.js
// صف يمثّل يوم عمل واحد ضمن القوائم، مع إمكانية الضغط للتعديل والحذف

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, FONT } from '../constants/theme';
import {
  formatArabicDateWithDay,
  formatCurrency,
} from '../utils/dates';

export default function WorkDayRow({ entry, onPress, onDelete }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(entry)}
      style={styles.row}
    >
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
        ) : null}
      </View>

      <View style={styles.amountWrapper}>
        <Text style={styles.amount}>{formatCurrency(entry.amount)}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>يوم عمل</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  amountWrapper: {
    alignItems: 'flex-end',
  },
  amount: {
    color: COLORS.primary,
    fontSize: FONT.size.md,
    fontWeight: FONT.weight.bold,
    writingDirection: 'rtl',
  },
  badge: {
    marginTop: 4,
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: FONT.weight.semibold,
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
