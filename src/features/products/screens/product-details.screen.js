import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'native-base';
import {Button} from 'react-native-paper';
import {theme} from '../../../infrastructure/theme';
import {connect} from 'react-redux';
import * as actions from '../../../redux/actions/cart.action';
import Toast from 'react-native-toast-message';

export const ProductDetailsScreen = ({route, navigation, addItemToCart}) => {
  const [item, setItem] = useState(route.params.item);
  const [availabiltity, setAvailability] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={{marginBottom: 80, padding: 5}}>
          <View>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{
                uri: item.image
                  ? item.image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentHeader}>{item.name}</Text>
            <Text style={styles.contentText}>{item.brand}</Text>
          </View>
          {/* TODO: Description , Rich Description and Availability */}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>$ {item.price}</Text>
        <Button
          mode="contained"
          style={styles.addButton}
          icon={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
          }}
          onPress={() => {
            addItemToCart(item);
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: `${item.name} added to cart`,
              text2: 'Go to cart to complete order',
            });
          }}>
          Add
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    height: 30,
    paddingTop: 6,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 55,
  },
  price: {
    fontSize: 22,
    height: 25,
    paddingTop: 3,
    margin: 20,
    color: 'red',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  addButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingTop: 'auto',
    paddingBottom: 'auto',
    backgroundColor: theme.colors.brand.primary,
    height: 40,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product => {
      dispatch(actions.addToCart({quantity: 1, product}));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductDetailsScreen);
