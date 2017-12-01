import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { SafeAreaView, StackNavigator } from 'react-navigation';

import TwitterMoments from './screens/TwitterMoments';
import Vevo from './screens/Vevo';

const ExampleRoutes = {
  TwitterMoments: {
    name: 'Twitter Moments Example',
    description: '',
    screen: TwitterMoments,
  },
  Vevo: {
    name: 'Vevo Example',
    description: '',
    screen: Vevo,
  },
};

const MainScreen = ({ navigation }) => (
  <ScrollView style={styles.container}>
    {Object.keys(ExampleRoutes).map(routeName => (
      <TouchableOpacity
        key={routeName}
        onPress={() => {
          const { path, params, screen } = ExampleRoutes[routeName];
          const { router } = screen;
          const action = path && router.getActionForPathAndParams(path, params);
          navigation.navigate(routeName, {}, action);
        }}
      >
        <SafeAreaView
          style={styles.itemContainer}
          forceInset={{ vertical: 'never' }}
        >
          <View style={styles.item}>
            <Text style={styles.title}>{ExampleRoutes[routeName].name}</Text>
            <Text style={styles.description}>
              {ExampleRoutes[routeName].description}
            </Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

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
  },
);

export default () => <AppNavigator />;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
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
