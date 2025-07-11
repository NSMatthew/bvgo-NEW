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
} from 'react-native';

import SliderAnnouncement, { SliderItem } from '../components/SliderAnnouncement';
import NewsletterCard from '../components/NewsletterCard';
import { mergeSort, Newsletter } from '../lib/mergeSort';
import { getNewsletters } from '../data/newsletters';

type SortByType = 'title' | 'date';
type SortOrderType = 'asc' | 'desc';

type SortOption = {
  key: string;
  sortBy: SortByType;
  sortOrder: SortOrderType;
  label: string;
  image: any; 
};

const sortOptions: SortOption[] = [
  { key: 'date_desc', sortBy: 'date', sortOrder: 'desc', label: 'Date (Descending)', image: require('../assets/icons/filterdatedescending.png') },
  { key: 'date_asc', sortBy: 'date', sortOrder: 'asc', label: 'Date (Ascending)', image: require('../assets/icons/filterdateascending.png') },
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
    title: "What's New?",
    image: require('../assets/images/announcement1.png'),
  },
];

const Home = () => {
  const [allNewsletters, setAllNewsletters] = useState<Newsletter[]>([]);
  const [activeSort, setActiveSort] = useState<SortOption>(sortOptions[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNewsletters();
      setAllNewsletters(result);
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
  const displayLabel = isDefaultState ? 'Default' : activeSort.label;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <SliderAnnouncement data={announcementData} />

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

        {/* --- PERUBAHAN UTAMA DI SINI --- */}
        {/* Menggunakan FlatList horizontal untuk merender NewsletterCard */}
        <FlatList
          horizontal
          data={sortedAndFilteredNewsletters}
          renderItem={({ item }) => <NewsletterCard data={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newsletterList}
        />

      </ScrollView>

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
  // Style baru untuk kontainer list horizontal
  newsletterList: {
    paddingHorizontal: 16,
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