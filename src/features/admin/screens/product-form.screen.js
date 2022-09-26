import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {Select, Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowAltCircleDown} from '@fortawesome/free-solid-svg-icons';

import {FormContainer} from '../../../components/form/form-container.component';
import {Input} from '../../../components/form/input.component';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Error} from '../../../components/error/error.component';

import baseURL from '../../../../assets/common/baseURL';
import axios from 'axios';
import {theme} from '../../../infrastructure/theme';

export const ProductFormScreen = () => {
  const [pickerValue, setPickerValue] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState();
  const [isFeatured, setIsFeatured] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [richDescription, setRichDescription] = useState();

  const [mainImage, setMainImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [item, setItem] = useState(null);
  const [error, setError] = useState();

  const [formTitle, setFormTitle] = useState('Add Product');

  useEffect(() => {
    if (item) {
      setFormTitle('Edit Product');
    }

    axios
      .get(`${baseURL}categories`)
      .then(res => setCategories(res.data))
      .catch(err => alert('Error to load categories'));

    return () => {
      setFormTitle('Add Product');
      setCategories([]);
    };
  }, [item]);

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}>
      <FormContainer title={formTitle}>
        <View style={styles.imageContainer}>
          {/* <Image style={styles.image} source={{uri: mainImage}} /> */}
          <Button
            icon={{
              uri: 'https://cdn-icons-png.flaticon.com/512/4442/4442531.png',
            }}
            style={styles.imagePicker}
          />
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
                return <Select.Item key={c.id} label={c.name} value={c.name} />;
              })}
            </Select>
          </View>
        </View>
        {error && <Error message={'error'} />}
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            style={styles.confirmButton}
            icon={{
              uri: 'https://cdn-icons-png.flaticon.com/512/4442/4442531.png',
            }}>
            Confirm
          </Button>
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
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    justifyContent: 'center',
    borderRadius: 100,
    borderBottomColor: theme.colors.brand.muted,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});
