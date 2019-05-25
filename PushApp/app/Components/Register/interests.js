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
  Easing,
  ActivityIndicator,
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
import SearchOverlay from "./searchOverlay";
import { Interest, SelectedInterest } from "./utils";

type Props = {};
export default class Interests extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
      errorOverlay: false,
      errorOverlayOpacity: new Animated.Value(0),
      errorDialogOpacity: new Animated.Value(0),
      fetching: false,
      Icon: [new Animated.Value(1), new Animated.Value(0)],
      searchBar: {
        width: new Animated.Value(50),
        borderRadius: new Animated.Value(25),
        backgroundColor: new Animated.Value(150)
      },
      ContinueButBottom: new Animated.Value(0),
      ContinueButOpacity: new Animated.Value(1),
      searchOverlay: false,
      transitioning: false,
      profile: {
        image: { uri: null },
        id: null,
        fullName: null,
        email: null,
        phone: null,
        city: null,
        referral: null
      },
      selectedInterests: [],
      interests: []
    };
  }

  componentDidMount() {
    this.fetchData();
    this.setState({ viewRef: findNodeHandle(this.mainBackground) });
  }
  fetchData = async () => {
    this.setState({ fetching: true });
    const response = await fetch(
      `http://192.168.0.103:3000/api/interests/top/9`
    );
    const json = await response.json();
    json.interests.forEach(element => {
      element.opacity = new Animated.Value(0);
    });
    this.setState({ fetching: false, interests: json.interests });
  };

  saveInterests = async (interests, callback) => {
    try {
      await AsyncStorage.setItem("interests", JSON.stringify(interests));
      callback();
    } catch (error) {
      // Error retrieving data
      alert(error.message);
    }
  };

  removeSelectedInterest = index => {
    var selectedInterests = [...this.state.selectedInterests];
    var interests = [...this.state.interests];
    for (let i = 0; i < interests.length; i++) {
      if (interests[i].id == selectedInterests[index].id) {
        Animated.timing(interests[i].opacity, {
          toValue: 0,
          duration: 400
        }).start();
        break;
      }
    }
    this.disappear(this.state.selectedInterests[index]);
    setTimeout(() => {
      selectedInterests.splice(index, 1);
      this.state.selectedInterests[index].dim.opacity.setValue(1);
      this.state.selectedInterests[index].dim.width.setValue(95);
      this.state.selectedInterests[index].dim.height.setValue(220);
      this.setState({ selectedInterests: selectedInterests });
    }, 400);
  };
  unselectInterest = (item, index = null, id = null) => {
    var sIndex;
    var selectedInterests = [...this.state.selectedInterests];
    for (let i = 0; i < selectedInterests.length; i++) {
      if (selectedInterests[i].id == item.id) {
        sIndex = i;
        break;
      }
    }
    var interests = [...this.state.interests];
    if (index || index === 0) {
      interests[index].opacity.setValue(0);
    } else {
      for (let i = 0; i < interests.length; i++) {
        if (interests[i].id == id) interests[i].opacity.setValue(0);
      }
    }
    this.disappear(this.state.selectedInterests[sIndex]);
    setTimeout(() => {
      selectedInterests.splice(sIndex, 1);
      this.state.selectedInterests[sIndex].dim.opacity.setValue(1);
      this.state.selectedInterests[sIndex].dim.width.setValue(95);
      this.state.selectedInterests[sIndex].dim.height.setValue(220);
      this.setState({
        selectedInterests: selectedInterests,
        interests: interests
      });
    }, 400);
  };
  selectInterest = (item, index = null, id = null) => {
    item.dim = {
      width: new Animated.Value(0),
      height: new Animated.Value(0),
      opacity: new Animated.Value(0)
    };
    var array = [...this.state.selectedInterests];
    array.unshift(item);
    var interests = [...this.state.interests];
    if (index || index === 0) {
      interests[index].opacity.setValue(1);
    } else {
      for (let i = 0; i < interests.length; i++) {
        if (interests[i].id == id) interests[i].opacity.setValue(1);
      }
    }
    this.setState({ selectedInterests: array, interests: interests }, () => {
      this.appear(item);
    });
  };
  appear = item => {
    this.setState({ transitioning: true });
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(item.dim.width, {
          toValue: 95,
          duration: 250
        }),
        Animated.timing(item.dim.height, {
          toValue: 220,
          duration: 250
        })
      ]),
      Animated.timing(item.dim.opacity, {
        toValue: 1,
        duration: 250
      })
    ]).start();
    setTimeout(() => {
      this.setState({ transitioning: false });
    }, 400);
  };

  disappear = item => {
    this.setState({ transitioning: true });
    Animated.stagger(150, [
      Animated.timing(item.dim.opacity, {
        toValue: 0,
        duration: 250
      }),
      Animated.parallel([
        Animated.timing(item.dim.width, {
          toValue: 0,
          duration: 250
        }),
        Animated.timing(item.dim.height, {
          toValue: 0,
          duration: 250
        })
      ])
    ]).start();
    setTimeout(() => {
      this.setState({ transitioning: false });
    }, 400);
  };
  Continue = () => {
    this.saveInterests(this.state.selectedInterests, () => {
      NavigationService.navigate("home");
    });
  };
  expandSearchBar = () => {
    Animated.parallel([
      Animated.timing(this.state.searchBar.width, {
        toValue: wp("80%")
      }),
      Animated.timing(this.state.searchBar.borderRadius, {
        toValue: 10
      }),
      Animated.timing(this.state.searchBar.backgroundColor, {
        toValue: 0
      }),
      Animated.timing(this.state.Icon[0], {
        toValue: 0,
        duration: 250,
        easing: Easing.quad
      }),
      Animated.timing(this.state.Icon[1], {
        toValue: 1,
        duration: 250,
        delay: 200,
        easing: Easing.quad
      })
    ]).start();
  };
  hideSearchBar = () => {
    Animated.parallel([
      Animated.timing(this.state.searchBar.width, {
        toValue: 50
      }),
      Animated.timing(this.state.searchBar.borderRadius, {
        toValue: 25
      }),
      Animated.timing(this.state.searchBar.backgroundColor, {
        toValue: 150
      }),
      Animated.timing(this.state.Icon[0], {
        toValue: 1,
        duration: 250,
        delay: 200,
        easing: Easing.quad
      }),
      Animated.timing(this.state.Icon[1], {
        toValue: 0,
        duration: 250,
        easing: Easing.quad
      })
    ]).start();
  };
  pushDownContinueButton = () => {
    Animated.parallel([
      Animated.timing(this.state.ContinueButBottom, {
        toValue: -100,
        delay: 50
      }),
      Animated.timing(this.state.ContinueButOpacity, {
        toValue: 0,
        delay: 50
      })
    ]).start();
  };
  pushUpContinueButton = () => {
    Animated.parallel([
      Animated.timing(this.state.ContinueButBottom, {
        toValue: 0,
        delay: 100
      }),
      Animated.timing(this.state.ContinueButOpacity, {
        toValue: 1,
        delay: 100
      })
    ]).start();
  };

  closeErrorOverlay = () => {
    Animated.stagger(100, [
      Animated.timing(this.state.errorDialogOpacity, {
        toValue: 0,
        duration: 250
      }),
      Animated.timing(this.state.errorOverlayOpacity, {
        toValue: 0,
        duration: 250
      })
    ]).start();
    setTimeout(() => {
      this.setState({ errorOverlay: false });
    }, 500);
  };
  openErrorOverlay = () => {
    this.setState({ errorOverlay: true }, () => {
      Animated.stagger(250, [
        Animated.timing(this.state.errorOverlayOpacity, {
          toValue: 1
        }),
        Animated.timing(this.state.errorDialogOpacity, {
          toValue: 1,
          duration: 250
        })
      ]).start();
    });
  };
  render() {
    const interpolateSearchBarColor = this.state.searchBar.backgroundColor.interpolate(
      {
        inputRange: [0, 150],
        outputRange: ["rgba(134, 94, 208, 0.1)", "#865ed0"]
      }
    );
    return (
      <Container>
        <Content
          ref={bg => {
            this.mainBackground = bg;
          }}
        >
          <SafeAreaView style={styles.SAV}>
            <SearchOverlay
              render={this.state.searchOverlay}
              selectedInterests={this.state.selectedInterests}
              whileRender={() => {
                this.pushDownContinueButton();
                setTimeout(() => {
                  this.expandSearchBar();
                }, 200);
              }}
              beforeUnRender={() => {
                this.hideSearchBar();
              }}
              whileUnRender={() => {
                this.pushUpContinueButton();
              }}
              select={(item, id) => {
                if (!this.state.transitioning)
                  this.selectInterest(item, null, id);
              }}
              unselect={(item, id) => {
                if (!this.state.transitioning)
                  this.unselectInterest(item, null, id);
              }}
            />
            <View
              style={{
                zIndex: 1,
                position: Platform.OS == "ios" ? "relative" : "absolute",
                height: Platform.OS == "ios" ? null : 100,
                width: Platform.OS == "ios" ? null : 100,
                right: 0
              }}
            >
              <TouchableOpacity
                activeOpacity={Platform.OS == "ios" ? 0.2 : 1}
                style={[styles.SearchTab]}
                onPress={() => {
                  if (!this.state.transitioning) {
                    if (this.state.searchOverlay) {
                      this.setState({
                        searchOverlay: false,
                        transitioning: true
                      });
                    } else
                      this.setState({
                        searchOverlay: true,
                        transitioning: true
                      });
                    setTimeout(() => {
                      this.setState({ transitioning: false });
                    }, 800);
                  }
                }}
              >
                <Animated.View
                  style={[
                    styles.SearchBar,
                    {
                      width: this.state.searchBar.width,
                      borderRadius: this.state.searchBar.borderRadius,
                      backgroundColor: interpolateSearchBarColor
                    }
                  ]}
                />
                <Animated.Text
                  allowFontScaling={false}
                  style={{ opacity: this.state.Icon[0] }}
                >
                  <Icon
                    type="EvilIcons"
                    name="search"
                    style={styles.SearchIcon}
                  />
                </Animated.Text>
                <Animated.Text
                  allowFontScaling={false}
                  style={{ opacity: this.state.Icon[1], position: "absolute" }}
                >
                  <Icon
                    type="EvilIcons"
                    name="close"
                    style={styles.SearchIcon}
                  />
                </Animated.Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.Header} allowFontScaling={false}>
                Choose Your Interests
              </Text>
              <Text style={styles.SubHeader} allowFontScaling={false}>
                Select a minimum of 5 Interests
              </Text>
              {this.state.fetching ? <ActivityIndicator /> : null}
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                horizontal={true}
                contentContainerStyle={styles.SelectedInterestsFlex}
                data={this.state.selectedInterests}
                renderItem={({ item, index }) => (
                  <SelectedInterest
                    image={item.image}
                    label={item.label}
                    dim={item.dim}
                    remove={() => {
                      if (!this.state.transitioning)
                        this.removeSelectedInterest(index);
                    }}
                    setTransitioning={inp =>
                      this.setState({ transitioning: inp })
                    }
                  />
                )}
              />
            </ScrollView>

            <ScrollView>
              <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.InterestsFlex}
                data={this.state.interests}
                renderItem={({ item, index }) => (
                  <Interest
                    image={item.image}
                    label={item.label}
                    select={() => {
                      if (!this.state.transitioning)
                        this.selectInterest(item, index);
                    }}
                    unselect={() => {
                      if (!this.state.transitioning)
                        this.unselectInterest(item, index);
                    }}
                    opacity={item.opacity}
                  />
                )}
              />
            </ScrollView>
          </SafeAreaView>
          <Animated.View
            style={{
              bottom: this.state.ContinueButBottom,
              opacity: this.state.ContinueButOpacity
            }}
          >
            <TouchableOpacity
              disabled={this.state.transitioning}
              style={[styles.ContinueButton]}
              onPress={() => {
                if (!this.state.transitioning) {
                  if (this.state.selectedInterests.length > 4) {
                    this.Continue();
                  } else this.openErrorOverlay();
                }
              }}
            >
              <Text style={styles.ContinueButtonLabel} allowFontScaling={false}>
                Continue
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Content>
        {this.state.errorOverlay ? (
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              opacity: this.state.errorOverlayOpacity
            }}
          >
            <BlurView
              viewRef={this.state.viewRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center"
              }}
              blurType="dark"
              blurAmount={5}
            />
            <Animated.View
              style={{
                height: 200,
                width: 300,
                position: "absolute",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                top: hp("50%") - 100,
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 12,
                elevation: 2,
                opacity: this.state.errorDialogOpacity
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Poppins-Light",
                  fontSize: 16,
                  color: "#807d83",
                  textAlign: "center",
                  width: 210
                }}
              >
                Please select a minimum of 5 Interests
              </Text>
              <TouchableOpacity
                onPress={this.closeErrorOverlay}
                style={{
                  marginTop: 20,
                  width: 150,
                  height: 45,
                  backgroundColor: "#865ed0",
                  justifyContent: "center",
                  borderRadius: 8,
                  shadowColor: "rgba(134, 94, 208, 1)",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.ContinueButtonLabel,
                    { fontSize: 16, alignSelf: "center" }
                  ]}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        ) : null}
      </Container>
    );
  }
  remove = () => {
    this.setState({ loading: false });
  };
}
