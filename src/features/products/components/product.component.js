import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

import ProductCard from './product-card.component';
var {width} = Dimensions.get('window');

export const ProductComponent = props => {
  const {item, navigation} = props;
  return (
    <View style={styles.touchable}>
      <View style={styles.touchableView}>
        <ProductCard item={item} navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '50%',
  },
  touchableView: {
    width: width / 2,
    backgroundColor: 'gainsboro',
  },
});
