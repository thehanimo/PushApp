import { StyleSheet, Dimensions, Platform } from "react-native";
import ExtraDimensions from "react-native-extra-dimensions-android";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default (styles = StyleSheet.create({
  SAV: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative"
  },
  SearchBar: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: wp("0%") + 50
  },
  SearchTab: {
    height: 50,
    width: 75,
    backgroundColor: "#865ed0",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: hp("3%"),
    right: wp("0%")
  },
  SearchIcon: {
    color: "#fff",
    fontSize: 40
  },
  SearchOverlay: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#fff",
    opacity: 1,
    shadowColor: "rgba(134, 94, 208, 1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 50
  },
  Header: {
    marginTop: hp("6%"),
    marginLeft: wp("8%"),
    width: 260,
    fontFamily: "Poppins-Medium",
    fontSize: 24,
    color: "#2a3455"
  },
  MainFlatList: {
    backgroundColor: "#f8f8f8",
    height: 270
  },
  MainFlatListWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: wp("8%")
  },
  MainCard: {
    height: 220,
    width: 250,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
    marginLeft: wp("8%"),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  MainCardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  MainCardTag: {
    fontSize: 10,
    fontFamily: "Poppins-Light",
    color: "#707070",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  MainCardHeader: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#2a3455",
    marginLeft: 15,
    marginRight: 15
  },
  MainCardFooter: {
    fontSize: 10,
    fontFamily: "Poppins-Light",
    color: "#707070",
    marginLeft: 15,
    marginRight: 15
  },
  NotificationFlatList: {
    backgroundColor: "#f8f8f8"
  },
  NotificationFlatListWrapper: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  NotificationCard: {
    height: 90,
    width: 330,
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2
  },
  NotificationCardImage: {
    width: "14%",
    height: "70%",
    resizeMode: "cover",
    position: "absolute",
    right: 0
  },
  NotificationCardHeader: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#2a3455",
    marginTop: 10,
    marginLeft: 20
  },
  NotificationCardTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#865ed0",
    marginLeft: 20
  },
  NotificationCardSpeaker: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#707070",
    marginLeft: 20
  },
  NotificationCardTime: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    color: "#707070",
    marginLeft: 20
  },
  TrendsFlatList: {
    backgroundColor: "#f8f8f8",
    height: 210
  },
  TrendsFlatListWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: wp("4%")
  },
  TrendsCard: {
    height: 190,
    width: 150,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
    marginLeft: wp("4%"),
    borderRadius: 8
  },
  TrendsCardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  TrendsCardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#2a3455",
    marginTop: 5,
    marginLeft: 10
  },
  TrendsCardLocation: {
    fontFamily: "Poppins-Light",
    fontSize: 10,
    color: "#865ed0",
    marginLeft: 10
  },
  TrendsCardTime: {
    margin: 5,
    position: "absolute",
    top: "40%",
    right: 0,
    height: 30,
    width: 33,
    backgroundColor: "#865ed0",
    justifyContent: "center",
    alignItems: "center"
  },
  TrendsCardTimeDate: {
    fontFamily: "Poppins-Regular",
    fontSize: 7,
    color: "#fff"
  },
  TrendsCardTimeMonthYear: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 8,
    color: "#fff"
  },
  TrendsCardThumbnail: {
    height: 16,
    width: 16,
    borderRadius: wp("15%"),
    borderColor: "#c4b1e8",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2
  },
  ThumbnailFlatList: {
    backgroundColor: "#fff",
    height: 20
  },
  ThumbnailFlatListWrapper: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 8
  },
  TrendsCardDescription: {
    fontFamily: "Poppins-Light",
    fontSize: 10,
    color: "#707070",
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10
  }
}));
