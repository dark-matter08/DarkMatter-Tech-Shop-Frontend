import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Select} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {TraficLight} from '../../../components/trafic-light/trafic-light.component';
import {Button} from '../../../components/button/button.component';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';
import {faArrowAltCircleDown} from '@fortawesome/free-solid-svg-icons';
import {theme} from '../../../infrastructure/theme';

const codes = [
  {name: 'Pending', code: '3'},
  {name: 'Shipped', code: '2'},
  {name: 'Delivered', code: '1'},
];

export const OrderCard = ({order, navigation, editMode = false}) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
      })
      .catch(err => {
        console.log(err);
      });

    setStatusChange(order.status);
    if (order.status === '3') {
      setStatusText('pending');
      setOrderStatus('Unavailable');
      setCardColor('#F08080');
    } else if (order.status === '2') {
      setStatusText('shipped');
      setOrderStatus('Limited');
      setCardColor('#FADA5E');
    } else {
      setStatusText('delivered');
      setOrderStatus('Available');
      setCardColor('#3B7A57');
    }
    return () => {
      setStatusText();
      setOrderStatus();
      setCardColor();
      setStatusChange();
      setToken();
    };
  }, [order]);

  const updateOrder = () => {
    setUpdateLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order_update = {
      city: order.city,
      country: order.country,
      shippingAddress1: order.shippingAddress1,
      shippingAddress2: order.shippingAddress2,
      zip: order.zip,
      phone: order.phone,
      id: order.id,
      orderItems: order.orderItems,
      user: order.user,
      status: statusChange,
      totalPrice: order.totalPrice,
      dateOrdered: order.dateOrdered,
    };

    console.log(order_update);

    axios
      .put(`${baseURL}orders/${order.id}`, order_update, config)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order Updated',
            text2: '',
          });
          setUpdateLoading(false);
          setTimeout(() => {
            navigation.navigate('Products');
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
        setUpdateLoading(false);
      });
  };

  return (
    <View style={[{backgroundColor: 'cardColor'}, styles.container]}>
      <View style={styles.title}>
        <Text>Order Number: {order.id}</Text>
      </View>
      <View style={styles.statusView}>
        <Text>Status: {statusText}</Text>
        <TraficLight availability={orderStatus} />
      </View>
      <View>
        <View style={styles.statusView}>
          <Text>
            Addres: {order.shippingAddress1}, {order.shippingAddress2}
          </Text>
        </View>
        <Text>City: {order.city}</Text>
        <Text>Country: {order.country}</Text>
        <Text>Date: {order.dateOrdered.split('T')[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {order.totalPrice}</Text>
        </View>
        {editMode && (
          <View>
            <Select
              mode="dropdown"
              style={styles.categorySelector}
              iosIcon={
                <FontAwesomeIcon
                  size={'lg'}
                  color={'orange'}
                  icon={faArrowAltCircleDown}
                />
              }
              width={undefined}
              selectedValue={statusChange}
              placeholder="Change Status"
              placeholderIconColor="#007aff"
              onValueChange={e => {
                setStatusChange(e);
              }}>
              {codes.map(c => {
                return (
                  <Select.Item key={c.code} label={c.name} value={c.code} />
                );
              })}
            </Select>
            <View style={styles.buttonView}>
              <Button
                text="Update"
                isLoading={updateLoading}
                button_width={'65%'}
                onPress={updateOrder}
                icon={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2742/2742409.png',
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: 5,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.brand.fourth,
  },
  statusView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonView: {
    marginTop: 20,
    alignItems: 'center',
  },
});
