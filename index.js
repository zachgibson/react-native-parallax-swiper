import React, { Component, PropTypes } from 'react';
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

class ParallaxSwiper extends Component {
  state = { animatedValue: new Animated.Value(0) };

  render() {
    const {
      ui,
      backgroundImages,
      backgroundColor,
      dividerWidth,
      parallaxStrength,
      showsHorizontalScrollIndicator,
      dividerColor,
    } = this.props;

    return (
        <Animated.ScrollView
          style={{
            width: (deviceWidth + dividerWidth),
            backgroundColor,
          }}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event([{
            nativeEvent: { contentOffset: { x: this.state.animatedValue } },
          }],
            { useNativeDriver: true }
          )}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          onMomentumScrollEnd={this.props.onMomentumScrollEnd}
        >
          {
            backgroundImages.map((uri, i) => {
              return (
                <View key={i} style={styles.slideOuterContainer}>
                  <View style={styles.slideInnerContainer}>
                    <Animated.Image
                      style={[styles.backgroundImage, {
                        left: i * -parallaxStrength,
                        transform: [{
                          translateX: this.state.animatedValue.interpolate({
                            inputRange: [0, (deviceWidth + dividerWidth)],
                            outputRange: [0, parallaxStrength],
                          })
                        }]
                      }]}
                      source={{ uri }}
                    />
                    <View style={styles.uiContainer}>
                      {ui[i]}
                    </View>
                  </View>
                  <View
                    style={[
                      styles.divider,
                      {
                        width: dividerWidth,
                        backgroundColor: (i !== backgroundImages.length - 1) ?
                          dividerColor
                        :
                          'transparent',
                      }
                    ]}
                  />
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
    width: deviceWidth,
  },
  backgroundImage: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
  },
  uiContainer: {
    width: deviceWidth,
    height: deviceHeight,
  },
  divider: {
    height: deviceHeight,
  },
});

ParallaxSwiper.propTypes = {
  ui: PropTypes.element,
  backgroundImages: PropTypes.element.isRequired,
  backgroundColor: PropTypes.string,
  dividerColor: PropTypes.string,
  dividerWidth: PropTypes.number,
  parallaxStrength: PropTypes.number,
  showsHorizontalScrollIndicator: PropTypes.bool,
};

ParallaxSwiper.defaultProps = {
  backgroundColor: 'black',
  dividerColor: 'black',
  dividerWidth: 8,
  parallaxStrength: 80,
  showsHorizontalScrollIndicator: false,
};

export default ParallaxSwiper;
