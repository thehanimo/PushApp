import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Animated,
  Easing,
  ScrollView,
  FlatList,
  Modal
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Body
} from "native-base";
import NavigationService from "../../../NavigationService";
import styles from "./styles";
import { SafeAreaView } from "react-navigation";
import SearchOverlay from "./searchOverlay";
import { MainCard, NotificationCard, PostDetail } from "./utils";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostDetail: false,
      searchOverlay: false,
      Icon: [new Animated.Value(1), new Animated.Value(0)],
      searchBar: {
        width: new Animated.Value(50),
        borderRadius: new Animated.Value(25),
        backgroundColor: new Animated.Value(150)
      },
      postDetail: {
        height: new Animated.Value(0),
        width: new Animated.Value(0),
        opacity: new Animated.Value(0),
        postOp: new Animated.Value(0),
        content: `Lorem ipsum dolor sit amet, prima putent et pri. His apeirian urbanitas rationibus ex. Atqui admodum eleifend mea ad. Mutat dicunt cu per, intellegat mnesarchum ei usu. Cu mei quando legere torquatos.
        Nemore commune mel ei. Qui ut commune imperdiet, ponderum maluisset forensibus his cu, vix labores eligendi mandamus ea. Pri te primis intellegam, eu est congue graece voluptua. Populo alterum ne per, legere eligendi salutatus an mea, qui ei quas sententiae. Quo no nihil recusabo.Lorem ipsum dolor sit amet, prima putent et pri. His apeirian urbanitas rationibus ex. Atqui admodum eleifend mea ad. Mutat dicunt cu per, intellegat mnesarchum ei usu. Cu mei quando legere torquatos.
        Nemore commune mel ei. Qui ut commune imperdiet, ponderum maluisset forensibus his cu, vix labores eligendi mandamus ea. Pri te primis intellegam, eu est congue graece voluptua. Populo alterum ne per, legere eligendi salutatus an mea, qui ei quas sententiae. Quo no nihil recusabo.Lorem ipsum dolor sit amet, prima putent et pri. His apeirian urbanitas rationibus ex. Atqui admodum eleifend mea ad. Mutat dicunt cu per, intellegat mnesarchum ei usu. Cu mei quando legere torquatos.
        Nemore commune mel ei. Qui ut commune imperdiet, ponderum maluisset forensibus his cu, vix labores eligendi mandamus ea. Pri te primis intellegam, eu est congue graece voluptua. Populo alterum ne per, legere eligendi salutatus an mea, qui ei quas sententiae. Quo no nihil recusabo.`,
        time: "9:30 PM",
        monthYear: "Sep'18",
        date: "31st",
        title: "How to make things GO Viral",
        live: true
      },
      mainCards: [
        {
          imageURI: require("../../assets/images/eventSample.jpg"),
          tags: "#PUSHAMA",
          header: "How to make things go viral",
          footer: ["Vinay Singhal", "Cofounder at Wittyfeed"],
          live: true
        },
        {
          imageURI: require("../../assets/images/eventSample.jpg"),
          tags: "#PUSHAMA",
          header: "How to make things go viral",
          footer: ["Vinay Singhal", "Cofounder at Wittyfeed"],
          live: true
        },
        {
          imageURI: require("../../assets/images/eventSample.jpg"),
          tags: "#PUSHAMA",
          header: "How to make things go viral",
          footer: ["Vinay Singhal", "Cofounder at Wittyfeed"]
        },
        {
          imageURI: require("../../assets/images/eventSample.jpg"),
          tags: "#PUSHAMA",
          header: "How to make things go viral",
          footer: ["Vinay Singhal", "Cofounder at Wittyfeed"]
        },
        {
          imageURI: require("../../assets/images/eventSample.jpg"),
          tags: "#PUSHAMA",
          header: "How to make things go viral",
          footer: ["Vinay Singhal", "Cofounder at Wittyfeed"]
        }
      ],
      notificationCards: [
        {
          type: "PE",
          title: "Brand Building for Everyone",
          speaker: "Sahil Vaidya, Cofounder of The Minimalist",
          time: "20th Sep, Thu, 9:30 PM"
        },
        {
          type: "PL",
          title: "Recast Studio",
          speaker: "Abhinav Sohani, Cofounder of Recast Studio",
          time: ""
        }
      ]
    };
  }
  expandSearchBar = () => {
    Animated.parallel([
      Animated.timing(this.state.searchBar.width, {
        toValue: wp("80%")
      }),
      Animated.timing(this.state.searchBar.borderRadius, {
        toValue: 10
      }),
      Animated.timing(this.state.searchBar.backgroundColor, {
        toValue: 0
      }),
      Animated.timing(this.state.Icon[0], {
        toValue: 0,
        duration: 250,
        easing: Easing.quad
      }),
      Animated.timing(this.state.Icon[1], {
        toValue: 1,
        duration: 250,
        delay: 200,
        easing: Easing.quad
      })
    ]).start();
  };
  hideSearchBar = () => {
    Animated.parallel([
      Animated.timing(this.state.searchBar.width, {
        toValue: 50
      }),
      Animated.timing(this.state.searchBar.borderRadius, {
        toValue: 25
      }),
      Animated.timing(this.state.searchBar.backgroundColor, {
        toValue: 150
      }),
      Animated.timing(this.state.Icon[0], {
        toValue: 1,
        duration: 250,
        delay: 200,
        easing: Easing.quad
      }),
      Animated.timing(this.state.Icon[1], {
        toValue: 0,
        duration: 250,
        easing: Easing.quad
      })
    ]).start();
  };

  expandPost = () => {
    this.setState({ showPostDetail: true });
  };
  hidePost = () => {
    this.setState({ showPostDetail: false });
  };
  render() {
    const interpolateSearchBarColor = this.state.searchBar.backgroundColor.interpolate(
      {
        inputRange: [0, 150],
        outputRange: ["rgba(134, 94, 208, 0.1)", "#865ed0"]
      }
    );
    return (
      <Container style={{ backgroundColor: "#f8f8f8" }}>
        <Content>
          <SafeAreaView style={styles.SAV}>
            <SearchOverlay
              render={this.state.searchOverlay}
              selectedInterests={this.state.selectedInterests}
              whileRender={() => {
                setTimeout(() => {
                  this.expandSearchBar();
                }, 200);
              }}
              beforeUnRender={() => {
                this.hideSearchBar();
              }}
              whileUnRender={() => {}}
              select={(item, id) => {}}
              unselect={(item, id) => {}}
            />
            <View
              style={{
                zIndex: 1,
                position: Platform.OS == "ios" ? "relative" : "absolute",
                height: Platform.OS == "ios" ? null : 100,
                width: Platform.OS == "ios" ? null : 100,
                right: 0
              }}
            >
              <TouchableOpacity
                activeOpacity={Platform.OS == "ios" ? 0.2 : 1}
                style={[styles.SearchTab]}
                onPress={() => {
                  if (!this.state.transitioning) {
                    if (this.state.searchOverlay) {
                      this.setState({
                        searchOverlay: false,
                        transitioning: true
                      });
                    } else
                      this.setState({
                        searchOverlay: true,
                        transitioning: true
                      });
                    setTimeout(() => {
                      this.setState({ transitioning: false });
                    }, 800);
                  }
                }}
              >
                <Animated.View
                  style={[
                    styles.SearchBar,
                    {
                      width: this.state.searchBar.width,
                      borderRadius: this.state.searchBar.borderRadius,
                      backgroundColor: interpolateSearchBarColor
                    }
                  ]}
                />
                <Animated.Text
                  allowFontScaling={false}
                  style={{ opacity: this.state.Icon[0] }}
                >
                  <Icon
                    type="EvilIcons"
                    name="search"
                    style={styles.SearchIcon}
                  />
                </Animated.Text>
                <Animated.Text
                  allowFontScaling={false}
                  style={{ opacity: this.state.Icon[1], position: "absolute" }}
                >
                  <Icon
                    type="EvilIcons"
                    name="close"
                    style={styles.SearchIcon}
                  />
                </Animated.Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.Header} allowFontScaling={false}>
                Live PushEvents
              </Text>
            </View>
            <FlatList
              style={styles.MainFlatList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              contentContainerStyle={styles.MainFlatListWrapper}
              data={this.state.mainCards}
              decelerationRate={0}
              snapToInterval={250 + wp("8%")}
              snapToAlignment={"start"}
              renderItem={({ item }) => (
                <MainCard
                  imageURI={item.imageURI}
                  tags={item.tags}
                  header={item.header}
                  footer={item.footer}
                  live={item.live}
                  onPress={this.expandPost}
                />
              )}
            />
            <FlatList
              style={styles.NotificationFlatList}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.NotificationFlatListWrapper}
              data={this.state.notificationCards}
              renderItem={({ item }) => (
                <NotificationCard
                  type={item.type}
                  title={item.title}
                  speaker={item.speaker}
                  time={item.time}
                />
              )}
            />
          </SafeAreaView>
        </Content>
        <Modal
          visible={this.state.showPostDetail}
          onDismiss={this.hidePost}
          onRequestClose={this.hidePost}
          animationType="slide"
          hardwareAccelerated
        >
          <SafeAreaView style={{ flex: 1 }}>
            <PostDetail
              continue={this.hidePost}
              content={this.state.postDetail.content}
              time={this.state.postDetail.time}
              monthYear={this.state.postDetail.monthYear}
              date={this.state.postDetail.date}
              title={this.state.postDetail.title}
              opacity={this.state.postDetail.postOp}
              live={this.state.postDetail.live}
            />
          </SafeAreaView>
        </Modal>
      </Container>
    );
  }
}
