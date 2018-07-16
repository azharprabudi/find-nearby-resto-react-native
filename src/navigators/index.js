import { createStackNavigator } from "react-navigation";
import AuthNavigator from "./auth";
import HomeScreenNavigator from "./homescreen";

export default createStackNavigator(
  {
    Auth: {
      screen: AuthNavigator
    },
    Home: {
      screen: HomeScreenNavigator
    }
  },
  {
    initialRouteName: "Auth",
    navigationOptions: {
      header: null
    }
  }
);
