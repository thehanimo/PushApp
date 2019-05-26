import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  Animated,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { Thumbnail, Icon } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import ExtraDimensions from "react-native-extra-dimensions-android";

import styles from "./styles";

export class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.MainCard}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View
            style={{
              width: "100%",
              height: "60%",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              overflow: "hidden"
            }}
          >
            <Image source={this.props.imageURI} style={styles.MainCardImage} />
          </View>
          <Text
            style={styles.MainCardTag}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {this.props.tags}
          </Text>
          <Text
            style={styles.MainCardHeader}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {this.props.header}
          </Text>
          <Text
            style={styles.MainCardFooter}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {this.props.footer[0]}
          </Text>
          <Text
            style={styles.MainCardFooter}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {this.props.footer[1] || null}
          </Text>
          {this.props.live ? (
            <View
              style={{
                backgroundColor: "red",
                width: 50,
                height: 20,
                position: "absolute",
                bottom: "40%",
                justifyContent: "center",
                alignItems: "flex-end",
                right: 0
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#fff",
                  position: "absolute",
                  left: 5,
                  top: 5
                }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Poppins-Medium",
                  fontSize: 14,
                  marginRight: 5
                }}
                allowFontScaling={false}
              >
                LIVE
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

export class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.types = {
      PE: {
        imageURI: require("../../assets/images/calendar.png"),
        title: "PUSHEVENTS"
      },
      PL: {
        imageURI: require("../../assets/images/rocket.png"),
        title: "PUSHLAUNCH"
      },
      PA: {
        imageURI: require("../../assets/images/video.png"),
        title: "PUSHAMA"
      },
      PQ: {
        imageURI: require("../../assets/images/chat.png"),
        title: "PUSHQ&A"
      }
    };
  }
  render() {
    return (
      <View style={styles.NotificationCard}>
        <Image
          style={styles.NotificationCardImage}
          source={this.types[this.props.type].imageURI}
        />
        <Text style={styles.NotificationCardHeader} allowFontScaling={false}>
          {this.types[this.props.type].title}
        </Text>
        <Text style={styles.NotificationCardTitle} allowFontScaling={false}>
          {this.props.title}
        </Text>
        <Text style={styles.NotificationCardSpeaker} allowFontScaling={false}>
          {this.props.speaker}
        </Text>
        <Text style={styles.NotificationCardTime} allowFontScaling={false}>
          {this.props.time}
        </Text>
      </View>
    );
  }
}

export class TrendsCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.TrendsCard}>
        <View
          style={{
            width: "100%",
            height: "40%",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            overflow: "hidden"
          }}
        >
          <Image
            source={{ uri: this.props.uri }}
            style={styles.TrendsCardImage}
          />
        </View>
        <Text style={styles.TrendsCardTitle} allowFontScaling={false}>
          {this.props.title}
        </Text>
        <Text style={styles.TrendsCardLocation} allowFontScaling={false}>
          <Icon
            type="FontAwesome"
            name="map-marker"
            style={{
              fontSize: 10,
              color: "#865ed0"
            }}
          />{" "}
          {this.props.location}
        </Text>
        <View style={styles.TrendsCardTime}>
          <Text style={styles.TrendsCardTimeDate} allowFontScaling={false}>
            {this.props.date}
          </Text>
          <Text style={styles.TrendsCardTimeMonthYear} allowFontScaling={false}>
            {this.props.monthYear}
          </Text>
        </View>
        <FlatList
          style={styles.ThumbnailFlatList}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.ThumbnailFlatListWrapper}
          data={this.props.thumbnails}
          renderItem={({ item }) => (
            <ThumbnailList uri={item.uri} num={item.num} />
          )}
        />
        <Text
          allowFontScaling={false}
          style={styles.TrendsCardDescription}
          numberOfLines={2}
        >
          {this.props.desc}
        </Text>
      </View>
    );
  }
}
export class ThumbnailList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.uri) {
      return (
        <Thumbnail
          source={{ uri: "https://picsum.photos/200" }}
          style={{
            height: 18,
            width: 18,
            borderRadius: 9,
            margin: 2
          }}
        />
      );
    } else {
      return (
        <View
          source={{ uri: "https://picsum.photos/200" }}
          style={{
            height: 18,
            width: 18,
            borderRadius: 9,
            margin: 2,
            backgroundColor: "#865ed0",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 6,
              fontFamily: "Poppins-SemiBold",
              color: "#fff"
            }}
          >
            {this.props.num}
          </Text>
        </View>
      );
    }
  }
}

export class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Animated.View style={{ opacity: this.props.opacity, height: "100%" }}>
        <SafeAreaView>
          <View
            style={{
              width: wp("100%"),
              height: wp("52%")
            }}
          >
            <Image
              source={require("../../assets/images/eventSample.jpg")}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover"
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 24,
                color: "#2a3455",
                marginLeft: 16,
                marginRight: 110,
                marginTop: 10
              }}
            >
              {this.props.title}
            </Text>
            <View
              style={{
                margin: 5,
                position: "absolute",
                top: 10,
                right: 0,
                height: 56,
                width: 56,
                backgroundColor: "#865ed0",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Light",
                  fontSize: 14,
                  color: "#fff"
                }}
                allowFontScaling={false}
              >
                {this.props.date}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 15,
                  color: "#fff"
                }}
                allowFontScaling={false}
              >
                {this.props.monthYear}
              </Text>
            </View>
          </View>
          <View style={{ height: 30 }}>
            <View
              style={{
                marginLeft: 16,
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Light",
                  fontSize: 16,
                  color: "#707070"
                }}
                allowFontScaling={false}
              >
                {this.props.time}
              </Text>
              <View
                style={{
                  borderLeftColor: "#B7B7B7",
                  borderLeftWidth: 1,
                  height: 24,
                  marginLeft: 10,
                  marginRight: 10
                }}
              />
              {this.props.live ? (
                <View
                  style={{
                    backgroundColor: "red",
                    width: 54,
                    height: 24,
                    justifyContent: "center",
                    alignItems: "flex-end"
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#fff",
                      position: "absolute",
                      left: 5,
                      top: 5
                    }}
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "Poppins-Medium",
                      fontSize: 14,
                      marginRight: 5
                    }}
                    allowFontScaling={false}
                  >
                    LIVE
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={{
              width: wp("100%") - 32,
              borderBottomColor: "#d7d7d7",
              borderBottomWidth: 1,
              marginTop: 30,
              alignSelf: "center"
            }}
          />
          <ScrollView
            style={{
              height: hp("35%")
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 14,
                color: "#707070",
                textAlign: "left",
                marginLeft: 16,
                marginRight: 16,
                marginTop: 30
              }}
            >
              {this.props.content}
            </Text>
          </ScrollView>
          <View
            style={{
              position: "relative",
              marginTop: 30
            }}
          >
            <TouchableOpacity
              style={{
                width: wp("90%"),
                alignSelf: "center",
                marginTop: 0,
                height: 55,
                elevation: 2,
                borderRadius: 8,
                shadowColor: "rgba(134, 94, 208, 1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                backgroundColor: "#865ed0",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this.props.continue}
            >
              <Text
                style={{ color: "#fff", fontFamily: "Poppins-Regular" }}
                allowFontScaling={false}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    );
  }
}
