import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView
} from "react-native";
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

type Props = {};
export default class Interests extends Component<Props> {
  constructor(props) {
    super(props);
    this.getProfile();
    this.state = {
      profile: {
        image: { uri: null },
        id: null,
        fullName: null,
        email: null,
        phone: null,
        city: null,
        referral: null
      }
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
  render() {
    return (
      <Container>
        <Content>
          <SafeAreaView style={styles.SAV}>
            <View style={styles.LoadingOverlay}>
              <Thumbnail
                source={{ uri: this.state.profile.image.uri }}
                style={styles.Thumbnail}
              />
              <Text style={styles.Name} allowFontScaling={false}>
                {this.state.profile.fullName}
              </Text>
              <Text style={styles.Email} allowFontScaling={false}>
                {this.state.profile.email}
              </Text>
              <TouchableOpacity
                style={styles.ConfirmButton}
                // onPress={() => this.Confirm(profile)}
              >
                <Text
                  style={styles.ConfirmButtonLabel}
                  allowFontScaling={false}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}
