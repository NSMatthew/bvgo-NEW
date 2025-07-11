import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Newsletter } from '../../lib/mergeSort'; 

// --- 1. PERBAIKI TIPE PROPS ---
// Sekarang komponen ini menerima satu objek 'Newsletter', bukan sebuah array.
type Props = {
  data: Newsletter;
};

// --- 2. HAPUS FlatList DAN SEDERHANAKAN KOMPONEN ---
const NewsletterCard = ({ data }: Props) => {
  // Komponen sekarang hanya merender satu View (kartu)
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/AvatarPublisher.png')}
          style={styles.avatar}
        />
        <View>
          {/* Nantinya, data ini bisa dibuat dinamis sesuai data user */}
          <Text style={styles.name}>Matthew - Marketing</Text>
          <Text style={styles.time}>1 day ago</Text>
        </View>
      </View>

      <Text style={styles.category}>Pricing Adjustment</Text>
      
      {/* --- 3. GUNAKAN 'data' LANGSUNG --- */}
      {/* Kita menggunakan 'data.title' karena 'data' adalah satu objek, bukan 'item' dari loop */}
      <Text style={styles.title}>{data.title}</Text>

      <Image
        // Anda bisa membuat gambar ini dinamis jika data newsletter memiliki properti image
        source={require('../../assets/images/news1.png')}
        style={styles.image}
      />

      <View style={styles.footer}>
        {/* Footer bisa dibuat dinamis jika ada datanya */}
        <Text>👍 0</Text>
        <Text>💬 0</Text>
        <Text>👁️ 0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // --- PERUBAHAN DI SINI UNTUK SLIDER HORIZONTAL ---
    width: 280, // Memberi lebar tetap pada kartu
    marginRight: 16, // Memberi jarak antar kartu
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  category: {
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginVertical: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default NewsletterCard;