import React, { Component, PropTypes } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ParallaxSwiper extends Component {

  componentWillReceiveProps(nextProps) {
    this.scrollToIndex(nextProps.scrollToIndex);
  }

  scrollToIndex(index) {
    const { vertical, dividerWidth, animatedScrollValue } = this.props;

    index = vertical ? index * deviceHeight : index * (deviceWidth + dividerWidth);

    if (!this.animatedScrollViewHasScrolled) {
      animatedScrollValue.setValue(index);
    }

    this.refs.animatedScrollView._component.scrollTo({
      x: vertical ? 0 : index,
      y: vertical ? index : 0,
      animated: true,
    });

    if (!this.animatedScrollViewHasScrolled) {
      this.animatedScrollViewHasScrolled = true;
    }
  }

  getParallaxStyles(i) {
    const { parallaxStrength, dividerWidth, vertical, animatedScrollValue } = this.props;

    const horizontalStyles = {
      left: i * -parallaxStrength,
      transform: [
        {
          translateX: animatedScrollValue.interpolate({
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
          translateY: animatedScrollValue.interpolate({
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
      animatedScrollValue,
    } = this.props;

    return (
      <View pointerEvents="box-none" style={styles.container}>
        <Animated.ScrollView
          ref="animatedScrollView"
          scrollEnabled={this.props.scrollEnabled}
          style={{ width: vertical ? deviceWidth : deviceWidth + dividerWidth, backgroundColor }}
          horizontal={!vertical}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: vertical
                  ? { contentOffset: { y: animatedScrollValue } }
                  : { contentOffset: { x: animatedScrollValue } },
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
                    <View pointerEvents="box-none" style={styles.uiContainer}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
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
  backgroundImage: PropTypes.string,
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
  animatedScrollValue: new Animated.Value(0),
  scrollToIndex: 0,
};

export default ParallaxSwiper;
