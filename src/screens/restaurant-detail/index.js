import React, { Component } from "react";
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  BackHandler,
  TouchableOpacity,
  StatusBar,
  Linking
} from "react-native";
import { CachedImage } from "react-native-img-cache";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import has from "lodash/has";
import styles from "./css/restaurant-detail-css";
import { addToFavoriteRestaurant } from "../../ducks/restaurant-duck";
import { fetchDetailRestaurant } from "../../sagas/restaurant-saga";
import { formatThousand } from "../../configs/functions";
import lang from "./language/lang";
import { Icon } from "native-base";

class RestaurantDetails extends Component {
  static navigationOptions = {
    tabBarVisible: false
  };
  constructor() {
    super();
    this.state = {
      loading: true,
      details: {
        featured_image: ""
      }
    };
  }
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleHardwareBackPress
    );
    this.getDetailRestaurant();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleHardwareBackPress
    );
  }
  getDetailRestaurant = async () => {
    try {
      await this.setPromiseState("loading", true);
      const data = await fetchDetailRestaurant(
        this.props.navigation.state.params.restoId
      );
      this.setState({
        ...this.state,
        loading: false,
        details: data
      });
    } catch (e) {
      await this.setPromiseState("loading", false);
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    }
  };
  setPromiseState = (stateName, value) =>
    new Promise(resolve =>
      this.setState({ ...this.state, [stateName]: value }, resolve)
    );
  addToFavoriteRestaurant = () => {
    const data = {
      name: this.state.details.name,
      cuisines: this.state.details.cuisines,
      address: this.state.details.location.address,
      timestamp: new Date().getTime() / 1000
    };
    this.props.addToFavoriteRestaurant(this.state.details.id, data);
  };
  handleHardwareBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  openMaps = isDirection => {
    /* 
      isDirection == true // berarti di navigate
      isDirection == false // cuma melihat market point
    */
    const { longitude, latitude } = this.state.details.location;
    let urlLink = "";
    if (isDirection) {
      urlLink = `http://maps.google.com/?daddr=${latitude},${longitude}`;
    } else {
      urlLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    }
    Linking.openURL(urlLink).then(supported => {
      if (!supported) {
        ToastAndroid.show(lang.cantOpenMaps, ToastAndroid.SHORT);
      }
    });
  };
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#FF272E"]}
            refreshing={this.state.loading}
            onRefresh={this.getDetailRestaurant}
          />
        }
        style={styles.container}
      >
        <StatusBar backgroundColor={"#FF272E"} />
        <View style={styles.wrapperHeader}>
          {this.state.details.thumb !== "" && (
            <CachedImage
              source={{ uri: this.state.details.thumb }}
              resizeMode={"cover"}
              style={styles.image}
              mutable
            />
          )}
          <View style={styles.wrapperFavorite}>
            <TouchableOpacity onPress={this.addToFavoriteRestaurant}>
              <Icon
                name={"md-star"}
                style={{
                  color: this.props.isMyFavoriteResto ? "#FF272E" : "#ddd"
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailsRestaurant}>
          <Text style={styles.title}>{this.state.details.name || ""}</Text>
          <Text
            style={[styles.subtitle, styles.underline, styles.valueSubtitle]}
          >
            {lang.detailInformation.toUpperCase()}
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.subtitle, styles.spacesubtitle]}>
                {`${lang.category} :`}
              </Text>
              <Text style={styles.valueSubtitle}>
                {this.state.details.cuisines || ""}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.subtitle, styles.spacesubtitle]}>
                {`${lang.priceForTwo} :`}
              </Text>
              <Text style={styles.valueSubtitle}>
                {`Rp. ${formatThousand(
                  this.state.details.average_cost_for_two || 0
                )}`}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.subtitle, styles.spacesubtitle]}>
                {`${lang.rating} :`}
              </Text>
              <Text style={styles.valueSubtitle}>
                {has(this.state.details.user_rating, "aggregate_rating")
                  ? `${this.state.details.user_rating.aggregate_rating} (${
                      this.state.details.user_rating.rating_text
                    })`
                  : ""}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.subtitle, styles.spacesubtitle]}>
                {`${lang.city} :`}
              </Text>
              <Text style={styles.valueSubtitle}>
                {has(this.state.details.location, "city")
                  ? this.state.details.location.city
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.subtitle, styles.spacesubtitle]}>
                {`${lang.address} :`}
              </Text>
              <Text style={styles.valueSubtitle}>
                {has(this.state.details.location, "address")
                  ? this.state.details.location.address
                  : ""}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.subtitle, styles.spacesubtitle]}>
                {`${lang.navigate} :`}
              </Text>
              <View style={styles.wrapperNavigator}>
                <TouchableOpacity onPress={this.openMaps.bind(this, true)}>
                  <CachedImage
                    source={require("../../../assets/directions.png")}
                    style={styles.imageDirection}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.openMaps.bind(this, false)}>
                  <CachedImage
                    source={require("../../../assets/maps.png")}
                    style={styles.imageDirection}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

RestaurantDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
  addToFavoriteRestaurant: PropTypes.func.isRequired,
  isMyFavoriteResto: PropTypes.bool.isRequired
};

const mapStateToProps = ({ restaurant }, myProps) => {
  const { restoId } = myProps.navigation.state.params;
  let isMyFavoriteResto = false;
  if (typeof restaurant.favorite.data[restoId] !== "undefined") {
    isMyFavoriteResto = true;
  }
  return {
    isMyFavoriteResto
  };
};

export default connect(mapStateToProps, { addToFavoriteRestaurant })(
  RestaurantDetails
);
