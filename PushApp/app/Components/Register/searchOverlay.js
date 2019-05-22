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
import { Interest } from "./utils";

export default class SearchOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListOp: new Animated.Value(0),
      visible: false,
      height: new Animated.Value(0),
      width: new Animated.Value(0),
      borderRadius: new Animated.Value(hp("100%")),
      selectedInterests: [],
      interests: [
        {
          image: "https://picsum.photos/id/111/200/200",
          label: "Technology",
          id: 2,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/112/200/200",
          label: "Business",
          id: 3,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/311/200/200",
          label: "Artificial Intelligence",
          id: 4,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/411/200/200",
          label: "Marketing",
          id: 5,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/115/200/200",
          label: "Finance",
          id: 6,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/62/200/200",
          label: "Travel",
          id: 7,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/27/200/200",
          label: "Machine Learning",
          id: 8,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/84/200/200",
          label: "Data Structures",
          id: 9,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/84/200/200",
          label: "Data Structures",
          id: 10,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/84/200/200",
          label: "Data Structures",
          id: 11,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/84/200/200",
          label: "Data Structures",
          id: 12,
          opacity: new Animated.Value(0)
        },
        {
          image: "https://picsum.photos/id/84/200/200",
          label: "Data Structures",
          id: 13,
          opacity: new Animated.Value(0)
        }
      ]
    };
  }
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
    setTimeout(() => {
      try {
        this.search.focus();
      } catch {}
      Animated.timing(this.state.flatListOp, {
        toValue: 1
      }).start();
    }, 600);
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

            <SafeAreaView
              style={[styles.SAV, { zIndex: 2, backgroundColor: "red" }]}
            >
              {this.props.render ? (
                <TextInput
                  ref={input => {
                    this.search = input;
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
                    right: 85,
                    backGroundColor: "red",
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    zIndex: 2
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
                    style={{ height: hp("90%") }}
                  >
                    <FlatList
                      keyboardShouldPersistTaps="handled"
                      keyboardDismissMode="on-drag"
                      numColumns={3}
                      contentContainerStyle={[styles.InterestsFlex]}
                      data={this.state.interests}
                      renderItem={({ item, index }) => (
                        <Interest
                          image={item.image}
                          label={item.label}
                          select={() => {
                            this.selectInterest(item, index);
                          }}
                          unselect={() => {
                            this.unselectInterest(item, index);
                          }}
                          opacity={item.opacity}
                        />
                      )}
                    />
                  </ScrollView>
                </Animated.View>
              ) : null}
            </SafeAreaView>
          </React.Fragment>
        ) : (
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
                  <ScrollView>
                    <FlatList
                      numColumns={3}
                      contentContainerStyle={styles.InterestsFlex}
                      data={this.state.interests}
                      renderItem={({ item, index }) => (
                        <Interest
                          image={item.image}
                          label={item.label}
                          select={() => {
                            this.selectInterest(item, index);
                          }}
                          unselect={() => {
                            this.unselectInterest(item, index);
                          }}
                          opacity={item.opacity}
                        />
                      )}
                    />
                  </ScrollView>
                </Animated.View>
              ) : null}
            </SafeAreaView>
          </Animated.View>
        )}
      </React.Fragment>
    );
  }
  unselectInterest = (item, index = null) => {
    var interests = [...this.state.interests];
    interests[index].opacity.setValue(0);
    this.props.unselect(item, interests[index].id);
  };
  selectInterest = (item, index) => {
    var interests = [...this.state.interests];
    interests[index].opacity.setValue(1);
    this.props.select(item, interests[index].id);
  };
}
