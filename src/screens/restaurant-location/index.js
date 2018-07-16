import React, { Component } from "react";
import {
  View,
  ToastAndroid,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button, Icon } from "native-base";
import has from "lodash/has";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFavoriteRestaurant } from "../../ducks/restaurant-duck";
import {
  getNearbyRestaurant,
  searchRestaurant,
  getFavoriteResto
} from "../../sagas/restaurant-saga";
import TextInput from "../../components/text-input-animation";
import lang from "./language/lang";
import styles from "./css/restaurant-location-css";

const MAX_HEIGHT_CONTENT_SEARCH = 150;
const MIN_HEIGHT_CONTENT_SEARCH = 50;
const MIN_HEIGHT_BUTTON_SEARCH = 35;
const MAX_HEIGHT_BUTTON_SEARCH = 55;

class RestaurantLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: "",
        longitude: "",
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      search: {
        name: ""
      },
      data: [],
      isToggleBtnSearch: false
    };
    this.toggleBtnSearch = new Animated.Value(0);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.doGetNearbyRestaurant(coords.longitude, coords.latitude);
      },
      error => {
        ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
      },
      { timeout: 20000, maximumAge: 1000 }
    );
    this.listenerFavoriteResto();
  }
  setStateFormSearch = (stateName, value) => {
    this.setState({
      ...this.state,
      search: {
        ...this.state.search,
        [stateName]: value
      }
    });
  };
  doGetNearbyRestaurant = async (longitude = "", latitude = "") => {
    try {
      const data = await getNearbyRestaurant({
        latitude: latitude || this.state.latitude,
        longitude: longitude || this.state.longitude
      });
      if (!has(data, "nearby_restaurants")) throw new Error(data);
      if (data.nearby_restaurants.length < 1)
        throw new Error(lang.noRestaurantNearbyFromYou);
      this.setState({
        ...this.state,
        location: {
          latitude: latitude || this.state.latitude,
          longitude: longitude || this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        },
        data: data.nearby_restaurants
      });
    } catch (e) {
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    }
  };
  doSearchRestaurant = async () => {
    try {
      const data = await searchRestaurant(this.state.search.name);
      if (!has(data, "restaurants")) throw new Error(data);
      if (data.results_found < 1)
        throw new Error(lang.noRestaurantNearbyFromYou);
      this.setState({
        ...this.state,
        data: data.restaurants
      });
    } catch (e) {
      ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    }
  };
  doToggleBtnSearch = () => {
    const isToggle = this.toggleBtnSearch["_value"];
    this.setState(
      {
        ...this.state,
        isToggleBtnSearch: isToggle !== 1
      },
      () => {
        Animated.timing(this.toggleBtnSearch, {
          toValue: isToggle === 1 ? 0 : 1,
          duration: 500,
          easing: Easing.linear
        }).start();
      }
    );
  };
  navigateToDetailRestaurant = restoId => {
    this.props.navigation.navigate("RestaurantDetail", {
      restoId
    });
  };
  listenerFavoriteResto = async () => {
    try {
      const data = await getFavoriteResto();
      if (data) {
        this.props.getFavoriteRestaurant(data);
      }
    } catch (e) {
      ToastAndroid.show(e);
    }
  };
  render() {
    const heightBtnSearch = this.toggleBtnSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [MIN_HEIGHT_CONTENT_SEARCH, MAX_HEIGHT_CONTENT_SEARCH]
    });
    const bottomBtnSearch = this.toggleBtnSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [MIN_HEIGHT_BUTTON_SEARCH, MAX_HEIGHT_BUTTON_SEARCH]
    });
    const heightContentBtnSearch = this.toggleBtnSearch.interpolate({
      inputRange: [0, 1],
      outputRange: ["80%", "100%"]
    });
    const heightInformationSearch = this.toggleBtnSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [MIN_HEIGHT_BUTTON_SEARCH, 0]
    });
    const opacityInformationSearch = this.toggleBtnSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const heightFormSearch = this.toggleBtnSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [0, MAX_HEIGHT_CONTENT_SEARCH]
    });
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#FF272E"} />
        <Animated.View
          style={[
            styles.wrapperFloatingBtnSearch,
            {
              height: heightBtnSearch,
              bottom: bottomBtnSearch
            }
          ]}
        >
          <TouchableOpacity
            onPress={this.doToggleBtnSearch}
            style={styles.button}
            disabled={this.state.isToggleBtnSearch}
          >
            <View>
              <View style={styles.line} />
              <Animated.View
                style={[
                  styles.content,
                  {
                    height: heightContentBtnSearch
                  }
                ]}
              >
                <Animated.View
                  style={[
                    styles.informationSearch,
                    {
                      height: heightInformationSearch,
                      opacity: opacityInformationSearch
                    }
                  ]}
                >
                  <Icon name={"search"} style={styles.iconSearch} />
                  <Text style={styles.labelSearch}>
                    {this.state.search.name || lang.searchRestaurant}
                  </Text>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.formSearch,
                    {
                      height: heightFormSearch
                    }
                  ]}
                >
                  <TextInput
                    value={this.state.search.name}
                    label={lang.restaurantName}
                    labelColor={"rgba(0,0,0,0.5)"}
                    focusColor={"#FF272E"}
                    underlineColorAndroid={"#ddd"}
                    onChangeText={this.setStateFormSearch.bind(this, "name")}
                  />
                  <View style={styles.wrapperButtonSearchForm}>
                    <Button
                      iconLeft
                      backgroundColor={"orange"}
                      style={styles.buttonFormSearch}
                      onPress={this.doGetNearbyRestaurant}
                    >
                      <Icon name={"md-pin"} style={styles.iconButtonSearch} />
                      <Text style={styles.labelButtonSearch}>
                        {lang.findNearby.toUpperCase()}
                      </Text>
                    </Button>
                    <Button
                      iconLeft
                      backgroundColor={"#FF272E"}
                      style={styles.buttonFormSearch}
                      onPress={this.doSearchRestaurant}
                    >
                      <Icon
                        name={"md-search"}
                        style={styles.iconButtonSearch}
                      />
                      <Text style={styles.labelButtonSearch}>
                        {lang.search.toUpperCase()}
                      </Text>
                    </Button>
                  </View>
                </Animated.View>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.wrapperHideBtnSearch,
            {
              opacity: this.toggleBtnSearch
            }
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              this.state.isToggleBtnSearch === false
                ? console.log("false")
                : this.doToggleBtnSearch()
            }
          >
            <Icon
              name={"ios-arrow-dropdown"}
              type={"Ionicons"}
              color={"white"}
              style={styles.iconHideBtnSearch}
            />
          </TouchableOpacity>
        </Animated.View>
        {this.state.location.latitude !== "" && (
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              ...this.state.location
            }}
            showsUserLocation
            followsUserLocation
            showsMyLocationButton
            zoomEnabled
            style={styles.map}
          >
            {this.state.data.length > 0 &&
              this.state.data.map(({ restaurant }) => (
                <Marker
                  key={restaurant.id}
                  title={restaurant.name}
                  description={restaurant.cuisines}
                  coordinate={{
                    latitude: parseFloat(restaurant.location.latitude),
                    longitude: parseFloat(restaurant.location.longitude)
                  }}
                  onCalloutPress={this.navigateToDetailRestaurant.bind(
                    this,
                    restaurant.id
                  )}
                />
              ))}
          </MapView>
        )}
      </View>
    );
  }
}

RestaurantLocation.propTypes = {
  navigation: PropTypes.object.isRequired,
  getFavoriteRestaurant: PropTypes.func.isRequired
};

export default connect(null, { getFavoriteRestaurant })(RestaurantLocation);
