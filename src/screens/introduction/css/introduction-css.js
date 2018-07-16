import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dot: {
    backgroundColor: "rgba(255,255,255,.3)",
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  paginationStyle: {
    bottom: 50
  },
  wrapperButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white"
  }
});

export default styles;
