import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
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
import styles from "./styles";

type Props = {};
export default class Landing extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Content>
          <SafeAreaView style={styles.SAV}>
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
            <TouchableOpacity
              style={styles.MainButton}
              onPress={() => this.props.navigation.navigate("login")}
            >
              <Icon
                type="MaterialIcons"
                name="done"
                style={styles.MainButtonIcon}
              />
            </TouchableOpacity>
            <View style={styles.NavButtons}>
              <TouchableOpacity
                style={styles.NavButtonWrapper}
                onPress={() => this.props.navigation.navigate("Landing1")}
              >
                <View style={styles.NavButton} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.NavButtonWrapper}
                onPress={() => this.props.navigation.navigate("Landing2")}
              >
                <View style={styles.NavButton} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.NavButton, styles.ActiveNavButton]}
              />
            </View>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}
