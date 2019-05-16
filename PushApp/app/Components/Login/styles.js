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
    marginLeft: "10%",
    fontSize: 26,
    fontFamily: "Poppins-Medium",
    color: "#2a3455"
  },
  MainContent: {
    textAlign: "left",
    marginLeft: "10%",
    marginRight: "15%",
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
    bottom: "12%",
    marginTop: 38,
    width: 289,
    height: 45,
    elevation: 2,
    borderRadius: 8,
    // boxShadow: '0 0 12 0 rgba(134, 94, 208, 0.2)';
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
    bottom: "5%",
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
    width: "100%",
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
  }
}));
