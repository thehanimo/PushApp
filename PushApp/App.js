import React, {Component} from 'react';
import {createStackNavigator,createAppContainer,createBottomTabNavigator} from 'react-navigation';
import Landing1 from './app/Components/Landing/landing1'
import Landing2 from './app/Components/Landing/landing2'
import Landing3 from './app/Components/Landing/landing3'
import Login from './app/Components/Login/login'

const RootStack = createStackNavigator(
  {
    Landing: createBottomTabNavigator(
      {
        Landing1: Landing1,
        Landing2: Landing2,
        Landing3: Landing3,
      },
      {
        defaultNavigationOptions: {
          tabBarVisible: false,
          animationEnabled: true,
        },
      }
    ),
    Login: Login,
  },
  {
    initialRouteName: 'Landing',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null
    },
  }
)

const Application = createAppContainer(RootStack);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Application />
    );
  }
}
