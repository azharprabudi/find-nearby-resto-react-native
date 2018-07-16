import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "native-base";

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

const ButtonHeader = ({ onPress, iconColor, iconName, disabled }) => (
  <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
    <View style={styles.container}>
      {iconName !== "" && (
        <Icon
          name={iconName}
          type={"Ionicons"}
          style={{ color: iconColor, fontSize: 28 }}
        />
      )}
    </View>
  </TouchableWithoutFeedback>
);

ButtonHeader.defaultProps = {
  iconColor: "white",
  disabled: false,
  onPress: () => console.log("button di klik"),
  iconName: ""
};

ButtonHeader.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  disabled: PropTypes.bool
};

export default ButtonHeader;
