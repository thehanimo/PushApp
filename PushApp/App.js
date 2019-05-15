import React, {Component} from 'react';
import {createStackNavigator,createAppContainer,createBottomTabNavigator} from 'react-navigation';
import {Platform,Linking} from 'react-native';

import NavigationService from './NavigationService';
import Landing1 from './app/Components/Landing/landing1'
import Landing2 from './app/Components/Landing/landing2'
import Landing3 from './app/Components/Landing/landing3'
import Login from './app/Components/Login/login'

const RootStack = createStackNavigator(
  {
    landing: createBottomTabNavigator(
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
    login: Login,
  },
  {
    initialRouteName: 'landing',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null
    },
  }
)

const Application = createAppContainer(RootStack);

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Application ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}/>
    );
  }
  componentDidMount() { // B
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
        Linking.addEventListener('url', this.handleOpenURL);
      }
    }
    
    componentWillUnmount() { // C
      Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL = (event) => { // D
      this.navigate(event.url);
    }
    navigate = (url) => { // E
      const route = url.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[0];
      const msg = route.split('/')[1];
      console.log(msg)
      NavigationService.navigate('login',{msg:msg})
    }
}
