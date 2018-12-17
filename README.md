# React Native Parallax Swiper

[![npm](https://img.shields.io/npm/v/react-native-parallax-swiper.svg?style=flat-square)](https://www.npmjs.com/package/react-native-parallax-swiper)
[![npm](https://img.shields.io/npm/dm/react-native-parallax-swiper.svg?style=flat-square)](https://www.npmjs.com/package/react-native-parallax-swiper)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Configurable parallax swiper based on an iOS pattern.

**Features**

* **Flexible.** Share one `Animated.Value` between ParallaxSwiper and your own UI.
* **Performant.** Runs on the native thread for 60FPS with no latency.
* **Cross-platform.** Works on both iOS and Android.
* **Progress Bar.** Horizontal or vertical progress bar.

![Twitter Moments Demo](https://user-images.githubusercontent.com/10658888/30244667-636cfc0e-9588-11e7-9805-3a0c5649ab4b.gif)  
![Vevo Demo](https://user-images.githubusercontent.com/10658888/30244668-66164c3a-9588-11e7-9cfa-c0c5dc29090c.gif)  
![Lightbox Demo](https://user-images.githubusercontent.com/10658888/30244669-68924b4e-9588-11e7-9426-b081953115fc.gif)

## Examples

<img alt="React Native Parallax Swiper Expo QR code" src="images/QR-code.png" width="160px"/>

Clone this repo and:

```shell
$ cd examples/ParallaxSwiperExample
$ npm install
$ react-native link
$ react-native run-ios
```

## Installation

```shell
$ npm install react-native-parallax-swiper --save
```

## Usage

```JSX
import React from "react";
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";

import {
  ParallaxSwiper,
  ParallaxSwiperPage
} from "react-native-parallax-swiper";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  myCustomAnimatedValue = new Animated.Value(0);

  getPageTransformStyle = index => ({
    transform: [
      {
        scale: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8), // Add 8 for dividerWidth
            index * (width + 8),
            (index + 1) * (width + 8)
          ],
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        })
      },
      {
        rotate: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8),
            index * (width + 8),
            (index + 1) * (width + 8)
          ],
          outputRange: ["180deg", "0deg", "-180deg"],
          extrapolate: "clamp"
        })
      }
    ]
  });

  render() {
    return (
      <ParallaxSwiper
        speed={0.5}
        animatedValue={this.myCustomAnimatedValue}
        dividerWidth={8}
        dividerColor="black"
        backgroundColor="black"
        onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
        showProgressBar={true}
        progressBarBackgroundColor="rgba(0,0,0,0.25)"
        progressBarValueBackgroundColor="white"
      >
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              style={styles.backgroundImage}
              source={{ uri: "https://goo.gl/wtHtxG" }}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <Animated.Text
                style={[styles.foregroundText, this.getPageTransformStyle(0)]}
              >
                Page 1
              </Animated.Text>
            </View>
          }
        />
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              style={styles.backgroundImage}
              source={{ uri: "https://goo.gl/gt4rWa" }}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <Animated.Text
                style={[styles.foregroundText, this.getPageTransformStyle(1)]}
              >
                Page 2
              </Animated.Text>
            </View>
          }
        />
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              style={styles.backgroundImage}
              source={{ uri: "https://goo.gl/KAaVXt" }}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <Animated.Text
                style={[styles.foregroundText, this.getPageTransformStyle(2)]}
              >
                Page 3
              </Animated.Text>
            </View>
          }
        />
      </ParallaxSwiper>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 0.41,
    color: "white"
  }
});
```

## ParallaxSwiper Props

| Prop                                  | Type                                   | Default                  | Description                                                                                                                                            |
| ------------------------------------- | -------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`speed`**                           | _Number_                               | `0.25`                   | This number determines how fast `BackgroundComponent` moves. Set to 0 for no movement at all, set to 1 and background will move as fast as the scroll. |
| **`dividerWidth`**                    | _Number_                               | `8`                      | The width of the divider between each page. (horizontal only)                                                                                          |
| **`dividerColor`**                    | _String_                               | `black`                  | Color of divider.                                                                                                                                      |
| **`backgroundColor`**                 | _String_                               | `black`                  | ParallaxSwiper’s background color.                                                                                                                     |
| **`scrollToIndex`**                   | _Number_                               | 0                        | Scroll to page with a smooth animation. _Note_: You need to use state if you want to change index any other time than when component is rendered.      |
| **`onMomentumScrollEnd`**             | _Function_                             | `N/A`                    | Fired when ScrollView stops scrolling and is passed the current page index.                                                                            |
| **`animatedValue`**                   | _Number (Animated.Value)_              | `0`                      | Optionally pass a new instance of Animated.Value to access the animated value outside of ParallaxSwiper.                                               |
| **`vertical`**                        | _Boolean_                              | `false`                  | When true, ParallaxSwiper’s children are arranged vertically in a column instead of horizontally in a row. For now only iOS supports this.             |
| **`showsHorizontalScrollIndicator`**  | _Boolean_                              | `false`                  | When true, shows a horizontal scroll indicator. The default value is false.                                                                            |
| **`showsVerticalScrollIndicator`**    | _Boolean_                              | `false`                  | When true, shows a vertical scroll indicator. The default value is false.                                                                              |
| **`children`**                        | _React component (ParallaxSwiperPage)_ | `N/A`                    | Each top-level ParallaxSwiperPage child.                                                                                                               |
| **`showProgressBar`**                 | _Boolean_                              | false                    | When true, a progress bar will render on bottom for horizontal and left on vertical.                                                                   |
| **`progressBarThickness`**            | _Number_                               | 4                        | Thickness translates to height for horizontal and width for vertical progress bar.                                                                     |
| **`progressBarBackgroundColor`**      | _String_                               | `rgba(255,255,255,0.25)` | Background color of progress bar background.                                                                                                           |
| **`progressBarValueBackgroundColor`** | _String_                               | `white`                  | Background color of progress bar value background.                                                                                                     |

## ParallaxSwiperPage Props

| Prop                      | Type            | Default | Description                                                                                    |
| ------------------------- | --------------- | ------- | ---------------------------------------------------------------------------------------------- |
| **`BackgroundComponent`** | _React element_ | `N/A`   | This component will render in the background of the page and will be animated based on scroll. |
| **`ForegroundComponent`** | _React element_ | `N/A`   | This component will render in the foreground of the page.                                      |

## TODO

* [x] Create Expo demos
* [x] Create examples
* [x] Expose current index
* [x] Support scrollToIndex
* [x] Fix Android
* [x] Expose Animated.Value for animation outside of ParallaxSwiper
* [ ] Add drag effects e.g. zoom, blur, darken
* [ ] Expose rest of [ScrollView](http://facebook.github.io/react-native/releases/0.47/docs/scrollview.html#scrollview) props
* [ ] Use FlatList instead of ScrollView

## Why another parallax component? 😒

This component is inspired by an iOS pattern that no react-native-parallax-whatever previously delivered. It emulates this pattern by using the [ScrollView](http://facebook.github.io/react-native/releases/0.48/docs/scrollview.html) component which has features like velocity, paging, and platform specific easing curves; It also has optional dividers to split up each page. You can see this pattern in apps like [iOS Camera Roll](https://goo.gl/GY3bFQ), [Twitter Moments](https://goo.gl/CvzCQA), [Kylie Jenner’s app](https://goo.gl/yDB69S), [Vevo’s app](https://goo.gl/FMSSeF), and more.

## Contributors

| [<img src="https://avatars0.githubusercontent.com/u/2807897?v=4&s=460" width="80px;"/><br /><sub>Chris LeBlanc</sub>](https://github.com/spacesuitdiver)<br />[💻] |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------: |


## Questions or suggestions?

Hit me up on [Twitter](https://twitter.com/zacharykeith_), or create an [issue](https://github.com/zachgibson/react-native-parallax-swiper/issues).

## Copyright

Copyright (c) 2017 [Zachary Gibson](http://zachgibsondesign.com/) Licensed under the MIT license.
