# React Native Parallax Swiper
Configurable parallax swiper based on an iOS pattern. Uses [Native Driver](http://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated.html) for super smooth parallax.

## Ways to use this component

1. You have a background image (GIFs included) that parallaxes while your UI moves at the ScrollView speed:

![Example 1](https://raw.githubusercontent.com/zachgibson/react-native-parallax-swiper/master/example-1.gif)

2. You have no background image and all of your UI parallaxes:

![Example 2](https://raw.githubusercontent.com/zachgibson/react-native-parallax-swiper/master/example-2.gif)

☝️ *[React Native Zoomable](https://github.com/LeBlaaanc/react-native-zoomable) for image zoom.*

You can see this effect in apps like:
- iOS Photos (Camera Roll)
- Twitter Moments
- Kylie Jenner app 😅

## Add it to your project
Run ```npm install react-native-parallax-swiper --save```


## Usage
```javascript
import ParallaxSwiper from 'react-native-parallax-swiper';
```

```javascript
<ParallaxSwiper
  parallaxStrength={80}
  dividerWidth={8}
  dividerColor="black"
  backgroundColor="#bae"
  onMomentumScrollEnd={() => console.log('💩')}
>
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
     }}
     backgroundImage={'https://goo.gl/7Mvjji'}
    >
    <Text>Pass Arbitrary JSX to ParallaxSwiper as Children</Text>
  </View>
</ParallaxSwiper>
```

## Props
| Prop | Type | Description |
|-----------------|----------|--------------------------------------------------------------|
| parallaxStrength | number | how much parallax you want |
| dividerWidth | number | width of slide divider |
| dividerColor | string | color of slide divider |
| backgroundImageResizeMode | string | how your background image should resize |
| backgroundColor | string | color of main scrollview background |
| onMomentumScrollEnd | function | called when scrollview completed scrolling |
| children | ReactComponents | pass arbitrary JSX into slide |

## Copyright
Copyright (c) 2017 Zachary Gibson Licensed under the MIT license.
