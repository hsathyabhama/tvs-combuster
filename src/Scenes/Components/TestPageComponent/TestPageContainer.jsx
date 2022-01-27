import React, { Component } from "react";
import {
  Card,
  Col,
  Row,
  Layout,
  Divider,
  Input,
  Radio,
  Select,
  Alert,
  Button,
  Popover,
  Space,
  message,
  Menu,
} from "antd";
import {
  DownloadOutlined,
  PlaySquareOutlined,
  SyncOutlined,
  PoweroffOutlined,
  QuestionOutlined,
  RedoOutlined,
  MinusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
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
} from "../../../Redux/action";
import {
  navigateMainPage,
  updateTestIdValue,
  updateTestIdCount,
  updateTurboMode,
  updatePlcControlType,
  updateDropDown,
  startDisableEvent,
  updateCoefficientofDischarge,
  updateCorrectionFactor,
  updateorificeDiameter,
  updatePipeDiameter,
} from "../../../Redux/action";
import ListItems from "../subComponents/ListItems";
import {
  shutdownClickEvent,
  getHandleChangetestID,
  requestStatusData,
} from "../../../Services/requests";
import { connect } from "react-redux";
import axios from "axios";
import {
  testParamHash,
  turboConfigValue,
  helpPopup,
} from "../../../Services/constants";
var { Option } = Select;
const { SubMenu } = Menu;
let count = 1;

const {
  duplicate_msg,
  warning_Id,
  warning_burnermode,
  warning_controlunit,
  warning_name,
  alert_targetval,
  Initializedata,
  Startdata,
  nShutdowndata,
  eShutdowndata,
  Resetdata,
} = testParamHash;

const { installed_turbine } = turboConfigValue;

const {
  value,
  SV1_coolingAir,
  SV2_pilot_flameAir,
  SV3_naturalGas,
  SV4_gas_pilotFlame,
  SV5_diliute,
  ErrorCode,
} = helpPopup;

class TestPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turboIdDefaultValue: "Select Turbo ID",
      // turboIdValue: "Select Turbo ID",
      truboIDnum: true,
      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      turboIdval: "",
      turboIdTestCount: [],
      currentTesterItem: null,
      currentWitnessItem: null,
      isDuplicateTester: false,
      isDuplicateWitness: false,
      visible: false,
      valvestatustime: "",
      valvestatus: "",
      SV1_coolingAir: "OFF",
      SV2_pilot_flameAir: "OFF",
      SV3_naturalGas: "OFF",
      SV4_gas_pilotFlame: "OFF",
      SV5_diliute: "OFF",
      ErrorCode: 0,
      currentDateTime: "",
      turbostartname: [],
      overalldata: [],
      errormsg: "",
      tubineStatus: false,
      failedField: [],
    };

    this.interval = null;
    this.startClick = this.startClick.bind(this);
    this.addTesterItem = this.addTesterItem.bind(this);
    this.handleTesterInput = this.handleTesterInput.bind(this);
    this.deleteTesterItem = this.deleteTesterItem.bind(this);
  }

  componentDidMount() {
    //getting installed turbine name form db
    requestStatusData((data) => {
      if (typeof data !== "string" && data.length > installed_turbine) {
        this.props.navigateMainPage("turboConfig");
        this.props.updateNotifyAction("true");
      } else if (typeof data !== "string" && data.length <= installed_turbine) {
        this.props.updateNotifyAction("false");
      }
    });
  }

  //helpPopover action
  handleVisibleChange = (visible) => {
    if (this.props.app.showTarget === true) {
      this.setState({ visible });
    }
  };

  //add Tester details
  addTesterItem(e) {
    e.preventDefault();
    const { currentTesterItem, testerItems } = this.state;
    const newItem = currentTesterItem;
    const isDuplicateTester = testerItems.includes(newItem);
    if (isDuplicateTester) {
      this.setState({
        isDuplicateTester: isDuplicateTester,
      });
      message.warning(duplicate_msg);
    }
    if (newItem !== null && !isDuplicateTester) {
      this.setState({
        testerItems: [...testerItems, newItem],
        currentTesterItem: null,
      });
    }
  }

  //Tester onchange
  handleTesterInput(e) {
    this.setState({
      currentTesterItem: e.target.value,
    });
  }

  //deletion for tester
  deleteTesterItem(text) {
    const filteredItems = this.state.testerItems.filter(
      (item) => item !== text
    );
    this.setState({
      testerItems: filteredItems,
    });
  }

  //onchange for turbo charger
  onChangeTurboCharger = (e) => {
    let data = e.target.value;
    this.props.updateTurboMode(data);
  };
  //onchange for control type
  onChangeControlType = (e) => {
    let data = e.target.value;
    this.props.updatePlcControlType(data);
  };

  //select the TestId
  handleChangetestID = (value) => {
    this.setState({
      truboIDnum: true,
    });
    this.props.updateTestIdValue(value);
    const body = {
      turboIdValue: value,
    };
    let that = this;

    //getting data from axios in request page
    getHandleChangetestID(body, (data) => {
      if (data === "" || data.length === 0) {
        that.setState({
          turboIdTestCount: 1,
        });
      } else {
        that.setState({
          turboIdTestCount: data,
        });
      }
      //updating to the store called turboIdTestCount
      this.props.updateTestIdCount(this.state.turboIdTestCount);
    });
  };

  //onclick for shutdown
  shutdownClick = () => {
    shutdownClickEvent((data) => {
      //updating to the store called shutdownInitiated
      this.props.initiateShutdown(data);
    });
  };

  //getting communication value in request page
  communicationstatus() {
    axios
      .post("http://localhost:5000/initialize.php", {
        testId: this.props.app.testIdData,
        chargerType: this.props.app.turboChargerType,
        controlType: this.props.app.plcControlType,
      })
      .then((res) => {
        let CommunicationData = res.data;
        if (CommunicationData.status === "1") {
          this.props.initiateCommunication();
        } else if (CommunicationData.status === "") {
          this.props.initiateCommunicationFailed(true);
          this.setState({ failedField: true });
        }
        this.triggerInitializeTestData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //initialize event onclick
  initializeClick = () => {
    this.props.updateDropDown(null);
    if (
      this.props.app.turboChargerType === 0 ||
      this.props.app.turboChargerType === undefined
    ) {
      this.setState({
        errormsg: warning_burnermode,
      });
      return;
    }
    // if (
    //   this.props.app.plcControlType === 0 ||
    //   this.props.app.plcControlType === undefined
    // ) {
    //   this.setState({
    //     errormsg: warning_controlunit,
    //   });
    //   return;
    // }
    if (
      this.props.app.testIdValue === "" ||
      this.props.app.testIdValue === undefined ||
      this.props.app.testIdValue.length === 0
    ) {
      this.setState({
        errormsg: warning_Id,
      });
      return;
    }
    if (this.state.testerItems.length === 0) {
      this.setState({
        errormsg: warning_name,
      });
      return;
    }

    if (
      this.props.app.testIdValue !== undefined &&
      this.props.app.testIdValue !== "" &&
      this.props.app.turboChargerType !== 0 &&
      // this.props.app.plcControlType !== 0 &&
      this.state.testerItems.length !== 0 &&
      this.props.app.communication === false &&
      this.props.app.testIdValue.length !== 0
    ) {
      axios
        .post("http://localhost:5000/gettestid.php", {
          turboIdVal: this.props.app.testIdValue,
          testerItems: this.state.testerItems,
          turboMode: this.props.app.turboChargerType,
          controlUnit: this.props.app.plcControlType,
          dischargeCoefficient: this.props.app.Cdinfinite,
          corectionfactor: this.props.app.correctionFactor_b,
          orificeDiameter: this.props.app.orificeDiameter_d,
          pipeDiameter: this.props.app.PipeDiameter_D,
        })
        .then((res) => {
          let data = res.data;
          console.log(res.data);
          this.props.gettingTestIdData(data);
          this.communicationstatus();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //initialize click
  triggerInitializeTestData = () => {
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.setState({
      currentDateTime: time,
    });

    // axios
    //   .get("http://localhost:8000/testdata.php")
    //   .then(function (response) {})
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  //help event onClick
  onClickHelp = () => {
    var self = this;
    axios
      .get("http://localhost:5000/valvestatus.php")
      .then(function (response) {
        let valveData = response.data.valvestatus.split(",");
        self.setState({
          valvestatustime: response.data.testcommandsTime,
        });
        self.setState({
          valvestatus: response.data.valvestatus,
        });
        if (valveData[0] === "1") {
          self.setState({
            SV1_coolingAir: "ON",
          });
        }
        if (valveData[1] === "1") {
          self.setState({
            SV2_pilot_flameAir: "ON",
          });
        }
        if (valveData[2] === "1") {
          self.setState({
            SV3_naturalGas: "ON",
          });
        }
        if (valveData[3] === "1") {
          self.setState({
            SV4_gas_pilotFlame: "ON",
          });
        }
        if (valveData[4] === "1") {
          self.setState({
            SV5_diliute: "ON",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //input onChange values
  onChangeResettempvalue = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.getResetTemp(event.target.value);
    }
  };

  //resetRPM onclick
  onChangeResetRPMvalue = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.getResetRPM(event.target.value);
    }
  };

  //targetTemp onchange
  onChangetempvalue = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.getTargetTemp(event.target.value);
    }
  };

  //targetRPM onchange
  onChangeRPMvalue = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.getTargetRPM(event.target.value);
    }
  };

  //reset event onClick
  resetOnClick = () => {
    // if (
    //   parseInt(this.props.app.resetTemp) >
    //     parseInt(this.props.app.paramConfig[1].upperlimit) ||
    //   parseInt(this.props.app.resetRPM) >
    //     parseInt(this.props.app.paramConfig[4].upperlimit)
    // ) {
    //   message.error("Temprature or RPM exceeded the limit");
    // } else {
    axios
      .post("http://localhost:5000/reset_targetVal.php", {
        ResetRPM: this.props.app.resetRPM,
        ResetTemp: this.props.app.resetTemp,
        testId: this.props.app.testIdData,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  //start event onClick
  startClick = () => {
    if (this.props.app.communication === true) {
      // if (
      //   parseInt(this.props.app.targetTemp) >
      //     parseInt(this.props.app.paramConfig[12].upperlimit) ||
      //   parseInt(this.props.app.targetRPM) >
      //     parseInt(this.props.app.paramConfig[10].upperlimit)
      // ) {
      //   message.error("Temprature or RPM exceeded the limit");
      // } else {
      if (this.props.app.targetRPM !== "" && this.props.app.targetTemp !== "") {
        this.props.initiateShowTarget();
        this.props.startDisableEvent(true);

        //delay for receiving sensor data from plc
        axios
          .post("http://localhost:5000/start.php", {
            //set target rpm & temp value to sent plc
            testId: this.props.app.testIdData,
            targetRPM: this.props.app.targetRPM,
            targetTemp: this.props.app.targetTemp,
            initialComprAircv: this.props.app.cvStageValue.CompAirInitialValue,
            initialMainGascv: this.props.app.cvStageValue.MainGasInitialValue,
            initialFinecv: this.props.app.cvStageValue.FineCVInitialValue,
          })
          .then((res) => {
            //read the response from plc for trget temp & rpm
            let startData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.props.initiateTargetState();
      }
      // }
    }
  };

  //error msg onclick
  errorDoneClick = () => {
    this.setState({
      errormsg: "",
    });
  };

  //reSet action
  reloadAllEvents = () => {
    this.props.gettingTestIdData(0);
    this.props.stopDbInsert();
    this.props.updateTestIdCount("");
    this.props.updateTestIdValue("");
    this.props.initiateTurboStart([]);
    this.props.initiateCommunicationFailed(false);
    this.props.getResetTemp("");
    this.props.startDisableEvent(false);
    this.props.updateTurboMode(0);
    this.props.updatePlcControlType(0);

    this.setState({
      turboIdDefaultValue: "Select Turbo ID",
      turboIdValue: "Select Turbo ID",
      truboIDnum: false,
      turboMode: "",
      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      currentTesterItem: null,
      currentWitnessItem: null,
      isDuplicateTester: false,
      isDuplicateWitness: false,
      visible: false,
      valvestatustime: "",
      valvestatus: "",
      svcoolingair: "OFF",
      svpilotflameair: "OFF",
      svnaturalgastopilotflame: "OFF",
      svdilution: "OFF",
      fcvcomplressorair: "OFF",
      fcvmaingasfuel: "OFF",
      currentDateTime: "",
      turbostartname: [],
      overalldata: [],
      errormsg: "",
      turboIdTestCount: null,
      failedField: [],
    });
  };

  //alertOnclose
  alertOnClose = () => {
    this.props.initiateTargetState();
  };

  // onchange for discharge
  onChangeDischarge = (event) => {
    this.props.updateCoefficientofDischarge(event.target.value);
  };
  //onchange for CorrectionFactor
  onChangeCorrectionFactor = (event) => {
    this.props.updateCorrectionFactor(event.target.value);
  };
  //onchange for OrificeDiameter
  onChangeOrificeDiameter = (event) => {
    this.props.updateorificeDiameter(event.target.value);
  };
  // onchange for PipeDiameter
  onChangePipeDiameter = (event) => {
    this.props.updatePipeDiameter(event.target.value);
  };

  render() {
    const shutdownInitiated = this.props.app.shutdownInitiated;
    const communicationFailed = this.props.app.communicationFailed;
    const communication = this.props.app.communication;
    const targetState = this.props.app.targetState;
    const showTarget = this.props.app.showTarget;
    const targetTemp = this.props.app.targetTemp;
    const targetRPM = this.props.app.targetRPM;
    const resetTemp = this.props.app.resetTemp;
    const resetRPM = this.props.app.resetRPM;
    let turboStart = this.props.app.turboStart;

    console.log(this.props.app);

    const InitializedataArray = turboStart.filter((it) =>
      Initializedata.find((val) => val === it.name)
    );
    const StartdataArray = turboStart.filter((it) =>
      Startdata.find((val) => val === it.name)
    );

    const nShutdowndataArray = turboStart.filter((it) =>
      nShutdowndata.find((val) => val === it.name)
    );

    const eShutdowndataArray = turboStart.filter((it) =>
      eShutdowndata.find((val) => val === it.name)
    );

    const ResetdataArray = turboStart.filter((it) =>
      Resetdata.find((val) => val === it.name)
    );

    const InitializedCompletedStatus = InitializedataArray.filter(
      (word) => word.name === "Initialize Completed"
    );

    var testIdValue = null;
    if (
      this.props.app.statusData !== "no_data" &&
      this.props.app.statusData.length !== 0
    ) {
      var testIdValue = this.props.app.statusData.filter(
        (word) => word.status === "installed"
      );
    }

    return (
      <div style={{ paddingTop: "25px" }}>
        <Layout
          style={{
            backgroundColor: "#131633",
            paddingLeft: "20px",
            minHeight: "768px",
          }}
        >
          <div>
            <Menu
              style={{
                width: "100%",
                backgroundColor: "transparent",
                paddingRight: "20px",
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={[this.props.app.testDropdown]}
              theme="dark"
              mode="inline"
            >
              <SubMenu
                key="sub1"
                className="test-dropdown"
                title="Turbo Details"
                style={{ fontSize: "18px" }}
              >
                <Layout
                  style={{
                    backgroundColor: "transparent",
                    paddingTop: "0px",
                    paddingLeft: "20px",
                  }}
                >
                  <Row style={{ paddingLeft: "20px" }}>
                    <Col span={6}>
                      <Row>
                        <Col span={8} style={{ marginTop: "20px" }}>
                          <span> CE OF Discharge</span>
                        </Col>
                        <Col span={8}>
                          {communication ? (
                            <Input
                              disabled
                              name="CoEfficientofDischarge"
                              style={{ width: "150px" }}
                            />
                          ) : (
                            <Input
                              style={{ width: "150px" }}
                              name="CoEfficientofDischarge"
                              value={this.props.app.Cdinfinite}
                              onChange={this.onChangeDischarge}
                            />
                          )}
                        </Col>
                      </Row>
                    </Col>

                    <Col span={6}>
                      <Row>
                        <Col span={8} style={{ marginTop: "20px" }}>
                          <span> CorrectionFactor</span>
                        </Col>
                        <Col span={8}>
                          {communication ? (
                            <Input
                              disabled
                              name="CorrectionFactor"
                              style={{ width: "150px" }}
                            />
                          ) : (
                            <Input
                              style={{ width: "150px" }}
                              name="CorrectionFactor"
                              value={this.props.app.correctionFactor_b}
                              onChange={this.onChangeCorrectionFactor}
                            />
                          )}
                        </Col>
                      </Row>
                    </Col>

                    <Col span={6}>
                      <Row>
                        <Col span={8} style={{ marginTop: "20px" }}>
                          <span> OrificeDiameter</span>
                        </Col>
                        <Col span={8}>
                          {communication ? (
                            <Input
                              disabled
                              name="OrificeDiameter"
                              style={{ width: "150px" }}
                            />
                          ) : (
                            <Input
                              style={{ width: "150px" }}
                              name="OrificeDiameter"
                              value={this.props.app.orificeDiameter_d}
                              onChange={this.onChangeOrificeDiameter}
                            />
                          )}
                        </Col>
                      </Row>
                    </Col>

                    <Col span={6}>
                      <Row>
                        <Col span={8} style={{ marginTop: "20px" }}>
                          <span> PipeDiameter</span>
                        </Col>
                        <Col span={8}>
                          {communication ? (
                            <Input disabled style={{ width: "150px" }} />
                          ) : (
                            <Input
                              style={{ width: "150px" }}
                              value={this.props.app.PipeDiameter_D}
                              onChange={this.onChangePipeDiameter}
                            />
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "2%", paddingLeft: "20px" }}>
                    <Col xs={8}>
                      <form>
                        <Row>
                          <Col xs={5} style={{ marginTop: "20px" }}>
                            <label htmlFor="text" className="label">
                              Mode
                            </label>
                          </Col>
                          {communication ? (
                            <Radio.Group
                              name="radiogroup"
                              disabled
                              className="test-radio"
                            >
                              <Radio value={1} className="radio-btn">
                                <span className="disable-btn"> Burner 1</span>
                              </Radio>
                              <Radio value={2} className="radio-btn">
                                <span className="disable-btn"> Burner 2</span>
                              </Radio>
                            </Radio.Group>
                          ) : (
                            <Radio.Group
                              name="radiogroup"
                              defaultValue={this.props.app.turboChargerType}
                              onChange={this.onChangeTurboCharger}
                              className="test-radio"
                            >
                              <Radio value={1} className="radio-btn">
                                <span className="disable-btn">Burner 1</span>
                              </Radio>
                              <Radio value={2} className="radio-btn">
                                <span className="disable-btn">Burner 2</span>
                              </Radio>
                            </Radio.Group>
                          )}
                        </Row>
                      </form>
                    </Col>

                    {/* <Col xs={8}>
                      <form>
                        <Row>
                          <Col xs={6} style={{ marginTop: "20px" }}>
                            <label htmlFor="text" className="label">
                              Controll Unit
                            </label>
                          </Col>
                          {communication ? (
                            <Radio.Group
                              name="radiogroup"
                              disabled
                              className="test-radio"
                            >
                              <Radio value={1} className="radio-btn">
                                <span className="disable-btn"> RPM</span>
                              </Radio>
                              <Radio value={2} className="radio-btn">
                                <span className="disable-btn"> Mass Flow</span>
                              </Radio>
                            </Radio.Group>
                          ) : (
                            <Radio.Group
                              name="radiogroup"
                              defaultValue={this.props.app.plcControlType}
                              onChange={this.onChangeControlType}
                              className="test-radio"
                            >
                              <Radio value={1} className="radio-btn">
                                RPM
                              </Radio>
                              <Radio value={2} className="radio-btn">
                                Mass Flow
                              </Radio>
                            </Radio.Group>
                          )}
                        </Row>
                      </form>
                    </Col> */}
                    <Col span={8}>
                      <form>
                        <Row>
                          <Col span={5} style={{ marginTop: "20px" }}>
                            <label htmlFor="text" className="label">
                              Turbo ID
                            </label>
                          </Col>
                          <Col span={6}>
                            {communication ? (
                              <Input.Group compact>
                                <Select
                                  disabled
                                  defaultValue={this.state.turboIdDefaultValue}
                                  style={{ width: "300px" }}
                                ></Select>
                              </Input.Group>
                            ) : (
                              <Input.Group compact>
                                {testIdValue && testIdValue.length > 0 ? (
                                  <Select
                                    defaultValue={
                                      this.state.turboIdDefaultValue
                                    }
                                    style={{ width: "300px" }}
                                    onChange={this.handleChangetestID}
                                    value={this.state.turboIdValue}
                                  >
                                    {this.props.app.statusData.map((it) => (
                                      <Option
                                        key={it.turboname}
                                        value={it.turboname}
                                      >
                                        {it.turboname}
                                      </Option>
                                    ))}
                                  </Select>
                                ) : (
                                  <Space
                                    type="warning"
                                    style={{ color: "red" }}
                                  >
                                    No active turbo
                                  </Space>
                                )}
                              </Input.Group>
                            )}
                          </Col>
                        </Row>
                      </form>
                      {this.props.app.statusData ? (
                        <Row style={{ paddingLeft: "5rem" }}>
                          {this.state.truboIDnum ? (
                            <div
                              style={{
                                color: "white",
                                marginLeft: "15px",
                                marginTop: "10px",
                              }}
                            >
                              {this.props.app.testIdValue}
                              {this.props.app.testIdValue.length !== 0 ? (
                                <MinusOutlined style={{ color: "#42dbdc" }} />
                              ) : (
                                []
                              )}
                              {this.props.app.turboIdTestCount}
                            </div>
                          ) : (
                            []
                          )}
                        </Row>
                      ) : (
                        []
                      )}
                    </Col>

                    <Col span={8}>
                      <form onSubmit={(e) => this.addTesterItem(e, "tester")}>
                        <Row>
                          <Col span={4} style={{ marginTop: "20px" }}>
                            <label htmlFor="text" className="label">
                              Test Engg
                            </label>
                          </Col>
                          <Col span={15}>
                            {communication ? (
                              <Input
                                disabled
                                placeholder="Test Engineer"
                                name="Tester"
                                style={{ width: "300px" }}
                              />
                            ) : (
                              <Input
                                placeholder="Test Engineer"
                                name="Tester"
                                style={{ width: "300px" }}
                                value={this.state.currentTesterItem}
                                onChange={this.handleTesterInput}
                              />
                            )}
                          </Col>
                          <Col>
                            <button className="add-btn" type="submit">
                              +
                            </button>
                          </Col>
                        </Row>
                      </form>
                      <Row style={{ paddingLeft: "7rem" }}>
                        <ListItems
                          items={this.state.testerItems}
                          deleteItem={this.deleteTesterItem}
                        />
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    {this.state.errormsg ? (
                      <Alert
                        message={this.state.errormsg}
                        type="error"
                        action={
                          <Space>
                            <Button
                              size="small"
                              type="ghost"
                              onClick={() => this.errorDoneClick()}
                            >
                              Done
                            </Button>
                          </Space>
                        }
                      />
                    ) : (
                      ""
                    )}
                  </Row>
                </Layout>
              </SubMenu>
            </Menu>
          </div>

          <Row style={{ backgroundColor: "#131633", paddingRight: "20px" }}>
            <Divider
              style={{ borderColor: "#42dad6", backgroundColor: "#131633" }}
            />

            <Col span={3}>
              <Card
                style={{ width: 185, cursor: "pointer", borderColor: "green" }}
              >
                <div style={{ width: "300px" }}>
                  {communication === true || communicationFailed === true ? (
                    <DownloadOutlined
                      className="iconbutton1-basic"
                      style={{ marginTop: "10px" }}
                    />
                  ) : (
                    <DownloadOutlined
                      className="icon-button1"
                      style={{ marginTop: "10px" }}
                      onClick={() => this.initializeClick()}
                    />
                  )}
                  <p
                    style={{
                      color: "#42dad6",
                      fontSize: "20px",
                      paddingLeft: "20px",
                      fontWeight: "500",
                    }}
                  >
                    Initialize
                  </p>
                  {communicationFailed ? (
                    <p>
                      {this.state.failedField === true ? (
                        <Row>
                          <CloseOutlined
                            style={{ color: "red", marginTop: "1%" }}
                          />

                          <p>
                            {this.state.currentDateTime}- Communication failed
                          </p>
                        </Row>
                      ) : (
                        []
                      )}
                    </p>
                  ) : (
                    []
                  )}
                  {communication ? (
                    <p>
                      {InitializedataArray.map((item) => {
                        return (
                          <div>
                            <CheckOutlined style={{ color: "green" }} />
                            {item.testcommandsTime} - {item.name}
                          </div>
                        );
                      })}
                    </p>
                  ) : (
                    []
                  )}
                </div>
              </Card>
            </Col>

            <Col
              span={2}
              style={{
                marginTop: "30px",
                paddingRight: "10px",
                paddingLeft: "20px",
              }}
            >
              <hr></hr>
            </Col>

            <Col span={3}>
              <Card
                style={
                  InitializedCompletedStatus.length >= 1 && communication
                    ? { width: 185, cursor: "pointer", borderColor: "green" }
                    : { width: 185, borderColor: "gray" }
                }
              >
                <div style={{ width: "300px" }}>
                  {InitializedCompletedStatus.length >= 1 &&
                  communication &&
                  this.props.app.startDisable === false ? (
                    <PlaySquareOutlined
                      className="icon-button1"
                      style={{ marginTop: "10px" }}
                      onClick={() => this.startClick()}
                    />
                  ) : (
                    <PlaySquareOutlined
                      className="iconbutton1-basic"
                      style={{ marginTop: "10px" }}
                    />
                  )}
                  {InitializedCompletedStatus.length >= 1 && communication ? (
                    <p
                      style={{
                        color: "#42dad6",
                        fontSize: "20px",
                        paddingLeft: "35px",
                        fontWeight: "500",
                      }}
                    >
                      {" "}
                      Start
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "gray",
                        fontSize: "20px",
                        paddingLeft: "35px",
                        fontWeight: "500",
                      }}
                    >
                      {" "}
                      Start
                    </p>
                  )}

                  {InitializedCompletedStatus.length >= 1 && communication ? (
                    <p>
                      <Row>
                        <Col>
                          <p>Target Temp,</p>
                        </Col>
                        <Col>
                          <p> &nbsp; RPM</p>
                        </Col>
                      </Row>
                      <Row>
                        <Input
                          placeholder=""
                          value={targetTemp}
                          onChange={this.onChangetempvalue}
                          name="Target_temp"
                          style={{ width: "75px" }}
                        />

                        <Input
                          placeholder=""
                          value={targetRPM}
                          onChange={this.onChangeRPMvalue}
                          name="Targrt_RPM"
                          style={{ width: "75px" }}
                        />
                      </Row>
                    </p>
                  ) : (
                    []
                  )}

                  {targetState ? (
                    <Alert
                      className="alert_error"
                      message={alert_targetval}
                      closable
                      onClose={this.alertOnClose}
                      style={{ width: "60%" }}
                      type="error"
                    />
                  ) : (
                    ""
                  )}
                  {showTarget ? (
                    <div>
                      Target Temp : {targetTemp}, &nbsp; RPM : {targetRPM}
                    </div>
                  ) : (
                    []
                  )}

                  {showTarget ? (
                    <p style={{ height: "15px", width: "190px" }}>
                      <Row>
                        {StartdataArray.map((item) => {
                          return (
                            <div>
                              <CheckOutlined style={{ color: "green" }} />
                              {item.testcommandsTime} - {item.name}
                            </div>
                          );
                        })}
                      </Row>
                    </p>
                  ) : (
                    []
                  )}
                </div>
              </Card>
            </Col>

            <Col
              span={2}
              style={{
                marginTop: "40px",
                paddingRight: "10px",
                paddingLeft: "20px",
              }}
            >
              <hr></hr>
            </Col>

            {/* Reset Values part */}
            <Col span={3}>
              <Card
                style={
                  StartdataArray.find((it) => it.name === "Stage 3") &&
                  communication
                    ? { width: 185, cursor: "pointer", borderColor: "green" }
                    : { width: 185, borderColor: "gray" }
                }
              >
                <div style={{ width: "300px" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  communication ? (
                    <SyncOutlined
                      style={{ color: "green" }}
                      className="iconbutton1-basic"
                      style={{ marginTop: "10px" }}
                    />
                  ) : (
                    <SyncOutlined
                      className="iconbutton1-basic"
                      style={{ marginTop: "10px" }}
                    />
                  )}

                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  communication ? (
                    <p
                      style={{
                        color: "#42dad6",
                        fontSize: "19px",
                        paddingLeft: "10px",
                        fontWeight: "500",
                      }}
                    >
                      Reset Temp
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "gray",
                        fontSize: "19px",
                        paddingLeft: "10px",
                        fontWeight: "500",
                      }}
                    >
                      Reset Temp
                    </p>
                  )}

                  {communication ? (
                    <p>
                      {StartdataArray.find((it) => it.name === "Stage 3") ? (
                        <p>
                          <Row>
                            <p>Reset Temp,</p>
                            <p> &nbsp; RPM</p>
                          </Row>
                          <Row>
                            <Input
                              value={resetTemp}
                              onChange={this.onChangeResettempvalue}
                              name="ResetTemp"
                              style={{ width: "75px" }}
                            />
                            <Input
                              value={resetRPM}
                              onChange={this.onChangeResetRPMvalue}
                              name="ResetRPM"
                              style={{ width: "75px" }}
                            />
                            <button
                              className="add-btn"
                              onClick={() => this.resetOnClick()}
                            >
                              +
                            </button>
                          </Row>
                        </p>
                      ) : (
                        []
                      )}

                      <div>
                        {ResetdataArray.map((item) => {
                          return (
                            <div>
                              <CheckOutlined style={{ color: "green" }} />
                              {item.testcommandsTime} - {item.name} -{" "}
                              {item.value}
                              {(() => {
                                if (item.name === "Stage 3" && count === 1) {
                                  this.props.initiateStageThree();
                                  count++;
                                }
                              })()}
                            </div>
                          );
                        })}
                      </div>
                    </p>
                  ) : (
                    []
                  )}
                </div>
              </Card>
            </Col>

            <Col
              span={2}
              style={{
                marginTop: "40px",
                paddingRight: "10px",
                paddingLeft: "20px",
              }}
            >
              <hr></hr>
            </Col>

            <Col span={4}>
              <Card
                style={
                  showTarget || communication
                    ? { width: 185, borderColor: "red", cursor: "pointer" }
                    : { width: 185, borderColor: "gray" }
                }
              >
                <div style={{ width: "300px" }}>
                  <div>
                    {showTarget || communication ? (
                      <PoweroffOutlined
                        className="icon-button3"
                        style={{ marginTop: "10px" }}
                        onClick={() => this.shutdownClick()}
                      />
                    ) : (
                      <PoweroffOutlined
                        className="iconbutton3-basic"
                        style={{ marginTop: "10px" }}
                      />
                    )}
                  </div>
                  {showTarget || communication ? (
                    <p
                      style={{
                        color: "#42dad6",
                        fontSize: "20px",
                        paddingLeft: "15px",
                        fontWeight: "500",
                      }}
                    >
                      Shutdown
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "gray",
                        fontSize: "20px",
                        paddingLeft: "15px",
                        fontWeight: "500",
                      }}
                    >
                      Shutdown
                    </p>
                  )}
                </div>
              </Card>

              {shutdownInitiated ? (
                <p style={{ height: "15px", color: "white", marginTop: "7px" }}>
                  <Row>
                    {nShutdowndataArray.map((item) => {
                      return (
                        <div>
                          <CheckOutlined style={{ color: "green" }} />
                          {item.testcommandsTime} - {item.name}
                        </div>
                      );
                    })}
                  </Row>
                </p>
              ) : (
                []
              )}

              {/* E-shutdown */}
              {showTarget ? (
                <p style={{ height: "15px", color: "white", marginTop: "7px" }}>
                  <Row>
                    {eShutdowndataArray.map((item) => {
                      return (
                        <div>
                          <CheckOutlined style={{ color: "green" }} />
                          {item.testcommandsTime} - {item.name}
                        </div>
                      );
                    })}
                  </Row>
                </p>
              ) : (
                []
              )}
            </Col>

            <Col span={3}>
              <Card
                style={
                  (nShutdowndataArray.length >= 1 &&
                    eShutdowndataArray.length >= 1) ||
                  nShutdowndataArray.length >= 2 ||
                  eShutdowndataArray.length >= 2 ||
                  (showTarget === false && communication === false)
                    ? { width: 100, cursor: "pointer", borderColor: "green" }
                    : { width: 100, borderColor: "gray" }
                }
              >
                <div>
                  {(nShutdowndataArray.length >= 1 &&
                    eShutdowndataArray.length >= 1) ||
                  nShutdowndataArray.length >= 2 ||
                  eShutdowndataArray.length >= 2 ||
                  (showTarget === false && communication === false) ? (
                    <RedoOutlined
                      className="icon-button2"
                      style={{ marginTop: "10px" }}
                      onClick={() => this.reloadAllEvents()}
                    />
                  ) : (
                    <RedoOutlined
                      className="iconbutton2-basic"
                      style={{ marginTop: "10px" }}
                    />
                  )}
                </div>

                {(nShutdowndataArray.length >= 1 &&
                  eShutdowndataArray.length >= 1) ||
                nShutdowndataArray.length >= 2 ||
                eShutdowndataArray.length >= 2 ||
                (showTarget === false && communication === false) ||
                communicationFailed === true ? (
                  <p
                    style={{
                      color: "#42dad6",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    Reset
                  </p>
                ) : (
                  <p
                    style={{
                      color: "gray",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    Reset
                  </p>
                )}
              </Card>
            </Col>

            <Col span={2}>
              <Card
                style={
                  showTarget
                    ? {
                        width: 100,
                        cursor: "pointer",
                        borderColor: "green",
                      }
                    : { width: 100, borderColor: "gray" }
                }
              >
                <Popover
                  title={
                    <div>
                      <p style={{ fontWeight: "bold" }}>
                        {value} {this.state.valvestatustime}
                      </p>
                    </div>
                  }
                  content={
                    <div>
                      <p>
                        {SV1_coolingAir} {this.state.SV1_coolingAir}
                      </p>
                      <p>
                        {SV2_pilot_flameAir} {this.state.SV2_pilot_flameAir}
                      </p>
                      <p>
                        {SV3_naturalGas} {this.state.SV3_naturalGas}
                      </p>
                      <p>
                        {SV4_gas_pilotFlame} {this.state.SV4_gas_pilotFlame}
                      </p>
                      <p>
                        {SV5_diliute} {this.state.SV5_diliute}
                      </p>

                      <p>
                        {ErrorCode} {this.state.ErrorCode}
                      </p>
                    </div>
                  }
                  trigger="click"
                  placement="bottomRight"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  <div>
                    {showTarget ? (
                      <QuestionOutlined
                        className="icon-button4"
                        style={{ marginTop: "10px" }}
                        onClick={this.onClickHelp}
                      />
                    ) : (
                      <QuestionOutlined
                        className="iconbutton4-basic"
                        style={{ marginTop: "10px" }}
                      />
                    )}
                  </div>
                  {showTarget ? (
                    <p
                      style={{
                        color: "#42dad6",
                        fontSize: "20px",
                        fontWeight: "500",
                      }}
                    >
                      Help
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "gray",
                        fontSize: "20px",
                        fontWeight: "500",
                      }}
                    >
                      Help
                    </p>
                  )}
                </Popover>
              </Card>
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  navigateMainPage,
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
  updateTestIdValue,
  updateTestIdCount,
  updateTurboMode,
  updatePlcControlType,
  updateDropDown,
  updateNotifyAction,
  startDisableEvent,
  gettingTestIdData,
  updateCoefficientofDischarge,
  updateCorrectionFactor,
  updateorificeDiameter,
  updatePipeDiameter,
};

const TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPageContainer);
export default TestContainer;
