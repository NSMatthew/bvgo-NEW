import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView,
  Image, // Pastikan Image di-import jika Anda menggunakannya di tempat lain
} from 'react-native';

import SliderAnnouncement, { SliderItem } from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { Newsletter } from '../lib/mergeSort'; // Kita masih butuh tipenya

// Data untuk Slider Pengumuman
const announcementData: SliderItem[] = [
  {
    id: '1',
    title: 'Upcoming Maintenance',
    image: require('../assets/images/announcement1.png'),
  },
  {
    id: '2',
    title: "What's New?",
    image: require('../assets/images/announcement2.png'), // Pastikan gambar ini ada
  },
];

// --- SOLUSI DIIMPLEMENTASIKAN DI SINI ---
// Data dummy disesuaikan agar cocok dengan interface Newsletter yang baru
const dummyNewsletter: Newsletter = {
  id: 1,
  title: 'Every Date = Different Price',
  releaseDate: new Date().toISOString(), // Hanya properti yang ada di interface
};


const Home = () => {
  // Kita hanya butuh state untuk search bar untuk tujuan UI
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Slider Pengumuman tetap sama */}
        <SliderAnnouncement data={announcementData} />

        {/* Search bar tetap ada */}
        <View style={styles.searchAndFilterWrapper}>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Find newsletter..."
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              style={styles.searchInput}
            />
          </View>
          {/* Tombol filter disembunyikan untuk fokus pada desain presentasi */}
        </View>

        {/* Menggunakan ScrollView horizontal untuk menampilkan kartu secara statis */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newsletterList}
        >
          {/* "Copy-paste" kartu newsletter untuk tujuan presentasi */}
          <NewsletterCard data={dummyNewsletter} />
          <NewsletterCard data={dummyNewsletter} />
          <NewsletterCard data={dummyNewsletter} />
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    paddingBottom: 50,
  },
  searchAndFilterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchWrapper: {
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  // Style untuk kontainer list horizontal
  newsletterList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

export default Home;