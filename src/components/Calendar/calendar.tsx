import React, { useState } from 'react';
import { Image } from 'react-native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Type for booking
type Booking = {
  propertyId: string;
  date: string;
  guest: string;
  sourceIcon: any | null;
};

// Generate 30 days from today
const generateDates = (startDate: Date, numDays: number): string[] => {
  const result = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    result.push(
      date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      })
    );
  }
  return result;
};

const today = new Date();
const dates = generateDates(today, 30); // 30-day scrollable range

const properties = [
  { id: '1', name: 'Dar Dahlia – Villa' },
  { id: '2', name: 'Dar Ula – Villa' },
  { id: '3', name: 'Serayu Berawa' },
  { id: '4', name: 'Serayu Mertanadi' },
];

const bookings: Booking[] = [
  {
    propertyId: '1',
    date: '19 May',
    guest: 'Craig',
    sourceIcon: require('/assets/icons/airbnb.png'),
  },
  {
    propertyId: '2',
    date: '19 May',
    guest: 'Anais Fassia',
    sourceIcon: require('/assets/icons/airbnb.png'),
  },
  {
    propertyId: '4',
    date: '21 May',
    guest: 'QTMA8ZE3',
    sourceIcon: null,
  },
];

const BookingCalendarScreen = () => {
  const [activeTab, setActiveTab] = useState<'Events' | 'Calendar'>('Calendar');

  const getBooking = (propertyId: string, date: string): Booking | undefined => {
    return bookings.find((b) => b.propertyId === propertyId && b.date === date);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Events')}>
          <Text style={[styles.tab, activeTab === 'Events' && styles.tabActive]}>
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Calendar')}>
          <Text style={[styles.tab, activeTab === 'Calendar' && styles.tabActive]}>
            Calendar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Month Selector */}
      <View style={styles.monthSelector}>
        <TouchableOpacity>
          <Text>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>May 2025 ▼</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Grid */}
      <ScrollView style={{ flex: 1 }}>
        <ScrollView horizontal>
          <View>
            {/* Dates Header */}
            <View style={styles.row}>
              <View style={[styles.propertyCell, { backgroundColor: '#eee' }]}>
                <Text></Text>
              </View>
              {dates.map((date) => (
                <View key={date} style={styles.dateCell}>
                  <Text>{date}</Text>
                </View>
              ))}
            </View>

            {/* Properties Rows */}
            {properties.map((property) => (
              <View key={property.id} style={styles.row}>
                <View style={styles.propertyCell}>
                  <Text style={{ fontWeight: 'bold' }}>{property.name}</Text>
                  <Text style={{ color: 'orange' }}>{'>'}</Text>
                </View>
                {dates.map((date) => {
                  const booking = getBooking(property.id, date);
                  return (
                    <View key={date} style={styles.bookingCell}>
                      {booking && (
                        <View style={styles.bookingInfo}>
                          {booking.sourceIcon && (
                            <Image
                              source={booking.sourceIcon}
                              style={styles.icon}
                            />
                          )}
                          <Text numberOfLines={1} style={{ flexShrink: 1 }}>
                            {booking.guest}
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: { marginHorizontal: 20, fontSize: 16, color: 'gray' },
  tabActive: {
    color: 'black',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: 'black',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    height: 40,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  propertyCell: {
    width: 150,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateCell: {
    width: 100,
    height: 50,
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingCell: {
    width: 100,
    height: 50,
    padding: 5,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9eaea',
    padding: 4,
    borderRadius: 4,
  },
  icon: { width: 20, height: 20, marginRight: 5 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: '#008CBA',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default BookingCalendarScreen;