import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

export default class Guco extends Component {

  state = { animatedValue: new Animated.Value(0) }

  render() {
    const { ui, backgroundImages, backgroundColor, dividerWidth, parallaxStrength, showsHorizontalScrollIndicator } = this.props;

    return (
        <Animated.ScrollView
          style={{ width: (deviceWidth + dividerWidth), backgroundColor }}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.animatedValue } } }],
            { useNativeDriver: true }
          )}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        >
          {
            backgroundImages.map((uri, i) => {
              return (
                <View
                  key={i}
                  style={[styles.slideOuterContainer, { width: (deviceWidth + dividerWidth) }]}
                >
                  <View style={styles.slideInnerContainer}>
                    <Animated.Image
                      style={[styles.backgroundImage, {
                        left: i * -parallaxStrength,
                        transform: [
                          {
                            translateX: this.state.animatedValue.interpolate({
                              inputRange: [0, (deviceWidth + dividerWidth)],
                              outputRange: [0, parallaxStrength],
                            })
                          }
                        ]
                      }]}
                      source={{ uri }}
                    />
                    <View style={{ width: 375, height: 667 }}>
                      {ui[i]}
                    </View>
                  </View>
                  <View style={{ width: 8, height: 667 }} />
                </View>
              );
            })
          }
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slideOuterContainer: {
    flexDirection: 'row',
  },
  slideInnerContainer: {
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
  },
});
