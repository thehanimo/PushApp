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
  SafeAreaView
} from "react-native";
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
  Body
} from "native-base";
import NavigationService from "../../../NavigationService";
import styles from "./styles";

type Props = {};
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authorisedToken: "",
      timestamp: ""
    };
    this.timer;
  }
  render() {
    var loader = null;
    if (
      (this.props.navigation.getParam("accessToken", "") !=
        this.state.authorisedToken ||
        this.state.timestamp !=
          this.props.navigation.getParam("timestamp", "")) &&
      this.state.loading &&
      this.props.navigation.getParam("accessToken", "") != "" //Remove to accept login callback after timeout and loading disappearance.
    ) {
      this.authenticate(this.props.navigation.getParam("accessToken", ""));
    }
    return (
      <Container>
        <Content>
          <SafeAreaView style={styles.SAV}>
            <Text style={styles.Heading} allowFontScaling={false}>
              Join Pushstart
            </Text>
            <Text style={styles.MainContent} allowFontScaling={false}>
              Join the amazing community of Entrepreneurs.
            </Text>
            <Image
              source={require("../../assets/images/login1.png")}
              style={styles.backgroundImage}
            />
            <TouchableOpacity
              style={styles.LoginButton}
              onPress={this.loginPress.bind(this)}
            >
              <Icon
                type="FontAwesome"
                name="linkedin"
                style={styles.LinkedInIcon}
              />
              <Text style={styles.LoginText} allowFontScaling={false}>
                Login with Linkedin
              </Text>
            </TouchableOpacity>
            <View style={styles.BottomWrapper}>
              <Text style={styles.BottomText} allowFontScaling={false}>
                By signing up you agree to our{" "}
                <Text style={{ fontWeight: "bold" }}>Terms of Use</Text> and{" "}
                <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>
              </Text>
            </View>
          </SafeAreaView>
          {this.state.loading ? <Loader /> : null}
        </Content>
      </Container>
    );
  }
  loginPress() {
    this.setState({
      loading: true,
      authorisedToken: this.props.navigation.getParam("accessToken", ""),
      timestamp: this.props.navigation.getParam("timestamp", "")
    });
    this.timer = setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 30000);
    Linking.openURL("http://192.168.0.103:3000/auth/app/linkedin");
  }
  authenticate(accessToken) {
    clearTimeout(this.timer);
    fetch(`http://192.168.0.103:3000/auth/linkedin/callback/${accessToken}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          this.setState(
            {
              loading: false,
              authorisedToken: this.props.navigation.getParam(
                "accessToken",
                ""
              ),
              timestamp: this.props.navigation.getParam("timestamp", "")
            },
            () => {
              this.props.navigation.navigate("confirm", {
                profile: responseJson
              });
            }
          );
        }
      })
      .catch(error => {
        this.setState(
          {
            loading: false,
            authorisedToken: this.props.navigation.getParam("accessToken", ""),
            timestamp: this.props.navigation.getParam("timestamp", "")
          },
          () => {
            alert("Login Failed.");
          }
        );
      });
  }
}

export class Loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
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
      </View>
    );
  }
}
