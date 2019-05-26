import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  MaterialTopTabBar
} from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import {
  Platform,
  Linking,
  View,
  ActivityIndicator,
  StatusBar,
  Text,
  SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import NavigationService from "./NavigationService";
import Landing from "./app/Components/Landing/landing";
import Login from "./app/Components/Login/login";
import Confirm from "./app/Components/Login/confirm";
import Home from "./app/Components/User/home";
import Register from "./app/Components/Register/register";
import Interests from "./app/Components/Register/interests";
import { Icon } from "native-base";
import Archive from "./app/Components/User/archive";
import Profile from "./app/Components/User/profile";

class Loading extends Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.getUserId();
  }
  getUserId = async () => {
    let profile = null;
    let interests = null;
    let user = null;
    try {
      user = (await AsyncStorage.getItem("user")) || null;
      profile = (await AsyncStorage.getItem("profile")) || null;
      interests = (await AsyncStorage.getItem("interests")) || null;
      if (interests && profile) {
        NavigationService.navigate("home");
      } else if (profile || user) NavigationService.navigate("register");
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
    AuthStack: createStackNavigator(
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

    RegistrationStack: createStackNavigator(
      {
        register: Register,
        interests: Interests
      },
      {
        defaultNavigationOptions: {
          header: null
        }
      }
    ),

    UserStack: createMaterialTopTabNavigator(
      {
        home: {
          screen: Home,
          navigationOptions: {
            tabBarLabel: ({ tintColor }) => (
              <Text style={{ fontSize: 12, color: tintColor }}>Home</Text>
            ),
            tabBarIcon: ({ tintColor }) => (
              <Icon
                type="FontAwesome"
                name="home"
                style={{ color: tintColor, alignSelf: "center", fontSize: 20 }}
              />
            )
          }
        },
        archive: {
          screen: Archive,
          navigationOptions: {
            tabBarLabel: ({ tintColor }) => (
              <Text style={{ fontSize: 12, color: tintColor }}>Archive</Text>
            ),
            tabBarIcon: ({ tintColor }) => (
              <Icon
                type="FontAwesome"
                name="inbox"
                style={{ color: tintColor, alignSelf: "center", fontSize: 20 }}
              />
            )
          }
        },
        profile: {
          screen: Profile,
          navigationOptions: {
            tabBarLabel: ({ tintColor }) => (
              <Text style={{ fontSize: 12, color: tintColor }}>Profile</Text>
            ),
            tabBarIcon: ({ tintColor }) => (
              <Icon
                type="FontAwesome"
                name="user"
                style={{ color: tintColor, alignSelf: "center", fontSize: 20 }}
              />
            )
          }
        }
      },
      {
        swipeEnabled: false,
        animationEnabled: false,
        allowFontScaling: false,
        tabBarComponent: SafeAreaMaterialTopTabBar,
        tabBarPosition: "bottom",
        tabBarOptions: {
          showIcon: true,
          activeTintColor: "#865ed0",
          inactiveTintColor: "#2b3556",
          style: {
            backgroundColor: "#fff",
            shadowColor: "rgba(0, 0, 0, 0.08)",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 1,
            shadowRadius: 2
          },
          indicatorStyle: {
            opacity: 0
          }
        }
      }
    )
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
function SafeAreaMaterialTopTabBar(props) {
  return (
    <SafeAreaView
      style={{
        zIndex: -1
      }}
    >
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
}
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
