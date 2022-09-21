import React, {useState} from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {Icon, Text} from 'native-base';

export const CartItem = ({item, qty}) => {
  console.log(item);
  const data = item;
  const [quantity, setQuantity] = useState(qty);

  return (
    <List.Item
      style={styles.listitem}
      key={Math.random()}
      title={data.name}
      left={props => (
        <Avatar.Image
          size={60}
          source={{
            uri: data.image
              ? data.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
        />
      )}
      right={props => <Text style={styles.item_price}>$ {data.price}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  listitem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  item_price: {
    fontSize: 18,
    margin: 6,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
