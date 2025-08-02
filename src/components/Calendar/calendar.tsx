import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

// --- 1. PERBARUI TIPE DATA BOOKING ---
// Tambahkan properti 'source' untuk platform (Airbnb, Booking.com, dll.)
type BookingSource = 'Airbnb' | 'Booking.com';

type Booking = {
  id: string;
  propertyId: string;
  guest: string;
  startDate: string;
  endDate: string;
  source: BookingSource;
};

// --- DATA DUMMY DIPERBARUI DENGAN 'source' ---
const properties = [
  { id: '1', name: 'Rain Villa Uluwatu' },
  { id: '2', name: 'Uluwatu Village House' },
  { id: '3', name: 'Maharaja Residence' },
  { id: '4', name: 'Hattala Villa' },
];

const bookings: Booking[] = [
  { id: 'b1', propertyId: '1', guest: 'Mckenzi', startDate: '2025-07-21', endDate: '2025-07-22', source: 'Airbnb' },
  { id: 'b2', propertyId: '2', guest: 'Noel', startDate: '2025-07-21', endDate: '2025-07-22', source: 'Booking.com' },
  { id: 'b3', propertyId: '3', guest: 'Peter John', startDate: '2025-07-22', endDate: '2025-07-23', source: 'Booking.com' },
  { id: 'b4', propertyId: '4', guest: 'Jacob', startDate: '2025-08-24', endDate: '2025-08-25', source: 'Airbnb' },
  { id: 'b5', propertyId: '1', guest: 'Sarah', startDate: '2025-06-20', endDate: '2025-06-22', source: 'Airbnb' },
];

const bookingSourceStyles = {
  'Airbnb': {
    backgroundColor: '#FCEAEA', 
    textColor: '#C93B3B',
    icon: require('../../assets/icons/airbnb.png'),
  },
  'Booking.com': {
    backgroundColor: '#E8F1F8', 
    textColor: '#1076BC',
    icon: require('../../assets/icons/bookingcom.png'), 
  },
};

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-07-21'));

  // --- 3. BUAT FUNGSI UNTUK MENGUBAH BULAN ---
  const handleMonthChange = (months: number) => {
    const newDate = new Date(currentDate);
    // setMonth akan secara otomatis menangani pergantian tahun
    newDate.setMonth(newDate.getMonth() + months);
    setCurrentDate(newDate);
  };

  const getVisibleDates = () => {
    const dates = [];
    for (let i = 0; i <= 5; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const visibleDates = getVisibleDates();
  const today = new Date();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* --- 4. HUBUNGKAN FUNGSI BARU KE TOMBOL --- */}
        <TouchableOpacity onPress={() => handleMonthChange(-1)}>
          <Image source={require('../../assets/icons/arrowbacktologin.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.monthSelector}>
          <Text style={styles.monthText}>
            {currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMonthChange(1)}>
          <Image source={require('../../assets/icons/arrowbacktologin.png')} style={[styles.headerIcon, { transform: [{ rotate: '180deg' }] }]}/>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.gridContainer}>
          <View style={styles.propertyColumn}>
            <View style={styles.headerCell} />
            {properties.map(prop => (
              <View key={prop.id} style={styles.propertyCell}>
                <Text style={styles.propertyText}>{prop.name}</Text>
              </View>
            ))}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.dateHeaderRow}>
                {visibleDates.map((date, index) => {
                  const isToday = date.toDateString() === today.toDateString();
                  return (
                    <View key={index} style={[styles.dateHeaderCell, isToday && styles.dateHeaderCellActive]}>
                      <Text style={[styles.dateHeaderText, isToday && styles.dateHeaderTextActive]}>
                        {date.toLocaleDateString('en-GB', { day: '2-digit' })} {date.toLocaleDateString('en-GB', { month: 'short' })}
                      </Text>
                    </View>
                  )
                })}
              </View>
              {properties.map(prop => (
                <View key={prop.id} style={styles.bookingRow}>
                  {visibleDates.map((date, dateIndex) => {
                    const booking = bookings.find(b => 
                        b.propertyId === prop.id &&
                        new Date(b.startDate) <= date &&
                        new Date(b.endDate) > date
                    );
                    return (
                      <View key={dateIndex} style={styles.bookingCell}>
                        {booking && (() => {
                          const sourceStyle = bookingSourceStyles[booking.source];
                          return (
                           <View style={[styles.bookingBlock, { backgroundColor: sourceStyle.backgroundColor }]}>
                             <Image source={sourceStyle.icon} style={styles.bookingIcon} />
                             <Text style={[styles.bookingText, { color: sourceStyle.textColor }]} numberOfLines={1}>
                               {booking.guest}
                             </Text>
                           </View>
                          )
                        })()}
                      </View>
                    )
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Image 
          source={require('../../assets/icons/pluscalendar.png')} 
          style={styles.fabIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 18,
    color: '#0E0E0E',
    marginRight: 4,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  propertyColumn: {
    width: 150,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  headerCell: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  propertyCell: {
    height: 60,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  propertyText: {
    fontFamily: 'Satoshi-Medium',
    color: '#0E0E0E',
  },
  dateHeaderRow: {
    flexDirection: 'row',
  },
  dateHeaderCell: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dateHeaderCellActive: {
    backgroundColor: '#E8F1F8',
  },
  dateHeaderText: {
    fontFamily: 'Satoshi-Medium',
    color: '#5B5E6B',
  },
  dateHeaderTextActive: {
    fontFamily: 'Satoshi-Bold',
    color: '#1076BC',
  },
  bookingRow: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  bookingCell: {
    width: 120,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  bookingBlock: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookingIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  bookingText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1076BC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#0E0E0E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
});

export default CalendarView;