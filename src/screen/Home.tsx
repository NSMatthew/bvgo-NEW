import React, { useEffect, useState, useMemo } from 'react';
import {
  ScrollView,
  FlatList,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import SliderAnnouncement, { SliderItem } from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { Newsletter, mergeSort, SortBy, SortOrder } from '../lib/mergeSort';
import { getNewsletters } from '../data/newsletters';

// --- SEMUA LOGIKA, STATE, DAN DATA ANDA TIDAK SAYA UBAH ---
type SortOption = {
  key: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  label: string;
  image: any; 
};

const sortOptions: SortOption[] = [
  { key: 'date_desc', sortBy: 'releaseDate', sortOrder: 'desc', label: 'Date (Descending)', image: require('../assets/icons/filterdatedescending.png') },
  { key: 'date_asc', sortBy: 'releaseDate', sortOrder: 'asc', label: 'Date (Ascending)', image: require('../assets/icons/filterdateascending.png') },
  { key: 'title_asc', sortBy: 'title', sortOrder: 'asc', label: 'Title (Ascending)', image: require('../assets/icons/filtertitleascending.png') },
  { key: 'title_desc', sortBy: 'title', sortOrder: 'desc', label: 'Title (Descending)', image: require('../assets/icons/filtertitledescending.png') },
];

const defaultIcon = require('../assets/icons/filterdefault.png');

const announcementData: SliderItem[] = [
  {
    id: '1',
    title: 'Upcoming Maintenance',
    image: require('../assets/images/announcement1.png'),
  },
  {
    id: '2',
    title: "Insight Today",
    image: require('../assets/images/announcement2.png'),
  },
];

const Home = () => {
  const [allNewsletters, setAllNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSort, setActiveSort] = useState<SortOption>(sortOptions[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("Mulai mengambil data newsletter...");

      const dataFromSupabase = await getNewsletters();

      console.log("Data yang diterima dari Supabase:", dataFromSupabase);
      console.log("Jumlah data:", dataFromSupabase.length);

      setAllNewsletters(dataFromSupabase);
      setLoading(false);
    };
    fetchData();
  }, []);

  const sortedAndFilteredNewsletters = useMemo(() => {
    const sorted = mergeSort([...allNewsletters], activeSort.sortBy, activeSort.sortOrder);
    if (searchKeyword.trim() === '') {
      return sorted;
    }
    return sorted.filter(n =>
      n.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [allNewsletters, activeSort, searchKeyword]);
  
  const handleSortSelect = (option: SortOption) => {
    setActiveSort(option);
    setModalVisible(false);
  };

  const isDefaultState = activeSort.key === 'date_desc';
  const displayIconSource = isDefaultState ? defaultIcon : activeSort.image;
  const displayColor = isDefaultState ? '#5B5E6B' : '#1076BC';
  const displayLabel = isDefaultState ? 'Date (Descending)' : activeSort.label;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Slider Announcement tidak diubah */}
        <SliderAnnouncement data={announcementData} />

        {/* Search Bar dan Filter tidak diubah */}
        <View style={styles.searchAndFilterWrapper}>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Find newsletter..."
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
            <Image source={displayIconSource} style={styles.filterIcon} />
            <Text style={[styles.filterButtonText, { color: displayColor }]}>
              {displayLabel}
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- INI BAGIAN YANG DIPERBAIKI --- */}
        {loading ? (
          <ActivityIndicator size="large" color="#1076BC" style={{ marginTop: 40 }} />
        ) : (
          // 1. Tambahkan <View> sebagai pembungkus untuk memberi tinggi
          <View style={styles.newsletterSection}>
            <FlatList
              horizontal
              data={sortedAndFilteredNewsletters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <NewsletterCard data={item} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.newsletterList}
            />
          </View>
        )}
      </ScrollView>

      {/* Modal Filter tidak diubah */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalArrow} />
            <View style={styles.modalContent}>
              {sortOptions.map(option => (
                <TouchableOpacity key={option.key} style={styles.modalOption} onPress={() => handleSortSelect(option)}>
                  <Image source={option.image} style={styles.modalIcon} />
                  <Text style={styles.modalOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

// --- TAMBAHKAN STYLE BARU DI SINI ---
const styles = StyleSheet.create({
  // 2. Definisikan style untuk pembungkus FlatList
  newsletterSection: {
    minHeight: 300, // Beri tinggi minimal agar FlatList terlihat, sesuaikan angkanya
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    marginTop: 20,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 8,
  },
  filterIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  filterButtonText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Satoshi-Bold',
  },
  newsletterList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalContentWrapper: {
    position: 'absolute',
    top: 155,
    right: 16,
    alignItems: 'flex-end',
  },
  modalArrow: {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    marginRight: 20,
    marginBottom: -8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'Satoshi-Medium',
  },
});

export default Home;