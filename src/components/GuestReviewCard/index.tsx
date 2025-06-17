import React from 'react';
import { FlatList, View } from 'react-native';
import ReviewItem from './ReviewItem';

const data = [
  {
    name: 'David B.',
    dateRange: 'Feb 1 - Feb 2, 2025',
    review: 'The place is super comfy!',
    avatar: require('../../assets/images/guest1.png'),
  },
  {
    name: 'Christian E.',
    dateRange: 'Mar 1 - Mar 2, 2025',
    review: 'The place is super comfy! The room also super big. Recommended!',
    avatar: require('../../assets/images/guest2.png'),
  },
];

const GuestReviewCard = () => {
  return (
    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <ReviewItem
          name={item.name}
          dateRange={item.dateRange}
          review={item.review}
          avatar={item.avatar}
        />
      )}
    />
  );
};

export default GuestReviewCard;