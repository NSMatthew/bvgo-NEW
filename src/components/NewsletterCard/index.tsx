import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Newsletter } from '../../lib/mergeSort'; 

type Props = {
  data: Newsletter[];
};

const NewsletterCard = ({ data }: Props) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Matthew - Marketing</Text>
              <Text style={styles.time}>1 day ago</Text>
            </View>
          </View>

          <Text style={styles.category}>Pricing Adjustment</Text>
          <Text style={styles.title}>{item.title}</Text>

          <Image
            source={require('../../assets/images/news1.png')}
            style={styles.image}
          />

          <View style={styles.footer}>
            <Text>👍 0</Text>
            <Text>💬 0</Text>
            <Text>👁️ 0</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: '#fff',
    padding: 12,
    marginRight: 16,
    borderRadius: 12,
    elevation: 3,
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