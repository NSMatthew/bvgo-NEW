import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// Sample data for events
const eventsData = [
  { id: '1', type: 'In-house', guest: 'McKenzie', guestsCount: 4, property: 'Villa - Rain Villa Uluwatu', time: '12:00', date: '30 May' },
  { id: '2', type: 'Check Out', guest: 'Noel', guestsCount: 2, property: 'Villa - Uluwatu Village House', time: '12:00', date: '30 May' },
  { id: '3', type: 'Check In', guest: 'Peter John', guestsCount: 2, property: 'Villa - Maharaja Residence', time: '14:00', date: '30 May' },
  { id: '4', type: 'In-house', guest: 'Joestar', guestsCount: 1, property: 'Villa - Villa Miracle', time: '12:00', date: '31 May' },
];

// Color map for event types
const eventColors: Record<string, string> = {
  'In-house': '#078564',  
  'Check Out': '#F69322', 
  'Check In': '#1076BC',  
};

const filters = ['All', 'In-house', 'Check In', 'Check Out', 'Others'];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter events based on activeFilter
  const filteredEvents = activeFilter === 'All' ? eventsData : eventsData.filter(event => {
    if (activeFilter === 'In-house') return event.type === 'In-house';
    if (activeFilter === 'In-house') {
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
          <View style={[styles.card, { backgroundColor: eventColors[item.type] || '#FFF' }]}>
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
    flexGrow: 0,
  },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0', 
    marginTop: 7,
    marginRight: 12,
    backgroundColor: '#F5F5F5', 
    alignSelf: 'flex-start',
  },
  filterBtnActive: {
    backgroundColor: '#1076BC',
    borderColor: '#1076BC',
  },
  filterText: {
    fontSize: 14,
    color: '#5B5E6B',
    fontFamily: 'Satoshi-Medium',
  },
  filterTextActive: {
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