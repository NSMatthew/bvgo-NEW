import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Newsletter } from '../../lib/mergeSort'; 
import { format } from 'date-fns';
import { Typography } from '../../styles/typography';

type Props = {
  data: Newsletter;
};

type VoteStatus = 'liked' | 'disliked' | 'none';

const FooterIcon = ({ iconSource, count, onPress }: { iconSource: any, count: number, onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.footerIconContainer} disabled={!onPress}>
    <Image source={iconSource} style={styles.footerIcon} />
    <Text style={styles.footerIconText}>{count}</Text>
  </TouchableOpacity>
);

const NewsletterCard = ({ data }: Props) => {
  const formattedDate = format(new Date(data.releaseDate), 'dd MMM yyyy');

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [voteStatus, setVoteStatus] = useState<VoteStatus>('none');

  const handleVote = (type: 'like' | 'dislike') => {
    if (type === 'like') {
      if (voteStatus === 'liked') {
        setLikeCount(likeCount - 1);
        setVoteStatus('none');
      } else {
        setLikeCount(likeCount + 1);
        if (voteStatus === 'disliked') {
          setDislikeCount(dislikeCount - 1);
        }
        setVoteStatus('liked');
      }
    } else if (type === 'dislike') {
      if (voteStatus === 'disliked') {
        setDislikeCount(dislikeCount - 1);
        setVoteStatus('none');
      } else {
        setDislikeCount(dislikeCount + 1);
        if (voteStatus === 'liked') {
          setLikeCount(likeCount - 1);
        }
        setVoteStatus('disliked');
      }
    }
  };

  const likeIconSource = voteStatus === 'liked'
    ? require('../../assets/icons/likeactive.png')
    : require('../../assets/icons/like.png');

  const dislikeIconSource = voteStatus === 'disliked'
    ? require('../../assets/icons/dislikeactive.png')
    : require('../../assets/icons/dislike.png');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/AvatarPublisher.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Matthew - Marketing</Text>
          <Text style={styles.time}>{formattedDate}</Text>
        </View>
      </View>
      <Text style={styles.category}>Pricing Adjustment</Text>
      <Text style={styles.title}>{data.title}</Text>
      <Image
        source={require('../../assets/images/news1.png')}
        style={styles.image}
      />

      {/* Footer sekarang diposisikan secara absolut */}
      <View style={styles.footer}>
        <FooterIcon 
          iconSource={likeIconSource} 
          count={likeCount} 
          onPress={() => handleVote('like')} 
        />
        <FooterIcon 
          iconSource={dislikeIconSource} 
          count={dislikeCount} 
          onPress={() => handleVote('dislike')} 
        />
        <FooterIcon 
          iconSource={require('../../assets/icons/comment.png')} 
          count={0} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    // height: 350, // <-- SOLUSI: Hapus baris ini
    marginRight: 16,
    backgroundColor: '#fff',
    padding: 12,
    paddingBottom: 40, // Menambah padding bawah agar ada ruang untuk footer absolut
    borderRadius: 10,
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
    height: 160,
    borderRadius: 8,
    marginBottom: 10, // Memberi sedikit jarak dari gambar ke footer
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
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