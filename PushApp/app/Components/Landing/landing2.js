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
export default class Landing2 extends Component<Props> {
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
            <TouchableOpacity
              style={styles.MainButton}
              onPress={() => this.props.navigation.navigate("Landing3")}
            >
              <Icon
                type="MaterialIcons"
                name="chevron-right"
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
                style={[styles.NavButton, styles.ActiveNavButton]}
              />
              <TouchableOpacity
                style={styles.NavButtonWrapper}
                onPress={() => this.props.navigation.navigate("Landing3")}
              >
                <View style={styles.NavButton} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}
