import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// Sample data for events
const eventsData = [
  { id: '1', type: 'In-house', guest: 'Phrisella Elstar', guestsCount: 8, property: 'Villa - Villa Benaya', time: '12:00', date: '30 May' },
  { id: '2', type: 'Check Out', guest: 'Insaf Ali Rachedi', guestsCount: 2, property: 'Villa - Pondok Lofty', time: '12:00', date: '30 May' },
  { id: '3', type: 'Check In', guest: 'Cheng Li', guestsCount: 2, property: 'Villa - Pondok Lofty', time: '14:00', date: '30 May' },
  { id: '4', type: 'In-house', guest: 'Phrisella Elstar', guestsCount: 8, property: 'Villa - Villa Benaya', time: '12:00', date: '31 May' },
];

// Color map for event types
const eventColors: Record<string, string> = {
  'In-house': '#009688',  // green-ish
  'Check Out': '#FF9800', // orange-ish
  'Check In': '#2196F3',  // blue-ish
};

const filters = ['All', 'Booking', 'Today', 'Others'];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter events based on activeFilter
  const filteredEvents = activeFilter === 'All' ? eventsData : eventsData.filter(event => {
    if (activeFilter === 'Booking') return event.type === 'In-house'; // Example mapping
    if (activeFilter === 'Today') {
      const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      return event.date === todayStr;
    }
    if (activeFilter === 'Others') return !['In-house', 'Check In', 'Check Out'].includes(event.type);
    return event.type === activeFilter;
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Filter buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterBtn, activeFilter === filter && styles.filterBtnActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events list */}
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        style={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: eventColors[item.type] || '#ccc' }]}>
            <View style={styles.cardHeader}>
              <View style={styles.typeTag}>
                <Text style={styles.typeTagText}>{item.type}</Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

            <Text style={styles.guestText}>
              <Text style={{ fontWeight: 'bold' }}>{item.guest}</Text> • {item.guestsCount} Guest{item.guestsCount > 1 ? 's' : ''}
            </Text>
            <Text style={styles.propertyText}>{item.property}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  filterBtn: {
    // --- PERUBAHAN DI SINI: UKURAN DIBUAT LEBIH KECIL ---
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20, // Dibuat lebih melengkung agar terlihat seperti pil
    borderWidth: 1,
    borderColor: '#E0E0E0', // Warna border lebih soft
    marginRight: 12,
    backgroundColor: '#F5F5F5', // Warna latar belakang non-aktif
  },
  filterBtnActive: {
    // --- PERUBAHAN DI SINI: WARNA AKTIF DISESUAIKAN ---
    backgroundColor: '#1076BC',
    borderColor: '#1076BC',
  },
  filterText: {
    fontSize: 14,
    color: '#5B5E6B', // Warna teks non-aktif
    fontFamily: 'Satoshi-Medium', // Menggunakan font kustom jika ada
  },
  filterTextActive: {
    // --- PERUBAHAN DI SINI: WARNA TEKS AKTIF DISESUAIKAN ---
    color: '#FFFFFF',
    fontFamily: 'Satoshi-Bold',
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  typeTag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeText: {
    color: '#fff',
    fontWeight: '600',
  },
  guestText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
  },
  propertyText: {
    color: '#d9f0ea',
    fontSize: 14,
  },
});

export default Events;