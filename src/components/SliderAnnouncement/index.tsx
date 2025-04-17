import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList } from 'react-native';

type SliderItem = {
  id: string;
  title: string;
  image: any; // require()
};

const announcements: SliderItem[] = [
  {
    id: '1',
    title: 'Upcoming Maintenance',
    image: require('../../assets/images/announcement1.png'),
  },
  // add more if needed
];

const SliderAnnouncement = () => {
  return (
    <FlatList
      horizontal
      data={announcements}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <ImageBackground source={item.image} style={styles.slide}>
          <Text style={styles.slideText}>{item.title}</Text>
        </ImageBackground>
      )}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: 300,
    height: 120,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 10,
  },
  slideText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});

export default SliderAnnouncement;