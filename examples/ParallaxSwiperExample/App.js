import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import { SafeAreaView, StackNavigator } from 'react-navigation';
import { Typography } from 'react-native-typography';

import Twitter from './screens/Twitter';
import Vevo from './screens/Vevo';

const ExampleRoutes = {
  Twitter: {
    name: 'Twitter Moments',
    description: 'Re-creation of Twitter’s Moments feature.',
    screen: Twitter,
  },
  Vevo: {
    name: 'Vevo',
    description: 'Re-creation of the old Vevo app.',
    screen: Vevo,
  },
};

class MainScreen extends Component {
  componentDidMount() {
    StatusBar.setHidden(true, 'none');
  }

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView stickyHeaderIndices={[0]} style={styles.scrollView}>
        <View style={styles.navBar}>
          <Typography
            iOSTextStyle="title1"
            androidTextStyle="headline"
            style={{ color: '#BFBFBF' }}
          >
            ParallaxSwiper Demos
          </Typography>
        </View>
        {Object.keys(ExampleRoutes).map((routeName, i) =>
          (<TouchableOpacity
            key={routeName}
            onPress={() => {
              const { path, params, screen } = ExampleRoutes[routeName];
              const { router } = screen;
              const action =
                path && router.getActionForPathAndParams(path, params);
              navigation.navigate(routeName, {}, action);
            }}
          >
            <SafeAreaView
              style={[
                styles.itemContainer,
                { borderTopWidth: i === 0 ? StyleSheet.hairlineWidth : 0 },
              ]}
              forceInset={{ vertical: 'never' }}
            >
              <View style={styles.item}>
                <Typography
                  iOSTextStyle="callout"
                  androidTextStyle="body2"
                  style={{ color: '#BFBFBF' }}
                >
                  {ExampleRoutes[routeName].name}
                </Typography>
                <Typography
                  iOSTextStyle="caption1"
                  androidTextStyle="caption"
                  style={{ color: '#777' }}
                >
                  {ExampleRoutes[routeName].description}
                </Typography>
              </View>
            </SafeAreaView>
          </TouchableOpacity>),
        )}
      </ScrollView>
    );
  }
}
const AppNavigator = StackNavigator(
  {
    ...ExampleRoutes,
    Index: {
      screen: MainScreen,
    },
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
    mode: 'modal',
  },
);

export default () => <AppNavigator />;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
  },
  navBar: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#222',
    backgroundColor: '#111',
  },
});
