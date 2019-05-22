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
  ScrollView,
  Animated,
  FlatList
} from "react-native";
import { Icon } from "native-base";
import styles from "./styles";

export class SelectedInterest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Animated.View
        style={{
          position: "relative",
          width: this.props.dim.width,
          height: this.props.dim.height,
          opacity: this.props.dim.opacity
        }}
      >
        <View style={styles.SelectedInterest}>
          <Image
            source={{ uri: this.props.image }}
            style={styles.SelectedInterestImage}
          />
        </View>
        <Animated.Text
          style={styles.SelectedInterestLabel}
          allowFontScaling={false}
          numberOfLines={2}
        >
          {this.props.label}
        </Animated.Text>
        <TouchableOpacity
          style={styles.RemoveIconButton}
          onPress={() => {
            this.props.remove();
          }}
        >
          <Icon type="EvilIcons" name="close" style={styles.RemoveIcon} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export class Interest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false
    };
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.Interest}
          onPress={() => {
            if (this.props.opacity.__getValue() == 1) {
              this.props.unselect();
            } else {
              this.props.select();
            }
          }}
        >
          <Image
            source={{ uri: this.props.image }}
            style={styles.InterestImage}
          />
          <Animated.View
            style={[styles.InterestOverlay, { opacity: this.props.opacity }]}
          >
            <Icon
              type="MaterialIcons"
              name="done"
              style={{
                position: "absolute",
                alignSelf: "center",
                color: "#fff"
              }}
              allowFontScaling={false}
            />
          </Animated.View>
        </TouchableOpacity>
        <Text
          style={styles.InterestLabel}
          numberOfLines={2}
          allowFontScaling={false}
        >
          {this.props.label}
        </Text>
      </View>
    );
  }
}
