import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from 'react-native';

import {
  ParallaxSwiper,
  ParallaxSwiperPage,
} from 'react-native-parallax-swiper';
import Video from 'react-native-video';
import { BlurView } from 'react-native-blur';

import data from './data';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const homeIcon = require('./assets/home.png');
const searchIcon = require('./assets/search.png');
const messagesIcon = require('./assets/messages.png');
const profileIcon = require('./assets/profile.png');

export default class extends Component {
  componentDidMount() {
    this.playAnimation(0);
  }

  playAnimation = (activeIndex) => {
    if (this.previousPageIndex === activeIndex) {
      return;
    }

    data.forEach((song, i) => {
      this.playButtonAnim8Val[i].setValue(0);
      this.artistNameAnim8Val[i].setValue(0);
      this.songNameAnim8Val[i].setValue(0);
      this.songLikesAnim8Val[i].setValue(0);
    });

    Animated.spring(this.playButtonAnim8Val[activeIndex], {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.stagger(50, [
        Animated.spring(this.artistNameAnim8Val[activeIndex], {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(this.songNameAnim8Val[activeIndex], {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(this.songLikesAnim8Val[activeIndex], {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }, 250);

    this.previousPageIndex = activeIndex;
  };

  // Define our custom Animated Value to anim8 based onScroll
  myCustomAnimatedVal = new Animated.Value(0);

  playButtonAnim8Val = data.map(() => new Animated.Value(0));
  artistNameAnim8Val = data.map(() => new Animated.Value(0));
  songNameAnim8Val = data.map(() => new Animated.Value(0));
  songLikesAnim8Val = data.map(() => new Animated.Value(0));

  previousPageIndex = null;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ParallaxSwiper
            speed={0.5}
            vertical
            onMomentumScrollEnd={(activeIndex) => {
              this.playAnimation(activeIndex);
            }}
            animatedValue={this.myCustomAnimatedVal}
          >
            {data.map((song, i) =>
              (<ParallaxSwiperPage
                key={song.id}
                BackgroundComponent={
                  <View>
                    <Video
                      source={{ uri: song.media }}
                      rate={1.0}
                      volume={1.0}
                      muted={false}
                      paused={false}
                      resizeMode="cover"
                      repeat
                      style={{ width: deviceWidth, height: deviceHeight - 50 }}
                    />
                    <Animated.View
                      style={{
                        position: 'absolute',
                        width: deviceWidth,
                        height: deviceHeight - 50,
                        opacity: this.myCustomAnimatedVal.interpolate({
                          inputRange: [
                            (i - 1) * (deviceHeight - 50),
                            i * (deviceHeight - 50),
                            (i + 1) * (deviceHeight - 50) -
                              (deviceHeight - (50 + 120)),
                          ],
                          outputRange: [1, 0, 1],
                          extrapolate: 'clamp',
                        }),
                      }}
                    >
                      <BlurView
                        blurAmount={100}
                        blurType="dark"
                        style={{ ...StyleSheet.absoluteFillObject }}
                      />
                    </Animated.View>
                    <View
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'rgba(0,0,0,0.25)',
                      }}
                    />
                  </View>
                }
                ForegroundComponent={
                  <Animated.View
                    style={{
                      flex: 1,
                      opacity: this.myCustomAnimatedVal.interpolate({
                        inputRange: [
                          (i - 1) * (deviceHeight - 50),
                          i * (deviceHeight - 50),
                          (i + 1) * (deviceHeight - 50) -
                            (deviceHeight - (50 + deviceHeight * 0.25)),
                        ],
                        outputRange: [0, 1, 0],
                      }),
                      transform: [
                        {
                          translateY: this.myCustomAnimatedVal.interpolate({
                            inputRange: [
                              (i - 1) * (deviceHeight - 50),
                              i * (deviceHeight - 50),
                              (i + 1) * (deviceHeight - 50),
                            ],
                            outputRange: [
                              deviceHeight - 50 - 80,
                              0,
                              deviceHeight - 50 - 80,
                            ],
                          }),
                        },
                      ],
                    }}
                  >
                    <View
                      shouldRasterizeIOS
                      renderToHardwareTextureAndroid
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 50,
                      }}
                    >
                      <Animated.Image
                        style={{
                          marginBottom: 24,
                          transform: [
                            {
                              scale: this.playButtonAnim8Val[i],
                            },
                          ],
                        }}
                        source={require('./assets/play.png')}
                      />
                      <Animated.View
                        style={{
                          opacity: this.artistNameAnim8Val[i].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                          }),
                          transform: [
                            {
                              translateY: this.artistNameAnim8Val[
                                i
                              ].interpolate({
                                inputRange: [0, 1],
                                outputRange: [40, 0],
                              }),
                            },
                          ],
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 4,
                            fontSize: 24,
                            fontWeight: '800',
                            letterSpacing: 0.4,
                            color: 'white',
                            backgroundColor: 'transparent',
                          }}
                        >
                          {song.artistName.toUpperCase()}
                        </Text>
                      </Animated.View>
                      <Animated.View
                        style={{
                          opacity: this.songNameAnim8Val[i].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                          }),
                          transform: [
                            {
                              translateY: this.songNameAnim8Val[i].interpolate({
                                inputRange: [0, 1],
                                outputRange: [40, 0],
                              }),
                            },
                          ],
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 16,
                            fontSize: 20,
                            color: 'white',
                            backgroundColor: 'transparent',
                          }}
                        >
                          {song.name}
                        </Text>
                      </Animated.View>
                      <Animated.View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          opacity: this.songLikesAnim8Val[i].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                          }),
                          transform: [
                            {
                              translateY: this.songLikesAnim8Val[
                                i
                              ].interpolate({
                                inputRange: [0, 1],
                                outputRange: [40, 0],
                              }),
                            },
                          ],
                        }}
                      >
                        <Image
                          style={{ marginRight: 8 }}
                          source={require('./assets/heart.png')}
                        />
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'white',
                            backgroundColor: 'transparent',
                          }}
                        >
                          {song.likeCount}
                        </Text>
                      </Animated.View>
                    </View>
                  </Animated.View>
                }
              />),
            )}
          </ParallaxSwiper>
        </View>
        <View
          style={{ flexDirection: 'row', height: 50, backgroundColor: 'black' }}
        >
          <View style={styles.tabBarIconContainer}>
            <Image
              style={[styles.tabBarIcon, { tintColor: 'white' }]}
              source={homeIcon}
            />
          </View>
          <View style={styles.tabBarIconContainer}>
            <Image style={styles.tabBarIcon} source={searchIcon} />
          </View>
          <View style={styles.tabBarIconContainer}>
            <Image style={styles.tabBarIcon} source={messagesIcon} />
          </View>
          <View style={styles.tabBarIconContainer}>
            <Image style={styles.tabBarIcon} source={profileIcon} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBarIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarIcon: {
    tintColor: '#999',
  },
});
