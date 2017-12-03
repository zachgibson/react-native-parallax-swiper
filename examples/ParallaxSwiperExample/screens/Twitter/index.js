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

const smallRetweetIcon = require('./assets/retweet.png');
const smallHeartIcon = require('./assets/heart-small.png');
const smallEllipsesIcon = require('./assets/ellipses.png');
const xIcon = require('./assets/x.png');
const heartIcon = require('./assets/heart-big.png');
const shareIcon = require('./assets/share.png');

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const myAnimatedValue = new Animated.Value(0);

export default ({ navigation }) =>
  (<View>
    <ParallaxSwiper
      speed={0.75}
      dividerWidth={6}
      dividerColor="black"
      animatedValue={myAnimatedValue}
    >
      {data.map(tweet =>
        (<ParallaxSwiperPage
          key={tweet.id}
          BackgroundComponent={
            <Image
              style={styles.image}
              source={{
                uri: tweet.media,
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
                    {tweet.userName}
                  </Text>
                  <Text style={styles.twitterHandle}>
                    {tweet.userHandle}
                  </Text>
                </View>
                <View style={styles.tweetTextContainer}>
                  <Text style={styles.tweetText}>
                    {tweet.text}
                  </Text>
                </View>
                <View style={styles.smallButtonsContainer}>
                  <View style={styles.bottomIconsContainer}>
                    <View style={[styles.buttonWithTextContainer]}>
                      <View
                        style={[
                          styles.smallButtonContainer,
                          styles.smallButtonWithTextIconContainer,
                        ]}
                      >
                        <Image style={styles.icon} source={smallRetweetIcon} />
                      </View>
                      <Text style={styles.buttonText}>
                        {tweet.retweetCount}
                      </Text>
                    </View>
                    <View style={styles.buttonWithTextContainer}>
                      <View
                        style={[
                          styles.smallButtonContainer,
                          styles.smallButtonWithTextIconContainer,
                        ]}
                      >
                        <Image style={styles.icon} source={smallHeartIcon} />
                      </View>
                      <Text style={styles.buttonText}>
                        {tweet.likeCount}
                      </Text>
                    </View>
                  </View>
                  <Image style={styles.icon} source={smallEllipsesIcon} />
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
      <Image style={styles.icon} source={xIcon} />
    </TouchableOpacity>
    <View style={[styles.largeButtonContainer, { right: 64 }]}>
      <Image style={styles.icon} source={heartIcon} />
    </View>
    <View style={[styles.largeButtonContainer, { right: 12 }]}>
      <Image style={styles.icon} source={shareIcon} />
    </View>
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            transform: [
              {
                translateX: myAnimatedValue.interpolate({
                  inputRange: [0, (deviceWidth + 6) * (data.length - 1)],
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
    marginRight: 24,
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
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },
  smallButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginRight: 12,
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
