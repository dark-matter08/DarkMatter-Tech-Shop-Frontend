import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {VStack, Left, Body, ListItem, Thumbnail, Text} from 'native-base';
import {List, Avatar} from 'react-native-paper';

var {width} = Dimensions.get('window');

export const SearchedProducts = props => {
  const {productsFiltered} = props;

  return (
    <VStack w={width} space={3} style={{flex: 1}} alignSelf="center">
      {productsFiltered.length > 0 ? (
        productsFiltered.map(item => {
          return (
            <List.Item
              key={item._id.$oid}
              title={item.name}
              description={item.description}
              left={props => (
                <Avatar.Image
                  size={60}
                  source={{
                    uri: item.image
                      ? item.image
                      : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                  }}
                />
              )}
            />
          );
        })
      ) : (
        <View style={styles.center}>
          <Text style={{alignSelf: 'center'}}>
            No products match the selected criterion
          </Text>
        </View>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
