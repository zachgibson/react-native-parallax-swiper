/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Guco from './Guco';

const views = [
    { title: 'Guco' },
    { title: 'McGucci' },
    { title: 'Go Hord' }
];

const images = [
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
  'https://images.unsplash.com/photo-1459909633680-206dc5c67abb?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
  'https://images.unsplash.com/photo-1490237014491-822aee911b99?dpr=2&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=&bg='
];

export default class ParallaxSwiper extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Guco
          dividerWidth={4}
          parallaxStrength={300}
          backgroundColor="white"
          backgroundImages={images}
          ui={
            views.map((view, i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: images[i] }}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
              </View>
            ))
          }
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ParallaxSwiper', () => ParallaxSwiper);
