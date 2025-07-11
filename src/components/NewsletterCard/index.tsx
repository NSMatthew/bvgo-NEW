import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Newsletter } from '../../lib/mergeSort'; 

type Props = {
  data: Newsletter;
};

// --- KOMPONEN BARU UNTUK IKON FOOTER ---
// Ini membuat kode lebih bersih dan mudah diatur
const FooterIcon = ({ iconSource, count }: { iconSource: any, count: number }) => (
  <View style={styles.footerIconContainer}>
    <Image source={iconSource} style={styles.footerIcon} />
    <Text style={styles.footerIconText}>{count}</Text>
  </View>
);

const NewsletterCard = ({ data }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/AvatarPublisher.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Matthew - Marketing</Text>
          <Text style={styles.time}>1 day ago</Text>
        </View>
      </View>

      <Text style={styles.category}>Pricing Adjustment</Text>
      <Text style={styles.title}>{data.title}</Text>

      <Image
        source={require('../../assets/images/news1.png')}
        style={styles.image}
      />

      {/* --- PERUBAHAN UTAMA DI BAGIAN FOOTER --- */}
      <View style={styles.footer}>
        <FooterIcon iconSource={require('../../assets/icons/like.png')} count={0} />
        <FooterIcon iconSource={require('../../assets/icons/dislike.png')} count={0} />
        <FooterIcon iconSource={require('../../assets/icons/comment.png')} count={0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    marginRight: 16,
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
    fontFamily: 'Satoshi-Bold',
    color: '#0E0E0E',
  },
  time: {
    fontSize: 12,
    color: '#5B5E6B',
    fontFamily: 'Satoshi-Medium',
  },
  category: {
    backgroundColor: '#1076BC',
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginVertical: 6,
    overflow: 'hidden',
  },
  title: {
    fontSize: 14,
    color: '#0E0E0E',
    fontFamily: 'Satoshi-Bold',
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    // Menghapus justifyContent agar ikon merapat ke kiri
  },
  // --- STYLE BARU UNTUK FOOTER ---
  footerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16, // Jarak antar grup ikon
  },
  footerIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  footerIconText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#5B5E6B',
    fontFamily: 'Satoshi-Medium',
  },
});

export default NewsletterCard;