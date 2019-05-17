import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import { Platform, Linking } from "react-native";

import NavigationService from "./NavigationService";
import Landing from "./app/Components/Landing/landing";
import Login from "./app/Components/Login/login";
import Home from "./app/Components/Home/home";

const RootStack = createStackNavigator(
  {
    landing: Landing,
    login: Login,
    home: Home
  },
  {
    initialRouteName: "landing",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null
    }
  }
);

const Application = createAppContainer(RootStack);

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Application
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
  componentDidMount() {
    // B
    if (Platform.OS === "android") {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener("url", this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    // C
    Linking.removeEventListener("url", this.handleOpenURL);
  }
  handleOpenURL = event => {
    // D
    this.navigate(event.url);
  };
  navigate = url => {
    // E
    const route = url.replace(/.*?:\/\//g, "");
    const routeName = route.split("/")[0];
    const msg = route.split("/").splice(1);
    let accessToken = "";
    if (routeName == "login") accessToken = msg[0];
    NavigationService.navigate(routeName, { accessToken: accessToken });
  };
}
