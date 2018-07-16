import React from "react";
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import IndexNavigator from "../navigators/";

const App = ({ dispatch, nav }) => (
  <IndexNavigator
    navigation={{
      dispatch,
      state: nav,
      addListener: createReduxBoundAddListener("root")
    }}
  />
);

App.propTypes = {
  nav: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
