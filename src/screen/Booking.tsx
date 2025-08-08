import React, { useState } from 'react';
// --- 1. IMPORT SafeAreaView ---
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import CalendarTabs from '../components/Calendar';

const Booking = () => {
  const [activeTab, setActiveTab] = useState<'Events' | 'Calendar'>('Events');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Booking</Text>
      </View>

      {/* Tab Switch */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Events' && styles.tabActive]}
          onPress={() => setActiveTab('Events')}
        >
          <Text style={[styles.tabText, activeTab === 'Events' && styles.tabTextActive]}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Calendar' && styles.tabActive]}
          onPress={() => setActiveTab('Calendar')}
        >
          <Text style={[styles.tabText, activeTab === 'Calendar' && styles.tabTextActive]}>Calendar</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <CalendarTabs activeTab={activeTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#FFF', // Menambahkan warna latar belakang
  },
  // --- 4. TAMBAHKAN STYLE UNTUK HEADER ---
  header: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1076BC',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  tabButton: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  tabActive: {
    backgroundColor: '#1076BC', // Menggunakan warna biru konsisten
  },
  tabText: {
    fontSize: 16,
    color: '#5B5E6B',
    fontFamily: 'Satoshi-Medium',
  },
  tabTextActive: {
    color: '#FFF',
    fontFamily: 'Satoshi-Bold',
  },
});

export default Booking;