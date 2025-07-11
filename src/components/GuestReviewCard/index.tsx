import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
// Kita masih menggunakan Icon untuk bintang, jadi impornya tetap ada
import Icon from 'react-native-vector-icons/Ionicons';

// --- DATA DUMMY ---
const GUEST_REVIEW_DATA = {
  guestName: 'Robert Davis C.',
  reviewDate: 'Feb 1 - Feb 2, 2025',
  publicReview: 'The place is super comfy!',
  ratings: {
    accuracy: 5,
    cleanliness: 5,
    communication: 5,
    location: 5,
    value: 5,
  },
};

// --- PERUBAHAN DI SINI ---
// Komponen kecil untuk baris rating, sekarang menerima `iconSource`
const RatingRow = ({ iconSource, label, score }: { iconSource: any; label: string; score: number }) => (
  <View style={styles.ratingRow}>
    <View style={styles.ratingLabelContainer}>
      {/* Menggunakan Image, bukan lagi Icon */}
      <Image source={iconSource} style={styles.sectionIcon} />
      <Text style={styles.ratingLabel}>{label}</Text>
    </View>
    <View style={styles.ratingScoreContainer}>
      <Text style={styles.ratingScore}>{score}</Text>
      <Icon name="star" size={16} color="#F69322" />
    </View>
  </View>
);


// --- KOMPONEN UTAMA ---
const GuestReviewCard = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      {/* Bagian 1: Kartu yang terlihat di halaman utama */}
      <TouchableOpacity onPress={openModal} style={styles.cardContainer}>
        <Text style={styles.cardText}>Review from {GUEST_REVIEW_DATA.guestName}</Text>
        <View style={styles.cardStarContainer}>
            {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={16} color="#F69322" />)}
        </View>
        <Text style={styles.cardReviewSnippet} numberOfLines={1}>{GUEST_REVIEW_DATA.publicReview}</Text>
      </TouchableOpacity>

      {/* Bagian 2: Modal (Bottom Sheet) yang tersembunyi */}
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        onBackdropPress={closeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.headerSection}>
            <Image
              // --- PATH DIPERBAIKI ---
              source={require('../../assets/images/guest1.png')}
              style={styles.guestImage}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.guestName}>{GUEST_REVIEW_DATA.guestName}</Text>
              <Text style={styles.dateRange}>{GUEST_REVIEW_DATA.reviewDate}</Text>
            </View>
          </View>
          <View style={styles.starContainer}>
            {[...Array(5)].map((_, index) => (
              <Icon key={index} name="star" size={20} color="#F69322" style={styles.star} />
            ))}
          </View>
          
          <View style={styles.divider} />

          {/* Public Review */}
          <View style={styles.reviewSection}>
            <Image 
              // --- PATH DIPERBAIKI ---
              source={require('../../assets/icons/iconreview.png')}
              style={styles.sectionIcon}
            />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.sectionTitle}>Public review</Text>
              <Text style={styles.publicReviewText}>{GUEST_REVIEW_DATA.publicReview}</Text>
            </View>
          </View>
          
          {/* Review Component */}
          <View style={styles.reviewSection}>
            <Image 
              // --- PATH DIPERBAIKI ---
              source={require('../../assets/icons/iconreviewcomponent.png')}
              style={styles.sectionIcon}
            />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.sectionTitle}>Review Component</Text>
            </View>
          </View>

          {/* Daftar Rating */}
          <View style={styles.ratingsList}>
            <RatingRow iconSource={require('../../assets/icons/accuracyicon.png')} label="Accuracy" score={GUEST_REVIEW_DATA.ratings.accuracy} />
            <RatingRow iconSource={require('../../assets/icons/cleanlinessicon.png')} label="Cleanliness" score={GUEST_REVIEW_DATA.ratings.cleanliness} />
            <RatingRow iconSource={require('../../assets/icons/communicationicon.png')} label="Communication" score={GUEST_REVIEW_DATA.ratings.communication} />
            <RatingRow iconSource={require('../../assets/icons/location.png')} label="Location" score={GUEST_REVIEW_DATA.ratings.location} />
            {/* --- NAMA FILE DIPERBAIKI --- */}
            <RatingRow iconSource={require('../../assets/icons/value.png')} label="Value" score={GUEST_REVIEW_DATA.ratings.value} />
          </View>

        </View>
      </Modal>
    </>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  // Styles untuk Guest Review Card
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0E0E0E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    color: '#0E0E0E',
  },
  cardStarContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  cardReviewSnippet: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: '#5B5E6B',
  },

  // Styles untuk Modal (Bottom Sheet)
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerTextContainer: {
    marginLeft: 16,
  },
  guestName: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 20,
    color: '#0E0E0E',
  },
  dateRange: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: '#5B5E6B',
    marginTop: 4,
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  star: {
    marginRight: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 20,
  },
  reviewSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  // --- STYLE BARU UNTUK IKON GAMBAR ---
  sectionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  reviewTextContainer: {
    marginLeft: 16,
  },
  sectionTitle: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    color: '#0E0E0E',
  },
  publicReviewText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: '#5B5E6B',
    marginTop: 4,
  },
  ratingsList: {
    marginTop: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: '#0E0E0E',
    marginLeft: 16,
  },
  ratingScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingScore: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    color: '#0E0E0E',
    marginRight: 4,
  },
});

export default GuestReviewCard;