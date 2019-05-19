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
export default class Confirm extends Component<Props> {
  constructor(props) {
    super(props);
  }

  saveProfile = async profile => {
    try {
      await AsyncStorage.setItem("profile", JSON.stringify(profile));
      alert("done!");
    } catch (error) {
      // Error retrieving data
      alert(error.message);
    }
  };

  Confirm = profile => {
    fetch(`http://192.168.0.103:3000/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ profile })
    })
      .then(response => {
        console.log(response);
        this.saveProfile(profile);
      })
      .catch(error => {
        alert(error);
      });
  };
  render() {
    var profile = this.props.navigation.getParam("profile", "");
    return (
      <Container>
        <Content>
          <SafeAreaView style={styles.SAV}>
            <View style={styles.LoadingOverlay}>
              <Thumbnail
                source={{ uri: profile.photo }}
                style={styles.Thumbnail}
              />
              <Text style={styles.Name} allowFontScaling={false}>
                {profile.firstName} {profile.lastName}
              </Text>
              <Text style={styles.Email} allowFontScaling={false}>
                {profile.email}
              </Text>
              <TouchableOpacity
                style={styles.ConfirmButton}
                onPress={() => this.Confirm(profile)}
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
