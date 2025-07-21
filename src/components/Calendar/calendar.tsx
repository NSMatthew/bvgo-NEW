import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// --- DATA DUMMY UNTUK TAMPILAN ---
// Nantinya, ini bisa diambil dari database Anda
const properties = [
  { id: '1', name: 'Rain Villa Uluwatu' },
  { id: '2', name: 'Rain Villa Uluwatu' },
  { id: '3', name: 'Rain Villa Uluwatu' },
  { id: '4', name: 'Rain Villa Uluwatu' },
];

const bookings = [
  { id: 'b1', propertyId: '1', guest: 'Mckenzi McEwen - HM5...', startDate: '2025-07-21', endDate: '2025-07-23' },
  { id: 'b2', propertyId: '2', guest: 'Noelleda Ah San - HMY...', startDate: '2025-07-21', endDate: '2025-07-22' },
  // Tambahkan booking lain di sini
];

// --- KOMPONEN UTAMA ---
const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-07-21'));

  // Fungsi untuk membuat 3 tanggal yang akan ditampilkan
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
          <Icon name="chevron-back" size={24} color="#0E0E0E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.monthSelector}>
          <Text style={styles.monthText}>July 2025</Text>
          <Icon name="chevron-down" size={16} color="#5B5E6B" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="chevron-forward" size={24} color="#0E0E0E" />
        </TouchableOpacity>
      </View>

      {/* Grid Utama */}
      <ScrollView>
        <View style={styles.gridContainer}>
          {/* Kolom Nama Properti */}
          <View style={styles.propertyColumn}>
            <View style={styles.headerCell} /> {/* Sel kosong di pojok kiri atas */}
            {properties.map(prop => (
              <View key={prop.id} style={styles.propertyCell}>
                <Text style={styles.propertyText}>{prop.name}</Text>
                <Icon name="chevron-forward" size={16} color="#1076BC" />
              </View>
            ))}
          </View>

          {/* Kolom Tanggal (Bisa di-scroll horizontal) */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Baris Header Tanggal */}
              <View style={styles.dateHeaderRow}>
                {visibleDates.map((date, index) => (
                  <View key={index} style={[styles.dateHeaderCell, index === 1 && styles.dateHeaderCellActive]}>
                    <Text style={[styles.dateHeaderText, index === 1 && styles.dateHeaderTextActive]}>
                      {date.toLocaleDateString('en-GB', { day: '2-digit' })} Jul
                    </Text>
                  </View>
                ))}
              </View>
              {/* Baris-baris data booking */}
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
        <Icon name="add" size={30} color="#FFF" />
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
    width: 150, // Lebar tetap untuk kolom properti
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  headerCell: {
    height: 50, // Tinggi sama dengan header tanggal
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  propertyCell: {
    height: 60, // Tinggi setiap baris properti
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
    flex: 1, // Agar teks bisa wrap jika panjang
  },
  dateHeaderRow: {
    flexDirection: 'row',
  },
  dateHeaderCell: {
    width: 120, // Lebar setiap kolom tanggal
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dateHeaderCellActive: {
    backgroundColor: '#E8F1F8', // Latar belakang biru muda untuk tanggal aktif
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
    borderBottomColor: '#0E0E0E',
  },
  bookingCell: {
    width: 120,
    padding: 4,
  },
  bookingBlock: {
    backgroundColor: '#FCEAEA', // Contoh warna latar booking
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
    color: '#0E0E0E', // Contoh warna teks booking
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
});

export default CalendarView;