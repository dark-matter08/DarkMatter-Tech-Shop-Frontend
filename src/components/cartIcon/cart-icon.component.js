import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Badge} from 'react-native-paper';
// import {Text} from 'native-base';

import {connect} from 'react-redux';
import {cartItems} from '../../redux/reducers/cart-item.reducer';
import {theme} from '../../infrastructure/theme';

const CartIcon = ({focused, cartItems}) => {
  if (cartItems.length) {
    return (
      <Badge
        style={[
          styles.badge,
          focused === true ? styles.active_badge_bg : styles.inactive_badge_bg,
        ]}>
        <Text
          style={[
            styles.text,
            focused === true
              ? styles.active_text_color
              : styles.inactive_text_color,
          ]}>
          {cartItems.length}
        </Text>
      </Badge>
    );
  }
};

const styles = StyleSheet.create({
  active_badge_bg: {
    backgroundColor: theme.colors.brand.tertiary,
  },
  inactive_badge_bg: {
    backgroundColor: theme.colors.brand.muted,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
    right: -15,
  },
  text: {
    fontSize: 11,
    width: 100,
    fontWeight: 'bold',
  },
  active_text_color: {
    color: 'white',
  },
  inactive_text_color: {
    color: 'black',
  },
});

const mapStateToProps = state => {
  const {cart} = state;
  return {
    cartItems: cart,
  };
};

export default connect(mapStateToProps)(CartIcon);
