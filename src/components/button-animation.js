import React, { Component } from "react";
import {
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  Text
} from "react-native";
import { Icon } from "native-base";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 5,
    marginVertical: 10,
    position: "relative",
    alignSelf: "center",
    justifyContent: "center",
    elevation: 2,
    shadowOpacity: 1,
    shadowColor: "rgba(0,0,0,0.8)",
    backgroundColor: "red"
  },
  wrapperLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  dotted: {
    textAlign: "center",
    fontSize: 16,
    color: "white"
  },
  icon: {
    marginRight: 8
  },
  label: {}
});

class ButtonAnimation extends Component {
  constructor() {
    super();
    this.button = {
      position: new Animated.Value(0),
      width: new Animated.Value(0),
      labelOpacity: new Animated.Value(1)
    };
  }
  componentDidUpdate(previousProps) {
    // condition where the props button disabled and animation is running
    if (
      this.props.disabled !== previousProps.disabled &&
      this.props.animation
    ) {
      if (this.props.disabled === true) {
        this.runAnimationButton();
      } else {
        this.stopAnimationButton();
      }
    }
  }
  runAnimationButton = () => {
    Animated.sequence([
      Animated.timing(this.button.labelOpacity, {
        toValue: 0,
        duration: 350,
        easing: Easing.linear
      }),
      Animated.timing(this.button.width, {
        toValue: 1,
        duration: 350,
        easing: Easing.linear
      })
    ]).start(() => {
      Animated.loop(
        Animated.timing(this.button.position, {
          toValue: 1,
          duration: 350,
          easing: Easing.linear
        })
      ).start();
    });
  };
  stopAnimationButton = () => {
    Animated.sequence([
      Animated.timing(this.button.position, {
        toValue: 0,
        duration: 350,
        easing: Easing.linear
      }),
      Animated.timing(this.button.width, {
        toValue: 0,
        duration: 350,
        easing: Easing.linear
      }),
      Animated.timing(this.button.labelOpacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.linear
      })
    ]).start();
  };
  render() {
    const width = this.button.width.interpolate({
      inputRange: [0, 1],
      outputRange: ["100%", "17%"]
    });
    const debounceButton = this.button.position.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -5, 5]
    });
    const heightLabel = this.button.labelOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 25]
    });
    const bulletOpacity = this.button.labelOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const heightBullet = this.button.labelOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 0]
    });
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <Animated.View
          style={[
            styles.container,
            {
              width,
              top: debounceButton,
              backgroundColor: this.props.disabled
                ? "#ddd"
                : this.props.backgroundColor
            }
          ]}
        >
          <Animated.Text
            style={[
              {
                opacity: bulletOpacity,
                height: heightBullet
              },
              styles.dotted
            ]}
          >
            {`\u2022 \u2022 \u2022`}
          </Animated.Text>
          <Animated.View
            style={[
              {
                opacity: this.button.labelOpacity,
                height: heightLabel
              },
              styles.wrapperLabel
            ]}
          >
            {this.props.iconLeft && (
              <Icon
                name={this.props.iconName}
                type={this.props.iconType}
                style={[{ color: this.props.iconColor }, styles.icon]}
              />
            )}
            <Text style={[styles.label, { color: this.props.labelColor }]}>
              {this.props.label.toUpperCase()}
            </Text>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

ButtonAnimation.defaultProps = {
  iconLeft: false,
  disabled: false,
  backgroundColor: "#ddd",
  iconType: "Ionicons",
  iconColor: "black",
  iconName: "",
  animation: false,
  labelColor: "black"
};

ButtonAnimation.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  iconLeft: PropTypes.bool,
  iconName: PropTypes.string,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  animation: PropTypes.bool,
  labelColor: PropTypes.string
};

export default ButtonAnimation;
