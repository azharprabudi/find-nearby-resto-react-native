import React, { Component } from "react";
import { View, Image, StatusBar } from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import fbase from "../../configs/fbase";
import styles from "./css/initial-css";

class Initial extends Component {
  componentDidMount() {
    fbase.auth().onAuthStateChanged(user => {
      let navigation = null;
      if (user && this.props.user.histories.introduction) {
        navigation = NavigationActions.navigate({ routeName: "Home" });
      } else if (user && !this.props.user.histories.introduction) {
        navigation = NavigationActions.navigate({ routeName: "Introduction" });
      } else {
        navigation = NavigationActions.navigate({ routeName: "Login" });
      }
      setTimeout(() => {
        this.props.navigation.dispatch(navigation);
      }, 1500);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#FF272E"} />
        <Transition shared={"circle"}>
          <Image
            source={require("../../../assets/logo.png")}
            resizeMode={"cover"}
          />
        </Transition>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: {
    histories: {
      introduction: user.histories.introduction
    }
  }
});

Initial.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Initial);
