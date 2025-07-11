import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Modal from 'react-native-modal';

// --- (Tipe Data Props tidak berubah) ---
export interface ReviewData {
  id: string;
  guestName: string;
  reviewDate: string;
  publicReview: string;
  imageUrl: ImageSourcePropType;
  ratings: {
    accuracy: number;
    cleanliness: number;
    communication: number;
    location: number;
    value: number;
  };
}

interface GuestReviewCardProps {
  review: ReviewData;
}

// --- 1. PERBARUI TEMPAT ASSET ICONS ---
const AppIcons = {
  rating: require('../../assets/icons/rating.png'), // GANTI DENGAN PATH ASSETMU
  review: require('../../assets/icons/iconreview.png'),
  reviewComponent: require('../../assets/icons/iconreviewcomponent.png'),
  accuracy: require('../../assets/icons/accuracyicon.png'),
  cleanliness: require('../../assets/icons/cleanlinessicon.png'),
  communication: require('../../assets/icons/communicationicon.png'),
  location: require('../../assets/icons/location.png'),
  value: require('../../assets/icons/value.png'),
};

// --- (Komponen StarRating dihapus karena tidak lagi diperlukan) ---

// Komponen kecil untuk baris rating
const RatingRow = ({ iconSource, label, score }: { iconSource: any; label: string; score: number }) => (
  <View style={styles.ratingRow}>
    <View style={styles.ratingLabelContainer}>
      <Image source={iconSource} style={styles.sectionIcon} />
      <Text style={styles.ratingLabel}>{label}</Text>
    </View>
    <View style={styles.ratingScoreContainer}>
      <Text style={styles.ratingScore}>{score}</Text>
      {/* Menggunakan Image untuk bintang di samping skor */}
      <Image source={AppIcons.rating} style={{width: 16, height: 16}} />
    </View>
  </View>
);


// --- KOMPONEN UTAMA ---
const GuestReviewCard: React.FC<GuestReviewCardProps> = ({ review }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  
  // (logika averageRating tidak lagi diperlukan untuk tampilan, tapi bisa disimpan jika butuh)

  return (
    <>
      {/* Kartu ringkasan */}
      <TouchableOpacity onPress={openModal} style={styles.cardContainer}>
        <Text style={styles.cardText}>Review from {review.guestName}</Text>
        {/* --- 2. MENGGANTI BINTANG DENGAN SATU GAMBAR RATING --- */}
        <Image source={AppIcons.rating} style={styles.ratingImage} />
        <Text style={styles.cardReviewSnippet} numberOfLines={1}>{review.publicReview}</Text>
      </TouchableOpacity>

      {/* Modal Bottom Sheet */}
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
            <Image source={review.imageUrl} style={styles.guestImage} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.guestName}>{review.guestName}</Text>
              <Text style={styles.dateRange}>{review.reviewDate}</Text>
            </View>
          </View>
           {/* --- 2. MENGGANTI BINTANG DENGAN SATU GAMBAR RATING --- */}
          <Image source={AppIcons.rating} style={styles.ratingImageInModal} />
          
          <View style={styles.divider} />

          {/* ... Sisa kode modal tetap sama ... */}

          {/* Public Review */}
          <View style={styles.reviewSection}>
            <Image 
              source={AppIcons.review}
              style={styles.sectionIcon}
            />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.sectionTitle}>Public review</Text>
              <Text style={styles.publicReviewText}>{review.publicReview}</Text>
            </View>
          </View>
          
          {/* Review Component */}
          <View style={styles.reviewSection}>
            <Image 
              source={AppIcons.reviewComponent}
              style={styles.sectionIcon}
            />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.sectionTitle}>Review Component</Text>
            </View>
          </View>

          {/* Daftar Rating */}
          <View style={styles.ratingsList}>
            <RatingRow iconSource={AppIcons.accuracy} label="Accuracy" score={review.ratings.accuracy} />
            <RatingRow iconSource={AppIcons.cleanliness} label="Cleanliness" score={review.ratings.cleanliness} />
            <RatingRow iconSource={AppIcons.communication} label="Communication" score={review.ratings.communication} />
            <RatingRow iconSource={AppIcons.location} label="Location" score={review.ratings.location} />
            <RatingRow iconSource={AppIcons.value} label="Value" score={review.ratings.value} />
          </View>

        </View>
      </Modal>
    </>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  // ... (semua style lama Anda tetap di sini)
  
  // --- 3. TAMBAHKAN STYLE UNTUK GAMBAR RATING BARU ---
  ratingImage: {
    width: 90, // Sesuaikan ukurannya
    height: 18, // Sesuaikan ukurannya
    resizeMode: 'contain',
    marginVertical: 4,
  },
  ratingImageInModal: {
    width: 110, // Mungkin perlu ukuran berbeda di modal
    height: 22,
    resizeMode: 'contain',
    marginTop: 8,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0E0E0E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 280,
    marginRight: 16,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0E0E0E',
  },
  cardReviewSnippet: {
    fontSize: 14,
    color: '#5B5E6B',
    marginTop: 4,
  },
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
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0E0E0E',
  },
  dateRange: {
    fontSize: 14,
    color: '#5B5E6B',
    marginTop: 4,
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
  sectionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginTop: 2,
  },
  reviewTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0E0E0E',
  },
  publicReviewText: {
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
    fontSize: 16,
    color: '#0E0E0E',
    marginLeft: 16,
  },
  ratingScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingScore: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0E0E0E',
    marginRight: 4,
  },
});

export default GuestReviewCard;