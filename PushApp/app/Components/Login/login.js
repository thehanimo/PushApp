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
      authenticated: false
    };
  }
  render() {
    var loader = null;
    if (
      this.props.navigation.getParam("accessToken", "") != "" &&
      this.state.authenticated == false
    ) {
      this.authenticate(this.props.navigation.getParam("accessToken", ""));
    }
    if (this.state.loading)
      loader = (
        <View style={styles.LoadingOverlay}>
          <View style={styles.Loader} />
        </View>
      );
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
          {loader}
        </Content>
      </Container>
    );
  }
  loginPress() {
    if (Platform.OS == "ios")
      Linking.openURL("http://hani.local:3000/auth/app/linkedin");
    else Linking.openURL("http://10.0.2.2:3000/auth/app/linkedin");
    this.setState({ loading: true });
  }
  authenticate(accessToken) {
    var domain = "10.0.2.2";
    if (Platform.OS == "ios") domain = "hani.local";
    return fetch(
      `http://${domain}:3000/auth/linkedin/callback/${accessToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loading: false, authenticated: true });
        NavigationService.navigate("home", {
          displayName: responseJson.displayName
        });
        return responseJson;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
