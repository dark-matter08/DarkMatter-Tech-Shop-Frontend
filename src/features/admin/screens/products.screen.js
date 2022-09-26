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

      return () => {
        setProductList([]);
        setProductFilter([]);
        setLoading(true);
      };
    }, []),
  );

  const searchProducts = text => {
    if (text === '') {
      setProductFilter(productList);
    } else {
      setProductFilter(
        productList.filter(i =>
          i.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };

  const deleteProducts = id => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log(res);
        const new_products = productFilter.filter(item => item.id !== id);
        setProductFilter(new_products);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          style={styles.ordersButton}
          icon={{
            uri: 'https://cdn-icons-png.flaticon.com/512/6948/6948578.png',
          }}
          onPress={() => {
            navigation.navigate('Orders');
          }}>
          Orders
        </Button>
        <Button
          mode="contained"
          style={styles.productsButton}
          icon={{
            uri: 'https://cdn-icons-png.flaticon.com/512/4442/4442531.png',
          }}
          onPress={() => {
            navigation.navigate('ProductForm');
          }}>
          Products
        </Button>
        <Button
          mode="contained"
          style={styles.categoriesButton}
          icon={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077340.png',
          }}
          onPress={() => {
            navigation.navigate('Categories');
          }}>
          Categories
        </Button>
      </View>
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
              <ListItem
                item={item}
                navigation={navigation}
                index={index}
                deleteProduct={deleteProducts}
              />
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
  ordersButton: {
    backgroundColor: theme.colors.brand.primary,
    width: width / 3.4,
  },
  productsButton: {
    backgroundColor: '#FFCF64',
    width: width / 3.4,
    marginHorizontal: width - (width / 3.4) * 3 - 25,
  },
  categoriesButton: {
    backgroundColor: theme.colors.brand.secondary,
    width: width / 3.4,
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
});
