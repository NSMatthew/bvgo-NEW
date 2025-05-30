import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditPersonalInformation = () => {
  // Dummy initial state, bisa diganti dengan props atau fetch dari backend
  const [fullName, setFullName] = useState('Kayla Asri Maharani');
  const [residence, setResidence] = useState('');
  const [occupation, setOccupation] = useState('Operational Manager');
  const [role, setRole] = useState('Property Owner');
  const [birthdate, setBirthdate] = useState('2000/01/31');
  const [email] = useState('kaylaasri@bukitvista.com'); // fixed, tidak editable
  const [phone, setPhone] = useState('878-3263-7675');
  const [phonePrefix] = useState('+62'); // fixed prefix

  const handleSave = () => {
    // Validasi sederhana
    if (!fullName.trim() || !birthdate.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill all required fields (*)');
      return;
    }
    // Simulasi save, bisa dihubungkan ke API backend
    Alert.alert('Success', 'Your profile has been saved!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with back icon */}
      <TouchableOpacity style={styles.backButton}>
        <Icon name="chevron-back" size={24} color="#333" />
        <Text style={styles.headerTitle}>Personal Information</Text>
      </TouchableOpacity>

      {/* Profile Image Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Profile image</Text>
        <View style={styles.profileImageRow}>
          <View style={styles.profileImagePlaceholder}>
            <Icon name="person-circle-outline" size={64} color="#999" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoText}>Put your best photo! Everyone will be able to see it.</Text>
            <TouchableOpacity style={styles.editPhotoButton}>
              <Icon name="pencil" size={16} color="#333" />
              <Text style={styles.editPhotoText}>Edit photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Form Fields */}
      <View style={styles.section}>
        <Text style={styles.label}>Full name *</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          placeholder="Full name"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Residence</Text>
        <TextInput
          value={residence}
          onChangeText={setResidence}
          style={[styles.input, residence === '' && styles.placeholderInput]}
          placeholder="Write something..."
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Occupation</Text>
        <Text style={styles.staticText}>{occupation}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Role *</Text>
        <Text style={[styles.staticText, styles.mutedText]}>{role}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Birthdate *</Text>
        <TextInput
          value={birthdate}
          onChangeText={setBirthdate}
          style={styles.input}
          placeholder="YYYY/MM/DD"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email *</Text>
        <View style={styles.row}>
          <Text style={[styles.staticText, styles.emailText]}>{email}</Text>
          <TouchableOpacity>
            <Text style={styles.editEmailText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Phone number *</Text>
        <View style={styles.row}>
          <View style={styles.phonePrefix}>
            <Text>{phonePrefix}</Text>
          </View>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={[styles.input, { flex: 1 }]}
            keyboardType="phone-pad"
            placeholder="Phone number"
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
    color: '#222',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 14,
  },
  profileImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    color: '#555',
    marginBottom: 4,
  },
  editPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  editPhotoText: {
    marginLeft: 6,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingVertical: 6,
    fontSize: 16,
  },
  placeholderInput: {
    color: '#aaa',
  },
  staticText: {
    fontSize: 16,
    color: '#222',
  },
  mutedText: {
    color: '#aaa',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emailText: {
    fontWeight: '700',
    fontSize: 16,
  },
  editEmailText: {
    color: '#f7931e',
    fontWeight: '600',
  },
  phonePrefix: {
    backgroundColor: '#e7f0fd',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4a4a4a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EditPersonalInformation;