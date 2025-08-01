import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';

// --- 1. PERBARUI TIPE DATA ---
// Tambahkan 'description' untuk teks di dalam modal
export type SliderItem = {
  id: string;
  title: string;
  description: string;
  image: any; 
};

type Props = {
  data: SliderItem[];
};

const { width: screenWidth } = Dimensions.get('window');
const SLIDE_WIDTH = screenWidth * 0.85; 

const SliderAnnouncement = ({ data }: Props) => {
  // --- 2. TAMBAHKAN STATE UNTUK MODAL ---
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<SliderItem | null>(null);

  // Fungsi untuk membuka modal dengan data yang sesuai
  const handlePress = (item: SliderItem) => {
    setSelectedAnnouncement(item);
    setModalVisible(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const renderSlide = ({ item }: { item: SliderItem }) => (
    // --- 3. BUNGKUS DENGAN TouchableOpacity ---
    <TouchableOpacity onPress={() => handlePress(item)}>
      <ImageBackground source={item.image} style={styles.slide} imageStyle={styles.imageStyle}>
        <View style={styles.overlay} />
        <Text style={styles.slideText}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderContainer}
        snapToInterval={SLIDE_WIDTH + 16}
        decelerationRate="fast"
        pagingEnabled
      />

      {/* --- 4. TAMBAHKAN KOMPONEN MODAL --- */}
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContent}>
          <Image 
            source={require('../../assets/images/announcement1.png')} 
            style={styles.modalImage}
          />
          <Text style={styles.modalText}>
            {selectedAnnouncement?.description}
          </Text>
          <TouchableOpacity onPress={closeModal} style={styles.button2}>
            <Text style={styles.button2Text}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  slide: {
    width: SLIDE_WIDTH,
    height: 150,
    marginRight: 16,
    justifyContent: 'flex-end',
    padding: 16,
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },
  slideText: {
    color: '#fff',
    fontFamily: 'Satoshi-Bold',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: '#0E0E0E',
    textAlign: 'left',
    marginBottom: 24,
    lineHeight: 24, 
  },
  button2: {
    padding: 10,
    borderRadius: 8,
    borderColor: '#1076BC',
    borderWidth: 1,
    width: '45%',
    alignItems: 'center',
  },
  button2Text: {
    color: '#1076BC',
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
  }
});

export default SliderAnnouncement;