import React, { Component } from "react";
import {
  View,
  Animated,
  Easing,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { Icon } from "native-base";
import isFunction from "lodash/isFunction";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
    height: 45,
    justifyContent: "flex-end"
  },
  label: {
    position: "absolute",
    left: 5
  },
  labelErrorMessage: {
    right: 0,
    top: 0,
    position: "absolute",
    color: "#FF272E"
  },
  wrapperTextInput: {
    right: 0,
    position: "absolute",
    top: 5
  },
  wrapperCircleClearText: {
    position: "absolute",
    right: 10,
    top: 15
  },
  circleClearText: {
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  borderBottom: {
    position: "relative",
    bottom: 0,
    height: 1,
    alignSelf: "center"
  }
});

class TextInputAnimation extends Component {
  constructor() {
    super();
    this.textInputAnimation = {
      label: new Animated.Value(0),
      togglePassword: new Animated.Value(0),
      borderColor: new Animated.Value(0),
      borderBottomWidth: new Animated.Value(1)
    };
  }
  componentWillUnmount() {
    Object.keys(this.textInputAnimation).forEach(val => {
      this.textInputAnimation[val].stopAnimation();
    });
  }
  handleOnFocus = () => {
    const { borderBottomWidth, borderColor, label } = this.textInputAnimation;
    borderBottomWidth.setValue(0);
    Animated.parallel([
      Animated.timing(label, {
        duration: 200,
        toValue: 1,
        easing: Easing.linear
      }),
      Animated.timing(borderBottomWidth, {
        duration: 200,
        toValue: 1,
        easing: Easing.linear
      }),
      Animated.timing(borderColor, {
        duration: 400,
        toValue: 1,
        easing: Easing.linear
      })
    ]).start(() => {
      if (isFunction(this.props.onFocus)) this.props.onFocus();
    });
  };
  handleOnBlur = () => {
    const { borderColor, label } = this.textInputAnimation;
    Animated.parallel([
      Animated.timing(label, {
        duration: 200,
        toValue: 0,
        easing: Easing.linear
      }),
      Animated.timing(borderColor, {
        duration: 400,
        toValue: 0,
        easing: Easing.linear
      })
    ]).start(() => {
      if (isFunction(this.props.onBlur)) this.props.onBlur();
    });
  };
  render() {
    const {
      label: animateLabel,
      borderBottomWidth: animateBorderBottomWidth,
      borderColor: animateBorderColor
    } = this.textInputAnimation;
    const borderColor = animateBorderColor.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.underlineColorAndroid, this.props.focusColor]
    });
    const borderBottomWidth = animateBorderBottomWidth.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "98%"]
    });
    const positionLabel = animateLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20]
    });
    const positionTextInput = animateLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.label.length * 8]
    });
    const heightClearText = animateLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"]
    });
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Animated.Text
          style={[
            styles.label,
            {
              top: positionLabel,
              color: this.props.labelColor
            }
          ]}
        >
          {this.props.label}
        </Animated.Text>
        {this.props.errorMessage !== "" && (
          <Text style={styles.labelErrorMessage}>
            {this.props.errorMessage}
          </Text>
        )}
        <Animated.View
          style={[styles.wrapperTextInput, { left: positionTextInput }]}
        >
          <TextInput
            value={this.props.value}
            editable={this.props.editable}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onChangeText={this.props.onChangeText}
            defaultValue={this.props.defaultValue}
            secureTextEntry={this.props.secureTextEntry}
            underlineColorAndroid={"transparent"}
            keyboardType={this.props.keyboardType}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            returnKeyType={this.props.returnKeyType}
            style={{ color: this.props.labelColor }}
          />
          {(this.props.clearText &&
            this.props.value !== "" && (
              <Animated.View
                style={[
                  styles.wrapperCircleClearText,
                  {
                    opacity: this.animateLabel,
                    height: heightClearText
                  }
                ]}
              >
                <TouchableOpacity onPress={this.props.onClearText}>
                  <View style={styles.circleClearText}>
                    <Icon
                      name={"close"}
                      style={{ fontSize: 20, color: "white" }}
                    />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )) ||
            (this.props.togglePassword && (
              <View style={styles.wrapperCircleClearText}>
                <TouchableOpacity onPress={this.props.onTogglePassword}>
                  <Icon
                    name={this.props.secureTextEntry ? "eye" : "eye-off"}
                    style={{ fontSize: 20, color: this.props.focusColor }}
                  />
                </TouchableOpacity>
              </View>
            ))}
        </Animated.View>
        <Animated.View
          style={[
            styles.borderBottom,
            {
              width: borderBottomWidth,
              backgroundColor: borderColor
            }
          ]}
        />
      </View>
    );
  }
}

TextInputAnimation.defaultProps = {
  editable: true,
  defaultValue: "",
  onFocus: () => console.log(""),
  onBlur: () => console.log(""),
  secureTextEntry: false,
  underlineColorAndroid: "#ddd",
  focusColor: "#ddd",
  placeholder: "",
  keyboardType: "default",
  containerStyle: 0,
  placeholderTextColor: "#ddd",
  clearText: false,
  returnKeyType: "done",
  onClearText: () => console.log(""),
  togglePassword: false,
  onTogglePassword: () => console.log(""),
  labelColor: "#ddd"
};

TextInputAnimation.propTypes = {
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  placeholder: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
  focusColor: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func.isRequired,
  keyboardType: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  defaultValue: PropTypes.string,
  containerStyle: PropTypes.number,
  clearText: PropTypes.bool,
  onClearText: PropTypes.func,
  returnKeyType: PropTypes.string,
  togglePassword: PropTypes.bool,
  onTogglePassword: PropTypes.func,
  errorMessage: PropTypes.string
};

export default TextInputAnimation;
