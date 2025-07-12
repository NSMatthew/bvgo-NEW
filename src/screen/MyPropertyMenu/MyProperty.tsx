import React from 'react';
// Pastikan ScrollView sudah di-import dari react-native
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList } from '../../types/bottomTabTypes';
import { RootStackParamList } from '../../types/types';

import PropertyCard from '../../components/PropertyCard';
import RevenueProgress from '../../components/RevenueProgress';
import GuestReviewCard from '../../components/GuestReviewCard'; // Pastikan path ini benar

// Menggabungkan tipe BottomTab dan Stack Navigator
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'My Property'>,
  NativeStackScreenProps<RootStackParamList>
>;

// --- 1. SIAPKAN DATA DUMMY ---
const dummyReviews = [
  {
    id: '1',
    guestName: 'David B.',            
    reviewDate: 'Feb 1 - Feb 2, 2025',
    publicReview: 'The place is super comfy!', 
    imageUrl: require('../../assets/images/guest1.png'),
    ratings: {
      accuracy: 5,
      cleanliness: 5,
      communication: 5,
      location: 5,
      value: 5,
    },
  },
  {
    id: '2',
    guestName: 'Christian',
    reviewDate: 'Mar 1 - Mar 2, 2025',
    publicReview: 'The room also super Recommended!',
    imageUrl: require('../../assets/images/guest2.png'),
    ratings: {
      accuracy: 5,
      cleanliness: 5,
      communication: 5,
      location: 4,
      value: 5,
    },
  },
   {
    id: '3',
    guestName: 'Robert Davis C.',
    reviewDate: 'Jan 10 - Jan 11, 2025',
    publicReview: 'The place is super comfy!',
    imageUrl: require('../../assets/images/guest1.png'),
    ratings: {
      accuracy: 4,
      cleanliness: 5,
      communication: 4,
      location: 5,
      value: 4,
    },
  },
];


const MyProperty: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyCard />

      <View style={styles.section}>
        <RevenueProgress
          revenue={210000000}
          target={480000000}
          percentage={48}
          chartImage={require('../../assets/images/ChartRevenue.png')}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewTitle}>Guest Reviews</Text>
          <Text style={styles.reviewLink}>See all reviews</Text>
        </View>

        {/* --- BAGIAN REVIEW --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dummyReviews.map(review => (
            <GuestReviewCard
              review ={review}
            />
          ))}
        </ScrollView>
      </View>

      {/* Section 4: Operations */}
      <View style={styles.section}>
         <Text style={styles.operationsTitle}>Operations</Text>
        
        <TouchableOpacity style={styles.operationItem}>
          <Image
            source={require('../../assets/icons/InvestmentReport.png')}
            style={styles.operationIcon}
          />
          <View style={styles.operationTextContainer}>
            <Text style={styles.operationTitle}>Inspired Investment Report</Text>
            <Text style={styles.operationDescription}>Operation and financial report</Text>
          </View>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.operationItem}>
          <Image
            source={require('../../assets/icons/AccountingReport.png')}
            style={styles.operationIcon}
          />
          <View style={styles.operationTextContainer}>
            <Text style={styles.operationTitle}>Accounting Report</Text>
            <Text style={styles.operationDescription}>See your monthly report</Text>
          </View>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.operationItem}
          onPress={() => navigation.navigate('TeamPage')} 
        >
          <Image
            source={require('../../assets/icons/Team.png')}
            style={styles.operationIcon}
          />
          <View style={styles.operationTextContainer}>
            <Text style={styles.operationTitle}>Team</Text>
            <Text style={styles.operationDescription}>See all team members</Text>
          </View>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// ... (styles Anda tetap sama)
const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  section: { marginTop: 24 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  reviewTitle: { fontSize: 16, fontWeight: 'bold', color: '#0E0E0E' },
  reviewLink: { color: '#1076BC', fontSize: 12, fontWeight: '400' },
  operationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0E0E0E',
  },
  operationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#0E0E0E',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 4 },
    elevation: 4,
  },
  operationIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
  },
  operationTextContainer: {
    flex: 1,
  },
  operationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E0E0E',
  },
  operationDescription: {
    fontSize: 12,
    color: '#5B5E6B',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#5B5E6B',
  },
});

export default MyProperty;