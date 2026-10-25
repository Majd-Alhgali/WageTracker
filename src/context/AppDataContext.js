// src/context/AppDataContext.js
// مُزوّد الحالة المركزية للتطبيق: معدّل الأجر، أيام العمل، السلف، والأسبوع الحالي

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';
import {
  getTodayKey,
  getWeekStartKey,
  isDateInWeek,
} from '../utils/dates';

const DEFAULT_DAILY_RATE = 100000;

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dailyRate, setDailyRate] = useState(DEFAULT_DAILY_RATE);
  const [workDays, setWorkDays] = useState([]); // [{ id, date, amount, note }]
  const [payouts, setPayouts] = useState([]); // [{ id, date, amount, note }]
  const [weekStart, setWeekStart] = useState(getWeekStartKey());

  // تحميل البيانات المحفوظة عند بدء التشغيل
  useEffect(() => {
    (async () => {
      const [savedRate, savedDays, savedPayouts, savedWeekStart] =
        await Promise.all([
          getItem(STORAGE_KEYS.DAILY_RATE, DEFAULT_DAILY_RATE),
          getItem(STORAGE_KEYS.WORK_DAYS, []),
          getItem(STORAGE_KEYS.PAYOUTS, []),
          getItem(STORAGE_KEYS.WEEK_START, null),
        ]);

      setDailyRate(savedRate);
      setWorkDays(savedDays);
      setPayouts(savedPayouts);
      setWeekStart(savedWeekStart || getWeekStartKey());

      if (!savedWeekStart) {
        await setItem(STORAGE_KEYS.WEEK_START, getWeekStartKey());
      }

      setIsLoading(false);
    })();
  }, []);

  // ---------- معدّل الأجر اليومي ----------
  const updateDailyRate = useCallback(async (newRate) => {
    const parsed = Number(newRate);
    if (!parsed || parsed <= 0) {
      Alert.alert('قيمة غير صالحة', 'الرجاء إدخال قيمة أجر يومي صحيحة أكبر من الصفر.');
      return false;
    }
    setDailyRate(parsed);
    await setItem(STORAGE_KEYS.DAILY_RATE, parsed);
    return true;
  }, []);

  // ---------- أيام العمل ----------
  const getDayEntry = useCallback(
    (dateKey) => workDays.find((d) => d.date === dateKey),
    [workDays]
  );

  const toggleToday = useCallback(async () => {
    const todayKey = getTodayKey();
    const existing = workDays.find((d) => d.date === todayKey);

    if (existing) {
      Alert.alert(
        'تم تسجيل اليوم مسبقاً',
        'هل تريد إلغاء تسجيل يوم العمل لهذا اليوم؟',
        [
          { text: 'تراجع', style: 'cancel' },
          {
            text: 'إلغاء التسجيل',
            style: 'destructive',
            onPress: async () => {
              const updated = workDays.filter((d) => d.date !== todayKey);
              setWorkDays(updated);
              await setItem(STORAGE_KEYS.WORK_DAYS, updated);
            },
          },
        ]
      );
      return;
    }

    const newEntry = {
      id: `${todayKey}-${Date.now()}`,
      date: todayKey,
      amount: dailyRate,
      note: '',
    };
    const updated = [...workDays, newEntry].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    setWorkDays(updated);
    await setItem(STORAGE_KEYS.WORK_DAYS, updated);
  }, [workDays, dailyRate]);

  const addOrUpdateWorkDay = useCallback(
    async (dateKey, amount, note = '') => {
      const existingIndex = workDays.findIndex((d) => d.date === dateKey);
      let updated;
      if (existingIndex >= 0) {
        updated = [...workDays];
        updated[existingIndex] = {
          ...updated[existingIndex],
          amount: Number(amount),
          note,
        };
      } else {
        updated = [
          ...workDays,
          {
            id: `${dateKey}-${Date.now()}`,
            date: dateKey,
            amount: Number(amount),
            note,
          },
        ].sort((a, b) => a.date.localeCompare(b.date));
      }
      setWorkDays(updated);
      await setItem(STORAGE_KEYS.WORK_DAYS, updated);
    },
    [workDays]
  );

  const deleteWorkDay = useCallback(
    async (id) => {
      const updated = workDays.filter((d) => d.id !== id);
      setWorkDays(updated);
      await setItem(STORAGE_KEYS.WORK_DAYS, updated);
    },
    [workDays]
  );

  // ---------- السلف والمدفوعات ----------
  const addPayout = useCallback(
    async (amount, note, dateKey) => {
      const parsed = Number(amount);
      if (!parsed || parsed <= 0) {
        Alert.alert('قيمة غير صالحة', 'الرجاء إدخال مبلغ صحيح أكبر من الصفر.');
        return false;
      }
      const newPayout = {
        id: `payout-${Date.now()}`,
        date: dateKey || getTodayKey(),
        amount: parsed,
        note: note?.trim() || '',
      };
      const updated = [newPayout, ...payouts].sort((a, b) =>
        b.date.localeCompare(a.date)
      );
      setPayouts(updated);
      await setItem(STORAGE_KEYS.PAYOUTS, updated);
      return true;
    },
    [payouts]
  );

  const deletePayout = useCallback(
    async (id) => {
      const updated = payouts.filter((p) => p.id !== id);
      setPayouts(updated);
      await setItem(STORAGE_KEYS.PAYOUTS, updated);
    },
    [payouts]
  );

  // ---------- إعادة تعيين الأسبوع ----------
  const resetWeek = useCallback(async () => {
    const newWeekStart = getWeekStartKey();
    setWeekStart(newWeekStart);
    setWorkDays([]);
    setPayouts([]);
    await Promise.all([
      setItem(STORAGE_KEYS.WEEK_START, newWeekStart),
      setItem(STORAGE_KEYS.WORK_DAYS, []),
      setItem(STORAGE_KEYS.PAYOUTS, []),
    ]);
  }, []);

  // ---------- حسابات مشتقة ----------
  const weeklyWorkDays = useMemo(
    () => workDays.filter((d) => isDateInWeek(d.date, weekStart)),
    [workDays, weekStart]
  );

  const weeklyPayouts = useMemo(
    () => payouts.filter((p) => isDateInWeek(p.date, weekStart)),
    [payouts, weekStart]
  );

  const weeklyEarnings = useMemo(
    () => weeklyWorkDays.reduce((sum, d) => sum + Number(d.amount || 0), 0),
    [weeklyWorkDays]
  );

  const weeklyPayoutsTotal = useMemo(
    () => weeklyPayouts.reduce((sum, p) => sum + Number(p.amount || 0), 0),
    [weeklyPayouts]
  );

  const netBalance = useMemo(
    () => weeklyEarnings - weeklyPayoutsTotal,
    [weeklyEarnings, weeklyPayoutsTotal]
  );

  const isTodayLogged = useMemo(
    () => workDays.some((d) => d.date === getTodayKey()),
    [workDays]
  );

  const sortedWorkDaysDesc = useMemo(
    () => [...workDays].sort((a, b) => b.date.localeCompare(a.date)),
    [workDays]
  );

  const value = {
    isLoading,
    dailyRate,
    updateDailyRate,
    workDays,
    sortedWorkDaysDesc,
    getDayEntry,
    toggleToday,
    addOrUpdateWorkDay,
    deleteWorkDay,
    payouts,
    addPayout,
    deletePayout,
    weekStart,
    resetWeek,
    weeklyWorkDays,
    weeklyPayouts,
    weeklyEarnings,
    weeklyPayoutsTotal,
    netBalance,
    isTodayLogged,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData يجب أن يُستخدم داخل AppDataProvider');
  }
  return ctx;
}
