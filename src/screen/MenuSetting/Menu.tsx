import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

type MenuNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

const Menu = () => {
  const navigation = useNavigation<MenuNavigationProp>();  // Use the correct type here

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Warning */}
      <View style={styles.warningBox}>
        <View style={{ flex: 1 }}>
          <Text style={styles.warningTitle}>Complete your profile</Text>
          <Text style={styles.warningSubtitle}>You have missing information on your profile</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="pencil" size={20} color="white" />
          <Text style={styles.editButtonText}>Edit now</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarPlaceholder}>
          <Icon name="person" size={50} color="#888" />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>Kayla Asri Maharani</Text>
          <Text style={styles.profileRole}>Operational Manager</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>8</Text>
          <Icon name="home-outline" size={20} color="#FFA500" style={{ position: 'absolute', top: 10, right: 10 }} />
          <Text style={styles.statLabel}>Guest hosted</Text>
          <View style={styles.statUnderline} />
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>Average</Text>
          <Icon name="star-outline" size={20} color="#FFA500" style={{ position: 'absolute', top: 10, right: 10 }} />
          <Text style={styles.statLabel}>review</Text>
          <View style={styles.statUnderline} />
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1.9</Text>
          <Icon name="time-outline" size={20} color="#FFA500" style={{ position: 'absolute', top: 10, right: 10 }} />
          <Text style={styles.statLabel}>Years hosting</Text>
          <View style={styles.statUnderline} />
        </View>
      </View>

      {/* Menu List */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="person-outline" size={22} color="#444" />
          <Text style={styles.menuText}>Edit Personal Information</Text>
          <Icon name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="settings-outline" size={22} color="#444" />
          <Text style={styles.menuText}>Configuration</Text>
          <Icon name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="document-text-outline" size={22} color="#444" />
          <Text style={styles.menuText}>Term of Service</Text>
          <Icon name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="lock-closed-outline" size={22} color="#444" />
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Icon name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        {/* FAQ menu item */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("FAQ")}  // Navigasi ke FAQ screen
        >
          <Icon name="help-circle-outline" size={22} color="#444" />
          <Text style={styles.menuText}>FAQ</Text>
          <Icon name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <TouchableOpacity style={styles.menuItem}>
        <Icon name="person-circle-outline" size={22} color="#444" />
        <Text style={styles.menuText}>Account</Text>
        <Icon name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton}>
        <Icon name="power-outline" size={22} color="#d33" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  warningBox: {
    flexDirection: 'row',
    borderColor: '#e89a9a',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  warningTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  warningSubtitle: {
    marginTop: 4,
    color: '#555',
  },
  editButton: {
    backgroundColor: '#3c4351',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    marginLeft: 6,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 6,
  },
  statLabel: {
    fontWeight: '500',
    fontSize: 14,
  },
  statUnderline: {
    height: 3,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    marginTop: 6,
    width: '40%',
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
    marginLeft: 12,
    color: '#444',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    justifyContent: 'center',
  },
  logoutText: {
    color: '#d33',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Menu;