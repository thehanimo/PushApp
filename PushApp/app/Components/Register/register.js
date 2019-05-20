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
import ImagePicker from "react-native-image-crop-picker";
import NavigationService from "../../../NavigationService";
import styles from "./styles";

type Props = {};
export default class Register extends Component<Props> {
  constructor(props) {
    super(props);
    this.getProfile();
    this.state = {
      provider: "",
      id: "",
      image: { uri: null },
      fields: {
        fullName: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 0 },
          valid: false,
          value: "",
          required: true
        },
        email: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 0 },
          valid: false,
          value: "",
          required: true
        },
        phone: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 0 },
          valid: false,
          value: "",
          required: true
        },
        city: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 0 },
          valid: false,
          value: "",
          required: true
        },
        referral: {
          label: { color: "#807d83" },
          view: { borderColor: "#E8E7E9" },
          icon: { opacity: 0 },
          value: "",
          required: false
        }
      },
      buttonDisabled: true,
      button: {
        backgroundColor: "gray"
      }
    };
  }
  getProfile = async () => {
    let profile = null;
    try {
      profile = (await AsyncStorage.getItem("profile")) || null;
      profile = JSON.parse(profile);
      this.setState(
        {
          provider: profile.provider,
          id: profile.id,
          image: { uri: profile.image },
          fields: {
            ...this.state.fields,
            fullName: {
              ...this.state.fields.fullName,
              value: profile.fullName,
              valid: profile.fullName ? true : false,
              icon: { opacity: profile.fullName ? 1 : 0 }
            },
            email: {
              ...this.state.fields.email,
              value: profile.email,
              valid: profile.email ? true : false,
              icon: { opacity: profile.email ? 1 : 0 }
            },
            phone: {
              ...this.state.fields.phone,
              value: profile.phone || "",
              valid: profile.phone ? true : false,
              icon: { opacity: profile.phone ? 1 : 0 }
            },
            city: {
              ...this.state.fields.city,
              value: profile.city || "",
              valid: profile.city ? true : false,
              icon: { opacity: profile.city ? 1 : 0 }
            },
            referral: {
              ...this.state.fields.referral,
              value: profile.referral || "",
              valid: profile.referral ? true : false,
              icon: { opacity: profile.referral ? 1 : 0 }
            }
          }
        },
        () => this.formValidator()
      );
    } catch (error) {
      // Error retrieving data
      alert(error.message);
    }
  };
  validator = (text, regexp, field) => {
    text = text.trimLeft();
    if (regexp.test(text)) {
      this.setState(
        {
          fields: {
            ...this.state.fields,
            [field]: {
              ...this.state.fields[field],
              label: { color: "green" },
              view: { borderColor: "green" },
              icon: { opacity: 1 },
              valid: true,
              value: text
            }
          }
        },
        () => this.formValidator()
      );
    } else if (!this.state.fields[field].required && text == "") {
      this.setState(
        {
          fields: {
            ...this.state.fields,
            [field]: {
              ...this.state.fields[field],
              label: { color: "#807d83" },
              view: { borderColor: "#E8E7E9" },
              icon: { opacity: 0 },
              valid: true,
              value: text
            }
          }
        },
        () => this.formValidator()
      );
    } else {
      this.setState(
        {
          fields: {
            ...this.state.fields,
            [field]: {
              ...this.state.fields[field],
              label: { color: "red" },
              view: { borderColor: "red" },
              icon: { opacity: 0 },
              valid: false,
              value: text
            }
          }
        },
        () => this.formValidator()
      );
    }
  };
  endValidator = (text, regexp, field, isSubmitted = false) => {
    text = text.trimLeft();
    if (
      regexp.test(text) ||
      (!this.state.fields[field].required && text == "")
    ) {
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: {
            ...this.state.fields[field],
            label: { color: "#807d83" },
            view: { borderColor: "#E8E7E9" },
            valid: true,
            value: text
          }
        }
      });
      if (isSubmitted) {
        for (var field in this.state.fields) {
          if (!this.state.fields[field].valid) {
            this[field].focus();
            return;
          }
        }
      }
    } else {
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: {
            ...this.state.fields[field],
            label: { color: "red" },
            view: { borderColor: "red" },
            icon: { opacity: 0 },
            valid: false,
            value: text
          }
        }
      });
    }
  };

  formValidator = () => {
    for (var field in this.state.fields) {
      if (!this.state.fields[field].valid) {
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

  saveProfile = async (profile, callback) => {
    try {
      await AsyncStorage.setItem("profile", JSON.stringify(profile));
      callback();
    } catch (error) {
      // Error retrieving data
      alert(error.message);
    }
  };

  Register = async () => {
    var updatedProfile = {
      provider: this.state.provider,
      id: this.state.id,
      image: this.state.image.uri,
      fullName: this.state.fields.fullName.value,
      email: this.state.fields.email.value,
      phone: this.state.fields.phone.value,
      city: this.state.fields.city.value,
      referral: this.state.fields.referral.value
    };
    fetch(`http://192.168.0.103:3000/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProfile)
    })
      .then(response => {
        this.saveProfile(updatedProfile, () => {
          NavigationService.navigate("interests");
        });
      })
      .catch(error => {
        alert(error);
      });
  };
  render() {
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
                  source={{ uri: this.state.image.uri }}
                  style={styles.Thumbnail}
                />
                <TouchableOpacity
                  style={styles.PictureButton}
                  onPress={() => {
                    ImagePicker.openPicker({
                      width: 800,
                      height: 800,
                      cropping: true,
                      includeBase64: true
                    }).then(image => {
                      const source = {
                        uri: "data:image/jpeg;base64," + image.data
                      };
                      this.setState({
                        image: source
                      });
                    });
                  }}
                >
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
                      true,
                      true
                    )
                  }
                  onEndEditing={e =>
                    this.endValidator(
                      e.nativeEvent.text,
                      /^[a-zA-Z ]{3,}$/i,
                      "fullName",
                      true,
                      false
                    )
                  }
                  blurOnSubmit={false}
                  returnKeyLabel="next"
                  value={this.state.fields.fullName.value}
                />
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
                      false
                    )
                  }
                  blurOnSubmit={false}
                  returnKeyLabel="next"
                  value={this.state.fields.email.value}
                />
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
                  keyboardType="number-pad"
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
                      false
                    )
                  }
                  blurOnSubmit={false}
                  returnKeyLabel="next"
                  value={this.state.fields.phone.value}
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
                      false
                    )
                  }
                  blurOnSubmit={false}
                  returnKeyLabel="next"
                  value={this.state.fields.city.value}
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
                      true
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
                  value={this.state.fields.referral.value}
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
          onPress={() => this.Register()}
        >
          <Text style={styles.ContinueButtonLabel} allowFontScaling={false}>
            Continue
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
