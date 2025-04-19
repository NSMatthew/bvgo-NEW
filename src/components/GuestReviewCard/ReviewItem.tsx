import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  name: string;
  dateRange: string;
  review: string;
  avatar: any;
};

const ReviewItem = ({ name, dateRange, review, avatar }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={avatar} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{dateRange}</Text>
        </View>
      </View>

      <View style={styles.stars}>
        {Array(5).fill(0).map((_, i) => (
          <Text key={i}>⭐</Text>
        ))}
      </View>

      <Text style={styles.review}>{review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  review: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReviewItem;