import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Select, Icon} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {faArrowAltCircleDown} from '@fortawesome/free-solid-svg-icons';

import {FormContainer} from '../../../components/form/form-container.component';
import {Input} from '../../../components/form/input.component';
import {Button} from 'react-native-paper';
import {theme} from '../../../infrastructure/theme';

const countries = require('../../../../assets/data/countries.json');

const CheckoutScreen = ({cartItems, navigation}) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(cartItems);

    return () => {
      setOrderItems();
    };
  }, [cartItems]);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: '3',
      zip,
    };

    navigation.navigate('Payment', {order: order});
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}>
      <FormContainer title={'Shipping Address'}>
        <Input
          placeholder={'Phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={text => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address 1'}
          name={'shipping_address_1'}
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <Input
          placeholder={'Shipping Address 2'}
          name={'shipping_address_2'}
          value={address2}
          onChangeText={text => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          name={'city'}
          value={city}
          onChangeText={text => setCity(text)}
        />
        <Input
          placeholder={'Zip Code'}
          name={'zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={text => setZip(text)}
        />
        <Select
          mode="dropdown"
          iosIcon={
            <Icon
              size={20}
              as={FontAwesomeIcon}
              color={'orange'}
              icon={faArrowAltCircleDown}
            />
          }
          width={'80%'}
          selectedValue={country}
          placeholder="Select your country"
          placeholderIconColor="#007aff"
          onValueChange={e => setCountry(e)}>
          {countries.map(c => {
            return <Select.Item key={c.code} label={c.name} value={c.name} />;
          })}
        </Select>
        <View style={styles.bottomView}>
          <Button mode="contained" onPress={checkOut} style={styles.button}>
            Confirm
          </Button>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 45,
    paddingTop: 'auto',
    paddingBottom: 'auto',
    backgroundColor: theme.colors.brand.tertiary,
  },
  bottomView: {
    width: '80%',
    alignItems: 'center',
    marginTop: 25,
  },
});

const mapStateToProps = state => {
  const {cart} = state;
  return {
    cartItems: cart,
  };
};

export default connect(mapStateToProps, null)(CheckoutScreen);
