import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type RevenueProgressProps = {
  revenue: number;
  target: number;
  percentage: number;
  chartImage: any;
};

const RevenueProgress = ({ revenue, target, percentage, chartImage }: RevenueProgressProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>On-track</Text>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.subTitle}>Revenue progress</Text>
          <Text style={styles.amount}>Rp{revenue.toLocaleString('id-ID')}</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>Contract value</Text>
          <Text style={styles.amount}>Rp{target.toLocaleString('id-ID')}</Text>
        </View>
      </View>

      <Image source={chartImage} style={styles.chart} resizeMode="contain" />

      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.progressText}>{percentage}% Contract value progress</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#007BFF', padding: 16, borderRadius: 16, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  subTitle: { color: '#fff', fontSize: 12, marginBottom: 4 },
  amount: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  chart: { width: '100%', height: 120, marginBottom: 12 },
  progressBackground: { width: '100%', height: 8, backgroundColor: '#ffffff50', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#fff' },
  progressText: { color: '#fff', fontSize: 12, marginTop: 4 },
});

export default RevenueProgress;