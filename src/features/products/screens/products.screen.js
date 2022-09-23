import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {VStack, Input, Text, Icon} from 'native-base';
import * as All from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

import {theme} from '../../../infrastructure/theme';
import {ProductComponent} from '../components/product.component';
import {SearchedProducts} from '../components/searched-products.component';
import {Banner} from '../../../components/banner/banner.component';
import {CategoryFilter} from '../components/category-filter.component';

import baseURL from '../../../../assets/common/baseURL';

var {height} = Dimensions.get('window');

export const ProductScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // products ===================

      axios.get(`${baseURL}products`).then(res => {
        setProducts(res.data);
        setProductsFiltered(res.data);
        setInitialState(res.data);
        setProductCat(res.data);
        setLoading(false);
      });

      // categories ===================

      axios
        .get(`${baseURL}categories`)
        .then(res => {
          setCategories(res.data);
        })
        .catch(err => {
          console.log('Api call error: ', err);
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState([]);
      };
    }, []),
  );

  const searchProducts = text => {
    setProductsFiltered(
      products.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCategory = cat => {
    cat === 'all'
      ? [setProductCat(initialState), setActive(true)]
      : [
          setProductCat(products.filter(i => i.category._id === cat)),
          setActive(true),
        ];
  };

  return (
    <>
      {!loading ? (
        <ScrollView>
          <View style={styles.search}>
            <VStack w="95%" space={5} alignSelf="center">
              <Input
                placeholder="Search"
                variant="outline"
                width="100%"
                py="2"
                px="3"
                onFocus={openList}
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
                    <TouchableOpacity onPress={onBlur}>
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
          {focus ? (
            <SearchedProducts
              productsFiltered={productsFiltered}
              navigation={navigation}
            />
          ) : (
            <View style={styles.container}>
              <Banner />
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCategory}
                productCat={productCat}
                active={active}
                setActive={setActive}
              />
              {productCat.length > 0 ? (
                <View style={styles.listContainer}>
                  {productCat.map(item => {
                    return (
                      <ProductComponent
                        key={item._id}
                        navigation={navigation}
                        item={item}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={[styles.center, {height: height / 2}]}>
                  <Text>No Products for this category</Text>
                </View>
              )}
            </View>
          )}
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
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'gainsboro',
    flexWrap: 'wrap',
  },
  listContainer: {
    backgroundColor: 'gainsboro',
    height: 'auto',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  search: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
});
