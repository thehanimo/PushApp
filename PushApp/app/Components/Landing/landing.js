import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated
} from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Body
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import styles from "./styles";
import NavigationService from "../../../NavigationService";

type Props = {};
export default class Landing extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      x: [
        new Animated.Value(wp("100%")),
        new Animated.Value(wp("100%")),
        new Animated.Value(wp("100%"))
      ],
      op: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
      ActiveNavButtonWidth: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
      ],
      IconOp: [new Animated.Value(1), new Animated.Value(0)],
      IconH: [new Animated.Value(30), new Animated.Value(60)],
      currentPage: 0
    };
  }
  show = (x, op, navB, dur = 500) => {
    Animated.parallel([
      Animated.timing(x, {
        toValue: 0,
        duration: dur
      }),
      Animated.timing(op, {
        toValue: 1,
        duration: dur
      }),
      Animated.timing(navB, {
        toValue: 25,
        duration: dur
      })
    ]).start();
  };
  ToggleIcon = ind => {
    Animated.parallel([
      Animated.timing(this.state.IconOp[ind], {
        toValue: 0
      }),
      Animated.timing(this.state.IconH[ind], {
        toValue: 60
      }),
      Animated.timing(this.state.IconOp[-1 * (ind - 1)], {
        toValue: 1
      }),
      Animated.timing(this.state.IconH[-1 * (ind - 1)], {
        toValue: 30
      })
    ]).start();
  };
  hide = (x, op, navB, i, dur = 500) => {
    Animated.parallel([
      Animated.timing(x, {
        toValue: wp(`${-100 * i}%`),
        duration: dur
      }),
      Animated.timing(op, {
        toValue: 0,
        duration: dur
      }),
      Animated.timing(navB, {
        toValue: 0,
        duration: dur
      })
    ]).start();
  };

  MoveTwo = i => {};

  Move = (i, dur = 500) => {
    if (this.state.currentPage == 2 && i > 0) {
      NavigationService.navigate("login");
    } else if ((this.state.currentPage == 0 && i < 0) || i == 0) {
      return;
    } else {
      this.hide(
        this.state.x[this.state.currentPage],
        this.state.op[this.state.currentPage],
        this.state.ActiveNavButtonWidth[this.state.currentPage],
        i,
        dur
      );
      this.state.x[this.state.currentPage + i].setValue(wp(`${100 * i}%`));
      this.show(
        this.state.x[this.state.currentPage + i],
        this.state.op[this.state.currentPage + i],
        this.state.ActiveNavButtonWidth[this.state.currentPage + i],
        dur
      );
      if (this.state.currentPage == 1 && i > 0) {
        this.ToggleIcon(0);
      } else if (this.state.currentPage == 2 && i == -1) {
        this.ToggleIcon(1);
      }
      this.setState((prevState, props) => ({
        currentPage: prevState.currentPage + 1 * i
      }));
    }
  };

  NavMove = i => {
    if (this.state.currentPage == 0 && i > 1) {
      this.Move(1, 250);
      setTimeout(() => {
        this.Move(1, 250);
      }, 250);
    } else if (this.state.currentPage == 2 && i < -1) {
      this.Move(-1, 250);
      setTimeout(() => {
        this.Move(-1, 250);
      }, 250);
    } else {
      this.Move(i);
    }
  };

  componentDidMount() {
    this.show(
      this.state.x[this.state.currentPage],
      this.state.op[this.state.currentPage],
      this.state.ActiveNavButtonWidth[this.state.currentPage]
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <SafeAreaView style={styles.SAV}>
            {/* Screen 1 */}
            <View style={{ position: "relative" }}>
              <Animated.View
                style={{
                  position: "absolute",
                  opacity: this.state.op[0],
                  transform: [
                    {
                      translateX: this.state.x[0]
                    }
                  ]
                }}
              >
                <Image
                  source={require("../../assets/images/landing1.png")}
                  style={styles.backgroundImage}
                />
                <Text style={styles.Heading} allowFontScaling={false}>
                  Hello Pushstarter
                </Text>
                <Text style={styles.MainContent} allowFontScaling={false}>
                  Welcome to India’s most active community for Entrepreneur’s
                </Text>
              </Animated.View>

              {/* Screen 2 */}

              <Animated.View
                style={{
                  position: "absolute",
                  zIndex: 3,
                  opacity: this.state.op[1],
                  transform: [
                    {
                      translateX: this.state.x[1]
                    }
                  ]
                }}
              >
                <Image
                  source={require("../../assets/images/landing2.png")}
                  style={styles.backgroundImage}
                />
                <Text style={styles.Heading} allowFontScaling={false}>
                  Get Relevent Content
                </Text>
                <Text style={styles.MainContent} allowFontScaling={false}>
                  Get notified about relevant content from Pushstart anytime,
                  anywhere
                </Text>
              </Animated.View>

              {/* Screen 3 */}

              <Animated.View
                style={{
                  position: "absolute",
                  opacity: this.state.op[2],
                  transform: [
                    {
                      translateX: this.state.x[2]
                    }
                  ]
                }}
              >
                <Image
                  source={require("../../assets/images/landing3.png")}
                  style={styles.backgroundImage3}
                />
                <Text style={styles.Heading} allowFontScaling={false}>
                  Archive Access
                </Text>
                <Text style={styles.MainContent} allowFontScaling={false}>
                  Access Relevent content from our Archive anytime, anywhere
                </Text>
              </Animated.View>
            </View>
            <TouchableOpacity
              style={styles.MainButton}
              onPress={() => this.Move(1)}
            >
              <Animated.Text
                style={{
                  height: this.state.IconH[0],
                  opacity: this.state.IconOp[0],
                  position: "absolute",
                  alignSelf: "center"
                }}
                allowFontScaling={false}
              >
                <Icon
                  type="MaterialIcons"
                  name="chevron-right"
                  style={styles.MainButtonIcon}
                />
              </Animated.Text>
              <Animated.Text
                style={{
                  height: this.state.IconH[1],
                  opacity: this.state.IconOp[1],
                  position: "absolute",
                  alignSelf: "center"
                }}
                allowFontScaling={false}
              >
                <Icon
                  type="MaterialIcons"
                  name="done"
                  style={styles.MainButtonIcon}
                />
              </Animated.Text>
            </TouchableOpacity>
            <View style={styles.NavButtons}>
              <View style={styles.NavButtonWrapper}>
                <View style={styles.NavButton}>
                  <Animated.View
                    style={{
                      width: this.state.ActiveNavButtonWidth[0],
                      alignSelf: "center"
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.NavButton,
                        styles.ActiveNavButton,
                        { width: "100%" }
                      ]}
                    />
                  </Animated.View>
                </View>
                <TouchableOpacity
                  style={[
                    { position: "absolute", height: "100%", width: "100%" }
                  ]}
                  onPress={() => this.NavMove(-this.state.currentPage)}
                />
              </View>
              <View style={styles.NavButtonWrapper}>
                <View style={styles.NavButton}>
                  <Animated.View
                    style={{
                      width: this.state.ActiveNavButtonWidth[1],
                      alignSelf: "center"
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.NavButton,
                        styles.ActiveNavButton,
                        { width: "100%" }
                      ]}
                    />
                  </Animated.View>
                </View>
                <TouchableOpacity
                  style={[
                    { position: "absolute", height: "100%", width: "100%" }
                  ]}
                  onPress={() => this.NavMove(1 - this.state.currentPage)}
                />
              </View>
              <View style={styles.NavButtonWrapper}>
                <View style={styles.NavButton}>
                  <Animated.View
                    style={{
                      width: this.state.ActiveNavButtonWidth[2],
                      alignSelf: "center"
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.NavButton,
                        styles.ActiveNavButton,
                        { width: "100%" }
                      ]}
                    />
                  </Animated.View>
                </View>
                <TouchableOpacity
                  style={[
                    { position: "absolute", height: "100%", width: "100%" }
                  ]}
                  onPress={() => this.NavMove(2 - this.state.currentPage)}
                />
              </View>
            </View>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}
