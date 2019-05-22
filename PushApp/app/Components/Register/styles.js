import { StyleSheet, Dimensions, Platform } from "react-native";
import ExtraDimensions from "react-native-extra-dimensions-android";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default (styles = StyleSheet.create({
  SAV: {
    flex: 1,
    backgroundColor: "#fff",
    height: Platform.OS == "ios" ? Dimensions.get("window").height : "100%",
    position: "relative"
  },
  Header: {
    marginTop: hp("3%"),
    marginLeft: wp("8%"),
    width: 260,
    fontFamily: "Poppins-Medium",
    fontSize: 24,
    color: "#2a3455"
  },
  SubHeader: {
    marginTop: 5,
    marginLeft: wp("8%"),
    marginRight: wp("25%"),
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: "#807d83"
  },
  SearchTab: {
    height: 50,
    width: 100,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
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
  SelectedInterestsFlex: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    paddingBottom: Platform.OS == "ios" ? 100 : 0
  },
  SelectedInterest: {
    height: 54,
    width: 54,
    borderRadius: 27,
    margin: 20,
    marginBottom: 10
  },
  SelectedInterestLabel: {
    width: 70,
    height: 40,
    lineHeight: 13,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins-Light",
    color: "#807d83"
  },
  SelectedInterestImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignSelf: "center",
    backgroundColor: "purple"
  },
  RemoveIconButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "#865ed0",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    right: 10
  },
  RemoveIcon: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center"
  },
  InterestsFlex: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 100
  },
  Interest: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: "purple",
    borderWidth: 2,
    margin: wp("5%"),
    marginBottom: 10,
    justifyContent: "center",
    position: "relative"
  },
  InterestLabel: {
    width: 100,
    height: 50,
    lineHeight: 17,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Light",
    color: "#807d83"
  },
  Thumbnail: {
    height: wp("30%"),
    width: wp("30%"),
    borderRadius: wp("15%"),
    borderColor: "#c4b1e8",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2
  },
  InterestOverlay: {
    position: "absolute",
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(134, 94, 208, 0.67)",
    justifyContent: "center"
  },
  InterestImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    backgroundColor: "purple"
  },
  PictureButton: {
    position: "absolute",
    alignSelf: "center",
    top: wp("26%"),
    left: wp("56%"),
    height: wp("9%"),
    width: wp("9%"),
    borderRadius: wp("4.5%"),
    backgroundColor: "white",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2
  },
  PictureButtonIcon: {
    color: "#707070",
    textAlign: "center",
    fontSize: 13
  },
  InputView: {
    backgroundColor: "#fff",
    height: 90,
    borderColor: "#E8E7E9",
    borderBottomWidth: 1
  },
  InputLabel: {
    marginLeft: wp("8%"),
    marginTop: 35,
    fontSize: 14,
    fontFamily: "Poppins-Light",
    color: "#807d83",
    padding: 0
  },
  Input: {
    padding: 0,
    marginTop: Platform.OS == "ios" ? 10 : 5,
    marginLeft: wp("8%"),
    marginRight: wp("8%"),
    fontSize: 14,
    fontFamily: "Poppins-Light",
    color: "#2a3455"
  },
  ContinueButton: {
    marginTop: 25,
    width: wp("90%"),
    alignSelf: "center",
    position: "absolute",
    bottom: 31,
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
  },
  ContinueButtonLabel: {
    color: "#fff",
    fontFamily: "Poppins-Regular"
  },
  validateIcon: {
    position: "absolute",
    marginTop: 60,
    fontSize: 16,
    color: "#865ed0",
    right: wp("8%")
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
  }
}));
