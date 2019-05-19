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
  ScrollView
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
export default class Register extends Component<Props> {
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
    console.log(profile);
    return (
      <Container>
        <Content>
          <SafeAreaView style={styles.SAV}>
            <ScrollView>
              <Text style={styles.Header} allowFontScaling={false}>
                Register to complete your Profile
              </Text>
              <View
                style={{
                  position: "relative"
                }}
              >
                <Thumbnail
                  source={{ uri: profile.photo }}
                  style={styles.Thumbnail}
                />
                <TouchableOpacity style={styles.PictureButton}>
                  <Icon
                    type="SimpleLineIcons"
                    name="pencil"
                    style={styles.PictureButtonIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.InputView}>
                <Text style={styles.InputLabel} allowFontScaling={false}>
                  Full Name
                </Text>
                <TextInput style={styles.Input} allowFontScaling={false}>
                  {profile.firstName} {profile.lastName}
                </TextInput>
              </View>
              <View style={styles.InputView}>
                <Text style={styles.InputLabel} allowFontScaling={false}>
                  Email Address
                </Text>
                <TextInput style={styles.Input} allowFontScaling={false}>
                  {profile.email}
                </TextInput>
              </View>
              <View style={styles.InputView}>
                <Text style={styles.InputLabel} allowFontScaling={false}>
                  Phone Number
                </Text>
                <TextInput style={styles.Input} allowFontScaling={false} />
              </View>
              <View style={styles.InputView}>
                <Text style={styles.InputLabel} allowFontScaling={false}>
                  City
                </Text>
                <TextInput
                  style={styles.Input}
                  allowFontScaling={false}
                  onChangeText={text => console.log(text)}
                />
              </View>
              <View style={styles.InputView}>
                <Text style={styles.InputLabel} allowFontScaling={false}>
                  Referral
                </Text>
                <TextInput style={styles.Input} allowFontScaling={false} />
              </View>

              <View
                style={{ height: 60 }} //Buffer to avoid Button Overlap
              />
            </ScrollView>
          </SafeAreaView>
        </Content>
        <TouchableOpacity
          style={styles.ContinueButton}
          //   onPress={() => this.Confirm(profile)}
        >
          <Text style={styles.ContinueButtonLabel} allowFontScaling={false}>
            Continue
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
