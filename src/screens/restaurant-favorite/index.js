import React, { Component } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableWithoutFeedback,
  ToastAndroid,
  NetInfo,
  BackHandler
} from "react-native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import map from "lodash/map";
import fbase from "../../configs/fbase";
import styles from "./css/restaurant-favorite-css";

class RestaurantFavorite extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false
    };
  }
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleHardwareBackPress
    );
    this.getFavoritesRestaurant();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleHardwareBackPress
    );
  }
  getFavoritesRestaurant = async () => {
    try {
      const connectionInfo = await NetInfo.getConnectionInfo();
      if (connectionInfo !== null) {
        await this.promiseFetchingData();
      }
    } catch (e) {
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    }
  };
  handleHardwareBackPress = () => {
    this.props.navigation.navigate("RestaurantLocation");
    return true;
  };
  promiseFetchingData = () =>
    new Promise(resolve => {
      const { uid } = fbase.auth().currentUser;
      fbase
        .database()
        .ref(`${uid}/favorites/`)
        .once("value", snapshot => {
          if (snapshot.val()) {
            this.setState(
              {
                loading: false,
                data: map(snapshot.val(), (data, restoId) => ({
                  ...data,
                  restoId
                }))
              },
              resolve
            );
          }
        });
    });
  renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() =>
        this.props.navigation.navigate("RestaurantFavoriteDetail", {
          restoId: item.restoId
        })
      }
    >
      <View style={styles.item}>
        <Icon name={"md-restaurant"} type={"Ionicons"} style={styles.icon} />
        <View style={styles.wrapperContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subTitle}>{item.address}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={({ restoId }) => restoId}
          data={this.state.data}
          renderItem={this.renderItem}
          removeClippedSubviews={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl
              colors={["#FF272E"]}
              refreshing={this.state.loading}
              onRefresh={this.getFavoritesRestaurant}
            />
          }
        />
      </View>
    );
  }
}

RestaurantFavorite.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default RestaurantFavorite;
