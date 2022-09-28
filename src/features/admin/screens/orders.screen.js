import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OrderCard} from '../components/order-card.component';

export const OrdersScreen = ({navigation}) => {
  const [orderList, setOrderList] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      AsyncStorage.getItem('jwt')
        .then(res => {
          setToken(res);
        })
        .catch(err => {
          console.log(err);
        });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(`${baseURL}orders`, config)
        .then(res => {
          setOrderList(res.data);
        })
        .catch(error => console.log(error));

      return () => {
        setOrderList();
      };
    }, [token]),
  );

  const getOrders = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${baseURL}orders`, config)
      .then(x => {
        setOrderList(x.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({item, index}) => (
          <OrderCard order={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 1,
  },
});
