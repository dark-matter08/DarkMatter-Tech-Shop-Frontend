import {Platform} from 'react-native';

let baseURL = 'https://us-central1-dmtechsop.cloudfunctions.net/api/v1/';

// eslint-disable-next-line no-lone-blocks
// {
//   Platform.OS === 'android'
//     ? (baseURL = 'https://us-central1-dmtechsop.cloudfunctions.net/api/v1/')
//     : (baseURL = 'http:localhost:3000/api/v1/');
// }

export default baseURL;
