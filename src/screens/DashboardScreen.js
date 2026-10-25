// src/screens/DashboardScreen.js
// الشاشة الرئيسية: تسجيل يوم العمل، تعديل الأجر اليومي، وعرض الإحصائيات الأسبوعية

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING, FONT, SHADOW } from '../constants/theme';
import { useAppData } from '../context/AppDataContext';
import { formatCurrency, formatArabicDateWithDay, getTodayKey, getWeekEndKey } from '../utils/dates';
import StatCard from '../components/StatCard';
import PrimaryButton from '../components/PrimaryButton';
import FormModal from '../components/FormModal';

export default function DashboardScreen() {
  const {
    dailyRate,
    updateDailyRate,
    toggleToday,
    isTodayLogged,
    weeklyWorkDays,
    weeklyEarnings,
    weeklyPayoutsTotal,
    netBalance,
    weekStart,
    resetWeek,
  } = useAppData();

  const [rateModalVisible, setRateModalVisible] = useState(false);

  const handleRateSubmit = async ({ amount }) => {
    const success = await updateDailyRate(amount);
    if (success) setRateModalVisible(false);
  };

  const handleResetWeek = () => {
    Alert.alert(
      'تصفير الأسبوع الحالي',
      'سيتم أرشفة بيانات هذا الأسبوع وبدء أسبوع جديد فارغ. هل أنت متأكد؟',
      [
        { text: 'تراجع', style: 'cancel' },
        {
          text: 'تصفير وبدء أسبوع جديد',
          style: 'destructive',
          onPress: resetWeek,
        },
      ]
    );
  };

  const handleToggleToday = () => {
    toggleToday();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* الترويسة */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.rateChip}
            onPress={() => setRateModalVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={14} color={COLORS.primary} />
            <Text style={styles.rateChipText}>
              {formatCurrency(dailyRate)} / يوم
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>أهلاً بك 👋</Text>
            <Text style={styles.headerTitle}>متابعة أجر اليومية</Text>
          </View>
        </View>

        {/* نطاق الأسبوع الحالي */}
        <View style={styles.weekRangeBox}>
          <Text style={styles.weekRangeText}>
            الأسبوع الحالي: من {formatArabicDateWithDay(weekStart)} إلى{' '}
            {formatArabicDateWithDay(getWeekEndKey(weekStart))}
          </Text>
        </View>

        {/* زر تسجيل اليوم */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleToggleToday}
          style={[
            styles.todayCard,
            isTodayLogged && styles.todayCardLogged,
          ]}
        >
          <View style={styles.todayIconWrapper}>
            <Ionicons
              name={isTodayLogged ? 'checkmark-circle' : 'add-circle-outline'}
              size={34}
              color={isTodayLogged ? COLORS.primary : COLORS.textPrimary}
            />
          </View>
          <View style={styles.todayTextWrapper}>
            <Text style={styles.todayTitle}>
              {isTodayLogged ? 'تم تسجيل عمل اليوم ✅' : 'تسجيل عمل اليوم'}
            </Text>
            <Text style={styles.todaySubtitle}>
              {isTodayLogged
                ? 'اضغط هنا لإلغاء تسجيل اليوم إذا كان بالخطأ'
                : `${formatArabicDateWithDay(getTodayKey())} — بأجر ${formatCurrency(dailyRate)}`}
            </Text>
          </View>
        </TouchableOpacity>

        {/* البطاقات الإحصائية */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="calendar-outline"
            iconColor={COLORS.info}
            iconBackground={COLORS.infoSoft}
            label="أيام العمل هذا الأسبوع"
            value={`${weeklyWorkDays.length} يوم`}
          />
          <StatCard
            icon="cash-outline"
            iconColor={COLORS.primary}
            iconBackground={COLORS.primarySoft}
            label="إجمالي أرباح الأسبوع"
            value={formatCurrency(weeklyEarnings)}
          />
          <StatCard
            icon="wallet-outline"
            iconColor={COLORS.warning}
            iconBackground={COLORS.warningSoft}
            label="إجمالي السلف المستلمة"
            value={formatCurrency(weeklyPayoutsTotal)}
          />
          <StatCard
            icon="receipt-outline"
            iconColor={netBalance >= 0 ? COLORS.primary : COLORS.danger}
            iconBackground={netBalance >= 0 ? COLORS.primarySoft : COLORS.dangerSoft}
            label="الرصيد المتبقي"
            value={formatCurrency(netBalance)}
            valueColor={netBalance >= 0 ? COLORS.primary : COLORS.danger}
          />
        </View>

        {/* تصفير الأسبوع */}
        <View style={styles.resetSection}>
          <PrimaryButton
            label="تصفير الأسبوع وبدء أسبوع جديد"
            icon="refresh-outline"
            variant="soft"
            onPress={handleResetWeek}
          />
        </View>
      </ScrollView>

      <FormModal
        visible={rateModalVisible}
        title="تعديل الأجر اليومي"
        amountLabel="الأجر اليومي (ل.س)"
        initialAmount={dailyRate}
        showNote={false}
        confirmLabel="حفظ الأجر"
        onClose={() => setRateModalVisible(false)}
        onSubmit={handleRateSubmit}
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
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl * 2,
  },
  headerRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: FONT.size.sm,
    textAlign: 'right',
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.extrabold,
    textAlign: 'right',
    marginTop: 2,
  },
  rateChip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  rateChipText: {
    color: COLORS.primary,
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.semibold,
    marginRight: 4,
  },
  weekRangeBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  weekRangeText: {
    color: COLORS.textSecondary,
    fontSize: FONT.size.xs,
    textAlign: 'right',
  },
  todayCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOW.card,
  },
  todayCardLogged: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },
  todayIconWrapper: {
    marginLeft: SPACING.md,
  },
  todayTextWrapper: {
    flex: 1,
  },
  todayTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.size.lg,
    fontWeight: FONT.weight.bold,
    textAlign: 'right',
  },
  todaySubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT.size.xs,
    marginTop: 4,
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resetSection: {
    marginTop: SPACING.md,
  },
});
