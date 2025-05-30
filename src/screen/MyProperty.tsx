import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/bottomTabTypes';

import PropertyCard from '../components/PropertyCard';
import RevenueProgress from '../components/RevenueProgress';
import GuestReviewCard from '../components/GuestReviewCard';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = BottomTabScreenProps<BottomTabParamList, 'My Property'>;

const MyProperty: React.FC<Props> = ({ navigation }) => {
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

      {/* Section 4: Operations - Team Access */}
      <View style={styles.section}>
        <Text style={styles.operationsTitle}>Operations</Text>
        <TouchableOpacity
          style={styles.operationItem}
          onPress={() => navigation.navigate('TeamPage' as never)} // 👈 team page navigasi
        >
          <Icon name="people-outline" size={24} color="#333" />
          <View style={styles.operationTextContainer}>
            <Text style={styles.operationTitle}>Team</Text>
            <Text style={styles.operationDescription}>See all team members</Text>
          </View>
          <Image
            source={require('../assets/images/team-placeholder.png')}
            style={styles.teamImage}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  section: { marginTop: 24 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  reviewTitle: { fontSize: 16, fontWeight: 'bold' },
  reviewLink: { color: '#007BFF', fontSize: 14 },
  operationsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  operationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  operationTextContainer: { flex: 1, marginLeft: 12 },
  operationTitle: { fontSize: 16, fontWeight: '500' },
  operationDescription: { fontSize: 14, color: '#888' },
  teamImage: { width: 36, height: 36, borderRadius: 18 },
});

export default MyProperty;