import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-paper';
import {theme} from '../../../infrastructure/theme';
import * as actions from '../../../redux/actions/cart.actions';
import Toast from 'react-native-toast-message';

var {width} = Dimensions.get('window');

const ProductCard = props => {
  const {item, navigation} = props;
  const {name, price, image, countInStock} = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Product Details', {item: item});
      }}>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: image
              ? image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
        />
      </View>
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15, -3) + '...' : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={styles.stock}>
          <Button
            mode="contained"
            style={styles.addButton}
            icon={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
            }}
            onPress={() => {
              props.addItemToCart(item);
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: `${name} added to cart`,
                text2: 'Go to cart to complete order',
              });
            }}>
            Add
          </Button>
        </View>
      ) : (
        <Text style={{marginTop: 20}}>Currently Unavailable</Text>
      )}
    </TouchableOpacity>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product => {
      dispatch(actions.addToCart({quantity: 1, product}));
    },
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.9,
    padding: 10,
    borderRadius: 10,
    marginTop: 75,
    marginBottom: 5,
    marginLeft: 8,
    elevation: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.bg.primary,
  },
  image: {
    width: width / 2 - 20 - 50,
    height: width / 2 - 20 - 50,
    backgroundColor: 'transparent',
    borderRadius: width / 2,
  },
  image_container: {
    width: width / 2 - 20 - 40,
    height: width / 2 - 20 - 40,
    backgroundColor: theme.colors.brand.secondary,
    position: 'absolute',
    top: -(width / 4 - 10 - 20),
    borderRadius: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 10,
    height: width / 4 - 10 - 25,
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

export default connect(null, mapDispatchToProps)(ProductCard);
