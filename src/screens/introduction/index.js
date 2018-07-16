import React, { Component } from "react";
import {
  View,
  StatusBar,
  BackHandler,
  Animated,
  Dimensions,
  Easing
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import ButtonSlider from "./components/button-slider";
import SliderPage from "./components/slider-page";
import styles from "./css/introduction-css";
import lang from "./language/lang";
import { doUpdateUserVisitIntroduction } from "../../ducks/user-duck";

class Introduction extends Component {
  constructor() {
    super();
    this.state = {
      page: 1
    };
    this.pageAnimation = new Animated.Value(0);
  }
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleHardwareBackPress
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleHardwareBackPress
    );
  }
  handleHardwareBackPress = () => {
    // set terlebih dahulu flag introduction
    this.props.doUpdateUserVisitIntroduction();
    return false;
  };
  doPreviousPage = () => {
    this.setState(
      {
        page: 1
      },
      () => this.doNavigatePage(1)
    );
  };
  doNextPage = () => {
    if (this.state.page === 2) {
      this.doNavigateHomeScreen();
    } else {
      this.setState(
        {
          page: 2
        },
        () => this.doNavigatePage(2)
      );
    }
  };
  doSkip = () => {
    if (this.state.page === 2) {
      this.doPreviousPage();
    } else {
      this.doNavigateHomeScreen();
    }
  };
  doNavigatePage = page => {
    Animated.timing(this.pageAnimation, {
      toValue: page === 2 ? 1 : 0,
      duration: 500,
      easing: Easing.linear
    }).start();
  };
  doNavigateHomeScreen = () => {
    this.props.doUpdateUserVisitIntroduction();
    const navigation = NavigationActions.navigate({ routeName: "Home" });
    this.props.navigation.dispatch(navigation);
  };
  render() {
    const { height } = Dimensions.get("screen");
    const maxHeightPageOne = this.pageAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0]
    });
    const opacityPageOne = this.pageAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const maxHeightPageTwo = this.pageAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height]
    });
    const opacityPageTwo = this.pageAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const backgroundColor = this.pageAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#FF272E", "#FFF"]
    });
    return (
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <StatusBar backgroundColor={"#FF272E"} />
        <View style={styles.wrapper}>
          <Animated.View
            style={[
              styles.page,
              {
                maxHeight: maxHeightPageOne,
                opacity: opacityPageOne
              }
            ]}
          >
            <SliderPage
              lottieSource={require("../../../assets/lottie/location-login.json")}
              description={lang.descriptionLocation}
              color={"white"}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.page,
              {
                maxHeight: maxHeightPageTwo,
                opacity: opacityPageTwo
              }
            ]}
          >
            <SliderPage
              lottieSource={require("../../../assets/lottie/favorit.json")}
              description={lang.descriptionFavorite}
              color={"#FF272E"}
            />
          </Animated.View>
        </View>
        <View style={styles.wrapperButton}>
          <ButtonSlider
            position={"left"}
            onPress={this.doSkip}
            color={this.state.page === 1 ? "#000" : "#fff"}
            backgroundColor={this.state.page === 1 ? "#fff" : "#FF272E"}
            label={this.state.page === 1 ? lang.skip : lang.previous}
          />
          <ButtonSlider
            position={"right"}
            color={this.state.page === 1 ? "#000" : "#fff"}
            backgroundColor={this.state.page === 1 ? "#fff" : "#FF272E"}
            onPress={this.doNextPage}
            label={this.state.page === 1 ? lang.continue : lang.finish}
          />
        </View>
      </Animated.View>
    );
  }
}

Introduction.propTypes = {
  navigation: PropTypes.object.isRequired,
  doUpdateUserVisitIntroduction: PropTypes.func.isRequired
};

export default connect(null, { doUpdateUserVisitIntroduction })(Introduction);
