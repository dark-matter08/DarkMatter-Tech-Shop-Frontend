import React, {useContext, useState, useCallback, useEffect} from 'react';
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

export const UserProfileScreen = ({navigation}) => {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      navigation.navigate('Login');
    }

    getUserProfile(context.stateUser.user.userId, setUserProfile, setLoading);

    return () => {
      setUserProfile();
    };
  }, [
    context.stateUser.isAuthenticated,
    context.stateUser.user.userId,
    navigation,
  ]);

  return (
    <View style={styles.container}>
      {!loading ? (
        <ScrollView style={styles.subContainer}>
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
