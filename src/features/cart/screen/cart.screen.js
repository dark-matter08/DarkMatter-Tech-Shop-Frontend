import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {Icon, Text} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {SwipeListView} from 'react-native-swipe-list-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import * as actions from '../../../redux/actions/cart.action';
import {theme} from '../../../infrastructure/theme';
import empty_cart from '../../../../assets/svg/empty_cart';
import {FadeInView} from '../../../components/animations/fade.animation';
import {CartItem} from '../components/cart-item.component';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {propsFlattener} from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';

import AuthContext from '../../../context/store/auth.global';
import {loginUser} from '../../../context/actions/auth.action';

var {height, width} = Dimensions.get('window');

const CartScreen = ({cartItems, clearCart, removeFromCart, navigation}) => {
  const context = useContext(AuthContext);

  var total = 0;
  cartItems.forEach(cart => {
    return (total += cart.product.price);
  });
  return (
    <>
      {cartItems.length ? (
        <View style={styles.container}>
          {/* <Text style={styles.header_text}>Cart</Text> */}
          <SwipeListView
            data={cartItems}
            renderItem={data => {
              return <CartItem item={data.item.product} qty={data.item.qty} />;
            }}
            renderHiddenItem={data => {
              return (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    onPress={() => removeFromCart(data.item)}>
                    <Icon
                      size={35}
                      as={FontAwesomeIcon}
                      color={theme.colors.brand.secondary}
                      icon={faTrash}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Text style={styles.price}>$ {total}</Text>
            <View style={styles.buttonsWrapper}>
              <Button
                mode="contained"
                style={styles.button}
                icon={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1198/1198941.png',
                }}
                onPress={() => {
                  clearCart();
                }}>
                Clear
              </Button>
              {context.stateUser.isAuthenticated ? (
                <Button
                  mode="contained"
                  style={styles.button}
                  icon={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/2435/2435281.png',
                  }}
                  onPress={() => {
                    navigation.navigate('Checkout');
                  }}>
                  Checkout
                </Button>
              ) : (
                <Button
                  mode="contained"
                  style={styles.button}
                  icon={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/2435/2435281.png',
                  }}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  Checkout
                </Button>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.errorContainer}>
          <FadeInView>
            <SvgXml
              style={styles.svg}
              xml={empty_cart}
              width={90}
              height={90}
            />
            <Text variant={'error'} style={styles.error_text}>
              Looks like your cart is empty
            </Text>
            <Text variant={'error'} style={styles.error_text}>
              Add products to your cart to get started
            </Text>
          </FadeInView>
        </View>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const {cart} = state;
  return {
    cartItems: cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => {
      dispatch(actions.clearCart());
    },
    removeFromCart: item => {
      dispatch(actions.removeFromCart(item));
    },
  };
};

const styles = StyleSheet.create({
  header_text: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    height: 40,
    paddingTop: 10,
  },
  container: {
    paddingTop: 10,
    width: width,
    height: '100%',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: '100%',
    padding: theme.spacing.lg,
  },
  error_text: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'red',
  },
  svg: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.lg,
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    height: 70,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  price: {
    fontSize: 22,
    margin: 20,
    color: 'red',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: theme.colors.brand.primary,
    height: 40,
    marginLeft: 7,
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
