import React, { Component } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import ParallaxSwiperPage, {
  ParallaxSwiperPagePropTypes,
} from './ParallaxSwiperPage';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class ParallaxSwiper extends Component {
  state = {
    width: deviceWidth,
    height: deviceHeight,
  };

  componentDidMount() {
    const { scrollToIndex } = this.props;

    if (scrollToIndex) {
      setTimeout(() => {
        this.scrollToIndex(scrollToIndex, false);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.scrollToIndex(nextProps.scrollToIndex);
  }

  onScrollEnd(e) {
    const { vertical, onMomentumScrollEnd } = this.props;
    const contentOffset = vertical
      ? e.nativeEvent.contentOffset.y
      : e.nativeEvent.contentOffset.x;
    const viewSize = vertical ? this.state.height : this.state.width;

    // Divide content offset by size of the view to see which page is visible
    this.pageIndex = Math.abs((contentOffset / viewSize).toFixed()) || 0;
    onMomentumScrollEnd(this.pageIndex);
  }

  setScrollViewSize = (width, height) => {
    this.setState({ width, height });
  };

  scrollToIndex(index, animated = true) {
    const { vertical, dividerWidth, animatedValue } = this.props;
    const pageWidth = this.state.width + dividerWidth;
    const pageHeight = this.state.height;
    const scrollOffset = vertical ? index * pageHeight : index * pageWidth;

    if (!this.animatedScrollViewHasScrolled) {
      animatedValue.setValue(scrollOffset);
      this.animatedScrollViewHasScrolled = true;
    }

    this.animatedScrollView.getNode().scrollTo({
      x: vertical ? 0 : scrollOffset,
      y: vertical ? scrollOffset : 0,
      animated,
    });
  }

  animatedScrollViewHasScrolled = false;
  pageIndex = 0;

  render() {
    const {
      children,
      speed,
      backgroundColor,
      dividerColor,
      dividerWidth,
      showsVerticalScrollIndicator,
      showsHorizontalScrollIndicator,
      vertical,
      animatedValue,
      scrollEnabled,
      showProgressBar,
      progressBarThickness,
      progressBarBackgroundColor,
      progressBarValueBackgroundColor,
    } = this.props;

    return (
      <View pointerEvents="box-none">
        <Animated.ScrollView
          ref={(scrollView) => {
            this.animatedScrollView = scrollView;
          }}
          scrollEnabled={scrollEnabled}
          style={{
            width: vertical
              ? this.state.width
              : this.state.width + dividerWidth,
            height: this.state.height,
            backgroundColor,
          }}
          horizontal={!vertical}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: vertical
                  ? { contentOffset: { y: animatedValue } }
                  : { contentOffset: { x: animatedValue } },
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
              i !== children.length - 1 && children.length > 0
                ? dividerColor
                : 'transparent';

            return (
              <View key={i} style={[styles.pageOuterContainer, { zIndex: -i }]}>
                <ParallaxSwiperPage
                  index={i}
                  setScrollViewSize={this.setScrollViewSize}
                  pageWidth={this.state.width}
                  pageHeight={this.state.height}
                  dividerWidth={dividerWidth}
                  vertical={vertical}
                  animatedValue={animatedValue}
                  speed={speed}
                  BackgroundComponent={child.props.BackgroundComponent}
                  ForegroundComponent={child.props.ForegroundComponent}
                />
                {!vertical && (
                  <View
                    style={{
                      width: dividerWidth,
                      height: this.state.height,
                      backgroundColor: dividerBackgroundColor,
                    }}
                  />
                )}
              </View>
            );
          })}
        </Animated.ScrollView>
        {showProgressBar && (
          <View
            style={{
              width: vertical ? progressBarThickness : this.state.width,
              height: vertical ? this.state.height : progressBarThickness,
              top: vertical ? -this.state.height : -progressBarThickness,
              backgroundColor: progressBarBackgroundColor,
            }}
          >
            <Animated.View
              style={[
                styles.progressBar,
                {
                  backgroundColor: progressBarValueBackgroundColor,
                  transform: [
                    {
                      translateX: vertical
                        ? 0
                        : animatedValue.interpolate({
                          inputRange: [
                            0,
                            (this.state.width + dividerWidth) *
                                (children.length - 1),
                          ],
                          outputRange: [-this.state.width, 0],
                          extrapolate: 'clamp',
                        }),
                    },
                    {
                      translateY: vertical
                        ? animatedValue.interpolate({
                          inputRange: [
                            0,
                            this.state.height * (children.length - 1),
                          ],
                          outputRange: [-this.state.height, 0],
                          extrapolate: 'clamp',
                        })
                        : 0,
                    },
                  ],
                },
              ]}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageOuterContainer: {
    flexDirection: 'row',
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
  },
});

ParallaxSwiper.propTypes = {
  backgroundColor: PropTypes.string,
  dividerColor: PropTypes.string,
  dividerWidth: PropTypes.number,
  speed(props, propName, componentName) {
    if (props[propName] < 0 || props[propName] > 1) {
      return new Error(
        `Invalid 'speed' prop for ${componentName}. Number should be between 0 and 1.`,
      );
    }
  },
  showsHorizontalScrollIndicator: PropTypes.bool,
  onMomentumScrollEnd: PropTypes.func,
  children: PropTypes.arrayOf((propValue, key, componentName) => {
    const childComponentName = propValue[key].type.displayName;
    if (!/ParallaxSwiperPage/.test(childComponentName)) {
      return new Error(
        `Invalid component '${childComponentName}' supplied to ${componentName}. Use 'ParallaxSwiperPage' instead.`,
      );
    }
  }),
  vertical: PropTypes.bool,
  showsVerticalScrollIndicator: PropTypes.bool,
  animatedValue: PropTypes.instanceOf(Animated.Value),
  scrollEnabled: PropTypes.bool,
  scrollToIndex: PropTypes.number,
  showProgressBar: PropTypes.bool,
  progressBarThickness: PropTypes.number,
  progressBarBackgroundColor: PropTypes.string,
  progressBarValueBackgroundColor: PropTypes.string,
};

ParallaxSwiper.defaultProps = {
  backgroundColor: 'black',
  dividerColor: 'black',
  dividerWidth: 8,
  speed: 0.25,
  showsHorizontalScrollIndicator: false,
  vertical: false,
  showsVerticalScrollIndicator: false,
  animatedValue: new Animated.Value(0),
  onMomentumScrollEnd: () => null,
  scrollToIndex: 0,
  scrollEnabled: true,
  showProgressBar: false,
  progressBarThickness: 4,
  progressBarBackgroundColor: 'rgba(255,255,255,0.25)',
  progressBarValueBackgroundColor: 'white',
};

export default ParallaxSwiper;
