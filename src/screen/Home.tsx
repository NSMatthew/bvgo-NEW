import React from 'react';
import { ScrollView, View } from 'react-native';
import SliderAnnouncement from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { mergeSort } from '../lib/mergeSort';
import { newsletterData } from '../data/newsletters';

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