import React from 'react';
import { View, Text, StyleSheet, Image, StyleProp, TextStyle, ImageStyle, ViewStyle, TouchableOpacity } from 'react-native';

type Status = 'New' | 'Ongoing' | 'Done';

type TeamCardProps = {
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
  isOverdue?: boolean;
  name: string;
  role: string;
  status: Status;
  avatar: string | null;
  onStatusPress?: () => void;
};

const InitialsAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <View style={styles.initialsAvatarContainer}>
      <Text style={styles.initialsText}>{initials}</Text>
    </View>
  );
};

const TeamCard = ({
  taskTitle,
  taskDescription,
  dueDate,
  isOverdue = false,
  name,
  role,
  status,
  avatar,
  onStatusPress
}: TeamCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.taskInfoContainer}>
        <Text style={styles.taskTitle}>{taskTitle}</Text>
        <Text style={styles.taskDescription}>{taskDescription}</Text>
        
        {/* Style 'dueDateOverdue' hanya akan diterapkan jika isOverdue BERNILAI TRUE */}
        <Text style={[styles.dueDate, (isOverdue && status !== 'Done') && styles.dueDateOverdue]}>
          Due date: {dueDate}
        </Text>
      </View>

      {/* Bagian Tengah: Informasi Anggota Tim yang Bertugas */}
      <View style={styles.assigneeContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <InitialsAvatar name={name} />
        )}
        <View>
          <Text style={styles.assigneeName}>{name}</Text>
          <Text style={styles.assigneeRole}>{role}</Text>
        </View>
      </View>

      {/* Bagian Bawah: Tombol Status Tugas */}
      <TouchableOpacity onPress={onStatusPress} style={[styles.statusButton, styles[status]]}>
        <Text style={styles.statusButtonText}>{status}</Text>
      </TouchableOpacity>
    </View>
  );
};

// StyleSheet untuk semua elemen dalam komponen
const styles = StyleSheet.create<{
  card: ViewStyle;
  taskInfoContainer: ViewStyle;
  taskTitle: TextStyle;
  taskDescription: TextStyle;
  dueDate: TextStyle;
  dueDateOverdue: TextStyle;
  assigneeContainer: ViewStyle;
  avatar: ImageStyle;
  initialsAvatarContainer: ViewStyle;
  initialsText: TextStyle;
  assigneeName: TextStyle;
  assigneeRole: TextStyle;
  statusButton: ViewStyle;
  statusButtonText: TextStyle;
  New: ViewStyle;
  Ongoing: ViewStyle;
  Done: ViewStyle;
}>({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    // Efek bayangan untuk iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Efek bayangan untuk Android
    elevation: 3,
  },
  taskInfoContainer: {
    marginBottom: 16,
  },
  taskTitle: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 20,
    color: '#0E0E0E',
    marginBottom: 4,
  },
  taskDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: '#0E0E0E',
    marginBottom: 8,
  },
  dueDate: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: '#5B5E6B',
  },
  dueDateOverdue: {
    color: '#DD0101',
  },
  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#E0E0E0', // Warna latar belakang sementara gambar dimuat
  },
  initialsAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#1076BC', // Warna latar belakang untuk inisial
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  assigneeName: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    color: '#0E0E0E',
  },
  assigneeRole: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: '#5B5E6B',
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusButtonText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  New: {
    backgroundColor: '#1076BC',
  },
  Ongoing: {
    backgroundColor: '#F69322',
  },
  Done: {
    backgroundColor: '#078564',
  },
});

export default TeamCard;