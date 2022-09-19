import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {theme} from '../../../infrastructure/theme';
import {ProductComponent} from '../components/product.component';
import {Search} from '../components/search.component';

const data = require('../../../../assets/data/products.json');

export const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);

    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <View>
      <View style={{paddingHorizontal: 15, paddingTop: 15}}>
        <Search />
      </View>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({item}) => {
          return <ProductComponent item={item} />;
        }}
        keyExtractor={item => item.name}
        contentContainerStyle={{
          padding: theme.spacing.xs,
        }}
      />
    </View>
  );
};
