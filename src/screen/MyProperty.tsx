import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PropertyCard from '../components/PropertyCard';
import RevenueProgress from '../components/RevenueProgress';
import GuestReviewCard from '../components/GuestReviewCard';

const MyProperty = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Section 1: Property Info */}
      <PropertyCard />

      {/* Section 2: Revenue Progress */}
      <View style={styles.section}>
        <RevenueProgress
          revenue={210000000}
          target={480000000}
          percentage={48}
          chartImage={require('../assets/images/chart-placeholder.png')}
        />
      </View>

      {/* Section 3: Guest Reviews */}
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