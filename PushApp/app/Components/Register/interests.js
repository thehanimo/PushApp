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
  Platform
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
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
    console.disableYellowBox = true;
    super(props);
    this.getProfile();
    this.state = {
      Icon: [new Animated.Value(35), new Animated.Value(0)],
      searchBar: {
        width: new Animated.Value(50),
        borderRadius: new Animated.Value(25),
        backgroundColor: new Animated.Value(150)
      },
      ContinueButBottom: new Animated.Value(0),
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
  getProfile = async () => {
    let profile = null;
    try {
      profile = (await AsyncStorage.getItem("profile")) || null;
      profile = JSON.parse(profile);
      this.setState({
        profile: { ...profile, image: { uri: profile.image } }
      });
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
      this.state.selectedInterests[index].dim.height.setValue(120);
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
    console.log(this.state.selectedInterests);
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
        toValue: 60
      }),
      Animated.timing(this.state.Icon[1], {
        toValue: 95
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
        toValue: 35
      }),
      Animated.timing(this.state.Icon[1], {
        toValue: 0
      })
    ]).start();
  };
  pushDownContinueButton = () => {
    Animated.timing(this.state.ContinueButBottom, {
      toValue: -100,
      delay: 50
    }).start();
  };
  pushUpContinueButton = () => {
    Animated.timing(this.state.ContinueButBottom, {
      toValue: 0,
      delay: 100
    }).start();
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
        <Content>
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
                <Animated.Text style={{ height: this.state.Icon[0] }}>
                  <Icon
                    type="EvilIcons"
                    name="search"
                    style={styles.SearchIcon}
                  />
                </Animated.Text>
                <Animated.Text style={{ height: this.state.Icon[1] }}>
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
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
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
        </Content>
        <Animated.View style={{ bottom: this.state.ContinueButBottom }}>
          <TouchableOpacity
            disabled={this.state.transitioning}
            style={[styles.ContinueButton]}
            onPress={() => this.Continue()}
          >
            <Text style={styles.ContinueButtonLabel} allowFontScaling={false}>
              Continue
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Container>
    );
  }
  remove = () => {
    this.setState({ loading: false });
  };
}
