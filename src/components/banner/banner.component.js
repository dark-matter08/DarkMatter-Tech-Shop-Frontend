import React, {useEffect, useState} from 'react';
import {Image, Dimensions, StyleSheet, View, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper/src';

var {width} = Dimensions.get('window');

export const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    setBannerData([
      require('../../../assets/slider/slider1.jpeg'),
      require('../../../assets/slider/slider2.jpeg'),
      require('../../../assets/slider/slider3.jpeg'),
      require('../../../assets/slider/slider4.jpeg'),
      require('../../../assets/slider/slider5.jpeg'),
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
    height: width / 2 - 20,
  },
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    height: width / 2 - 40,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
