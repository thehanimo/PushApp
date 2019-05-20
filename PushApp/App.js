import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import {
  Platform,
  Linking,
  View,
  ActivityIndicator,
  StatusBar,
  Text
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import NavigationService from "./NavigationService";
import Landing from "./app/Components/Landing/landing";
import Login from "./app/Components/Login/login";
import Confirm from "./app/Components/Login/confirm";
import Home from "./app/Components/Home/home";
import Register from "./app/Components/Register/register";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.getUserId();
  }
  getUserId = async () => {
    let profile = null;
    try {
      profile = (await AsyncStorage.getItem("profile1")) || null;
      profile = JSON.parse(profile);
      if (profile) NavigationService.navigate("register", { profile });
      else NavigationService.navigate("landing");
    } catch (error) {
      // Error retrieving data
      alert(error.message);
    }
  };
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const RootStack = createAnimatedSwitchNavigator(
  {
    loading: Loading,
    landing: Landing,
    login: createStackNavigator(
      {
        login: Login,
        confirm: Confirm
      },
      {
        defaultNavigationOptions: {
          header: null
        }
      }
    ),

    registration: createStackNavigator(
      {
        register: Register
      },
      {
        defaultNavigationOptions: {
          header: null
        }
      }
    ),
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
