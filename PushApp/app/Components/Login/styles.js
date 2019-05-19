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
    height:
      Platform.OS == "ios"
        ? Dimensions.get("window").height
        : ExtraDimensions.getRealWindowHeight() -
          ExtraDimensions.getSoftMenuBarHeight() -
          ExtraDimensions.getStatusBarHeight()
  },
  backgroundImage: {
    width: wp("100%"),
    height: wp("100%"),
    resizeMode: "contain",
    zIndex: -1
  },
  Heading: {
    textAlign: "left",
    marginTop: 30,
    marginLeft: wp("10%"),
    fontSize: 26,
    fontFamily: "Poppins-Medium",
    color: "#2a3455"
  },
  MainContent: {
    textAlign: "left",
    marginLeft: wp("10%"),
    marginRight: wp("15%"),
    marginTop: 7,
    color: "#807d83",
    fontSize: 16,
    fontFamily: "Poppins-Light"
  },
  LoginButton: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: hp("12%"),
    marginTop: 38,
    width: 289,
    height: 45,
    elevation: 2,
    borderRadius: 8,
    shadowColor: "rgba(66, 95, 156, 1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "#3d83d9",
    justifyContent: "center",
    alignItems: "center"
  },
  LinkedInIcon: {
    fontSize: 30,
    textAlign: "center",
    color: "#ffffff"
  },
  LoginText: {
    fontSize: 18,
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "Poppins-Regular",
    marginLeft: 20,
    marginTop: 5
  },
  BottomWrapper: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: hp("5%"),
    width: 180,
    height: 30,
    marginTop: 25
  },
  BottomText: {
    color: "#707070",
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Nexa-Light"
  },
  LoadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: wp("100%"),
    backgroundColor: "#ffffff",
    opacity: 0.925,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3
  },
  Loader: {
    width: 138,
    height: 138,
    borderStyle: "solid",
    borderColor: "#3d83d9",
    borderWidth: 3,
    borderRadius: 69
  },
  Thumbnail: {
    height: wp("40%"),
    width: wp("40%"),
    borderRadius: wp("20%"),
    borderColor: "#c4b1e8",
    borderWidth: 2
  },
  Name: {
    marginTop: 10,
    fontFamily: "Poppins-Medium",
    fontSize: 20,
    color: "#2a3455"
  },
  Email: {
    marginTop: 5,
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: "#807d83"
  },
  ConfirmButton: {
    marginTop: 25,
    width: 138,
    height: 45,
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
  ConfirmButtonLabel: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: "#fff"
  }
}));
