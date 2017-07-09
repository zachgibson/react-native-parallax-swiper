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
  'https://images.unsplash.com/photo-1494249465471-5655b7878482?dpr=2&auto=format&fit=crop&w=1080&h=720',
  'https://images.unsplash.com/photo-1459909633680-206dc5c67abb?dpr=2&auto=format&fit=crop&w=1080&h=720',
  'https://images.unsplash.com/photo-1490237014491-822aee911b99?dpr=2&auto=format&fit=crop&w=1080&h=720'
];

export default class ParallaxSwiper extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Guco
          dividerWidth={4}
          parallaxStrength={300}
          dividerColor="white"
          backgroundImages={images}
          ui={
            views.map((view, i) => (
              <View key={i} style={styles.slideInnerContainer}>
                <Text style={styles.slideText}>
                  Slide {i}
                </Text>
              </View>
            ))
          }
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={() => console.log('Swiper finished swiping')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slideInnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideText: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
});

AppRegistry.registerComponent('ParallaxSwiper', () => ParallaxSwiper);
