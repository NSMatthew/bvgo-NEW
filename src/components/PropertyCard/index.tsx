import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PropertyCard = () => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../../assets/images/fotoVillaGoodJuju.png')}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>Villa Good Juju <Text style={styles.status}>• Full Board</Text></Text>

        <View style={styles.attributes}>
          <View style={styles.iconGroup}>
            <Image source={require('../../assets/icons/PropertyAttribute.png')} style={styles.icon} />
            <Text style={styles.label}>B+</Text>
          </View>
          <View style={styles.iconGroup}>
            <Image source={require('../../assets/icons/GuestExperienceManagement.png')} style={styles.icon} />
            <Text style={styles.label}>A</Text>
          </View>
          <View style={styles.iconGroup}>
            <Image source={require('../../assets/icons/OwnerRelationship.png')} style={styles.icon} />
            <Text style={styles.label}>B+</Text>
          </View>
        </View>
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
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontWeight: 'normal',
    color: '#555',
    fontSize: 14,
  },
  attributes: {
    flexDirection: 'row',
    marginTop: 8,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  label: {
    fontSize: 13,
    color: '#333',
  },
});

export default PropertyCard;