import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';

import { SafeAreaView, StackNavigator } from 'react-navigation';

import Twitter from './screens/Twitter';
import Vevo from './screens/Vevo';

const ExampleRoutes = {
  Twitter: {
    name: 'Twitter Moments Example',
    description: 'Re-creation of Twitter’s Moments feature.',
    screen: Twitter,
  },
  Vevo: {
    name: 'Vevo Example',
    description: 'Re-creation of the old Vevo app.',
    screen: Vevo,
  },
};

const instructions =
  Platform.OS === 'ios'
    ? '(Swipe back to get back to demos)'
    : '(Press back to get back to demos)';

class MainScreen extends Component {
  componentDidMount() {
    StatusBar.setHidden(true, 'none');
  }

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={{ backgroundColor: 'black' }}>
        <View
          style={{
            marginHorizontal: 16,
            paddingTop: 20 + 16,
            paddingBottom: 16,
          }}
        >
          <Text style={{ color: 'white', fontSize: 30 }}>
            ParallaxSwiper Demos
          </Text>
          <Text style={{ color: 'white' }}>
            {instructions}
          </Text>
        </View>
        {Object.keys(ExampleRoutes).map(routeName =>
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
              style={styles.itemContainer}
              // forceInset={{ vertical: 'never' }}
            >
              <View style={styles.item}>
                <Text style={styles.title}>
                  {ExampleRoutes[routeName].name}
                </Text>
                <Text style={styles.description}>
                  {ExampleRoutes[routeName].description}
                </Text>
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
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemContainer: {
    backgroundColor: '#111',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
});
