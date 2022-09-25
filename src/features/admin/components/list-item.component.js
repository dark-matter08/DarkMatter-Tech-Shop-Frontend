import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighLight,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';

import {Button} from 'react-native-paper';
import {Icon, Text} from 'native-base';
import * as All from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {theme} from '../../../infrastructure/theme';
import Toast from 'react-native-toast-message';

var {width} = Dimensions.get('window');

export const ListItem = ({item, navigation, index}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = () => {
    return null;
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#e8e8e8"
              onPress={() => setShowModal(!showModal)}
              style={styles.modalClose}>
              <Icon
                m="2"
                ml="3"
                size="20"
                as={FontAwesomeIcon}
                icon={All.faClose}
              />
            </TouchableOpacity>
            <Button
              mode="contained"
              style={styles.editButton}
              icon={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1159/1159633.png',
              }}
              onPress={() => {
                navigation.navigate('ProductForm');
                setShowModal(!showModal);
              }}>
              Edit
            </Button>
            <View style={{height: 10}} />
            <Button
              mode="contained"
              style={styles.deleteButton}
              icon={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3096/3096673.png',
              }}
              onPress={deleteItem}>
              Delete
            </Button>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor:
              index % 2 == 0 ? 'white' : theme.colors.brand.muted,
          },
        ]}
        onPress={() => {
          navigation.navigate('Product Details', {item: item});
        }}
        onLongPress={() => {
          setShowModal(!showModal);
        }}>
        <Image
          style={styles.image}
          source={{
            uri: item.image
              ? item.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
          resizeMode="contain"
        />
        <Text style={styles.item}>{item.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {item.category.name}
        </Text>
        <Text style={styles.item}>$ {item.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  modalClose: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 5,
    right: 10,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editButton: {
    backgroundColor: theme.colors.brand.primary,
    width: '80%',
  },
  deleteButton: {
    backgroundColor: theme.colors.text_i.error,
    width: '80%',
  },
});
