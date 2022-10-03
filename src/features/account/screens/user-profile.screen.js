import React, {useContext, useState, useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {ActivityIndicator, Button} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';

import AuthContext from '../../../context/store/auth.global';
import {getUserProfile, logoutUser} from '../../../context/actions/auth.action';
import {theme} from '../../../infrastructure/theme';
import {OrderCard} from '../../admin/components/order-card.component';

export const UserProfileScreen = ({navigation}) => {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate('Login');
      } else {
        setLoadingOrders(true);
        getUserProfile(
          context.stateUser.user.userId,
          setUserProfile,
          setLoading,
        );

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
          .get(
            `${baseURL}orders/get/userorders/${context.stateUser.user.userId}`,
            config,
          )
          .then(res => {
            // console.log(res.data);
            setOrders(res.data);
            setLoadingOrders(false);
          })
          .catch(error => {
            console.log(error);
            setLoadingOrders(false);
          });
      }

      return () => {
        setUserProfile();
      };
    }, [
      context.stateUser.isAuthenticated,
      context.stateUser.user.userId,
      navigation,
      token,
    ]),
  );

  return (
    <View style={styles.container}>
      {!loading ? (
        <ScrollView style={styles.subContainer}>
          <View>
            <Text style={styles.profileName}>
              {userProfile ? userProfile.name : ''}
            </Text>
            <View style={{marginTop: 20}}>
              <Text style={{margin: 10}}>
                Email: {userProfile ? userProfile.email : ''}
              </Text>
              <Text style={{margin: 10}}>
                Phone: {userProfile ? userProfile.phone : ''}
              </Text>
              <View style={styles.buttonGroup}>
                <Button
                  style={styles.logoutButton}
                  mode="contained"
                  icon={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828395.png',
                  }}
                  onPress={() => {
                    logoutUser(context.dispatch);
                  }}>
                  Logout
                </Button>
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
              My Orders
            </Text>
            <View style={{width: '100%', marginTop: 20}}>
              {!loadingOrders ? (
                orders.map(x => {
                  return <OrderCard key={x.id} order={x} editMode={false} />;
                })
              ) : (
                <View
                  style={[
                    styles.center,
                    {backgroundColor: '#f2f2f2', height: '100%'},
                  ]}>
                  <ActivityIndicator
                    size={'medium'}
                    color={theme.colors.brand.primary}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={[styles.center, {backgroundColor: '#f2f2f2', height: '100%'}]}>
          <ActivityIndicator
            size={'large'}
            color={theme.colors.brand.primary}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  logoutButton: {
    width: '80%',
    backgroundColor: theme.colors.brand.primary,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginTop: 80,
  },
  subContainer: {
    marginTop: 60,
  },
  profileName: {
    fontSize: 30,
    height: 50,
    paddingTop: 20,
    fontWeight: 'bold',
  },
});
