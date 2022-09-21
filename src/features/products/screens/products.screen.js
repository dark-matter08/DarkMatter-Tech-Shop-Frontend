import React, {useState, useEffect} from 'react';
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
import {theme} from '../../../infrastructure/theme';
import {ProductComponent} from '../components/product.component';
import {VStack, Input, Text, Icon} from 'native-base';
import * as All from '@fortawesome/free-solid-svg-icons';
import {SearchedProducts} from '../components/searched-products.component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Banner} from '../../../components/banner/banner.component';
import {CategoryFilter} from '../components/category-filter.component';

var {height} = Dimensions.get('window');

const data = require('../../../../assets/data/products.json');
const categories_data = require('../../../../assets/data/categories.json');

export const ProductScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setProductCat(data);
    setFocus(false);
    setCategories(categories_data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState([]);
    };
  }, []);

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
          setProductCat(products.filter(i => i.category.$oid === cat)),
          setActive(true),
        ];
  };

  return (
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
                    key={item._id.$oid}
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
    minHeight: height,
    maxHeight: height + 120,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  search: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
});
