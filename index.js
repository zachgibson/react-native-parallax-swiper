import React, { Component } from 'react';
import { View, Animated, StyleSheet, Dimensions, Image } from 'react-native';
import PropTypes from 'prop-types';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ParallaxSwiper extends Component {
  animatedScrollViewHasScrolled = false;
  pageIndex = 0;

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
      transform: [
        {
          translateX: animatedScrollValue.interpolate({
            inputRange: [
              (i - 1) * deviceWidth + dividerWidth,
              i * (deviceWidth + dividerWidth),
              (i + 1) * deviceWidth + dividerWidth,
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
            inputRange: [(i - 1) * deviceHeight, i * deviceHeight, (i + 1) * deviceHeight],
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

  onScrollEnd(e) {
    const { vertical, onMomentumScrollEnd } = this.props;
    const contentOffset = vertical ? e.nativeEvent.contentOffset.y : e.nativeEvent.contentOffset.x;
    const viewSize = vertical ? deviceHeight : deviceWidth;

    // Divide the content offset by the size of the view to see which page is visible
    this.pageIndex = (contentOffset / viewSize).toFixed() || 0;
    onMomentumScrollEnd(this.pageIndex);
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
      shouldRasterizeIOS,
      renderToHardwareTextureAndroid,
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
          onMomentumScrollEnd={e => this.onScrollEnd(e)}
        >
          {React.Children.map(children, (child, i) => {
            const dividerBackgroundColor =
              i !== children.length - 1 && children.length > 0 ? dividerColor : 'transparent';

            return (
              <View key={i} style={{ zIndex: -i, flexDirection: 'row' }}>
                <View style={styles.slideInnerContainer}>
                  {child.props.backgroundImage &&
                    <Animated.View
                      shouldRasterizeIOS={shouldRasterizeIOS}
                      renderToHardwareTextureAndroid={renderToHardwareTextureAndroid}
                      style={[
                        {
                          position: 'absolute',
                          width: deviceWidth,
                          height: deviceHeight,
                        },
                        this.getParallaxStyles(i),
                      ]}
                    >
                      <Image
                        style={[styles.backgroundImage, { resizeMode: backgroundImageResizeMode }]}
                        source={{ uri: child.props.backgroundImage }}
                      />
                    </Animated.View>}
                  {child.props.backgroundImage &&
                    <View pointerEvents="box-none" style={styles.uiContainer}>
                      {child}
                    </View>}
                  {!child.props.backgroundImage &&
                    <Animated.View
                      shouldRasterizeIOS={shouldRasterizeIOS}
                      renderToHardwareTextureAndroid={renderToHardwareTextureAndroid}
                      style={[styles.uiContainer, this.getParallaxStyles(i)]}
                    >
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
  shouldRasterizeIOS: PropTypes.bool,
  renderToHardwareTextureAndroid: PropTypes.bool,
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
  onMomentumScrollEnd: () => console.log('Scroll ended'),
  shouldRasterizeIOS: true,
  renderToHardwareTextureAndroid: true,
};

export default ParallaxSwiper;
