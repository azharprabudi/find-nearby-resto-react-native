import React from "react";
import { StackNavigator } from "react-navigation";
import ButtonHeader from "../components/button-header";
import RestaurantFavorite from "../screens/restaurant-favorite";
import RestaurantDetail from "../screens/restaurant-detail";

const FavoriteNavigator = StackNavigator(
  {
    RestaurantFavorite: {
      screen: RestaurantFavorite,
      navigationOptions: ({ navigation }) => ({
        title: "Favorit Resto",
        headerLeft: (
          <ButtonHeader onPress={navigation.openDrawer} iconName={"md-menu"} />
        ),
        headerStyle: {
          backgroundColor: "#FF272E"
        }
      })
    },
    RestaurantFavoriteDetail: {
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
    initialRouteName: "RestaurantFavorite",
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

export default FavoriteNavigator;
