import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import Reducers from "../configs/reducer";
import ItemSideMenu from "./item-side-menu";
import { DO_USER_LOGOUT } from "../ducks/user-duck";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF272E"
  },
  scrollView: {
    flex: 1
  },
  wrapperScrollView: {
    flex: 1,
    justifyContent: "center"
  },
  directionButtonBottom: {
    flexDirection: "row",
    alignItems: "center",
    height: 50
  },
  buttonBottom: {
    backgroundColor: "white",
    padding: 10
  },
  labelButton: {
    color: "white"
  }
});

class SideMenu extends Component {
  constructor() {
    super();
    this.navigation = [
      {
        routeName: "Restaurant",
        label: "Lokasi Resto",
        iconName: "md-pin"
      },
      {
        routeName: "Favorite",
        label: "Favorit Resto",
        iconName: "md-star"
      }
    ];
  }
  handleNavigation = ({ routeName }) => {
    const navigationActions = NavigationActions.navigate({
      routeName
    });
    this.props.navigation.dispatch(navigationActions);
  };
  handleLogoutUser = () => {
    Alert.alert("Informasi", "Apakah anda yakin untuk keluar dari aplikasi ?", [
      {},
      {
        text: "Tidak",
        onPress: () => console.log("Batal logout"),
        style: "cancel"
      },
      {
        text: "Keluar",
        onPress: () => this.props.navigation.dispatch({ type: DO_USER_LOGOUT })
      },
      { cancelable: false }
    ]);
  };
  renderItemSideMenu() {
    return this.navigation.map(({ routeName, label, iconName }) => (
      <ItemSideMenu
        key={routeName}
        label={label}
        iconName={iconName}
        active={routeName === this.props.activeItemKey}
        onPress={this.handleNavigation.bind(this, { routeName, label })}
      />
    ));
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.wrapperScrollView}>
            {this.renderItemSideMenu()}
          </View>
          <View style={styles.directionButtonBottom}>
            <ItemSideMenu
              iconName={"md-log-out"}
              width={"100%"}
              onPress={this.handleLogoutUser}
              label={"Keluar"}
              backgroundColor={"white"}
              textCenter
              labelColor={"#FF272E"}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  activeItemKey: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
};

export default SideMenu;
