import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type NotificationItem = {
  id: string;
  avatar?: any;
  title: string;
  message: string;
  date: string;
  unread: boolean;
};

const Notif: NotificationItem[] = [
  {
    id: '1',
    avatar: require('../assets/avatar1.png'), // ganti dengan image avatar asli
    title: 'Gaia',
    message:
      'Suksma atas laporan bahwa tamu tidak minta cleaning dan tidak mengizinkan masuk. Kami menghargai perhatian Anda pada preferensi tamu. Jika ada yang perlu dibantu lebih lanjut, silakan beri tahu, Nggih.',
    date: '15-05-2025 12:15',
    unread: true,
  },
  {
    id: '2',
    avatar: require('../assets/avatar2.png'),
    title: 'Gede Ananta',
    message: 'teriman di vila dardahlia dan no cleaning hari ini',
    date: '15-05-2025 12:15',
    unread: true,
  },
  {
    id: '3',
    avatar: require('../assets/avatar3.png'),
    title: 'Riki Vernanda',
    message:
      'selamat siang, Hari ini tamu tidak minta cleaning dan tidak di perbolehkan masuk🙏',
    date: '15-05-2025 12:09',
    unread: true,
  },
  {
    id: '4',
    avatar: require('../assets/logo-payout.png'),
    title: 'Payout Update!',
    message: 'Update: We’ve transferred Rp 4553711 to your bank account',
    date: '15-05-2025 12:00',
    unread: false,
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(Notif);

  const markAllAsRead = () => {
    const updated = notifications.map((item) => ({
      ...item,
      unread: false,
    }));
    setNotifications(updated);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Filter and Mark all as read */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter by Unread</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markReadText}>Mark all as Read</Text>
        </TouchableOpacity>
      </View>

      {/* Notification list */}
      <ScrollView style={{ flex: 1 }}>
        {notifications.map((item) => (
          <View
            key={item.id}
            style={[
              styles.notificationItem,
              { backgroundColor: item.unread ? '#e4f0ff' : '#fff' },
            ]}
          >
            {item.avatar && (
              <Image source={item.avatar} style={styles.avatar} resizeMode="contain" />
            )}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.title}>
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>{' '}
                commented on guest <Text style={{ fontWeight: 'bold' }}>Achraf Harroussi</Text>
              </Text>
              <View style={styles.messageBox}>
                <Text>{item.message}</Text>
              </View>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            {item.unread && <View style={styles.blueDot} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#007BC1',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e6f0ff',
  },
  filterText: {
    fontWeight: '600',
  },
  markReadText: {
    color: '#F4A300',
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  title: {
    fontSize: 14,
    marginBottom: 6,
  },
  messageBox: {
    backgroundColor: '#d8e7ff',
    borderRadius: 4,
    padding: 8,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  blueDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BC1',
    marginLeft: 8,
  },
});

export default Notification;