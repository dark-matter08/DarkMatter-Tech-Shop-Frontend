import React, {useEffect, useState} from 'react';
import {Image, Dimensions, StyleSheet, View, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper/src';

var {width} = Dimensions.get('window');

export const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    // setBannerData([
    //   {
    //     uri: 'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    //   },
    //   {
    //     uri: 'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    //   },
    //   {
    //     uri: 'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
    //   },
    // ]);

    setBannerData([
      require('../../../assets/slider/slider1.jpeg'),
      require('../../../assets/slider/slider2.jpeg'),
      require('../../../assets/slider/slider3.jpeg'),
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.swipper}>
        <View style={{height: 10}} />
        <Swiper
          style={{height: width / 2}}
          showButtons={false}
          autoplay={true}
          autoplayTimeout={2}
          loop={true}>
          {bannerData.map(item => {
            return (
              <Image
                style={styles.image}
                key={item}
                resizeMode="contain"
                source={item}
              />
            );
          })}
        </Swiper>
        <View style={{height: 10}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gainsboro',
    height: width / 2 + 20,
  },
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
