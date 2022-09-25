import React, {useState, useCallback} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {Icon, Input, VStack} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import * as All from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import axios from 'axios';
import baseURL from '../../../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../../infrastructure/theme';
import {ListItem} from '../components/list-item.component';

var {height, width} = Dimensions.get('window');

const ListHeader = () => {
  return (
    <View elevation={3} style={styles.listHeader}>
      <View style={styles.headerItem} />
      <View style={styles.headerItem}>
        <Text style={{fontWeight: '600'}}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: '600'}}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: '600'}}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight: '600'}}>Price</Text>
      </View>
    </View>
  );
};

export const ProductsScreen = ({navigation}) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [focus, setFocus] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // get token
      AsyncStorage.getItem('jwt')
        .then(res => {
          setToken(res);
        })
        .catch(err => console.log(err));

      // products ===================
      axios.get(`${baseURL}products`).then(res => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      // categories ===================
      // axios
      //   .get(`${baseURL}categories`)
      //   .then(res => {
      //     setCategories(res.data);
      //   })
      //   .catch(err => {
      //     console.log('Api call error: ', err);
      //   });

      return () => {
        setProductList([]);
        setProductFilter([]);
        setLoading(true);
        // setFocus();
        // setCategories([]);
        // setActive();
        // setInitialState([]);
      };
    }, []),
  );

  const searchProducts = text => {
    if (text == '') {
      setProductFilter(productList);
    } else {
      setProductFilter(
        productList.filter(i =>
          i.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };

  return (
    <View>
      <View style={styles.search}>
        <VStack w="95%" space={5} alignSelf="center">
          <Input
            placeholder="Search"
            variant="outline"
            width="100%"
            py="2"
            px="3"
            onChangeText={text => searchProducts(text)}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="10"
                as={FontAwesomeIcon}
                icon={All.faSearch}
              />
            }
            InputRightElement={
              focus === true && (
                <TouchableOpacity onPress={() => null}>
                  <Icon
                    m="2"
                    mr="3"
                    size={25}
                    as={FontAwesomeIcon}
                    icon={All.faClose}
                  />
                </TouchableOpacity>
              )
            }
          />
        </VStack>
      </View>
      {loading ? (
        <View style={[styles.center, styles.acIndicator]}>
          <ActivityIndicator
            size={'large'}
            color={theme.colors.brand.primary}
          />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({item, index}) => {
            return (
              <ListItem item={item} navigation={navigation} index={index} />
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  acIndicator: {
    backgroundColor: '#f2f2f2',
    height: '90%',
  },
  search: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: theme.colors.brand.muted,
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
});
