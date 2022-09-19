import React, {useContext, useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {theme} from '../../../infrastructure/theme';

export const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  //   useEffect(() => {
  //     setSearchKeyword(keyword);
  //   }, [keyword]);

  //   onSubmitEditing={() => {
  //     search(searchKeyword);
  //   }}

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        icon={{
          uri: 'https://cdn-icons-png.flaticon.com/512/751/751463.png',
        }}
        clearIcon={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2732/2732657.png',
        }}
        value={searchKeyword}
        onChangeText={text => {
          setSearchKeyword(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  padding: theme.spacing.md,
  backgroundColor: theme.colors.bg.primary,
});
