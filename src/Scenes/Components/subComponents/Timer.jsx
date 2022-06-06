import React, { Component } from "react";
import { connect } from "react-redux";
import { testParamHash } from "../../../Services/constants";
import {
  initiateShutdown,
  initiateShowReset,
  initiateCommunicationFailed,
  initiateCommunication,
  initiateTargetState,
  initiateShowTarget,
  initiateTurboStart,
  initiateStageThree,
  getTargetRPM,
  getTargetTemp,
  getResetTemp,
  getResetRPM,
  stopDbInsert,
  updateNotifyAction,
  gettingTestIdData,
  changeTimerState,
  changeStartState,
} from "../../../Redux/action";
import {
  navigateMainPage,
  updateTestIdValue,
  updateTestIdCount,
  updateTurboMode,
  updateDropDown,
  startDisableEvent,
  updateLubeOilValue,
  updateChartData,
  updateResetButtonClick,
} from "../../../Redux/action";
import axios from "axios";

const { nShutdowndata, eShutdowndata } = testParamHash;
class Example extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 10 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.props.changeTimerState(timeLeftVar);
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  reloadAllEvents = () => {
    this.props.changeStartState(false);
    this.props.initiateTurboStart([]);
    axios
      .post("http://localhost:5000/reset.php", {})
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      turboState: this.props.app.turboChargerType,
    });

    let chartArray = [0, 0, 0, 0, 0, 0, 0];
    this.props.updateChartData(chartArray);
    this.props.gettingTestIdData(0);
    this.props.stopDbInsert();
    this.props.updateTestIdCount("");
    this.props.updateTestIdValue("");

    this.props.initiateCommunicationFailed(false);
    this.props.getResetTemp("");
    this.props.startDisableEvent(false);
    this.props.updateTurboMode(1);
  };
  // setInterval(
  //   () => {
  //   const nShutdowndataArray = this.props.app.turboStart.filter((it) =>
  //     nShutdowndata.find((val) => val === it.name)
  //   );

  //   const eShutdowndataArray = this.props.app.turboStart.filter((it) =>
  //     eShutdowndata.find((val) => val === it.name)
  //   );

  //   if (
  //     this.props.app.testIdData !== 0 &&
  //     nShutdowndataArray.length < 2 &&
  //     eShutdowndataArray.length < 2
  //   ) {
  //     // getSensorData((data) => {
  //     //   let val = data;
  //     // });
  //     if (this.props.app.communication === true) {
  //       // this.props.initiateTurboStart(this.props.app.chartData[7]);
  //     }
  //   }
  // });

  interval = setInterval(() => {
    let turboStart = [];
    if (this.props.app.turboStart) {
      turboStart = this.props.app.turboStart;
    }

    const nShutdowndataArray = turboStart.filter((it) =>
      nShutdowndata.find((val) => val === it.name)
    );

    const eShutdowndataArray = turboStart.filter((it) =>
      eShutdowndata.find((val) => val === it.name)
    );

    if (nShutdowndataArray.length >= 1 || eShutdowndataArray.length >= 1) {
      this.startTimer();
    } else {
      return;
    }
    if (this.state.time.m === 0 && this.state.time.s == 0) {
      // this.reloadAllEvents();
      return;
    }
  }, 2000);

  render() {
    return (
      <div>
        <button onClick={this.startTimer}>Start</button>
        {this.state.time.m === 0 && this.state.time.s == 0 ? (
          <span style={{ color: "red" }}>
            {" "}
            m: {this.state.time.m} s: {this.state.time.s}
          </span>
        ) : (
          <span style={{ color: "white" }}>
            {" "}
            Minutes: {this.state.time.m} s: {this.state.time.s}
          </span>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  initiateShutdown,
  initiateShowReset,
  initiateCommunicationFailed,
  initiateCommunication,
  initiateTargetState,
  initiateShowTarget,
  initiateTurboStart,
  initiateStageThree,
  getTargetRPM,
  getTargetTemp,
  getResetTemp,
  getResetRPM,
  stopDbInsert,
  updateNotifyAction,
  gettingTestIdData,
  changeStartState,
  navigateMainPage,
  updateTestIdValue,
  updateTestIdCount,
  updateTurboMode,
  updateDropDown,
  startDisableEvent,
  updateLubeOilValue,
  updateChartData,
  updateResetButtonClick,
  changeTimerState,
};

const Timer = connect(mapStateToProps, mapDispatchToProps)(Example);

export default Timer;
