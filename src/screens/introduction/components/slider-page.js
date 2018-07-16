import React, { Component } from "react";
import { View, Text, Animated } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";
import styles from "../css/slider-page-css";

class SliderPage extends Component {
  constructor() {
    super();
    this.runAnimation = new Animated.Value(0);
  }
  componentDidMount() {
    this.refLottie.play();
  }
  render() {
    const { lottieSource, description, color } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapperLottie}>
          <LottieView
            source={lottieSource}
            ref={ref => {
              this.refLottie = ref;
            }}
            progress={this.runAnimation}
          />
        </View>
        <View style={styles.wrapperDescription}>
          <Text style={[styles.description, { color }]}>{description}</Text>
        </View>
      </View>
    );
  }
}

SliderPage.defaultProps = {
  color: "#000"
};

SliderPage.propTypes = {
  lottieSource: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default SliderPage;
