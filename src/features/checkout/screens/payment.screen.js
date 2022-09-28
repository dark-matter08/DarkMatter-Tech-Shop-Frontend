import React, {useEffect, useState} from 'react';
import {Text, Select, Box, CheckIcon, Center, Icon} from 'native-base';
import {Avatar, Button, List, RadioButton} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowAltCircleDown} from '@fortawesome/free-solid-svg-icons';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const methods = [
  {
    name: 'Cash on Delivery',
    value: 1,
    uri: 'https://cdn-icons-png.flaticon.com/512/2488/2488749.png',
  },
  {
    name: 'Bank Transfer',
    value: 2,
    uri: 'https://cdn-icons-png.flaticon.com/512/3069/3069455.png',
  },
  {
    name: 'Card Payment',
    value: 3,
    uri: 'https://cdn-icons-png.flaticon.com/512/5645/5645206.png',
  },
];

const paymentCards = [
  {name: 'Wallet', value: 1},
  {name: 'Visa', value: 2},
  {name: 'MasterCard', value: 3},
  {name: 'Other', value: 4},
];

export const PaymentScreen = ({route, navigation}) => {
  const [selected, setSelected] = useState();
  const [order, setOrder] = useState([]);
  const [card, setCard] = useState();

  useEffect(() => {
    if (!route.params) {
      setTimeout(() => {
        navigation.navigate('Shipping');
      }, 500);
    }
    setOrder(route.params);

    return () => {
      setOrder([]);
    };
  }, [route.params, navigation]);

  console.log(order);

  return (
    <View>
      <View style={styles.headerView}>
        <Text style={styles.header}>Choose your payment method</Text>
      </View>
      <View>
        {methods.map((item, index) => {
          return (
            <List.Item
              style={styles.listitem}
              key={index}
              title={item.name}
              onPress={() => setSelected(item.value)}
              left={props => (
                <Avatar.Image
                  style={{backgroundColor: 'transparent'}}
                  size={30}
                  source={{
                    uri: item.uri,
                  }}
                />
              )}
              right={props => (
                <RadioButton
                  style={styles.left_item}
                  value={item.name}
                  status={selected === item.value ? 'checked' : 'unchecked'}
                  onPress={() => setSelected(item.value)}
                />
              )}
            />
          );
        })}
        {selected == 3 && (
          <Center>
            <Box maxW="400" mt="5">
              <Select
                minWidth="300"
                accessibilityLabel="Choose Card"
                placeholder="Choose Card"
                _selectedItem={{
                  bg: 'red',
                  endIcon: <CheckIcon size={5} />,
                }}
                onValueChange={x => setCard(x)}>
                {paymentCards.map(c => {
                  return (
                    <Select.Item key={c.value} label={c.name} value={c.name} />
                  );
                })}
              </Select>
            </Box>
          </Center>
        )}
        <View style={styles.bottomView}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Confirm', {order})}
            style={styles.button}>
            Confirm
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 45,
    paddingTop: 'auto',
    paddingBottom: 'auto',
  },
  bottomView: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 25,
  },
  header: {
    fontSize: 24,
    height: 30,
    paddingTop: 6,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  headerView: {
    height: 70,
    paddingVertical: 10,
    marginTop: 20,
  },
  listitem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  left_item: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  cardDropdown: {
    alignSelf: 'center',
    marginTop: 40,
  },
});
