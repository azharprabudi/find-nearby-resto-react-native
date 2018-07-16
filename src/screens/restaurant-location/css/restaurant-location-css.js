import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperFloatingBtnSearch: {
    position: "absolute",
    left: 15,
    right: 15,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 999
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10
  },
  line: {
    marginTop: 5,
    height: 2,
    width: 15,
    backgroundColor: "#ddd",
    alignSelf: "center"
  },
  content: {},
  informationSearch: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconSearch: {
    color: "#ddd",
    fontSize: 28,
    marginRight: 15
  },
  labelSearch: {
    color: "#ddd",
    fontSize: 18,
    width: "100%"
  },
  wrapperHideBtnSearch: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 999,
    bottom: 5
  },
  iconHideBtnSearch: {
    color: "black",
    fontSize: 48
  },
  map: {
    flex: 1
  },
  formSearch: {
    paddingVertical: 10
  },
  wrapperButtonSearchForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonFormSearch: {
    width: "48%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  iconButtonSearch: {
    marginRight: 10,
    marginLeft: 30
  },
  labelButtonSearch: {
    color: "white"
  },
  wrapperPicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
    marginHorizontal: 2
  }
});

export default styles;
