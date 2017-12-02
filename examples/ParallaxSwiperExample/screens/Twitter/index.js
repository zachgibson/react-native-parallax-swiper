import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {
  ParallaxSwiper,
  ParallaxSwiperPage,
} from 'react-native-parallax-swiper';
import LinearGradient from 'react-native-linear-gradient';

import data from './data';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const myAnimatedValue = new Animated.Value(0);

export default ({ navigation }) =>
  (<View style={styles.container}>
    <ParallaxSwiper
      speed={0.75}
      dividerWidth={6}
      animatedValue={myAnimatedValue}
    >
      {data.map(page =>
        (<ParallaxSwiperPage
          key={page.id}
          BackgroundComponent={
            <Image
              style={styles.image}
              source={{
                uri: page.backgroundImage,
              }}
            />
          }
          ForegroundComponent={
            <View style={styles.innerContainer}>
              <LinearGradient
                style={styles.gradient}
                colors={['transparent', 'black']}
              >
                <View style={styles.twitterNameAndHandleContainer}>
                  <Text style={styles.twitterName}>
                    {page.twitterName}
                  </Text>
                  <Text style={styles.twitterHandle}>
                    {page.twitterHandle}
                  </Text>
                </View>
                <View style={styles.tweetTextContainer}>
                  <Text style={styles.tweetText}>
                    {page.tweetText}
                  </Text>
                </View>
                <View style={styles.smallButtonsContainer}>
                  <View style={styles.bottomIconsContainer}>
                    <View
                      style={[
                        styles.buttonWithTextContainer,
                        { marginRight: 24 },
                      ]}
                    >
                      <View
                        style={[
                          styles.smallButtonContainer,
                          styles.smallButtonWithTextIconContainer,
                        ]}
                      >
                        <Image
                          style={styles.icon}
                          source={require('./assets/retweet.png')}
                        />
                      </View>
                      <Text style={styles.buttonText}>
                        {page.retweetCount}
                      </Text>
                    </View>
                    <View style={styles.buttonWithTextContainer}>
                      <View
                        style={[
                          styles.smallButtonContainer,
                          styles.smallButtonWithTextIconContainer,
                        ]}
                      >
                        <Image
                          style={styles.icon}
                          source={require('./assets/heart-small.png')}
                        />
                      </View>
                      <Text style={styles.buttonText}>
                        {page.likeCount}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginRight: 8 }}>
                    <Image
                      style={styles.icon}
                      source={require('./assets/ellipses.png')}
                    />
                  </View>
                </View>
              </LinearGradient>
            </View>
          }
        />),
      )}
    </ParallaxSwiper>
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={[styles.largeButtonContainer, { left: 12 }]}
    >
      <Image style={styles.icon} source={require('./assets/x.png')} />
    </TouchableOpacity>
    <View style={[styles.largeButtonContainer, { right: 64 }]}>
      <Image style={styles.icon} source={require('./assets/heart-big.png')} />
    </View>
    <View style={[styles.largeButtonContainer, { right: 12 }]}>
      <Image style={styles.icon} source={require('./assets/share.png')} />
    </View>
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            transform: [
              {
                translateX: myAnimatedValue.interpolate({
                  inputRange: [0, deviceWidth * (data.length - 1)],
                  outputRange: [-deviceWidth, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
    </View>
  </View>);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: deviceWidth,
    height: deviceHeight,
  },
  gradient: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: 'transparent',
  },
  twitterNameAndHandleContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  twitterName: {
    marginRight: 4,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  twitterHandle: {
    fontSize: 16,
    color: 'white',
  },
  tweetTextContainer: {
    marginBottom: 12,
  },
  tweetText: {
    fontSize: 16,
    color: 'white',
  },
  buttonWithTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomIconsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    tintColor: 'white',
  },
  buttonText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  smallButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  smallButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  smallButtonWithTextIconContainer: {
    marginRight: 8,
  },
  largeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 12,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
});
