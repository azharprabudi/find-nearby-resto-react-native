import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1
  },
  container: {
    backgroundColor: "white"
  },
  wrapperHeader: {
    width: "100%",
    height: 250
  },
  image: {
    width: "100%",
    height: "100%"
  },
  detailsRestaurant: {
    marginTop: 10,
    padding: 15
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    color: "black",
    marginVertical: 5,
    elevation: 3,
    fontWeight: "bold"
  },
  subtitle: {
    textAlign: "left",
    color: "#rgba(0,0,0,0.5)"
  },
  spacesubtitle: {
    marginVertical: 5
  },
  valueSubtitle: {
    color: "black"
  },
  underline: {
    marginTop: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  row: {
    flexDirection: "row",
    alignSelf: "center"
  },
  column: {
    width: "50%",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  columnFull: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  wrapperNavigator: {
    flexDirection: "row",
    alignItems: "center"
  },
  imageDirection: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  wrapperFavorite: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 15,
    bottom: -20,
    elevation: 2
  }
});

export default styles;
