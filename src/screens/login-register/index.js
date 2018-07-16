import React, { Component } from "react";
import {
  View,
  Text,
  BackHandler,
  Image,
  StatusBar,
  Keyboard,
  Animated,
  Easing
} from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import validate from "validate.js";
import TextInputAnimation from "../../components/text-input-animation";
import ButtonAnimation from "../../components/button-animation";
import lang from "./language/login-lang";
import styles from "./css/login-css";
import { doUserLogin, doUserSignup } from "../../ducks/user-duck";

const ERROR_MESSAGE_STILL_EXIST = "ERROR_MESSAGE_STILL_EXIST";
const ERROR_MESSAGE_REQUIRED = "ERROR_MESSAGE_REQUIRED";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errorMessageEmail: "",
      password: "",
      errorMessagePassword: "",
      showPassword: false,
      editableForm: true
    };
    this.resizeHeaderImage = new Animated.Value(0);
  }
  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this.doResizeHeaderImage(true)
    );
    this.keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this.doResizeHeaderImage(false)
    );
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleHardwareBackPress
    );
  }
  componentDidUpdate(previousProps) {
    if (
      (previousProps.user.loadingSignin !== this.props.user.loadingSignin &&
        this.props.user.loadingSignin === false) ||
      (previousProps.user.loadingSignup !== this.props.user.loadingSignup &&
        this.props.user.loadingSignup === false)
    ) {
      this.setFormValue("editable", true);
    }
  }
  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleHardwareBackPress
    );
  }
  setFormValue = (stateName, value) => {
    let error = {
      errorMessageEmail: this.state.errorMessageEmail,
      errorMessagePassword: this.state.errorMessagePassword
    };
    if (
      stateName === "email" &&
      (typeof validate(
        { from: value },
        {
          from: {
            email: true
          }
        }
      ) !== "undefined" ||
        value === "")
    ) {
      error = {
        ...error,
        errorMessageEmail: lang.emailNotValid
      };
    } else if (stateName === "email" && value !== "") {
      error = {
        ...error,
        errorMessageEmail: ""
      };
    } else if (stateName === "password" && value === "") {
      error = {
        ...error,
        errorMessagePassword: lang.passwordIsRequired
      };
    } else if (stateName === "password" && value !== "") {
      error = {
        ...error,
        errorMessagePassword: ""
      };
    }
    this.setState({
      ...this.state,
      ...error,
      [stateName]: value
    });
  };
  togglePassword = () => {
    this.setFormValue("showPassword", !this.state.showPassword);
  };
  handleHardwareBackPress = () => false;
  doValidateBeforeSubmit = () => {
    return new Promise((resolve, reject) => {
      try {
        const {
          email,
          password,
          errorMessageEmail,
          errorMessagePassword
        } = this.state;
        if (errorMessageEmail !== "" && errorMessagePassword !== "")
          throw ERROR_MESSAGE_STILL_EXIST;
        if (email === "" && password === "") throw ERROR_MESSAGE_REQUIRED;
        this.setState(
          {
            ...this.state,
            editable: false
          },
          resolve
        );
      } catch (e) {
        reject(e);
      }
    });
  };
  doSubmitSignin = () => {
    const { email, password } = this.state;
    this.doValidateBeforeSubmit()
      .then(() => {
        this.props.doUserLogin({ email, password });
      })
      .catch(e => {
        if (e === ERROR_MESSAGE_REQUIRED) {
          this.setState({
            ...this.state,
            errorMessageEmail: lang.emailIsRequired,
            errorMessagePassword: lang.passwordIsRequired
          });
        }
      });
  };
  doSubmitSignup = () => {
    const { email, password } = this.state;
    this.doValidateBeforeSubmit()
      .then(() => {
        this.props.doUserSignup({ email, password });
      })
      .catch(e => {
        if (e === ERROR_MESSAGE_REQUIRED) {
          this.setState({
            ...this.state,
            errorMessageEmail: lang.emailIsRequired,
            errorMessagePassword: lang.passwordIsRequired
          });
        }
      });
  };
  doResizeHeaderImage = isKeyboardOpen => {
    Animated.timing(this.resizeHeaderImage, {
      toValue: isKeyboardOpen ? 1 : 0,
      duration: 200,
      easing: Easing.linear
    }).start();
  };
  render() {
    const { loadingSignin, loadingSignup } = this.props.user;
    const heightHeader = this.resizeHeaderImage.interpolate({
      inputRange: [0, 1],
      outputRange: [200, 100]
    });
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#FF272E"} />
        <Animated.View
          style={[
            styles.header,
            {
              height: heightHeader
            }
          ]}
        >
          <Transition shared={"circle"}>
            <Image
              resizeMode={"cover"}
              source={require("../../../assets/logo.png")}
            />
          </Transition>
        </Animated.View>
        <View style={styles.form}>
          <View style={styles.wrapperInput}>
            <TextInputAnimation
              editable={!this.state.loading}
              value={this.state.email}
              label={lang.email}
              labelColor={"rgba(0,0,0,0.5)"}
              underlineColorAndroid={"#ddd"}
              focusColor={"#FF272E"}
              placeholder={lang.exampleEmail}
              placeholderTextColor={"#ddd"}
              onChangeText={this.setFormValue.bind(this, "email")}
              errorMessage={this.state.errorMessageEmail}
            />
            <TextInputAnimation
              editable={!this.state.loading}
              value={this.state.password}
              label={lang.password}
              secureTextEntry
              togglePassword
              onTogglePassword={this.togglePassword}
              labelColor={"rgba(0,0,0,0.5)"}
              underlineColorAndroid={"#ddd"}
              focusColor={"#FF272E"}
              placeholder={lang.examplePassword}
              placeholderTextColor={"#ddd"}
              onChangeText={this.setFormValue.bind(this, "password")}
              errorMessage={this.state.errorMessagePassword}
            />
          </View>
          <ButtonAnimation
            animation
            onPress={this.doSubmitSignin}
            disabled={loadingSignin}
            label={lang.login}
            backgroundColor={"#FF272E"}
            labelColor={"white"}
          />
          <View style={styles.wrapperSeparator}>
            <View style={styles.lineSeparator} />
            <Text style={styles.smallLabel}>{lang.or}</Text>
            <View style={styles.lineSeparator} />
          </View>
          <ButtonAnimation
            animation
            onPress={this.doSubmitSignup}
            disabled={loadingSignup}
            label={lang.register}
            backgroundColor={"#2E95DB"}
            labelColor={"white"}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: {
    loadingSignin: user.loadingSignin,
    loadingSignup: user.loadingSignup
  }
});

Login.propTypes = {
  user: PropTypes.object.isRequired,
  doUserLogin: PropTypes.func.isRequired,
  doUserSignup: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  doUserLogin,
  doUserSignup
})(Login);
