import React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "../css/button-slider-css";

const ButtonSlider = ({ onPress, label, position, backgroundColor, color }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={[
        styles.button,
        {
          borderRightWidth: position === "right" ? 0 : 1,
          borderLeftWidth: position === "right" ? 1 : 0,
          backgroundColor
        }
      ]}
    >
      <Text style={[styles.labelButton, { color }]}>{label}</Text>
    </View>
  </TouchableWithoutFeedback>
);

ButtonSlider.defaultProps = {
  backgroundColor: "#fff",
  color: "rgba(0,0,0,1.0)"
};

ButtonSlider.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string
};

export default ButtonSlider;
