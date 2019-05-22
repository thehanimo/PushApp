import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  ScrollView,
  Animated,
  FlatList,
  Platform,
  Dimensions,
  Easing
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Body,
  Thumbnail
} from "native-base";
import NavigationService from "../../../NavigationService";
import styles from "./styles";

export default class SearchOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(0),
      width: new Animated.Value(0),
      borderRadius: new Animated.Value(hp("100%"))
    };
  }
  appear = () => {
    Animated.parallel([
      Animated.timing(this.state.height, {
        toValue:
          Platform.OS == "ios" ? Dimensions.get("window").height : hp("100%"),
        duration: 600,
        easing: Easing.quad
      }),
      Animated.timing(this.state.width, {
        toValue: wp("100%"),
        duration: 400,
        easing: Easing.quad
      }),
      Animated.timing(this.state.borderRadius, {
        toValue: 0,
        duration: 300,
        delay: 100,
        easing: Easing.quad
      })
    ]).start();
    this.props.whileRender();
  };

  disappear = () => {
    Animated.parallel([
      Animated.timing(this.state.height, {
        toValue: 0,
        duration: 600
      }),
      Animated.timing(this.state.width, {
        toValue: 0,
        duration: 300,
        delay: 250
      }),
      Animated.timing(this.state.borderRadius, {
        toValue: hp("100%"),
        duration: 300,
        delay: 300
      })
    ]).start();
    this.props.whileUnRender();
  };

  render() {
    if (this.props.render) {
      this.appear();
    } else this.disappear();
    return (
      <Animated.View
        style={[
          styles.SearchOverlay,
          {
            height: this.state.height,
            width: this.state.width,
            borderRadius: this.state.borderRadius,
            borderTopRightRadius: 0
          }
        ]}
      />
    );
  }
}
