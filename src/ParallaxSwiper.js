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

  scrollToIndex(i) {
    const { vertical, dividerWidth, animatedValue } = this.props;

    const index = vertical
      ? i * this.state.height
      : i * (this.state.width + dividerWidth);

    if (!this.animatedScrollViewHasScrolled) {
      animatedValue.setValue(index);
    }

    this.animatedScrollView._component.scrollTo({
      x: vertical ? 0 : index,
      y: vertical ? index : 0,
      animated: true,
    });

    if (!this.animatedScrollViewHasScrolled) {
      this.animatedScrollViewHasScrolled = true;
    }
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageOuterContainer: {
    flexDirection: 'row',
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
};

export default ParallaxSwiper;
