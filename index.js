import React, { Component, PropTypes } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ParallaxSwiper extends Component {
  state = { animatedValue: new Animated.Value(0) };

  render() {
    const {
      backgroundColor,
      dividerWidth,
      parallaxStrength,
      showsHorizontalScrollIndicator,
      dividerColor,
      children,
      backgroundImageResizeMode,
      hasBackgroundImage,
    } = this.props;

    return (
      <Animated.ScrollView
        style={{ width: deviceWidth + dividerWidth, backgroundColor }}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: this.state.animatedValue } },
            },
          ],
          { useNativeDriver: true },
        )}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        onMomentumScrollEnd={this.props.onMomentumScrollEnd}
      >
        {React.Children.map(children, (child, i) => {
          const dividerBackgroundColor =
            i !== children.length - 1 && children.length > 0 ? dividerColor : 'transparent';

          return (
            <View key={i} style={styles.slideOuterContainer}>
              <View style={styles.slideInnerContainer}>
                {hasBackgroundImage &&
                  <Animated.Image
                    style={[
                      styles.backgroundImage,
                      {
                        resizeMode: backgroundImageResizeMode,
                        left: i * -parallaxStrength,
                        transform: [
                          {
                            translateX: this.state.animatedValue.interpolate({
                              inputRange: [0, deviceWidth + dividerWidth],
                              outputRange: [0, parallaxStrength],
                            }),
                          },
                        ],
                      },
                    ]}
                    source={{ uri: child.props.backgroundImage }}
                  />}
                {hasBackgroundImage &&
                  <View style={styles.uiContainer}>
                    {child}
                  </View>}
                {!hasBackgroundImage &&
                  <Animated.View
                    style={[
                      styles.uiContainer,
                      {
                        left: i * -parallaxStrength,
                        transform: [
                          {
                            translateX: this.state.animatedValue.interpolate({
                              inputRange: [0, deviceWidth + dividerWidth],
                              outputRange: [0, parallaxStrength],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {child}
                  </Animated.View>}
              </View>
              <View
                style={[
                  styles.divider,
                  {
                    width: dividerWidth,
                    backgroundColor: dividerBackgroundColor,
                  },
                ]}
              />
            </View>
          );
        })}
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
  backgroundColor: PropTypes.string,
  dividerColor: PropTypes.string,
  dividerWidth: PropTypes.number,
  parallaxStrength: PropTypes.number,
  showsHorizontalScrollIndicator: PropTypes.bool,
  onMomentumScrollEnd: PropTypes.func,
  children: PropTypes.node,
  backgroundImageResizeMode: PropTypes.string,
  hasBackgroundImage: PropTypes.bool,
};

ParallaxSwiper.defaultProps = {
  backgroundColor: 'black',
  dividerColor: 'black',
  dividerWidth: 8,
  parallaxStrength: 80,
  showsHorizontalScrollIndicator: false,
  backgroundImageResizeMode: 'cover',
  hasBackgroundImage: true,
};

export default ParallaxSwiper;
