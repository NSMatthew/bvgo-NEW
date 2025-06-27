import React from 'react';
import { Image } from 'react-native';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../types/bottomTabTypes';

import PropertyCard from '../../components/PropertyCard';
import RevenueProgress from '../../components/RevenueProgress';
import GuestReviewCard from '../../components/GuestReviewCard';

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
          chartImage={require('../../assets/images/ChartRevenue.png')}
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

      {/* Section 4: Operations */}
      <View style={styles.section}>
        <Text style={styles.operationsTitle}>Operations</Text>

        <TouchableOpacity style={styles.operationItem}>
          <Image
            source={require('../assets/icons/InvestmentReport.png')}
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
            source={require('../assets/icons/AccountingReport.png')}
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
          onPress={() => navigation.navigate('TeamPage' as never)}
        >
          <Image
            source={require('../assets/icons/Team.png')}
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

const styles = StyleSheet.create({
  container: { padding: 16 },
  section: { marginTop: 24 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  reviewTitle: { fontSize: 16, fontWeight: 'bold' },
  reviewLink: { color: '#007BFF', fontSize: 14 },
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
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
    fontSize: 14,
    fontWeight: '400',
    color: '#0E0E0E',
  },
  operationDescription: {
    fontSize: 12,
    color: '#5B5E6B',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#888',
  },
});

export default MyProperty;