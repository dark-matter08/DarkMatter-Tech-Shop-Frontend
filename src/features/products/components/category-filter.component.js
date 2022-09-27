import React from 'react';

import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {List, Text, Badge} from 'react-native-paper';
import {ScrollView} from 'native-base';
var {width} = Dimensions.get('window');

export const CategoryFilter = props => {
  return (
    <View style={styles.scrollviewContainer}>
      <ScrollView
        w={width}
        bounces={true}
        horizontal={true}
        style={styles.scrollview}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter('all');
            props.setActive(-1);
          }}>
          <Badge
            size={35}
            style={[
              styles.center,
              styles.badge,
              props.active === -1 ? styles.active : styles.inactive,
            ]}>
            <Text style={{color: 'white'}}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map(item => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                props.categoryFilter(item._id);
                props.setActive(props.categories.indexOf(item));
              }}>
              <Badge
                size={35}
                style={[
                  styles.center,
                  styles.badge,
                  props.active === props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}>
                <Text style={{color: 'white'}}>{item.name}</Text>
              </Badge>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollviewContainer: {
    height: 65,
  },
  scrollview: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
  },
  badge: {
    marginVertical: 15,
    marginRight: 10,
    paddingHorizontal: 20,
  },
  active: {
    backgroundColor: '#03bafc',
  },
  inactive: {
    backgroundColor: '#a0e1eb',
  },
});
