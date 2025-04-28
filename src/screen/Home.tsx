import React, { useEffect, useState } from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet } from 'react-native';
import SliderAnnouncement from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { mergeSort, Newsletter } from '../lib/mergeSort';
import { binarySearch } from '../lib/binarySearch';
import { getNewsletters } from '../data/newsletters';

const Home = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<Newsletter | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNewsletters();
      const sorted = mergeSort(result, 'title'); // 🔥 Sort langsung by title karena search by title
      setNewsletters(sorted);
    };

    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchKeyword(text);

    if (text.trim() === '') {
      setSearchResult(null);
      return;
    }

    const result = binarySearch(newsletters, text);
    setSearchResult(result);
  };

  const renderNewsletterContent = () => {
    if (searchKeyword.trim() && searchResult) {
      return <NewsletterCard data={[searchResult]} />;
    }
    return <NewsletterCard data={newsletters} />;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SliderAnnouncement />

      {/* Search Input */}
      <TextInput
        placeholder="Search newsletter by title..."
        value={searchKeyword}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      {/* Newsletter Cards */}
      <View style={styles.newsletterSection}>
        {renderNewsletterContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 12,
  },
  newsletterSection: {
    marginTop: 10,
  },
});

export default Home;