import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TeamCard from '../../components/TeamCard';
import TaskModal from '../../components/TeamCard/TaskModal';

type Status = 'All' | 'New' | 'Ongoing' | 'Done';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  status: Exclude<Status, 'All'>;
  avatar: any;
};

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Robert Davis C.',
    role: 'Guest Experience Manager',
    status: 'Ongoing',
    avatar: require('../../assets/images/avatar4.png'),
  },
  {
    id: '2',
    name: 'Noriyaki',
    role: 'Property Owner',
    status: 'Done',
    avatar: require('../../assets/images/avatar3.png'),
  },
  {
    id: '3',
    name: 'Charlie',
    role: 'Onsite staff',
    status: 'New',
    avatar: require('../../assets/images/avatar2.png'),
  },
  {
    id: '4',
    name: 'John',
    role: 'Onsite staff',
    status: 'New',
    avatar: require('../../assets/images/avatar1.png'),
  },
];

const TeamPage = () => {
  const navigation = useNavigation();
  const [statusFilter, setStatusFilter] = useState<Status>('All');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const filteredMembers =
    statusFilter === 'All'
      ? teamMembers
      : teamMembers.filter((member) => member.status === statusFilter);

  const openTaskModal = (member: TeamMember) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const closeTaskModal = () => {
    setModalVisible(false);
    setSelectedMember(null);
  };

  const handleSaveStatus = (newStatus: Exclude<Status, 'All'>) => {
    if (selectedMember) {
      const updatedMembers = teamMembers.map((member) =>
        member.id === selectedMember.id ? { ...member, status: newStatus } : member
      );
      setTeamMembers(updatedMembers);
    }
    closeTaskModal();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          //ikutin FAQ buat back button
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['All', 'New', 'Ongoing', 'Done'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              status === statusFilter && styles.activeFilter,
            ]}
            onPress={() => setStatusFilter(status as Status)}
          >
            <Text
              style={[
                styles.filterText,
                status === statusFilter && styles.activeFilterText,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TeamCard
            name={item.name}
            role={item.role}
            status={item.status}
            avatar={item.avatar}
            onStatusPress={() => openTaskModal(item)}
          />
        )}
      />

      {selectedMember && (
        <TaskModal
          visible={modalVisible}
          taskName={`Task for ${selectedMember.name}`}
          taskStatus={selectedMember.status}
          onSave={handleSaveStatus}
          onCancel={closeTaskModal}
        />
      )}
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
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#1076BC',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: -12,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  activeFilter: {
    backgroundColor: '#1076BC',
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
  },
});

export default TeamPage;