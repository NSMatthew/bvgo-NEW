import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Modal from 'react-native-modal';

// (Tipe Data Props tidak berubah)
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

// (AppIcons dan RatingRow tidak berubah)
const AppIcons = {
  rating: require('../../assets/icons/rating.png'),
  review: require('../../assets/icons/iconreview.png'),
  reviewComponent: require('../../assets/icons/iconreviewcomponent.png'),
  accuracy: require('../../assets/icons/accuracyicon.png'),
  cleanliness: require('../../assets/icons/cleanlinessicon.png'),
  communication: require('../../assets/icons/communicationicon.png'),
  location: require('../../assets/icons/location.png'),
  value: require('../../assets/icons/value.png'),
};

const RatingRow = ({ iconSource, label, score }: { iconSource: any; label: string; score: number }) => (
  <View style={styles.ratingRow}>
    <View style={styles.ratingLabelContainer}>
      <Image source={iconSource} style={styles.sectionIcon} />
      <Text style={styles.ratingLabel}>{label}</Text>
    </View>
    <View style={styles.ratingScoreContainer}>
      <Text style={styles.ratingScore}>{score}</Text>
      <Image source={AppIcons.rating} style={{width: 16, height: 16}} />
    </View>
  </View>
);

// --- KOMPONEN UTAMA ---
const GuestReviewCard: React.FC<GuestReviewCardProps> = ({ review }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      {/* --- BAGIAN KARTU YANG DIPERBARUI --- */}
      <TouchableOpacity onPress={openModal} style={styles.cardContainer}>
        {/* Header: Avatar + Nama & Tanggal */}
        <View style={styles.header}>
          <Image source={review.imageUrl} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{review.guestName}</Text>
            <Text style={styles.date}>{review.reviewDate}</Text>
          </View>
        </View>

        {/* Rating Image */}
        <Image source={AppIcons.rating} style={styles.ratingImage} />

        {/* Review Text */}
        <Text style={styles.reviewText}>{review.publicReview}</Text>
      </TouchableOpacity>

      {/* --- MODAL (TIDAK DIUBAH) --- */}
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        onBackdropPress={closeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        {/* Konten Modal tetap sama persis seperti sebelumnya */}
        <View style={styles.modalContent}>
           <View style={styles.handle} />
            <View style={styles.headerSection}>
              <Image source={review.imageUrl} style={styles.guestImage} />
              <View style={styles.headerTextContainer}>
                <Text style={styles.modalGuestName}>{review.guestName}</Text>
                <Text style={styles.modalDateRange}>{review.reviewDate}</Text>
              </View>
            </View>
            <Image source={AppIcons.rating} style={styles.ratingImageInModal} />
            <View style={styles.divider} />
            <View style={styles.reviewSection}>
              <Image source={AppIcons.review} style={styles.sectionIcon} />
              <View style={styles.reviewTextContainer}>
                <Text style={styles.sectionTitle}>Public review</Text>
                <Text style={styles.publicReviewText}>{review.publicReview}</Text>
              </View>
            </View>
            <View style={styles.reviewSection}>
              <Image source={AppIcons.reviewComponent} style={styles.sectionIcon} />
              <View style={styles.reviewTextContainer}>
                <Text style={styles.sectionTitle}>Review Component</Text>
              </View>
            </View>
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
  // Style untuk Kartu Luar (Diperbarui)
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 250, // Sedikit penyesuaian lebar
    // Drop shadow tipis
    shadowColor: '#0E0E0E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 15,
    // fontFamily: 'Satoshi-Bold', // (Jika font sudah terinstall)
    fontWeight: 'bold',
    color: '#0E0E0E',
  },
  date: {
    fontSize: 13,
    // fontFamily: 'Satoshi-Regular',
    color: '#5B5E6B',
    marginTop: 2,
  },
  ratingImage: {
    width: 90,
    height: 18,
    resizeMode: 'contain',
    marginVertical: 10, // Memberi jarak atas dan bawah
  },
  reviewText: {
    fontSize: 14,
    // fontFamily: 'Satoshi-Regular',
    color: '#0E0E0E',
  },

  // Style untuk Modal (Tidak banyak berubah)
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
  modalGuestName: {
    // fontFamily: 'Satoshi-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0E0E0E',
  },
  modalDateRange: {
    // fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: '#5B5E6B',
    marginTop: 4,
  },
  ratingImageInModal: {
    width: 110,
    height: 22,
    resizeMode: 'contain',
    marginTop: 8,
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
    // fontFamily: 'Satoshi-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0E0E0E',
  },
  publicReviewText: {
    // fontFamily: 'Satoshi-Regular',
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
    // fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: '#0E0E0E',
    marginLeft: 16,
  },
  ratingScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingScore: {
    // fontFamily: 'Satoshi-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0E0E0E',
    marginRight: 4,
  },
});

export default GuestReviewCard;