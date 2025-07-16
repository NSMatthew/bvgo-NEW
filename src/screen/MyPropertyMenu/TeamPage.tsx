import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createClient } from '@supabase/supabase-js';
import TeamCard from '../../components/TeamCard'; // Pastikan path ini benar
import TaskModal from '../../components/TeamCard/TaskModal'; // Pastikan path ini benar

// --- Inisialisasi Supabase Client ---
// Ganti dengan URL dan Anon Key dari proyek Supabase Anda
const supabaseUrl = 'https://drmzrbydynawphmjhptu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybXpyYnlkeW5hd3BobWpocHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MzIyODYsImV4cCI6MjA1ODAwODI4Nn0.cfoH6ynmk4AxsUm800NDlfKwGpsi45oZFA2SjS_9b-E';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Status = 'All' | 'New' | 'Ongoing' | 'Done';

type TaskWithAssignee = {
  id: number;
  title: string;
  description: string;
  status: 'New' | 'Ongoing' | 'Done';
  due_date: string;
  assignee: {
    full_name: string;
    role: string;
    avatar_url: string | null;
  }[] | null;
};

const TeamPage = () => {
  const navigation = useNavigation();

  // --- State Management ---
  const [tasks, setTasks] = useState<TaskWithAssignee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status>('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskWithAssignee | null>(null);

  // --- Pengambilan Data & Real-time ---
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('tasks')
          .select(`
            id, title, description, status, due_date,
            assignee:assignee_id (full_name, role, avatar_url)
          `)
          .order('due_date', { ascending: true });

        if (fetchError) throw fetchError;
        if (data) setTasks(data);

      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    const channel = supabase
      .channel('realtime-tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' },
        (payload) => {
          console.log('Perubahan terdeteksi!', payload);
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // --- Logika untuk Modal ---
  const openTaskModal = (task: TaskWithAssignee) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeTaskModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const handleSaveStatus = async (newStatus: Exclude<Status, 'All'>) => {
    if (selectedTask) {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', selectedTask.id);

      if (updateError) {
        Alert.alert('Gagal memperbarui status', 'Silakan coba lagi.');
        console.error("Error updating status:", updateError);
      }
    }
    closeTaskModal();
  };

  // --- Logika untuk Filter ---
  const filteredTasks =
    statusFilter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  // --- Render Logic ---
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1076BC" />
        <Text>Memuat tugas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Terjadi kesalahan: {error}</Text>
      </View>
    );
  }

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        {/* ... Back button logic ... */}
      </View>
      <View style={styles.filterContainer}>
        {['All', 'New', 'Ongoing', 'Done'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, status === statusFilter && styles.activeFilter]}
            onPress={() => setStatusFilter(status as Status)}
          >
            <Text style={[styles.filterText, status === statusFilter && styles.activeFilterText]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isOverdue = new Date(item.due_date) < new Date();
          const assigneeInfo = Array.isArray(item.assignee) ? item.assignee[0] : item.assignee;

          return (
            <TeamCard
              taskTitle={item.title}
              taskDescription={item.description}
              dueDate={new Date(item.due_date).toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})}
              isOverdue={isOverdue}
              name={assigneeInfo?.full_name || 'Belum Ditugaskan'}
              role={assigneeInfo?.role || ''}
              status={item.status}
              avatar={assigneeInfo?.avatar_url || null}
              onStatusPress={() => openTaskModal(item)}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
      />

      {selectedTask && (
        <TaskModal
          visible={modalVisible}
          taskName={`Task for ${selectedTask.assignee?.[0]?.full_name || 'Unknown'}`}
          taskStatus={selectedTask.status}
          onSave={handleSaveStatus}
          onCancel={closeTaskModal}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#1076BC',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'Satoshi-Regular',
  },
  activeFilterText: {
    color: '#fff',
  },
});

export default TeamPage;