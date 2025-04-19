import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PropertyCard from '../components/PropertyCard';
import RevenueProgress from '../components/RevenueProgress';
import GuestReviewCard from '../components/GuestReviewCard';

const MyProperty = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyCard />

      <View style={styles.section}>
        <RevenueProgress />
      </View>

      <View style={styles.section}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewTitle}>Guest Reviews</Text>
          <Text style={styles.reviewLink}>See all reviews</Text>
        </View>
        <GuestReviewCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewLink: {
    color: '#007BFF',
    fontSize: 14,
  },
});

export default MyProperty;