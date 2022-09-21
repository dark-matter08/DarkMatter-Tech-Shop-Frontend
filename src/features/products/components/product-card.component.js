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
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />
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

export default connect(null, mapDispatchToProps)(ProductCard);
