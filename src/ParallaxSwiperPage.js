import React, { Component } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ParallaxSwiperPage extends Component {
  getParallaxStyles(i) {
    const {
      parallaxStrength,
      dividerWidth,
      vertical,
      animatedScrollValue,
    } = this.props;
    const totalPageWidth = deviceWidth + dividerWidth;

    const horizontalStyles = {
      transform: [
        {
          translateX: animatedScrollValue.interpolate({
            inputRange: [
              (i - 1) * totalPageWidth,
              i * (deviceWidth + dividerWidth),
              (i + 1) * totalPageWidth,
            ],
            outputRange: [-parallaxStrength, 0, parallaxStrength],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    const verticalStyles = {
      transform: [
        {
          translateY: animatedScrollValue.interpolate({
            inputRange: [
              (i - 1) * deviceHeight,
              i * deviceHeight,
              (i + 1) * deviceHeight,
            ],
            outputRange: [-parallaxStrength, 0, parallaxStrength],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    if (vertical) {
      return verticalStyles;
    }
    return horizontalStyles;
  }

  render() {
    const {
      index,
      PageBackgroundComponent,
      PageForegroundComponent,
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={this.getParallaxStyles(index)}>
          {PageBackgroundComponent}
        </Animated.View>
        <View pointerEvents="box-none" style={styles.foregroundContainer}>
          {PageForegroundComponent}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: deviceWidth,
    height: deviceHeight,
  },
  foregroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

ParallaxSwiperPage.propTypes = {
  parallaxStrength: PropTypes.number,
  dividerWidth: PropTypes.number,
  vertical: PropTypes.bool,
  index: PropTypes.number,
  PageBackgroundComponent: PropTypes.element,
  PageForegroundComponent: PropTypes.element,
  animatedScrollValue: PropTypes.instanceOf(Animated.Value),
};

ParallaxSwiperPage.defaultProps = {};

export default ParallaxSwiperPage;
export const ParallaxSwiperPagePropTypes = ParallaxSwiperPage.propTypes;
