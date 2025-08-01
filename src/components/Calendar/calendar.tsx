import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
// --- Icon di-comment karena tidak digunakan lagi ---
// import Icon from 'react-native-vector-icons/Ionicons';

// --- DATA DUMMY UNTUK TAMPILAN ---
const properties = [
  { id: '1', name: 'Rain Villa Uluwatu' },
  { id: '2', name: 'Rain Villa Uluwatu' },
  { id: '3', name: 'Rain Villa Uluwatu' },
  { id: '4', name: 'Rain Villa Uluwatu' },
];

const bookings = [
  { id: 'b1', propertyId: '1', guest: 'Mckenzi McEwen - HM5...', startDate: '2025-07-21', endDate: '2025-07-23' },
  { id: 'b2', propertyId: '2', guest: 'Noelleda Ah San - HMY...', startDate: '2025-07-21', endDate: '2025-07-22' },
];

// --- KOMPONEN UTAMA ---
const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-07-21'));

  const getVisibleDates = () => {
    const dates = [];
    for (let i = -1; i <= 1; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const visibleDates = getVisibleDates();

  return (
    <View style={styles.container}>
      {/* Header Kalender */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* --- PERUBAHAN DI SINI --- */}
          <Image source={require('../../assets/icons/arrowbacktologin.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.monthSelector}>
          <Text style={styles.monthText}>July 2025</Text>
          {/* --- PERUBAHAN DI SINI --- */}
          <Image source={require('../../assets/icons/arrow-down.png')} style={styles.monthIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* --- PERUBAHAN DI SINI --- */}
          <Image source={require('../../assets/icons/arrow-forward.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* Grid Utama */}
      <ScrollView>
        <View style={styles.gridContainer}>
          {/* Kolom Nama Properti */}
          <View style={styles.propertyColumn}>
            <View style={styles.headerCell} />
            {properties.map(prop => (
              <View key={prop.id} style={styles.propertyCell}>
                <Text style={styles.propertyText}>{prop.name}</Text>
                {/* --- PERUBAHAN DI SINI --- */}
                <Image source={require('../../assets/icons/arrow-forward-blue.png')} style={styles.propertyArrowIcon} />
              </View>
            ))}
          </View>

          {/* Kolom Tanggal (Bisa di-scroll horizontal) */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.dateHeaderRow}>
                {visibleDates.map((date, index) => (
                  <View key={index} style={[styles.dateHeaderCell, index === 1 && styles.dateHeaderCellActive]}>
                    <Text style={[styles.dateHeaderText, index === 1 && styles.dateHeaderTextActive]}>
                      {date.toLocaleDateString('en-GB', { day: '2-digit' })} Jul
                    </Text>
                  </View>
                ))}
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
                        {booking && (
                           <View style={styles.bookingBlock}>
                             <Image source={require('../../assets/icons/airbnb.png')} style={styles.bookingIcon} />
                             <Text style={styles.bookingText} numberOfLines={1}>{booking.guest}</Text>
                           </View>
                        )}
                      </View>
                    )
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
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
  // --- STYLE BARU UNTUK IKON GAMBAR DI HEADER ---
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
  // --- STYLE BARU UNTUK IKON GAMBAR DI PEMILIH BULAN ---
  monthIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  propertyText: {
    fontFamily: 'Satoshi-Medium',
    color: '#0E0E0E',
    flex: 1,
  },
  // --- STYLE BARU UNTUK IKON PANAH DI SEL PROPERTI ---
  propertyArrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
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
  },
  bookingBlock: {
    backgroundColor: '#FCEAEA',
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
    color: '#C93B3B',
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
    shadowColor: '#000',
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