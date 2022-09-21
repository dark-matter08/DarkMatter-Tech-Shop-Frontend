import {Platform} from 'react-native';

let baseURL = '';

// eslint-disable-next-line no-lone-blocks
{
  Platform.OS === 'android'
    ? (baseURL = 'http://10.0.2.2:3000/api/v1/')
    : (baseURL = 'http:localhost:3000/api/v1');
}

export default baseURL;
