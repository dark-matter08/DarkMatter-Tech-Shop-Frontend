import React, {useRef} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {theme} from '../../infrastructure/theme';

const {width} = Dimensions.get('window');

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {ActivityIndicator} from 'react-native';

const indicators = {
  ball: BallIndicator,
  bar: BarIndicator,
  dot: DotIndicator,
  mat: MaterialIndicator,
  pacman: PacmanIndicator,
  pulse: PulseIndicator,
  skype: SkypeIndicator,
  wave: WaveIndicator,
  ui: UIActivityIndicator,
  default: ActivityIndicator,
};

export const Button = ({
  item_key,
  isLoading = false,
  onPress,
  color = theme.colors.brand.primary,
  text = 'button',
  loaderColor = theme.colors.brand.fourth,
  indicator = 'default',
  button_width = width / 4,
  icon = {uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png'},
}) => {
  const Indicator = indicators[indicator];
  return (
    <TouchableOpacity
      key={item_key}
      mode="contained"
      style={[styles.button, {backgroundColor: color, width: button_width}]}
      onPress={onPress}>
      <Avatar.Icon
        size={25}
        style={{marginRight: 5}}
        backgroundColor="transparent"
        icon={icon}
      />
      {isLoading ? (
        <Indicator size={25} animating={true} color={loaderColor} />
      ) : (
        <Text style={{color: 'white'}}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    // paddingHorizontal: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
