import React from "react";
import { Button, Icon, Header, Left, Body, Right, Title } from "native-base";
import PropTypes from "prop-types";

const HeaderNavbar = ({ onLeftPress, iconLeft, title }) => (
  <Header
    androidStatusBarColor={"#FF272E"}
    style={{ backgroundColor: "#FF272E" }}
  >
    <Left>
      <Button transparent onPress={onLeftPress}>
        <Icon name={iconLeft} type={"Ionicons"} />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right>
      <Button transparent disabled />
    </Right>
  </Header>
);

HeaderNavbar.propTypes = {
  onLeftPress: PropTypes.func.isRequired,
  iconLeft: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default HeaderNavbar;
