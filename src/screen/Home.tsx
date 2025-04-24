import React from 'react';
import { ScrollView, View } from 'react-native';
import SliderAnnouncement from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { mergeSort } from '../lib/mergeSort';

const newsletterData = [
  {
    id: 1,
    title: 'Pricing Adjustment',
    releaseDate: new Date('2024-04-10'),
  },
  {
    id: 2,
    title: 'New Feature Update',
    releaseDate: new Date('2024-04-22'),
  },
  {
    id: 3,
    title: 'Maintenance Schedule',
    releaseDate: new Date('2024-03-28'),
  },
];

// Di dalam komponen atau fungsi:
const sorted = mergeSort(newsletterData, 'title'); // atau 'date'

const Home = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SliderAnnouncement />
      <View style={{ marginTop: 20 }}>
        <NewsletterCard />
      </View>
    </ScrollView>
  );
};

export default Home;