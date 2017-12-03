import React, { Component } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ParallaxSwiperPage extends Component {
  setPageSize = ({ nativeEvent }) => {
    this.props.setScrollViewSize(
      nativeEvent.layout.width,
      nativeEvent.layout.height,
    );
  };

  getParallaxStyles(i) {
    const {
      speed,
      dividerWidth,
      vertical,
      animatedValue,
      pageWidth,
      pageHeight,
    } = this.props;
    const totalPageWidth = pageWidth + dividerWidth;
    const horizontalSpeed =
      dividerWidth === 0
        ? Math.abs(pageWidth * speed - pageWidth)
        : Math.abs(pageWidth * speed - dividerWidth - pageWidth);
    const verticalSpeed = Math.abs(pageHeight * speed - pageHeight);

    const horizontalStyles = {
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [
              (i - 1) * totalPageWidth,
              i * (pageWidth + dividerWidth),
              (i + 1) * totalPageWidth,
            ],
            outputRange: [-horizontalSpeed, 0, horizontalSpeed],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    const verticalStyles = {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [
              (i - 1) * pageHeight,
              i * pageHeight,
              (i + 1) * pageHeight,
            ],
            outputRange: [-verticalSpeed, 0, verticalSpeed],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    if (speed === 1) {
      return {};
    }

    if (vertical) {
      return verticalStyles;
    }
    return horizontalStyles;
  }

  render() {
    const { index, BackgroundComponent, ForegroundComponent } = this.props;

    return (
      <View onLayout={this.setPageSize} style={styles.container}>
        <Animated.View style={this.getParallaxStyles(index)}>
          {BackgroundComponent}
        </Animated.View>
        <View pointerEvents="box-none" style={styles.foregroundContainer}>
          {ForegroundComponent}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
  },
  foregroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

ParallaxSwiperPage.propTypes = {
  index: PropTypes.number,
  BackgroundComponent: PropTypes.element,
  ForegroundComponent: PropTypes.element,
};

ParallaxSwiperPage.defaultProps = {};

export default ParallaxSwiperPage;
export const ParallaxSwiperPagePropTypes = ParallaxSwiperPage.propTypes;
