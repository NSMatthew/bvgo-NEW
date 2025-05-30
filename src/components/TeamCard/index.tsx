import React from 'react';
import { View, Text, StyleSheet, Image, StyleProp, TextStyle, ImageStyle, ViewStyle, TouchableOpacity } from 'react-native';

type Status = 'New' | 'Ongoing' | 'Done';

type TeamCardProps = {
  name: string;
  role: string;
  status: Status;
  avatar: any;
  onStatusPress?: () => void;  // Tambahan callback props
};

const TeamCard = ({ name, role, status, avatar, onStatusPress }: TeamCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.teamName}>{name}</Text>
        <Text style={styles.teamRole}>{role}</Text>
        <TouchableOpacity onPress={onStatusPress}>
          <Text style={[styles.statusLabel, styles[status] as StyleProp<TextStyle>]}>{status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<{
  card: ViewStyle;
  avatar: ImageStyle;
  textContainer: ViewStyle;
  teamName: TextStyle;
  teamRole: TextStyle;
  statusLabel: TextStyle;
  New: TextStyle;
  Ongoing: TextStyle;
  Done: TextStyle;
}>({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamRole: {
    fontSize: 14,
    color: '#777',
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 4,
    borderRadius: 4,
    textAlign: 'center',
    color: '#fff',
  },
  New: {
    backgroundColor: '#007BFF',
  },
  Ongoing: {
    backgroundColor: '#FFA500',
  },
  Done: {
    backgroundColor: '#4CAF50',
  },
});

export default TeamCard;