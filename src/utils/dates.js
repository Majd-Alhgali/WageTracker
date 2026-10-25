// src/utils/dates.js
// دوال مساعدة للتعامل مع التواريخ والأسابيع

const ARABIC_DAY_NAMES = [
  'الأحد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];

const ARABIC_MONTH_NAMES = [
  'كانون الثاني',
  'شباط',
  'آذار',
  'نيسان',
  'أيار',
  'حزيران',
  'تموز',
  'آب',
  'أيلول',
  'تشرين الأول',
  'تشرين الثاني',
  'كانون الأول',
];

/**
 * إرجاع تاريخ اليوم بصيغة YYYY-MM-DD (بدون توقيت) كمعرّف فريد لليوم
 */
export function getTodayKey() {
  return toDateKey(new Date());
}

/**
 * تحويل كائن Date إلى مفتاح نصي YYYY-MM-DD
 */
export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * تحويل مفتاح YYYY-MM-DD إلى كائن Date
 */
export function fromDateKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * اسم اليوم بالعربية (الأحد، الإثنين، ...)
 */
export function getArabicDayName(dateKey) {
  const date = fromDateKey(dateKey);
  return ARABIC_DAY_NAMES[date.getDay()];
}

/**
 * تنسيق التاريخ بصيغة عربية مقروءة: "25 تشرين الأول 2026"
 */
export function formatArabicDate(dateKey) {
  const date = fromDateKey(dateKey);
  return `${date.getDate()} ${ARABIC_MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * تنسيق تاريخ مع اسم اليوم: "الأحد، 25 تشرين الأول"
 */
export function formatArabicDateWithDay(dateKey) {
  const date = fromDateKey(dateKey);
  return `${ARABIC_DAY_NAMES[date.getDay()]}، ${date.getDate()} ${ARABIC_MONTH_NAMES[date.getMonth()]}`;
}

/**
 * إرجاع بداية الأسبوع الحالي (يوم السبت) كمفتاح تاريخ
 * الأسبوع في سوريا يبدأ عادة يوم السبت وينتهي يوم الجمعة
 */
export function getWeekStartKey(referenceDate = new Date()) {
  const date = new Date(referenceDate);
  const day = date.getDay(); // 0 = الأحد ... 6 = السبت
  // المسافة بالأيام إلى آخر يوم سبت
  const diffToSaturday = (day + 1) % 7;
  date.setDate(date.getDate() - diffToSaturday);
  date.setHours(0, 0, 0, 0);
  return toDateKey(date);
}

/**
 * إرجاع نهاية الأسبوع (الجمعة) انطلاقاً من مفتاح بداية الأسبوع
 */
export function getWeekEndKey(weekStartKey) {
  const start = fromDateKey(weekStartKey);
  start.setDate(start.getDate() + 6);
  return toDateKey(start);
}

/**
 * التحقق إن كان تاريخ معيّن يقع ضمن الأسبوع (من بداية الأسبوع إلى نهايته شاملاً)
 */
export function isDateInWeek(dateKey, weekStartKey) {
  const weekEndKey = getWeekEndKey(weekStartKey);
  return dateKey >= weekStartKey && dateKey <= weekEndKey;
}

/**
 * تنسيق مبلغ مالي بالفواصل الألفية مع "ل.س" كعملة
 */
export function formatCurrency(amount) {
  const value = Math.round(Number(amount) || 0);
  const formatted = value.toLocaleString('en-US');
  return `${formatted} ل.س`;
}
