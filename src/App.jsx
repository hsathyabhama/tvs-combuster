import React, { Component } from "react";
import { connect } from "react-redux";
import MainComponent from "./Scenes/Pages/MainComponent";
import LoginPage from "./Scenes/Components/Forms/LoginPage";
import RegisterPage from "./Scenes/Components/Forms/RegisterPage";
import ForgotPassword from "./Scenes/Components/Forms/ForgotPassword";
import "antd/dist/antd.css";
import "../src/Styles/style.css";
import Cookies from "universal-cookie";

import { gettingDelayValue } from "./Services/requests";
import { fetchingDelayValue } from "./Redux/action";

class App extends Component {
  constructor(props) {
    super(props);
    this.stste = {};
  }

  componentDidMount() {
    gettingDelayValue((data) => {
      this.props.fetchingDelayValue(data);
    });
  }
  render() {
    const cookies = new Cookies();
    cookies.set("appState", "main", { path: "/" });

    const appState = this.props.appState;
    return (
      <div className="site-layout-background">
        {appState === "main" ? <MainComponent /> : []}
        {appState === "login" ? <LoginPage /> : []}
        {appState === "signup" ? <RegisterPage /> : []}
        {appState === "forgotPassword" ? <ForgotPassword /> : []}
        {appState === "logout" ? <LoginPage /> : []}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.app.appState,
});

const mapDispatchToProps = { fetchingDelayValue };

const appPage = connect(mapStateToProps, mapDispatchToProps)(App);
export default appPage;
