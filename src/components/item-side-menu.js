import React from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions
} from "react-native";
import { Icon, H3 } from "native-base";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapperDrawerLabel: {
    alignItems: "flex-end",
    padding: width > height ? 25 : 15,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  drawerLabelSelected: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderLeftWidth: 3,
    borderColor: "white"
  },
  icon: {
    color: "white",
    marginRight: 10,
    fontSize: 24
  },
  label: {
    fontSize: 18,
    color: "white",
    textAlign: "center"
  }
});

const ItemSideMenu = ({
  onPress,
  iconName,
  label,
  active,
  backgroundColor,
  width: widthSideMenu,
  textCenter,
  labelColor
}) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View
      style={[
        styles.wrapperDrawerLabel,
        active
          ? styles.drawerLabelSelected
          : {
              backgroundColor,
              width: widthSideMenu,
              justifyContent: textCenter ? "center" : "flex-start"
            }
      ]}
    >
      {iconName && (
        <Icon
          name={iconName}
          style={[styles.icon, { color: labelColor }]}
          type={"Ionicons"}
        />
      )}
      <H3 style={[styles.label, { color: labelColor }]}>
        {label.toUpperCase()}
      </H3>
    </View>
  </TouchableNativeFeedback>
);

ItemSideMenu.defaultProps = {
  iconName: "",
  active: false,
  backgroundColor: null,
  width: "100%",
  textCenter: false,
  labelColor: "#fff"
};

ItemSideMenu.propTypes = {
  iconName: PropTypes.string,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool,
  backgroundColor: PropTypes.string,
  width: PropTypes.string,
  textCenter: PropTypes.bool,
  labelColor: PropTypes.string
};

export default ItemSideMenu;
