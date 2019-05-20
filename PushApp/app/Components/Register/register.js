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
    this.state = {
      fields: {
        fullName: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 1 },
          valid: true
        },
        email: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 1 },
          valid: true
        },
        phone: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 0 },
          valid: false
        },
        city: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 0 },
          valid: false
        },
        referral: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 0 }
        }
      },
      buttonDisabled: true,
      button: {
        backgroundColor: "gray"
      }
    };
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

  validator = (text, regexp, field, required) => {
    if (regexp.test(text.trimLeft())) {
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: {
            label: { color: "green" },
            view: { borderColor: "green" },
            icon: { opacity: 1 },
            valid: required ? true : undefined
          }
        }
      });
    } else {
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: {
            label: { color: "red" },
            view: { borderColor: "red" },
            icon: { opacity: 0 },
            valid: required ? false : undefined
          }
        }
      });
    }
    this.formValidator();
  };
  endValidator = (text, regexp, field, required) => {
    if (regexp.test(text.trimLeft())) {
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: {
            label: { color: "#807d83" },
            view: { borderColor: "#E8E7E9" },
            valid: required ? true : undefined
          }
        }
      });
      for (var field in this.state.fields) {
        if (!this.state.fields[field].valid) {
          this[field].focus();
          return;
        }
      }
    } else if (required) {
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: {
            label: { color: "red" },
            view: { borderColor: "red" },
            icon: { opacity: 0 },
            valid: required ? false : undefined
          }
        }
      });
    } else {
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: {
            label: { color: "#807d83" },
            view: { borderColor: "#E8E7E9" },
            icon: { opacity: 0 }
          }
        }
      });
    }
    this.formValidator();
  };

  formValidator = () => {
    for (var field in this.state.fields) {
      if (
        this.state.fields[field].hasOwnProperty("valid") &&
        !this.state.fields[field].valid
      ) {
        this.setState({
          button: { backgroundColor: "gray" },
          buttonDisabled: true
        });
        return;
      }
    }
    this.setState({
      button: { backgroundColor: "#865ed0" },
      buttonDisabled: false
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
              <TouchableOpacity
                style={[styles.InputView, this.state.fields.fullName.view]}
                onPress={() => this.fullName.focus()}
              >
                <Text
                  style={[styles.InputLabel, this.state.fields.fullName.label]}
                  allowFontScaling={false}
                >
                  Full Name
                </Text>
                <TextInput
                  ref={input => {
                    this.fullName = input;
                  }}
                  style={styles.Input}
                  allowFontScaling={false}
                  onChangeText={text =>
                    this.validator(text, /^[a-zA-Z ]{3,}$/i, "fullName", true)
                  }
                  onSubmitEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[a-zA-Z ]{3,}$/i,
                      "fullName",
                      true
                    )
                  }
                  onEndEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[a-zA-Z ]{3,}$/i,
                      "fullName",
                      true
                    )
                  }
                  blurOnSubmit={false}
                  returnKeyType="next"
                >
                  {profile.firstName} {profile.lastName}
                </TextInput>
                <Icon
                  type="MaterialIcons"
                  name="done"
                  style={[styles.validateIcon, this.state.fields.fullName.icon]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.InputView, this.state.fields.email.view]}
                onPress={() => this.email.focus()}
              >
                <Text
                  style={[styles.InputLabel, this.state.fields.email.label]}
                  allowFontScaling={false}
                >
                  Email Address
                </Text>
                <TextInput
                  ref={input => {
                    this.email = input;
                  }}
                  style={styles.Input}
                  allowFontScaling={false}
                  keyboardType="email-address"
                  onChangeText={text =>
                    this.validator(
                      text,
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                      "email",
                      true
                    )
                  }
                  onSubmitEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                      "email",
                      true
                    )
                  }
                  onEndEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                      "email",
                      true
                    )
                  }
                  blurOnSubmit={false}
                  returnKeyType="next"
                >
                  {profile.email}
                </TextInput>
                <Icon
                  type="MaterialIcons"
                  name="done"
                  style={[styles.validateIcon, this.state.fields.email.icon]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.InputView, this.state.fields.phone.view]}
                onPress={() => this.phone.focus()}
              >
                <Text
                  style={[styles.InputLabel, this.state.fields.phone.label]}
                  allowFontScaling={false}
                >
                  Phone Number
                </Text>
                <TextInput
                  ref={input => {
                    this.phone = input;
                  }}
                  style={styles.Input}
                  allowFontScaling={false}
                  keyboardType="phone-pad"
                  onChangeText={text =>
                    this.validator(text, /^[6-9]{1}[0-9]{9}$/i, "phone", true)
                  }
                  onSubmitEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[6-9]{1}[0-9]{9}$/i,
                      "phone",
                      true
                    )
                  }
                  onEndEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[6-9]{1}[0-9]{9}$/i,
                      "phone",
                      true
                    )
                  }
                  blurOnSubmit={false}
                  returnKeyType="next"
                />
                <Icon
                  type="MaterialIcons"
                  name="done"
                  style={[styles.validateIcon, this.state.fields.phone.icon]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.InputView, this.state.fields.city.view]}
                onPress={() => this.city.focus()}
              >
                <Text
                  style={[styles.InputLabel, this.state.fields.city.label]}
                  allowFontScaling={false}
                >
                  City
                </Text>
                <TextInput
                  ref={input => {
                    this.city = input;
                  }}
                  style={styles.Input}
                  allowFontScaling={false}
                  onChangeText={text =>
                    this.validator(text, /^[a-zA-Z ]+$/i, "city", true)
                  }
                  onSubmitEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[a-zA-Z ]+$/i,
                      "city",
                      true
                    )
                  }
                  onEndEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[a-zA-Z ]+$/i,
                      "city",
                      true
                    )
                  }
                  blurOnSubmit={false}
                  returnKeyType="next"
                />
                <Icon
                  type="MaterialIcons"
                  name="done"
                  style={[styles.validateIcon, this.state.fields.city.icon]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.InputView, this.state.fields.referral.view]}
                onPress={() => this.referral.focus()}
              >
                <Text
                  style={[styles.InputLabel, this.state.fields.referral.label]}
                  allowFontScaling={false}
                >
                  Referral
                </Text>
                <TextInput
                  ref={input => {
                    this.referral = input;
                  }}
                  style={styles.Input}
                  allowFontScaling={false}
                  onChangeText={text =>
                    this.validator(text, /^[a-zA-Z0-9]{8}$/i, "referral", false)
                  }
                  onSubmitEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[a-zA-Z0-9]{8}$/i,
                      "referral",
                      false
                    )
                  }
                  onEndEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[a-zA-Z0-9]{8}$/i,
                      "referral",
                      false
                    )
                  }
                  returnKeyType="done"
                  autoCorrect={false}
                />
                <Icon
                  type="MaterialIcons"
                  name="done"
                  style={[styles.validateIcon, this.state.fields.referral.icon]}
                />
              </TouchableOpacity>

              <View
                style={{ height: 60 }} //Buffer to avoid Button Overlap
              />
            </ScrollView>
          </SafeAreaView>
        </Content>
        <TouchableOpacity
          disabled={this.state.buttonDisabled}
          style={[styles.ContinueButton, this.state.button]}
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
