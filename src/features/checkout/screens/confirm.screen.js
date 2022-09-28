import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Text} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../../../redux/actions/cart.action';
import {Avatar, List} from 'react-native-paper';
import {Button} from '../../../components/button/button.component';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../../infrastructure/theme';

var {height, width} = Dimensions.get('window');

const ConfirmScreen = ({route, navigation, clearCart}) => {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);

  let orderDetails;
  if (route.params) {
    orderDetails = route.params.order.order;
  }

  useEffect(() => {
    // get jwt token
    setLoading(false);
    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const confirmOrder = () => {
    setLoading(true);
    const orderItemsIds = orderDetails.orderItems.map(item => {
      return {product: item.product._id, quantity: item.quantity};
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: orderDetails.city,
      country: orderDetails.country,
      shippingAddress1: orderDetails.shippingAddress1,
      shippingAddress2: orderDetails.shippingAddress2,
      zip: orderDetails.zip,
      phone: orderDetails.phone,
      orderItems: orderItemsIds,
      user: '632fc88d3897bbcebcc3b2b4',
    };
    console.log(order);

    axios
      .post(`${baseURL}orders`, order, config)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order Complete',
            text2: '',
          });
          setLoading(false);
          setTimeout(() => {
            clearCart();
            navigation.navigate('CartScreen');
            console.log('done');
          }, 500);
        }
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
        setLoading(false);
      });
  };

  // const confirm
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Confirm Order</Text>
        {route.params && (
          <View style={styles.mainView}>
            <Text style={styles.shippingTitle}>Shipping to</Text>
            <View style={{padding: 8}}>
              <Text style={styles.detailsText}>
                Address: {orderDetails.shippingAddress1}
              </Text>
              <Text style={styles.detailsText}>
                Address2: {orderDetails.shippingAddress2}
              </Text>
              <Text style={styles.detailsText}>City: {orderDetails.city}</Text>
              <Text style={styles.detailsText}>
                Zip Copde: {orderDetails.zip}
              </Text>
              <Text style={styles.detailsText}>
                Country: {orderDetails.country}
              </Text>
            </View>
            <Text style={styles.shippingTitle}>Items: </Text>
            {orderDetails.orderItems.map((item, index) => {
              return (
                <List.Item
                  style={styles.listitem}
                  key={index}
                  title={item.product.name}
                  left={props => (
                    <Avatar.Image
                      style={{backgroundColor: 'transparent'}}
                      size={30}
                      source={{
                        uri: item.product.image
                          ? item.product.image
                          : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                      }}
                    />
                  )}
                  right={props => (
                    <Text style={styles.item_price}>
                      $ {item.product.price}
                    </Text>
                  )}
                />
              );
            })}
          </View>
        )}
        <View style={styles.bottomView}>
          <Button
            color={theme.colors.brand.tertiary}
            isLoading={loading}
            button_width="80%"
            indicator="default"
            loaderColor={theme.colors.brand.fourth}
            icon={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2558/2558180.png',
            }}
            text="Place Order"
            onPress={confirmOrder}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsText: {
    fontSize: 16,
  },
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    height: 30,
    paddingTop: 6,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  titleContainer: {
    height: 70,
    paddingVertical: 10,
    marginTop: 20,
  },
  mainView: {
    borderWidth: 1,
    borderColor: 'orange',
    alignItems: 'center',
    alignSelf: 'center',
  },
  shippingTitle: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listitem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: width / 1.2,
    borderBottomWidth: 0.5,
  },
  item_price: {
    fontSize: 18,
    margin: 6,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    width: '100%',
    height: 45,
    paddingTop: 'auto',
    paddingBottom: 'auto',
  },
  bottomView: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(ConfirmScreen);
