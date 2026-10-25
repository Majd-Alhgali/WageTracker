// src/components/FormModal.js
// مودال عام لإدخال/تعديل بيانات (مبلغ + ملاحظة اختيارية)

import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, FONT } from '../constants/theme';
import PrimaryButton from './PrimaryButton';

export default function FormModal({
  visible,
  title,
  amountLabel = 'المبلغ (ل.س)',
  initialAmount = '',
  initialNote = '',
  showNote = true,
  confirmLabel = 'حفظ',
  onClose,
  onSubmit,
}) {
  const [amount, setAmount] = useState(String(initialAmount || ''));
  const [note, setNote] = useState(initialNote || '');

  useEffect(() => {
    if (visible) {
      setAmount(String(initialAmount || ''));
      setNote(initialNote || '');
    }
  }, [visible, initialAmount, initialNote]);

  const handleSubmit = () => {
    onSubmit?.({ amount, note });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </View>

          <Text style={styles.fieldLabel}>{amountLabel}</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={COLORS.textMuted}
            style={styles.input}
            textAlign="right"
          />

          {showNote && (
            <>
              <Text style={styles.fieldLabel}>ملاحظة (اختياري)</Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="أدخل ملاحظة..."
                placeholderTextColor={COLORS.textMuted}
                style={styles.input}
                textAlign="right"
                multiline
              />
            </>
          )}

          <View style={styles.actions}>
            <PrimaryButton label={confirmLabel} onPress={handleSubmit} />
            <View style={{ height: SPACING.sm }} />
            <PrimaryButton label="إلغاء" variant="outline" onPress={onClose} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  headerRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONT.size.lg,
    fontWeight: FONT.weight.bold,
  },
  fieldLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT.size.sm,
    marginBottom: SPACING.xs,
    textAlign: 'right',
  },
  input: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT.size.md,
    marginBottom: SPACING.lg,
    writingDirection: 'rtl',
  },
  actions: {
    marginTop: SPACING.sm,
  },
});
