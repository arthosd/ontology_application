/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Nav from './src/Navigation/Navigation.js'

export default function App(){
  return (
    <SafeAreaView style = {{
      flex:1
    }}>
      <StatusBar  backgroundColor="grey" hidden/>

      <Nav />

    </SafeAreaView>
  );
};
