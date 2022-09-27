import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import baseURL from '../../../../assets/common/baseURL';
import {theme} from '../../../infrastructure/theme';
import {Button} from '../../../components/button/button.component';

var {width} = Dimensions.get('window');

const CategoryItem = ({item, index, deleteCategory, loadingDelete}) => {
  return (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Button
        key={index}
        color="red"
        button_width={width / 4}
        isLoading={loadingDelete}
        indicator="default"
        loaderColor={theme.colors.brand.primary}
        icon={{uri: 'https://cdn-icons-png.flaticon.com/512/3597/3597073.png'}}
        text="Delete"
        onPress={() => {
          deleteCategory(item.id);
        }}
      />
    </View>
  );
};

export const CategoriesScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    // get jwt token
    setLoadingAdd(false);
    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${baseURL}categories`)
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => alert('Error to load categories'));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    setLoadingAdd(true);
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}categories`, category, config)
      .then(res => {
        setCategories([...categories, res.data]);
        setLoadingAdd(false);
      })
      .catch(err => {
        alert('Error to add category');
        setLoadingAdd(false);
        console.log(err);
      });

    setCategoryName('');
  };

  const deleteCategory = id => {
    setLoadingDelete(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then(res => {
        console.log(res);
        const newCategories = categories.filter(item => item.id !== id);
        setCategories(newCategories);
        setLoadingDelete(false);
      })
      .catch(err => {
        alert('Error to delete category');
        setLoadingDelete(false);
        console.log(err);
      });
  };

  return (
    <View style={{position: 'relative', height: '100%'}}>
      <View style={{marginBottom: 70}}>
        <FlatList
          data={categories}
          renderItem={({item, index}) => (
            <CategoryItem
              item={item}
              index={index}
              loadingDelete={loadingDelete}
              deleteCategory={deleteCategory}
              key={item.id}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <Text>Add Category</Text>
        <View style={{width: width / 2.5}}>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={text => setCategoryName(text)}
          />
        </View>
        <View>
          <Button
            color={theme.colors.brand.primary}
            button_width={width / 4}
            isLoading={loadingAdd}
            indicator="default"
            icon={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077340.png',
            }}
            text="Submit"
            onPress={() => {
              addCategory();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    width: width,
    height: 70,
    paddingVertical: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 10,
  },
  input: {
    height: 50,
    borderColor: 'orange',
    borderRadius: 10,
    borderWidth: 1,
    color: theme.colors.brand.tertiary,
  },
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
});
