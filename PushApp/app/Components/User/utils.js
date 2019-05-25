import React, { Component } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { Thumbnail, Icon } from "native-base";
import styles from "./styles";

export class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.MainCard}>
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
