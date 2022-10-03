import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OrderCard} from '../components/order-card.component';
import {theme} from '../../../infrastructure/theme';

export const OrdersScreen = ({navigation}) => {
  const [orderList, setOrderList] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
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
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });

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
    <>
      {loading ? (
        <View>
          <FlatList
            data={orderList}
            renderItem={({item, index}) => (
              <OrderCard order={item} navigation={navigation} editMode={true} />
            )}
          />
        </View>
      ) : (
        <View
          style={[styles.center, {backgroundColor: '#f2f2f2', height: '100%'}]}>
          <ActivityIndicator
            size={'large'}
            color={theme.colors.brand.primary}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 1,
  },
});
