import { FluidNavigator } from "react-navigation-fluid-transitions";
import Login from "../screens/login-register/";
import Initial from "../screens/initial";
import Introduction from "../screens/introduction";

const AuthNavigator = FluidNavigator(
  {
    Initial: {
      screen: Initial
    },
    Login: {
      screen: Login
    },
    Introduction: {
      screen: Introduction
    }
  },
  {
    initialRouteName: "Initial",
    navigationOptions: {
      header: null
    }
  }
);

export default AuthNavigator;
