// src/components/BottomTabBar.js
// شريط تنقّل سفلي بسيط ومبني يدوياً (بدون مكتبة تنقّل خارجية)
// لضمان تشغيل فوري بدون أخطاء استيراد

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT, RADIUS } from '../constants/theme';

const TABS = [
  { key: 'dashboard', label: 'الرئيسية', icon: 'home', iconOutline: 'home-outline' },
  { key: 'payouts', label: 'السلف', icon: 'wallet', iconOutline: 'wallet-outline' },
  { key: 'dayLog', label: 'سجل الأيام', icon: 'list', iconOutline: 'list-outline' },
];

export default function BottomTabBar({ activeTab, onChangeTab }) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.wrapper}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              activeOpacity={0.7}
              onPress={() => onChangeTab(tab.key)}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && styles.iconWrapperActive,
                ]}
              >
                <Ionicons
                  name={isActive ? tab.icon : tab.iconOutline}
                  size={21}
                  color={isActive ? COLORS.primary : COLORS.textMuted}
                />
              </View>
              <Text
                style={[styles.label, isActive && styles.labelActive]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.surface,
  },
  wrapper: {
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceBorder,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 30,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: COLORS.primarySoft,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: FONT.size.xs,
    marginTop: 3,
    fontWeight: FONT.weight.medium,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: FONT.weight.semibold,
  },
});
