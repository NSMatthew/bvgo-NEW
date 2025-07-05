import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Button, Text } from 'react-native';
import SliderAnnouncement from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { mergeSort, Newsletter } from '../lib/mergeSort';
// Kita asumsikan binarySearch sudah tidak kita pakai untuk live search
// import { binarySearch } from '../lib/binarySearch'; 
import { getNewsletters } from '../data/newsletters';

// Definisikan tipe untuk kejelasan
type SortByType = 'title' | 'date';
type SortOrderType = 'asc' | 'desc';

const Home = () => {
  // STATE BARU: untuk menyimpan semua data asli dari 'database'
  const [allNewsletters, setAllNewsletters] = useState<Newsletter[]>([]);
  
  // STATE BARU: untuk menyimpan opsi sortir pilihan pengguna
  const [sortBy, setSortBy] = useState<SortByType>('date'); // Default: urutkan berdasarkan tanggal
  const [sortOrder, setSortOrder] = useState<SortOrderType>('desc'); // Default: terbaru dulu

  const [searchKeyword, setSearchKeyword] = useState('');

  // useEffect untuk mengambil data HANYA SEKALI saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      const result = await getNewsletters();
      setAllNewsletters(result); // Simpan data master
    };

    fetchData();
  }, []); // <-- Dependency array kosong, berarti hanya jalan sekali

  // LOGIKA BARU: Gunakan useMemo untuk mengurutkan ulang data HANYA JIKA diperlukan
  // Ini lebih efisien daripada sorting di dalam useEffect
  const sortedAndFilteredNewsletters = useMemo(() => {
    // 1. Lakukan sorting berdasarkan state sortBy dan sortOrder
    const sorted = mergeSort([...allNewsletters], sortBy, sortOrder); // Kita asumsikan mergeSort menerima order

    // 2. Jika tidak ada keyword, tampilkan semua hasil sort
    if (searchKeyword.trim() === '') {
      return sorted;
    }

    // 3. Jika ada keyword, lakukan filter (pencarian) pada data yang sudah di-sort
    return sorted.filter(n =>
      n.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [allNewsletters, sortBy, sortOrder, searchKeyword]); // <-- Dijalankan ulang jika salah satu ini berubah


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SliderAnnouncement />

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Cari judul newsletter...."
          value={searchKeyword}
          onChangeText={setSearchKeyword} // Cukup update state keyword
          style={styles.searchInput}
        />
      </View>

      {/* TOMBOL SORTIR BARU */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Urutkan berdasarkan:</Text>
        <View style={styles.sortButtons}>
          <Button title="Tanggal (Terbaru)" onPress={() => { setSortBy('date'); setSortOrder('desc'); }} />
          <Button title="Judul (A-Z)" onPress={() => { setSortBy('title'); setSortOrder('asc'); }} />
        </View>
      </View>

      {/* Newsletter Cards */}
      <View style={styles.newsletterSection}>
        {/* Kirim data yang sudah di-sort DAN di-filter */}
        <NewsletterCard data={sortedAndFilteredNewsletters} /> 
      </View>
    </ScrollView>
  );
};

// Update styles jika perlu
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50, // Beri ruang lebih di bawah
  },
  searchWrapper: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#A2A2A2',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  sortContainer: {
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  newsletterSection: {
    marginTop: 10,
  },
});

export default Home;