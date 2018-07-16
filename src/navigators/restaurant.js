import React from "react";
import { StackNavigator } from "react-navigation";
import ButtonHeader from "../components/button-header";
import RestaurantLocation from "../screens/restaurant-location";
import RestaurantDetail from "../screens/restaurant-detail";

const RestaurantNavigator = StackNavigator(
  {
    RestaurantLocation: {
      screen: RestaurantLocation,
      navigationOptions: ({ navigation }) => ({
        title: "Lokasi Resto",
        headerLeft: (
          <ButtonHeader onPress={navigation.openDrawer} iconName={"md-menu"} />
        ),
        headerStyle: {
          backgroundColor: "#FF272E"
        }
      })
    },
    RestaurantDetail: {
      screen: RestaurantDetail,
      navigationOptions: {
        title: "Detil Resto",
        headerStyle: {
          backgroundColor: "#FF272E"
        }
      }
    }
  },
  {
    initialRouteName: "RestaurantLocation",
    navigationOptions: {
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "white",
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "bold"
      }
    }
  }
);

export default RestaurantNavigator;
