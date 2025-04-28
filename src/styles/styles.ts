import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    fontFamily: "Satoshi",
    fontSize: 16,
    color: "#1076BC",
    fontWeight: "regular",
    position: "relative",
    zIndex: 10,
  },
  secondaryText: {
    fontFamily: "Satoshi",
    fontSize: 16,
    color: "#A2A2A2A",
    fontWeight: "regular",
    position: "relative",
    zIndex: 10,
  },
  descText: {
    fontFamily: "Satoshi",
    fontSize: 12,
    color: "#0E0E0E",
    fontWeight: "regular",
    position: "relative",
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  splashText: {
    position: "absolute",
    top: "60%", // Move closer to the BukitVista logo
    fontSize: 18,
    color: "#0E0E0E",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  logoBVGO: {
    width: 220,
    height: 120,
    resizeMode: "contain",
    marginBottom: 30,
  },
  logoBV: {
    width: 180,
    height: 90,
    resizeMode: "contain",
  },
});

export default styles;