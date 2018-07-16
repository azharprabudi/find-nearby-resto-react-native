import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF272E"
  },
  header: {
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    backgroundColor: "white",
    paddingHorizontal: 35,
    paddingVertical: 5,
    elevation: 1,
    shadowColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center"
  },
  wrapperInput: {
    width: "100%",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "rgba(255,255,255,1.0)",
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  },
  wrapperSeparator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  lineSeparator: {
    height: 0.5,
    backgroundColor: "#ddd",
    padding: 1,
    width: "40%"
  },
  smallLabel: {
    fontSize: 14,
    color: "#ddd"
  }
});

export default styles;
