# React Native Parallax Swiper
[![npm](https://img.shields.io/npm/v/react-native-parallax-swiper.svg?style=flat-square)](https://www.npmjs.com/package/react-native-parallax-swiper)
[![npm](https://img.shields.io/npm/dm/react-native-parallax-swiper.svg?style=flat-square)](https://www.npmjs.com/package/react-native-parallax-swiper)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Configurable parallax swiper based on an iOS pattern.

__Features__
- __Flexible.__ Pass your own Animated.Value and use that value for both ParallaxSwiper and your own UI.
- __Performant.__ Leverages useNativeDriver for 60FPS and no latency.
- __Cross-platform.__ Implement your parallax on both iOS and Android.

![Twitter Moments Demo](https://user-images.githubusercontent.com/10658888/30244667-636cfc0e-9588-11e7-9805-3a0c5649ab4b.gif)  
![Vevo Demo](https://user-images.githubusercontent.com/10658888/30244668-66164c3a-9588-11e7-9cfa-c0c5dc29090c.gif)  
![Lightbox Demo](https://user-images.githubusercontent.com/10658888/30244669-68924b4e-9588-11e7-9426-b081953115fc.gif)

## Installation
```shell
$ yarn add react-native-parallax-swiper
```


## Usage
```javascript
import ParallaxSwiper from 'react-native-parallax-swiper';
```

```javascript
constructor() {
  super();
  
  this.myCustomAnimatedValue = new Animated.Value(0);
}
```

```javascript
<ParallaxSwiper
  parallaxStrength={80}
  animatedScrollValue={this.myCustomAnimatedValue}
  dividerWidth={8}
  dividerColor="black"
  backgroundColor="#fff"
  onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
>
  <Animated.View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      opacity: this.myCustomAnimatedValue.interpolate({
        inputRange: [0, deviceWidth * 0.25],
        outputRange: [1, 0]
      })
    }}
    backgroundImage={`https://source.unsplash.com/user/erondu/${deviceHeight + 1}x${deviceWidth + 1}`}
  >
    <Text>Parallaxing is rad</Text>
  </Animated.View>
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}
    backgroundImage={`https://source.unsplash.com/user/erondu/${deviceHeight}x${deviceWidth}`}
  >
    <Text>Parallaxing is too rad</Text>
  </View>
</ParallaxSwiper>
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| __`parallaxStrength`__ | _Number_ | `80` | This number determines how slow parallax’ing element moves. Lower number yields a subtler parallax effect, higher number increases parallax effect. |
| __`dividerWidth`__ | _Number_ | `8` | The width of the divider between each page. (horizontal only) |
| __`dividerColor`__ | _String_ | `black` | Color of divider. |
| __`backgroundImage`__ | _String_ | `N/A` | The image source. If used this becomes the background image that parallaxes. (remote URL only for now) |
| __`backgroundImageResizeMode`__ | _String_ | `cover` | Determines how to resize the image. |
| __`backgroundColor`__ | _String_ | `black` | The main view’s background color. |
| __`scrollToIndex`__ | _Function_ | 0 | Scrolls to index with a smooth animation. If used onComponentDidMount scroll is immediate with no animation. |
| __`onMomentumScrollEnd`__ | _Function_ | `N/A` | Called when ScrollView stops scrolling and is passed the current page index. |
| __`animatedScrollValue`__ | _Animated.Value_ | `0` | Optionally pass a new instance of Animated.Value to this prop to have access to the animated scroll value to animate your own components. |
| __`children`__ | _ReactComponents_ | `N/A` | JSX to inject into the page. |
| __`vertical`__ | _Boolean_ | `false` | When true, ParallaxSwiper’s children are arranged vertically in a column instead of horizontally in a row. For now only iOS supports this, but there is work to implement vertical paging on Android. |
| __`showsHorizontalScrollIndicator`__ | _Boolean_ | `false` | When true, shows a horizontal scroll indicator. The default value is false. |
| __`showsVerticalScrollIndicator`__ | _Boolean_ | `false` | When true, shows a vertical scroll indicator. The default value is false. |

## TODO
- [ ] Create Expo demos
- [ ] Create examples
- [x] Expose current index
- [x] Support scrollToIndex
- [x] Fix Android
- [x] Expose Animated.Value for animation outside of ParallaxSwiper
- [ ] Add drag effects e.g. zoom, blur, darken
- [ ] Expose rest of [ScrollView](http://facebook.github.io/react-native/releases/0.47/docs/scrollview.html#scrollview) props

## Why another parallax component? 😒
This component is inspired by an iOS pattern that no react-native-parallax-whatever previously delivered. It emulates this pattern by using the [ScrollView](http://facebook.github.io/react-native/releases/0.48/docs/scrollview.html) component which has features like velocity, paging, and platform specific easing curves; It also has optional dividers to split up each page. You can see this pattern in apps like [iOS Camera Roll](https://goo.gl/GY3bFQ), [Twitter Moments](https://goo.gl/CvzCQA), [Kylie Jenner’s app](https://goo.gl/yDB69S), [Vevo’s app](https://goo.gl/FMSSeF), and more.

## Contributors
[<img src="https://avatars0.githubusercontent.com/u/2807897?v=4&s=460" width="80px;"/><br /><sub>Chris LeBlanc</sub>](https://github.com/LeBlaaanc)<br />[💻]|
| :---: |

## Questions or suggestions?
Hit me up on [Twitter](https://twitter.com/zacharykeith_), or create an [issue](https://github.com/zachgibson/react-native-parallax-swiper/issues).

## Copyright
Copyright (c) 2017 [Zachary Gibson](http://zachgibsondesign.com/) Licensed under the MIT license.
