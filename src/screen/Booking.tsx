import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CalendarTabs from '../components/Calendar';

const Booking = () => {
  const [activeTab, setActiveTab] = useState<'Events' | 'Calendar'>('Events');

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  tabButton: {
    marginHorizontal: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  tabActive: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Booking;