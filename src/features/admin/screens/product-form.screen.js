import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {Select, Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowAltCircleDown,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {FormContainer} from '../../../components/form/form-container.component';
import {Input} from '../../../components/form/input.component';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Error} from '../../../components/error/error.component';
import {theme} from '../../../infrastructure/theme';
import {Button as CustomButton} from '../../../components/button/button.component';

import baseURL from '../../../../assets/common/baseURL';
import axios from 'axios';
import mime from 'mime';

export const ProductFormScreen = ({route, navigation}) => {
  const [pickerValue, setPickerValue] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [richDescription, setRichDescription] = useState('');

  const [mainImage, setMainImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [item, setItem] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [cameraMode, setCameraMode] = useState('front');
  const [cameraPermission, setCameraPermission] = useState();
  const cameraRef = useRef();

  const [formTitle, setFormTitle] = useState('Add Product');

  useEffect(() => {
    if (!route.params) {
      setItem(null);
    } else {
      setItem(route.params.item);
      setBrand(route.params.item.brand);
      setName(route.params.item.name);
      setPrice(route.params.item.price.toString());
      setDescription(route.params.item.description);
      setMainImage(route.params.item.image);
      setImage(route.params.item.image);
      setCategory(route.params.item.category.id);
      setCountInStock(route.params.item.countInStock.toString());
    }

    if (item) {
      setFormTitle('Edit Product');
    }

    // get jwt token
    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${baseURL}categories`)
      .then(res => setCategories(res.data))
      .catch(err => alert('Error to load categories'));

    return () => {
      setFormTitle('Add Product');
      setCategories([]);
    };
  }, [item, route.params]);

  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaType: 'mixed',
      quality: 1,
    });

    if (!result.didCancel) {
      setMainImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const addProduct = () => {
    setLoading(true);
    if (
      name === '' ||
      brand === '' ||
      price === '' ||
      description === '' ||
      category === '' ||
      countInStock === ''
    ) {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    let formData = new FormData();

    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('richDescription', richDescription);
    formData.append('rating', rating);
    formData.append('numReviews', numReviews);
    formData.append('isFeatured', isFeatured);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    if (image.startsWith('file')) {
      const newImageURI = 'file:///' + image.split('file:/').join('');

      formData.append('image', {
        uri: newImageURI,
        type: mime.getType(newImageURI),
        name: newImageURI.split('/').pop(),
      });
    }

    console.log(formData);

    if (item !== null) {
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Product successfully Updated',
              text2: '',
            });
            setTimeout(() => {
              navigation.navigate('Products');
            }, 500);
          }
          setLoading(false);
        })
        .catch(err => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong with the request',
            text2: 'Please try again later',
          });
          console.log(err);
          setLoading(false);
        });
    } else {
      axios
        .post(`${baseURL}products`, formData, config)
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'New Product Added',
              text2: '',
            });
            setTimeout(() => {
              navigation.navigate('Products');
            }, 500);
          }
          setLoading(false);
        })
        .catch(err => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong with the request',
            text2: 'Please try again later',
          });
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}>
      <FormContainer title={formTitle}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: mainImage
                ? mainImage
                : 'https://cdn-icons-png.flaticon.com/512/5918/5918050.png',
            }}
          />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <FontAwesomeIcon
              size={24}
              color={theme.colors.brand.primary}
              icon={faCamera}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Text style={styles.labelStyle}>Brand</Text>
          </View>
          <Input
            placeholder="Brand"
            name="brand"
            id="brand"
            value={brand}
            onChangeText={text => setBrand(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Text style={styles.labelStyle}>Name</Text>
          </View>
          <Input
            placeholder="Name"
            name="name"
            id="name"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Text style={styles.labelStyle}>Price</Text>
          </View>
          <Input
            placeholder="Price"
            name="price"
            id="price"
            value={price}
            keyboardType={'numeric'}
            onChangeText={text => setPrice(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Text style={styles.labelStyle}>Stock Count</Text>
          </View>
          <Input
            placeholder="Stock"
            name="stock"
            id="stock"
            value={countInStock}
            keyboardType={'numeric'}
            onChangeText={text => setCountInStock(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Text style={styles.labelStyle}>Description</Text>
          </View>
          <Input
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Text style={styles.labelStyle}>Category</Text>
          </View>
          <View style={styles.categorySelectorBox}>
            <Select
              mode="dropdown"
              style={styles.categorySelector}
              iosIcon={
                <Icon
                  size={20}
                  as={FontAwesomeIcon}
                  color={'orange'}
                  icon={faArrowAltCircleDown}
                />
              }
              width={'100%'}
              selectedValue={pickerValue}
              placeholder="Select product category"
              placeholderIconColor="#007aff"
              onValueChange={e => {
                setPickerValue(e);
                setCategory(e);
              }}>
              {categories.map(c => {
                return <Select.Item key={c.id} label={c.name} value={c.id} />;
              })}
            </Select>
          </View>
        </View>
        {error && <Error message={error} />}
        <View style={styles.buttonsContainer}>
          <CustomButton
            color={theme.colors.brand.primary}
            isLoading={loading}
            indicator="default"
            loaderColor={theme.colors.brand.fourth}
            icon={{
              uri: 'https://cdn-icons-png.flaticon.com/512/4442/4442531.png',
            }}
            text="Confirm"
            onPress={addProduct}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  labelStyle: {
    textDecorationLine: 'underline',
    color: theme.colors.brand.primary,
  },
  categorySelectorBox: {
    borderColor: theme.colors.brand.muted,
    borderWidth: 2,
    height: 60,
    marginVertical: 10,
    width: '80%',
    // borderRadius: 20,
  },
  categorySelector: {
    height: 56,
    borderRadius: 20,
  },
  confirmButton: {
    backgroundColor: theme.colors.brand.primary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    width: 208,
    height: 208,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    elevation: 10,
    backgroundColor: theme.colors.brand.secondary,
  },
  image: {
    width: '94%',
    height: '94%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 7,
    bottom: 7,
    backgroundColor: 'gainsboro',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
