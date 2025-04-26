import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type TeamCardProps = {
  name: string;
  role: string;
  status: string;
  avatar: any;
};

const TeamCard = ({ name, role, status, avatar }: TeamCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.teamName}>{name}</Text>
        <Text style={styles.teamRole}>{role}</Text>
        <Text style={[styles.statusLabel, styles[status]]}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  New: {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  Ongoing: {
    backgroundColor: '#FFA500',
    color: '#fff',
  },
  Done: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
});

export default TeamCard;