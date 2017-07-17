# React Native Parallax Swiper
Configurable parallax swiper based on an iOS pattern. Inject whatever UI you want.

This is a quick re-make of the UI Twitter Moments uses. As you can see GIFs work just fine. 🙌
![Example 1](https://raw.githubusercontent.com/zachgibson/react-native-parallax-swiper/master/example-1.gif)

This example injects [react-native-zoomable](https://github.com/LeBlaaanc/react-native-zoomable) to create a media lightbox with parallax swiping and media zoom.
![Example 2](https://raw.githubusercontent.com/zachgibson/react-native-parallax-swiper/master/example-2.gif)

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
