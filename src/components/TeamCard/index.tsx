import React from 'react';
import { View, Text, StyleSheet, Image, StyleProp, TextStyle, ImageStyle, ViewStyle, TouchableOpacity } from 'react-native';

// Tipe untuk status tugas, bisa diperluas jika ada status lain
type Status = 'New' | 'Ongoing' | 'Done';

// Tipe untuk props komponen. Nama prop dipertahankan agar konsisten dengan kode lama,
// dengan tambahan prop baru untuk detail tugas.
type TeamCardProps = {
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
  isOverdue?: boolean; // Prop opsional untuk menandai tugas yang telat
  name: string;
  role: string;
  status: Status;
  avatar: any;
  onStatusPress?: () => void;
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
    // Container utama untuk kartu tugas
    <View style={styles.card}>
      {/* Bagian Atas: Judul, Deskripsi, dan Tenggat Waktu */}
      <View style={styles.taskInfoContainer}>
        <Text style={styles.taskTitle}>{taskTitle}</Text>
        <Text style={styles.taskDescription}>{taskDescription}</Text>
        <Text style={[styles.dueDate, isOverdue && styles.dueDateOverdue]}>
          Due date: {dueDate}
        </Text>
      </View>

      {/* Bagian Tengah: Informasi Anggota Tim yang Bertugas */}
      <View style={styles.assigneeContainer}>
        <Image source={avatar} style={styles.avatar} />
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
// Menggunakan warna dan tipografi sesuai permintaan
const styles = StyleSheet.create<{
  card: ViewStyle;
  taskInfoContainer: ViewStyle;
  taskTitle: TextStyle;
  taskDescription: TextStyle;
  dueDate: TextStyle;
  dueDateOverdue: TextStyle;
  assigneeContainer: ViewStyle;
  avatar: ImageStyle;
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
    // Pastikan font 'Satoshi-Bold' sudah di-load di proyek Anda
    fontFamily: 'Satoshi-Bold',
    fontSize: 20,
    color: '#0E0E0E',
    marginBottom: 4,
  },
  taskDescription: {
    // Pastikan font 'Satoshi-Regular' sudah di-load di proyek Anda
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
    color: '#DD0101', // Warna merah untuk tugas yang telat
  },
  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Membuat avatar menjadi lingkaran
    marginRight: 12,
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
    alignSelf: 'flex-start', // Membuat tombol tidak memenuhi lebar kartu
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