# React Native Parallax Swiper

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
  dividerColor="white"
  backgroundColor="#bae"
  onMomentumScrollEnd={sweetFunction}
>
  <View style={styles.dopeStyles} backgroundImage={uri}>
    {...arbitraryUI}
  </View>
</ParallaxSwiper>
```

## Props
| Prop | Type | Description |
|-----------------|----------|--------------------------------------------------------------|
| parallaxStrength | number | how much parallax you want |
| dividerWidth | number | width of slide divider |
| dividerColor | string | color of slide divider |
| backgroundColor | string | color of main scrollview background |
| onMomentumScrollEnd | function | called when scrollview completed scrolling |

## Copyright
Copyright (c) 2017 Zachary Gibson Licensed under the MIT license.
