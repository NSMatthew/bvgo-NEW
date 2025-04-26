import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import TeamCard from '../components/TeamCard'; // Mengimpor komponen TeamCard

const teamMembers = [
  { id: '1', name: 'Robert Davis C.', role: 'Guest Experience Manager', status: 'Ongoing', avatar: require('../../assets/images/avatar.png') },
  { id: '2', name: 'Noriyaki', role: 'Property Owner', status: 'Done', avatar: require('../../assets/images/avatar.png') },
  { id: '3', name: 'Charlie', role: 'Onsite staff', status: 'New', avatar: require('../../assets/images/avatar.png') },
  { id: '4', name: 'John', role: 'Onsite staff', status: 'New', avatar: require('../../assets/images/avatar.png') },
  // Add more team members here
];

const TeamPage = () => {
  const [statusFilter, setStatusFilter] = useState('All'); // Default filter is 'All'

  // Filter function to display team based on selected status
  const filteredMembers = statusFilter === 'All'
    ? teamMembers
    : teamMembers.filter(member => member.status === statusFilter);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>My Team</Text>
      </View>

      {/* Status Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'New', 'Ongoing', 'Done'].map(status => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, status === statusFilter && styles.activeFilter]}
            onPress={() => setStatusFilter(status)}
          >
            <Text style={styles.filterText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Team List */}
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TeamCard
            name={item.name}
            role={item.role}
            status={item.status}
            avatar={item.avatar}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  activeFilter: {
    backgroundColor: '#007BFF',
  },
  filterText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TeamPage;