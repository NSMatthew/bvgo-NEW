import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import SliderAnnouncement from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { mergeSort, Newsletter } from '../lib/mergeSort'; // ✅ import type
import { getNewsletters } from '../data/newsletters';

const Home = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]); // ✅ specify type here!

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNewsletters();
      const sorted = mergeSort(result, 'date'); // ✅ safe now
      setNewsletters(sorted);
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SliderAnnouncement />
      <View style={{ marginTop: 20 }}>
        <NewsletterCard data={newsletters} />
      </View>
    </ScrollView>
  );
};

export default Home;