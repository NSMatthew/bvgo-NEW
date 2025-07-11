import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Dimensions } from 'react-native';

// Tipe data untuk setiap item di slider
export type SliderItem = {
  id: string;
  title: string;
  image: any; // Tipe untuk require()
};

// Terima 'data' sebagai properti
type Props = {
  data: SliderItem[];
};

// Mengambil lebar layar untuk membuat kartu slider responsif
const { width: screenWidth } = Dimensions.get('window');
const SLIDE_WIDTH = screenWidth * 0.85; // Setiap slide akan memakan 85% lebar layar

const SliderAnnouncement = ({ data }: Props) => {
  // Fungsi untuk merender setiap item di dalam FlatList
  const renderSlide = ({ item }: { item: SliderItem }) => (
    <ImageBackground source={item.image} style={styles.slide} imageStyle={styles.imageStyle}>
      <View style={styles.overlay} />
      <Text style={styles.slideText}>{item.title}</Text>
    </ImageBackground>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderSlide}
      keyExtractor={(item) => item.id}
      horizontal={true} // Membuatnya menjadi slider horizontal
      showsHorizontalScrollIndicator={false} // Menyembunyikan scroll bar
      contentContainerStyle={styles.sliderContainer} // Menambah padding
      snapToInterval={SLIDE_WIDTH + 16} // Membuatnya berhenti di setiap slide
      decelerationRate="fast"
      pagingEnabled // Alternatif untuk snapToInterval jika ingin efek per halaman
    />
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    paddingHorizontal: 16, // Memberi jarak di awal dan akhir list
    paddingVertical: 8,
  },
  slide: {
    width: SLIDE_WIDTH,
    height: 150, // Dibuat lebih tinggi agar proporsional
    marginRight: 16, // Jarak antar slide
    justifyContent: 'flex-end', // Teks berada di bawah
    padding: 16,
  },
  imageStyle: {
    borderRadius: 12, // Membuat gambar di dalam background memiliki sudut melengkung
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Membuat lapisan gelap menutupi seluruh gambar
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },
  slideText: {
    color: '#fff',
    fontFamily: 'Satoshi-Bold', // Menggunakan font kustom Anda
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
});

export default SliderAnnouncement;