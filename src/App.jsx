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
import {
  fetchingDelayValue,
  fetchingCvstageValue,
  updatingAirFCVInput,
  updatingGasFCVInput,
  updatingFourInchValInput,
} from "./Redux/action";

class App extends Component {
  componentDidMount() {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });

    gettingDelayValue((data) => {
      this.props.fetchingDelayValue(data[0].Delay * 1000);
      this.props.fetchingCvstageValue(data[0]);
      this.props.updatingAirFCVInput(data[0].CompAirFCV);
      this.props.updatingGasFCVInput(data[0].MainGasFCV);
      this.props.updatingFourInchValInput(data[0].FourInchControlvalve);
    });
  }

  render() {
    const cookies = new Cookies();
    cookies.set("appState", "main", { path: "/" });

    const appState = this.props.appState;
    return (
      <div className="site-layout-background">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
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

const mapDispatchToProps = {
  fetchingDelayValue,
  fetchingCvstageValue,
  updatingAirFCVInput,
  updatingGasFCVInput,
  updatingFourInchValInput,
};

const appPage = connect(mapStateToProps, mapDispatchToProps)(App);
export default appPage;
