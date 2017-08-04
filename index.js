import React, { Component, PropTypes } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ParallaxSwiper extends Component {
  state = { animatedValue: new Animated.Value(0) };

  getParallaxStyles(i) {
    const { parallaxStrength, dividerWidth, vertical } = this.props;

    const horizontalStyles = {
      left: i * -parallaxStrength,
      transform: [
        {
          translateX: this.state.animatedValue.interpolate({
            inputRange: [0, deviceWidth + dividerWidth],
            outputRange: [0, parallaxStrength],
          }),
        },
      ],
    };

    const verticalStyles = {
      top: i * -parallaxStrength,
      transform: [
        {
          translateY: this.state.animatedValue.interpolate({
            inputRange: [0, deviceHeight],
            outputRange: [0, parallaxStrength],
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
      children,
      parallaxStrength,
      backgroundColor,
      dividerColor,
      dividerWidth,
      showsVerticalScrollIndicator,
      showsHorizontalScrollIndicator,
      vertical,
      backgroundImageResizeMode,
    } = this.props;

    return (
      <Animated.ScrollView
        style={{ width: vertical ? deviceWidth : deviceWidth + dividerWidth, backgroundColor }}
        horizontal={!vertical}
        pagingEnabled
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: vertical
                ? { contentOffset: { y: this.state.animatedValue } }
                : { contentOffset: { x: this.state.animatedValue } },
            },
          ],
          { useNativeDriver: true },
        )}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        onMomentumScrollEnd={this.props.onMomentumScrollEnd}
      >
        {React.Children.map(children, (child, i) => {
          const dividerBackgroundColor =
            i !== children.length - 1 && children.length > 0 ? dividerColor : 'transparent';

          return (
            <View key={i} style={{ flexDirection: vertical ? 'column' : 'row' }}>
              <View style={styles.slideInnerContainer}>
                {child.props.backgroundImage &&
                  <Animated.Image
                    style={[
                      styles.backgroundImage,
                      { resizeMode: backgroundImageResizeMode },
                      this.getParallaxStyles(i),
                    ]}
                    source={{ uri: child.props.backgroundImage }}
                  />}
                {child.props.backgroundImage &&
                  <View style={styles.uiContainer}>
                    {child}
                  </View>}
                {!child.props.backgroundImage &&
                  <Animated.View style={[styles.uiContainer, this.getParallaxStyles(i)]}>
                    {child}
                  </Animated.View>}
              </View>
              {!vertical &&
                <View
                  style={{
                    width: dividerWidth,
                    height: deviceHeight,
                    backgroundColor: dividerBackgroundColor,
                  }}
                />}
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    overflow: 'hidden',
    width: deviceWidth,
    height: deviceHeight,
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
});

ParallaxSwiper.propTypes = {
  backgroundColor: PropTypes.string,
  dividerColor: PropTypes.string,
  dividerWidth: PropTypes.number,
  parallaxStrength: PropTypes.number,
  showsHorizontalScrollIndicator: PropTypes.bool,
  onMomentumScrollEnd: PropTypes.func,
  children: PropTypes.node,
  backgroundImageResizeMode: PropTypes.string,
  vertical: PropTypes.bool,
  showsVerticalScrollIndicator: PropTypes.bool,
};

ParallaxSwiper.defaultProps = {
  backgroundColor: 'black',
  dividerColor: 'black',
  dividerWidth: 8,
  parallaxStrength: 80,
  showsHorizontalScrollIndicator: false,
  backgroundImageResizeMode: 'cover',
  vertical: false,
  showsVerticalScrollIndicator: false,
};

export default ParallaxSwiper;
