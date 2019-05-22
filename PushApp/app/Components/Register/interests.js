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
  FlatList
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

type Props = {};
export default class Interests extends Component<Props> {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.getProfile();
    this.state = {
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
  unselectInterest = (item, index) => {
    var sIndex;
    var selectedInterests = [...this.state.selectedInterests];
    for (let i = 0; i < selectedInterests.length; i++) {
      if (selectedInterests[i].id == item.id) {
        sIndex = i;
        break;
      }
    }
    var interests = [...this.state.interests];
    interests[index].opacity.setValue(0);
    this.disappear(this.state.selectedInterests[sIndex]);
    setTimeout(() => {
      selectedInterests.splice(sIndex, 1);
      this.state.selectedInterests[sIndex].dim.opacity.setValue(1);
      this.state.selectedInterests[sIndex].dim.width.setValue(95);
      this.state.selectedInterests[sIndex].dim.height.setValue(120);
      this.setState({
        selectedInterests: selectedInterests,
        interests: interests
      });
    }, 400);
  };
  selectInterest = (item, index) => {
    item.dim = {
      width: new Animated.Value(0),
      height: new Animated.Value(0),
      opacity: new Animated.Value(0)
    };
    var array = [...this.state.selectedInterests];
    array.unshift(item);
    var interests = [...this.state.interests];
    interests[index].opacity.setValue(1);
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
          toValue: 120,
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
    return (
      <Container>
        <Content>
          <SafeAreaView style={styles.SAV}>
            <SearchOverlay
              render={this.state.searchOverlay}
              whileRender={this.pushDownContinueButton}
              whileUnRender={this.pushUpContinueButton}
            />
            <View style={{ zIndex: 1 }}>
              <TouchableOpacity
                style={styles.SearchTab}
                onPress={() => {
                  if (this.state.searchOverlay) {
                    this.setState({ searchOverlay: false });
                  } else this.setState({ searchOverlay: true });
                }}
              >
                <Icon
                  type="EvilIcons"
                  name="search"
                  style={styles.SearchIcon}
                />
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
            // onPress={() => this.Continue()}
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

class SelectedInterest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Animated.View
        style={{
          position: "relative",
          width: this.props.dim.width,
          height: this.props.dim.height,
          opacity: this.props.dim.opacity
        }}
      >
        <View style={styles.SelectedInterest}>
          <Image
            source={{ uri: this.props.image }}
            style={styles.SelectedInterestImage}
          />
        </View>
        <Animated.Text
          style={styles.SelectedInterestLabel}
          allowFontScaling={false}
          numberOfLines={2}
        >
          {this.props.label}
        </Animated.Text>
        <TouchableOpacity
          style={styles.RemoveIconButton}
          onPress={() => {
            this.props.remove();
          }}
        >
          <Icon type="EvilIcons" name="close" style={styles.RemoveIcon} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

class Interest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false
    };
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.Interest}
          onPress={() => {
            if (this.props.opacity.__getValue() == 1) {
              this.props.unselect();
            } else {
              this.props.select();
            }
          }}
        >
          <Image
            source={{ uri: this.props.image }}
            style={styles.InterestImage}
          />
          <Animated.View
            style={[styles.InterestOverlay, { opacity: this.props.opacity }]}
          >
            <Icon
              type="MaterialIcons"
              name="done"
              style={{
                position: "absolute",
                alignSelf: "center",
                color: "#fff"
              }}
              allowFontScaling={false}
            />
          </Animated.View>
        </TouchableOpacity>
        <Text
          style={styles.InterestLabel}
          numberOfLines={2}
          allowFontScaling={false}
        >
          {this.props.label}
        </Text>
      </View>
    );
  }
}
