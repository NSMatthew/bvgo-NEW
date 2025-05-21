import React, { useEffect, useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet } from 'react-native';
import SliderAnnouncement from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { mergeSort, Newsletter } from '../lib/mergeSort';
import { binarySearch } from '../lib/binarySearch';
import { getNewsletters } from '../data/newsletters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Home = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<Newsletter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNewsletters();
      const sorted = mergeSort(result, 'title'); // binary search requires sorting
      setNewsletters(sorted);
      setSearchResult(sorted); // show all by default
    };

    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchKeyword(text);

    if (text.trim() === '') {
      setSearchResult(newsletters);
      return;
    }

    // Binary Search first
    const exactMatch = binarySearch(newsletters, text);
    if (exactMatch) {
      setSearchResult([exactMatch]);
    } else {
      // Fallback: partial match
      const fallback = newsletters.filter(n =>
        n.title.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResult(fallback);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SliderAnnouncement />

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Find newsletter...."
          value={searchKeyword}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Newsletter Cards */}
      <View style={styles.newsletterSection}>
        <NewsletterCard data={searchResult} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchWrapper: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#A2A2A2',
    borderRadius: 8,
    paddingHorizontal: 35,
    paddingVertical: 10,
    fontSize: 14,
  },
  newsletterSection: {
    marginTop: 10,
  },
});

export default Home;