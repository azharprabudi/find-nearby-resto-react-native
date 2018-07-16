import { Dimensions } from "react-native";
import { DrawerNavigator } from "react-navigation";
import SideMenu from "../components/side-menu";
import RestaurantTabNavigator from "./restaurant";
import FavoriteNavigator from "./favorite";

const HomeScreenNavigator = DrawerNavigator(
  {
    Restaurant: {
      screen: RestaurantTabNavigator
    },
    Favorite: {
      screen: FavoriteNavigator
    }
  },
  {
    initialRouteName: "Restaurant",
    drawerWidth: Dimensions.get("screen").width * 0.7,
    drawerBackgroundColor: "#FF272E",
    drawerPosition: "left",
    contentComponent: SideMenu
  }
);

export default HomeScreenNavigator;
