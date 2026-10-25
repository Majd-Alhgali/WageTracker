// src/screens/PayoutsScreen.js
// شاشة إدارة السلف والمدفوعات المستلمة

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useAppData } from '../context/AppDataContext';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import PayoutRow from '../components/PayoutRow';
import EmptyState from '../components/EmptyState';
import FormModal from '../components/FormModal';
import { formatCurrency } from '../utils/dates';

export default function PayoutsScreen() {
  const { payouts, addPayout, deletePayout, weeklyPayoutsTotal } = useAppData();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddPayout = async ({ amount, note }) => {
    const success = await addPayout(amount, note);
    if (success) setModalVisible(false);
  };

  const handleDelete = (entry) => {
    Alert.alert(
      'حذف السلفة',
      'هل أنت متأكد من حذف هذه الدفعة؟ لا يمكن التراجع عن هذا الإجراء.',
      [
        { text: 'تراجع', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => deletePayout(entry.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScreenHeader
          title="السلف والمدفوعات"
          subtitle={`إجمالي سلف هذا الأسبوع: ${formatCurrency(weeklyPayoutsTotal)}`}
        />

        <PrimaryButton
          label="تسجيل سلفة جديدة"
          icon="add-circle-outline"
          onPress={() => setModalVisible(true)}
        />

        <FlatList
          data={payouts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PayoutRow entry={item} onDelete={handleDelete} />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="wallet-outline"
              title="لا توجد سلف مسجّلة"
              message="اضغط على زر «تسجيل سلفة جديدة» لإضافة أول دفعة."
            />
          }
        />
      </View>

      <FormModal
        visible={modalVisible}
        title="تسجيل سلفة جديدة"
        amountLabel="قيمة السلفة (ل.س)"
        confirmLabel="حفظ السلفة"
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddPayout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  listContent: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl * 2,
  },
});
