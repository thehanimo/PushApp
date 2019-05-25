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
  Easing,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ExtraDimensions from "react-native-extra-dimensions-android";

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
import { Interest } from "./utils";

export default class SearchOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      flatListOp: new Animated.Value(0),
      visible: false,
      height: new Animated.Value(0),
      width: new Animated.Value(0),
      borderRadius: new Animated.Value(hp("100%")),
      selectedInterests: [],
      interests: []
    };
    timer = null;
  }
  fetchData = async text => {
    if (this.timer) clearTimeout(this.timer);
    text = text.trimLeft();
    if (text) {
      this.timer = setTimeout(async () => {
        this.setState({ fetching: true });
        const response = await fetch(
          `http://192.168.0.103:3000/api/interests/${text}`
        );
        const json = await response.json();
        json.interests.forEach(element => {
          element.opacity = new Animated.Value(0);
        });
        this.state.flatListOp.setValue(0);
        this.setState({ fetching: false, interests: json.interests }, () => {
          this.checkSelected();
          Animated.timing(this.state.flatListOp, {
            toValue: 1,
            delay: 200
          }).start();
        });
      }, 500);
      alert(json.interests[0]);
    }
  };
  checkSelected = () => {
    var interests = [...this.state.interests];
    var selectedInterests = this.props.selectedInterests;

    for (let i = 0; i < selectedInterests.length; i++) {
      for (let j = 0; j < interests.length; j++) {
        if (selectedInterests[i].id == interests[j].id) {
          setTimeout(() => {
            interests[j].opacity.setValue(1);
          }, 10);
        }
      }
    }
  };
  resetSelected = () => {
    var interests = [...this.state.interests];
    for (let i = 0; i < interests.length; i++) {
      interests[i].opacity.setValue(0);
    }
  };
  appear = () => {
    Animated.parallel([
      Animated.timing(this.state.height, {
        toValue:
          Platform.OS == "ios"
            ? Dimensions.get("window").height
            : Dimensions.get("window").height -
              ExtraDimensions.getSoftMenuBarHeight() -
              ExtraDimensions.getStatusBarHeight(),
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
    setTimeout(() => {
      this.search.focus();
      Animated.timing(this.state.flatListOp, {
        toValue: 1
      }).start();
    }, 700);
    this.checkSelected();
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
    Animated.timing(this.state.flatListOp, {
      toValue: 0,
      duration: 200
    }).start();
    this.props.whileUnRender();
    setTimeout(() => {
      this.resetSelected();
      this.setState({ visible: false });
    }, 200);
  };

  render() {
    if (this.props.render && !this.state.visible) {
      this.setState({ visible: true }, this.appear);
    } else if (!this.props.render && this.state.visible) {
      this.props.beforeUnRender();
      setTimeout(() => {
        this.disappear();
      }, 200);
    }
    return (
      <React.Fragment>
        {Platform.OS == "ios" ? (
          //IOS ONLY!!

          <React.Fragment>
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

            <SafeAreaView style={[{ zIndex: 2, backgroundColor: "red" }]}>
              {this.props.render ? (
                <TextInput
                  ref={input => {
                    this.search = input;
                  }}
                  onChangeText={text => {
                    this.fetchData(text);
                  }}
                  style={{
                    height: 50,
                    width: wp("80%") - 60,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: hp("3%"),
                    right: 100,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    zIndex: 2
                  }}
                />
              ) : null}
              {this.state.fetching ? (
                <ActivityIndicator
                  style={{
                    position: "absolute",
                    top: hp("3%") + 15,
                    right: 85
                  }}
                />
              ) : null}
              {this.state.visible ? (
                <Animated.View
                  style={{
                    position: "absolute",
                    marginTop: hp("3%") + 100,
                    opacity: this.state.flatListOp
                  }}
                >
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    style={{
                      alignSelf: "center",
                      width: wp("100%"),
                      height: hp("70%")
                    }}
                  />
                </Animated.View>
              ) : null}
            </SafeAreaView>
          </React.Fragment>
        ) : (
          //ANDROID ONLY!!!

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
          >
            <SafeAreaView style={[styles.SAV, { zIndex: 2 }]}>
              {this.props.render ? (
                <TextInput
                  ref={input => {
                    this.search = input;
                  }}
                  onChangeText={text => {
                    this.fetchData(text);
                  }}
                  style={{
                    height: 50,
                    width: wp("80%") - 50,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: hp("3%"),
                    right: 88,
                    fontFamily: "Poppins-Regular",
                    fontSize: 16
                  }}
                />
              ) : null}
              {this.state.visible ? (
                <Animated.View
                  style={{
                    position: "absolute",
                    top: hp("3%") + 100,
                    opacity: this.state.flatListOp
                  }}
                >
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    style={{
                      alignSelf: "center",
                      width: wp("100%"),
                      height: hp("70%")
                    }}
                  />
                </Animated.View>
              ) : null}
            </SafeAreaView>
          </Animated.View>
        )}
      </React.Fragment>
    );
  }
}
