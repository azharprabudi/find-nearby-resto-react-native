import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginLeft: 5,
    marginRight: 15,
    color: "#FF272E"
  },
  wrapperContent: {
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd"
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF272E"
  },
  subTitle: {
    fontSize: 12
  }
});

export default styles;
