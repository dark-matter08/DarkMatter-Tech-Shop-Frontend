import React from 'react';
import {StyleSheet, View} from 'react-native';

export const TraficLight = ({availability}) => {
  if (availability === 'Unavailable') {
    return <View style={[styles.trafficLight, styles.styleUnavailable]} />;
  } else if (availability === 'Limited Stock') {
    return <View style={[styles.trafficLight, styles.styleLimited]} />;
  } else {
    return <View style={[styles.trafficLight, styles.styleAvailable]} />;
  }
};

const styles = StyleSheet.create({
  trafficLight: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  styleUnavailable: {
    backgroundColor: 'red',
  },
  styleLimited: {
    backgroundColor: 'yellow',
  },
  styleAvailable: {
    backgroundColor: 'green',
  },
});
