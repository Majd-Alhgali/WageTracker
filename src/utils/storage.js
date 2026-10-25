// src/utils/storage.js
// طبقة تجريدية فوق AsyncStorage لتخزين كل بيانات التطبيق محلياً

import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  DAILY_RATE: '@wage_tracker/daily_rate',
  WORK_DAYS: '@wage_tracker/work_days',
  PAYOUTS: '@wage_tracker/payouts',
  WEEK_START: '@wage_tracker/week_start',
  ARCHIVED_WEEKS: '@wage_tracker/archived_weeks',
};

/**
 * قراءة قيمة JSON من التخزين المحلي
 */
export async function getItem(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`خطأ في قراءة المفتاح ${key}:`, error);
    return fallback;
  }
}

/**
 * كتابة قيمة JSON إلى التخزين المحلي
 */
export async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`خطأ في حفظ المفتاح ${key}:`, error);
    return false;
  }
}

/**
 * حذف مفتاح من التخزين المحلي
 */
export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`خطأ في حذف المفتاح ${key}:`, error);
    return false;
  }
}
