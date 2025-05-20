import React from 'react';
import { View, StyleSheet } from 'react-native';
import BookingCalendarScreen from '../components/Calendar';

const Booking = () => {
  return (
    <View style={styles.container}>
      <BookingCalendarScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Booking;