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
    height: Platform.OS == "ios" ? Dimensions.get("window").height : "100%"
  },
  Header: {
    marginTop: hp("3%"),
    marginLeft: wp("8%"),
    marginRight: wp("20%"),
    fontFamily: "Poppins-Medium",
    fontSize: 24,
    color: "#2a3455"
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
    top: hp("90%") - 30,
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
  }
}));
