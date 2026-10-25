// App.js
// نقطة الدخول الرئيسية للتطبيق
// تطبيق "يومية عامل" — تتبّع أجر العمل اليومي والسلف والرصيد الأسبوعي

import React, { useEffect, useState } from 'react';
import { I18nManager, StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import { COLORS } from './src/constants/theme';
import { AppDataProvider, useAppData } from './src/context/AppDataContext';
import LoadingScreen from './src/screens/LoadingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import PayoutsScreen from './src/screens/PayoutsScreen';
import DayLogScreen from './src/screens/DayLogScreen';
import BottomTabBar from './src/components/BottomTabBar';

// محاولة إبقاء شاشة البداية ظاهرة حتى تجهز البيانات (قد تفشل بصمت على بعض المنصات، وهذا مقبول)
SplashScreen.preventAutoHideAsync().catch(() => {});

// فرض اتجاه RTL على مستوى نظام React Native
// ملاحظة: على بعض الأجهزة قد يتطلب هذا إعادة تشغيل التطبيق لتفعيل الاتجاه الفعلي للواجهة الأصلية،
// لكننا نضمن محاذاة النصوص والعناصر يدوياً داخل كل شاشة بغض النظر عن ذلك.
if (!I18nManager.isRTL) {
  try {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  } catch (error) {
    console.warn('تعذّر فرض اتجاه RTL:', error);
  }
}

function AppContent() {
  const { isLoading } = useAppData();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  let ScreenComponent = DashboardScreen;
  if (activeTab === 'payouts') ScreenComponent = PayoutsScreen;
  if (activeTab === 'dayLog') ScreenComponent = DayLogScreen;

  return (
    <View style={styles.flex}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={styles.flex}>
        <ScreenComponent />
      </View>
      <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppDataProvider>
        <AppContent />
      </AppDataProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
