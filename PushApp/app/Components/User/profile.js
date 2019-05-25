import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Animated,
  Easing,
  ScrollView,
  FlatList,
  findNodeHandle
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import { BlurView } from "@react-native-community/blur";

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
import { SafeAreaView } from "react-navigation";
import SearchOverlay from "./searchOverlay";
import { MainCard, TrendsCard } from "./utils";
import Loader from "../Login/login";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.getProfile();
    this.state = {
      loading: true,
      viewRef: null,
      interests: [
        {
          image: "https://picsum.photos/id/113/200",
          label: `Data Structures`,
          id: 1
        },
        {
          image: "https://picsum.photos/id/341/200",
          label: "Machine Learning",
          id: 2
        },
        {
          image: "https://picsum.photos/id/432/200",
          label: "Robotics",
          id: 3
        },
        {
          image: "https://picsum.photos/id/231/200",
          label: "Finance",
          id: 4
        }
      ],
      expertise: [
        {
          label: `Web Development`,
          id: 1
        },
        {
          label: "Sales",
          id: 2
        },
        {
          label: "Business",
          id: 3
        },
        {
          label: "Entrepreneurship",
          id: 4
        }
      ]
    };
  }
  getProfile = async () => {
    let profile = null;
    try {
      profile = (await AsyncStorage.getItem("profile")) || null;
      interests = (await AsyncStorage.getItem("interests")) || null;
      profile = JSON.parse(profile);
      interests = JSON.parse(interests);
      this.setState({
        profile: profile,
        interests: interests,
        loading: false,
        viewRef: findNodeHandle(this.imageBg)
      });
    } catch (error) {
      // Error retrieving data
      alert(error.message);
    }
  };
  signOut = async () => {
    try {
      await AsyncStorage.removeItem("interests");
      await AsyncStorage.removeItem("profile");
      await AsyncStorage.removeItem("user");
      this.setState({ loading: false });
      NavigationService.navigate("landing");
    } catch (e) {
      // remove error
      alert.error(e);
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#f8f8f8" }}>
        <Content>
          <SafeAreaView style={styles.SAV}>
            {this.state.loading ? null : (
              <React.Fragment>
                <Image
                  ref={bg => {
                    this.imageBg = bg;
                  }}
                  source={{ uri: this.state.profile.image }}
                  style={{
                    height: wp("100%") / 2,
                    width: "100%",
                    position: "absolute",
                    resizeMode: "cover"
                  }}
                />
                <BlurView
                  viewRef={this.state.viewRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    height: wp("100%") / 2,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                  blurType="dark"
                  blurAmount={4}
                />

                <View style={{ position: "relative" }}>
                  <View
                    style={{
                      width: wp("100%"),
                      backgroundColor: "#fff",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      marginTop: wp("100%") / 3,
                      shadowColor: "rgba(0, 0, 0, 0.16)",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 10
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        textAlign: "center",
                        marginTop: 80,
                        color: "#2a3455",
                        fontFamily: "Poppins-Medium",
                        fontSize: 20,
                        marginLeft: 20,
                        marginRight: 20
                      }}
                    >
                      {this.state.profile.fullName}
                    </Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        textAlign: "center",
                        color: "#807d83",
                        fontFamily: "Poppins-Light",
                        fontSize: 14,
                        marginLeft: 20,
                        marginRight: 20
                      }}
                    >
                      {this.state.profile.email}
                    </Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        textAlign: "center",
                        color: "#2a3455",
                        fontFamily: "Poppins-Light",
                        margin: 20,
                        fontSize: 14
                      }}
                    >
                      A 22-year-old Indian Freelance Front-end developer, some
                      sort of a bridge that connects design and code.
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp("100%"),
                      backgroundColor: "#fff",
                      marginTop: 15
                    }}
                  >
                    <Text
                      style={{
                        color: "#2a3455",
                        fontFamily: "Poppins-Medium",
                        fontSize: 18,
                        margin: 20
                      }}
                    >
                      Interests
                    </Text>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      scrollEnabled={true}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{
                        marginBottom: 20
                      }}
                      data={this.state.interests}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 12
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 40
                            }}
                          />
                          <View
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 40,
                              position: "absolute",
                              backgroundColor: "rgba(134, 94, 208, 0.8)"
                            }}
                          />
                          <Text
                            style={{
                              alignSelf: "center",
                              position: "absolute",
                              fontFamily: "Poppins-Medium",
                              fontSize: 10,
                              color: "#fff",
                              margin: 3,
                              textAlign: "center"
                            }}
                          >
                            {item.label}
                          </Text>
                        </View>
                      )}
                    />
                    <View
                      style={{
                        borderBottomColor: "#efefef",
                        borderBottomWidth: 1,
                        width: wp("90%"),
                        alignSelf: "center"
                      }}
                    />
                    <Text
                      style={{
                        color: "#2a3455",
                        fontFamily: "Poppins-Medium",
                        fontSize: 18,
                        margin: 20
                      }}
                    >
                      Expertise
                    </Text>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal={true}
                      contentContainerStyle={{
                        marginBottom: 20
                      }}
                      data={this.state.expertise}
                      renderItem={({ item }) => (
                        <Text
                          style={{
                            alignSelf: "center",
                            fontFamily: "Poppins-Medium",
                            fontSize: 10,
                            color: "#865ed0",
                            margin: 5,
                            textAlign: "center",
                            borderColor: "#865ed0",
                            borderWidth: 1,
                            padding: 5
                          }}
                        >
                          {item.label}
                        </Text>
                      )}
                    />
                  </View>
                  <Image
                    source={{ uri: this.state.profile.image }}
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: 65,
                      alignSelf: "center",
                      position: "absolute",
                      top: wp("100%") / 6
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ loading: true });
                      this.signOut();
                    }}
                    style={{
                      position: "absolute",
                      right: 10,
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff"
                    }}
                  >
                    <Icon
                      type="MaterialIcons"
                      name="more-horiz"
                      style={{
                        position: "absolute",
                        right: 10,
                        color: "#fff"
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
          </SafeAreaView>
          {this.state.loading ? (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: hp("100%"),
                width: wp("100%"),
                backgroundColor: "#ffffff",
                opacity: 0.925,
                justifyContent: "center",
                alignItems: "center",
                elevation: 3
              }}
            >
              <View
                style={{
                  width: 138,
                  height: 138,
                  borderStyle: "solid",
                  borderColor: "#3d83d9",
                  borderWidth: 3,
                  borderRadius: 69
                }}
              />
              <Text>Logging out...</Text>
            </View>
          ) : null}
        </Content>
      </Container>
    );
  }
}
