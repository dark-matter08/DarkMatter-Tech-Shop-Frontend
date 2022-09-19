import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
// import {image}

import {theme} from '../../../infrastructure/theme';

var {width} = Dimensions.get('window');

export const ProductCard = props => {
  const {name, price, image, countInStock} = props;

  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : 'https://cdn-icons-png.flaticon.com/512/2618/2618316.png',
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15, -3) + '...' : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={styles.stock}>
          <Button title="Add" color={'green'} />
        </View>
      ) : (
        <Text style={{marginTop: 20}}>Currently Unavailable</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 8,
    elevation: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.bg.primary,
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 30 - 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -65,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.text_i.primary,
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginTop: 10,
    marginBottom: 10,
  },
  stock: {
    marginBottom: 60,
  },
});
