import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { supabase } from '../../lib/supabase';

type MenuNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

const Menu = () => {
  const navigation = useNavigation<MenuNavigationProp>();

  // 1. Definisikan fungsi handleLogout DI DALAM komponen, SEBELUM return.
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    }
    // Jika Anda sudah mengatur listener onAuthStateChange di App.tsx,
    // navigasi akan terjadi secara otomatis.
  };

  // 2. Hanya ada SATU return statement di dalam komponen.
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarPlaceholder}>
        <Image 
            source={require('../../assets/images/guest1.png')}
            // Tambahkan style untuk menyesuaikan ukuran avatar
            style={{ width: 50, height: 50, borderRadius: 25 }}
            />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>Jordan</Text>
          <Text style={styles.profileRole}>Operational Manager</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>100</Text>
          <Image 
            source={require('../../assets/icons/guesthosted.png')}
            style={{ width: 25, height: 25, position: 'absolute', top: 10, right: 10 }}
            />
          <Text style={styles.statLabel}>Guest hosted</Text>
          </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4.7</Text>
          <Image 
            source={require('../../assets/icons/averagereview.png')}
            style={{ width: 30, height: 25, position: 'absolute', top: 10, right: 10 }}
            />
          <Text style={styles.statLabel}>Average review</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Image 
            source={require('../../assets/icons/yearhosting.png')}
            style={{ width: 25, height: 25, position: 'absolute', top: 10, right: 10 }}
            />
          <Text style={styles.statLabel}>Years hosting</Text>
        </View>
      </View>

      {/* Menu List */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.menuItem}>
        <Image 
            source={require('../../assets/icons/editpersonalinfo.png')}
            style={{ width: 28, height: 28, position: 'absolute', top: 10, left: 0 }}
            />
          <Text style={styles.menuText}>Edit Personal Information</Text>
          <Image 
            source={require('../../assets/icons/nextarrowgray.png')}
            style={{ width: 15, height: 20, position: 'absolute', top: 10, right: 10 }}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
        <Image 
            source={require('../../assets/icons/configuration.png')}
            style={{ width: 28, height: 28, position: 'absolute', top: 10, left: 0 }}
            />
          <Text style={styles.menuText}>Configuration</Text>
          <Image 
            source={require('../../assets/icons/nextarrowgray.png')}
            style={{ width: 15, height: 20, position: 'absolute', top: 10, right: 10 }}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.menuItem}>
        <Image 
            source={require('../../assets/icons/termofservice.png')}
            style={{ width: 28, height: 28, position: 'absolute', top: 10, left: 0 }}
            />
          <Text style={styles.menuText}>Term of Service</Text>
          <Image 
            source={require('../../assets/icons/nextarrowgray.png')}
            style={{ width: 15, height: 20, position: 'absolute', top: 10, right: 10 }}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
        <Image 
            source={require('../../assets/icons/privacypolicy.png')}
            style={{ width: 16, height: 20, position: 'absolute', top: 10, left: 5 }}
            />
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Image 
            source={require('../../assets/icons/nextarrowgray.png')}
            style={{ width: 15, height: 20, position: 'absolute', top: 10, right: 10 }}
            />
        </TouchableOpacity>
        {/* FAQ menu item */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("FAQ")} // Navigasi ke FAQ screen
        >
          <Image 
            source={require('../../assets/icons/FAQicon.png')}
            style={{ width: 28, height: 28, position: 'absolute', top: 10, left: 0 }}
            />
          <Text style={styles.menuText}>FAQ</Text>
          <Image 
            source={require('../../assets/icons/nextarrowgray.png')}
            style={{ width: 15, height: 20, position: 'absolute', top: 10, right: 10 }}
            />
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <TouchableOpacity style={styles.menuItem}>
      <Image 
          source={require('../../assets/icons/account.png')}
          style={{ width: 28, height: 28, position: 'absolute', top: 10, left: 0 }}
          />
        <Text style={styles.menuText}>Account</Text>
        <Image 
          source={require('../../assets/icons/nextarrowgray.png')}
          style={{ width: 15, height: 20, position: 'absolute', top: 10, right: 10 }}
          />
      </TouchableOpacity>

      {/* Logout */}
      {/* 3. Hubungkan fungsi ke tombol dengan `onPress` */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image 
            source={require('../../assets/icons/logout.png')}
            style={{ width: 24, height: 24 }} // Beri ukuran agar konsisten
            />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

// --- STYLES (TIDAK BERUBAH) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10, // Menambahkan margin atas
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Memastikan gambar tidak keluar dari border
  },
  profileName: {
    fontWeight: '700',
    fontSize: 18,
  },
  profileRole: {
    color: '#7a7a8c',
    fontSize: 14,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statBox: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statNumber: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 6,
  },
  statLabel: {
    fontWeight: '400',
    fontSize: 14,
  },
  menuSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 40, // Memberi ruang untuk ikon
    color: '#5B5E6B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 15,
  },
  logoutText: {
    color: '#d33',
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Menu;