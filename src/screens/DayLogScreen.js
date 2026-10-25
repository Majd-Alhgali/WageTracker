// src/screens/DayLogScreen.js
// شاشة عرض جميع أيام العمل المسجّلة مع إمكانية التعديل أو الحذف

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useAppData } from '../context/AppDataContext';
import ScreenHeader from '../components/ScreenHeader';
import WorkDayRow from '../components/WorkDayRow';
import EmptyState from '../components/EmptyState';
import FormModal from '../components/FormModal';

export default function DayLogScreen() {
  const { sortedWorkDaysDesc, addOrUpdateWorkDay, deleteWorkDay } = useAppData();
  const [editingEntry, setEditingEntry] = useState(null);

  const handleEditPress = (entry) => {
    setEditingEntry(entry);
  };

  const handleEditSubmit = async ({ amount, note }) => {
    if (!editingEntry) return;
    await addOrUpdateWorkDay(editingEntry.date, amount, note);
    setEditingEntry(null);
  };

  const handleDelete = (entry) => {
    Alert.alert(
      'حذف يوم العمل',
      'هل أنت متأكد من حذف هذا اليوم من السجل؟ لا يمكن التراجع عن هذا الإجراء.',
      [
        { text: 'تراجع', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => deleteWorkDay(entry.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScreenHeader
          title="سجل أيام العمل"
          subtitle="اضغط على أي يوم لتعديل قيمته أو ملاحظته"
        />

        <FlatList
          data={sortedWorkDaysDesc}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WorkDayRow
              entry={item}
              onPress={handleEditPress}
              onDelete={handleDelete}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="calendar-outline"
              title="لا توجد أيام عمل مسجّلة"
              message="سجّل أول يوم عمل من الشاشة الرئيسية."
            />
          }
        />
      </View>

      <FormModal
        visible={!!editingEntry}
        title="تعديل يوم العمل"
        amountLabel="قيمة الأجر لهذا اليوم (ل.س)"
        initialAmount={editingEntry?.amount}
        initialNote={editingEntry?.note}
        confirmLabel="حفظ التعديل"
        onClose={() => setEditingEntry(null)}
        onSubmit={handleEditSubmit}
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
    paddingBottom: SPACING.xxl * 2,
  },
});
