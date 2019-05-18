import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import { Platform, Linking } from "react-native";

import NavigationService from "./NavigationService";
import Landing from "./app/Components/Landing/landing";
import Login from "./app/Components/Login/login";
import Home from "./app/Components/Home/home";

const RootStack = createAnimatedSwitchNavigator(
  {
    landing: Landing,
    login: Login,
    home: Home
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    )
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
      Linking.getInitialURL()
        .then(url => {
          if (url) {
            console.log("Initial url is: " + url);
          }
        })
        .catch(err => console.error("An error occurred", err));
    }
    Linking.addEventListener("url", this.handleOpenURL);
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
    NavigationService.navigate(routeName, {
      accessToken: accessToken,
      timestamp: new Date().toLocaleString()
    });
  };
}
