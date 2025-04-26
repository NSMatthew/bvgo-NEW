import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Ensure you are using react-native-paper's RadioButton

type TaskModalProps = {
  visible: boolean;
  taskName: string;
  taskStatus: 'New' | 'Ongoing' | 'Done';
  onSave: (newStatus: 'New' | 'Ongoing' | 'Done') => void;
  onCancel: () => void;
};

const TaskModal = ({ visible, taskName, taskStatus, onSave, onCancel }: TaskModalProps) => {
  // Corrected type for status to restrict it to 'New' | 'Ongoing' | 'Done'
  const [status, setStatus] = React.useState<'New' | 'Ongoing' | 'Done'>(taskStatus);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{taskName}</Text>
          <Text style={styles.description}>Fill the information regarding pool size on Airbnb listing.</Text>

          <View style={styles.radioContainer}>
            <RadioButton.Group value={status} onValueChange={setStatus}>
              <View style={styles.radioOption}>
                <Text>New</Text>
                <RadioButton value="New" />
              </View>
              <View style={styles.radioOption}>
                <Text>Ongoing</Text>
                <RadioButton value="Ongoing" />
              </View>
              <View style={styles.radioOption}>
                <Text>Done</Text>
                <RadioButton value="Done" />
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSave(status)} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TaskModal;