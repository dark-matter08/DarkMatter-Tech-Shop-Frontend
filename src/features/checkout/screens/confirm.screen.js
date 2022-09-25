import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Text} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../../../redux/actions/cart.action';
import {Avatar, Button, List} from 'react-native-paper';
// import {  } from 'react-native-gesture-handler';

var {height, width} = Dimensions.get('window');

export const ConfirmScreen = ({route, navigation, clearCart}) => {
  let orderDetails;
  if (route.params) {
    orderDetails = route.params.order.order;
  }

  const confirmOrder = () => {
    setTimeout(() => {
      clearCart();
      navigation.navigate('CartScreen');
    }, 500);
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
          <Button style={styles.button} mode="contained" onPress={confirmOrder}>
            Place Order
          </Button>
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
