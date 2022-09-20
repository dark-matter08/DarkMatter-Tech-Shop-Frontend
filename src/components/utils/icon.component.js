import React from 'react';
import {Platform} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Icon = ({icon, size, color}) => {
  return <FontAwesomeIcon icon={icon} color={color} size={size} />;
};

export default Icon;
