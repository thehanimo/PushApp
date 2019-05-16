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
    height: wp("92%"),
    resizeMode: "contain"
  },
  backgroundImage3: {
    width: wp("100%"),
    height: wp("89%"),
    marginBottom: wp("3%"),
    resizeMode: "contain"
  },
  Heading: {
    textAlign: "left",
    marginTop: 16,
    marginLeft: "10%",
    fontSize: 26,
    fontFamily: "Poppins-Medium",
    color: "#2a3455"
  },
  MainContent: {
    textAlign: "left",
    marginTop: 16,
    marginLeft: "10%",
    marginRight: "10%",
    color: "#807d83",
    fontSize: 16,
    fontFamily: "Poppins-Light"
  },
  MainButton: {
    position: "absolute",
    bottom: "8%",
    right: "13%",
    width: 70,
    height: 70,
    elevation: 2,
    borderRadius: 35,
    // boxShadow: '0 0 12 0 rgba(134, 94, 208, 0.2)';
    backgroundColor: "#865ed0",
    justifyContent: "center"
  },
  MainButtonIcon: {
    fontSize: 30,
    textAlign: "center",
    color: "#ffffff"
  },
  NavButtons: {
    flex: 1,
    flexDirection: "row",
    width: 150,
    height: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    bottom: "11%",
    left: "10%"
  },
  NavButtonWrapper: {
    height: "100%",
    justifyContent: "center"
  },
  NavButton: {
    width: 25,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#CDBCEB",
    marginRight: 10
  },
  ActiveNavButton: {
    backgroundColor: "#865ed0"
  }
}));
