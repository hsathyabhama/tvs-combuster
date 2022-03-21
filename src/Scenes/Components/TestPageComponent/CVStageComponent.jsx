import React, { Component } from "react";
import { Row, Layout, Progress, Col, Button, Input, Alert, Space } from "antd";
import { connect } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { fcvTransferEvent } from "../../../Services/requests";
import { testParamHash } from "../../../Services/constants";
import {
  updateBargingEvent,
  updatingAirFCVInput,
  updatingGasFCVInput,
} from "../../../Redux/action";
import axios from "axios";
import { CaretUpOutlined } from "@ant-design/icons";

const {
  Initializedata,
  Startdata,
  nShutdowndata,
  eShutdowndata,
  airFCVValue_warning,
} = testParamHash;

class CVStageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errormsg: "",
    };
  }

  //FCV value increasing and decreasing
  comprAirFcvIncreseClick = () => {
    if (
      this.props.app.airFCVInput === 0 ||
      this.props.app.airFCVInput === undefined ||
      this.props.app.airFCVInput < 0.1 ||
      this.props.app.airFCVInput > 2
    ) {
      this.setState({
        errormsg: airFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 1,
      fcvValue: this.props.app.chartData[0].AirFCV,
      decimalNum: this.props.app.airFCVInput,
      operationType: 1,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  comprAirFcvDecreseClick = () => {
    if (
      this.props.app.airFCVInput === 0 ||
      this.props.app.airFCVInput === undefined ||
      this.props.app.airFCVInput < 0.1 ||
      this.props.app.airFCVInput > 2
    ) {
      this.setState({
        errormsg: airFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 1,
      fcvValue: this.props.app.chartData[0].AirFCV,
      decimalNum: this.props.app.airFCVInput,
      operationType: 2,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  mainGasIncreseClick = () => {
    if (
      this.props.app.gasFCVInput === 0 ||
      this.props.app.gasFCVInput === undefined ||
      this.props.app.gasFCVInput < 0.1 ||
      this.props.app.gasFCVInput > 0.55
    ) {
      this.setState({
        errormsg: airFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 2,
      fcvValue: this.props.app.chartData[0].MainGasFCV,
      decimalNum: this.props.app.gasFCVInput,
      operationType: 1,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  mainGasDecreseClick = () => {
    if (
      this.props.app.gasFCVInput === 0 ||
      this.props.app.gasFCVInput === undefined ||
      this.props.app.gasFCVInput < 0.1 ||
      this.props.app.gasFCVInput > 0.55
    ) {
      this.setState({
        errormsg: airFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 2,
      fcvValue: this.props.app.chartData[0].MainGasFCV,
      decimalNum: this.props.app.gasFCVInput,
      operationType: 2,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fineCVIncreseClick = () => {
    const body = {
      state: 3,
      fcvValue: this.props.app.chartData[0].FineFCV,
      decimalNum: this.props.app.cvStageValue.FineControlValve,
      operationType: 1,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fineCVDecreseClick = () => {
    const body = {
      state: 3,
      fcvValue: this.props.app.chartData[0].FineFCV,
      decimalNum: this.props.app.cvStageValue.FineControlValve,
      operationType: 2,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  purgingClick = () => {
    if (this.props.app.bargingEvent == false) {
      this.props.updateBargingEvent();
      axios
        .post("http://localhost:5000/purging.php", {
          bargingValue: 1,
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.updateBargingEvent();
      axios
        .post("http://localhost:5000/purging.php", {
          bargingValue: 2,
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //error msg onclick
  errorDoneClick = () => {
    this.setState({
      errormsg: "",
    });
  };

  onChangeFineAirInput = (event) => {
    this.props.updatingAirFCVInput(event.target.value);
  };
  onChangeMainGasInput = (event) => {
    this.props.updatingGasFCVInput(event.target.value);
  };

  render() {
    let comprAir_FCV = this.props.app.chartData[0].AirFCV;
    let mainGas_FCV = this.props.app.chartData[0].MainGasFCV;
    let fine_FCV = this.props.app.chartData[0].FineFCV;
    let turboStart = this.props.app.turboStart;

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

    return (
      <div>
        <Layout
          style={{
            backgroundColor: "transparent",
            marginTop: "25px",
          }}
        >
          <Row gutter={[16, 24]}>
            <Col xl={6} style={{ marginLeft: "5px" }}>
              <Row
                gutter={[8, 4]}
                className="progress_box"
                style={{ marginRight: "10px" }}
              >
                <Col span={6}>
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={65}
                    style={{ marginLeft: "2px" }}
                    percent={comprAir_FCV}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "2%" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {comprAir_FCV >= 100 ? (
                        <ImArrowUp className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowUp
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.comprAirFcvIncreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowUp size={30} />
                    </div>
                  )}
                </Col>

                <Col span={4} style={{ marginTop: "2%", marginLeft: "2%" }}>
                  <Input
                    value={this.props.app.airFCVInput}
                    onChange={this.onChangeFineAirInput}
                    name="FineAir"
                    style={{ width: "75px" }}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "18%" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {comprAir_FCV <= 0 ? (
                        <ImArrowDown className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowDown
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.comprAirFcvDecreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowDown size={30} />
                    </div>
                  )}
                </Col>

                <Row
                  className="progress_title"
                  style={{ marginTop: "9px", marginLeft: "25%" }}
                >
                  <strong>Compressor Air FCV </strong>
                </Row>
              </Row>
            </Col>

            <Col xl={6}>
              <Row
                gutter={[8, 4]}
                className="progress_box"
                style={{ marginRight: "10px" }}
              >
                <Col span={6}>
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={65}
                    style={{ marginLeft: "2px" }}
                    percent={mainGas_FCV}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "2%" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {mainGas_FCV >= 100 ? (
                        <ImArrowUp className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowUp
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.mainGasIncreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowUp size={30} />
                    </div>
                  )}
                </Col>

                <Col span={4} style={{ marginTop: "2%", marginLeft: "2%" }}>
                  <Input
                    value={this.props.app.gasFCVInput}
                    onChange={this.onChangeMainGasInput}
                    name="FineAir"
                    style={{ width: "75px" }}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "18%" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {mainGas_FCV <= 0 ? (
                        <ImArrowDown className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowDown
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.mainGasDecreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowDown size={30} />
                    </div>
                  )}
                </Col>

                <Row
                  className="progress_title"
                  style={{ marginTop: "5px", marginLeft: "30%" }}
                >
                  <strong>Main Gas FCV</strong>
                </Row>
              </Row>
            </Col>

            <Col xl={5}>
              <Row
                gutter={[8, 4]}
                className="progress_box"
                style={{ marginRight: "10px" }}
              >
                <Col span={6}>
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={65}
                    style={{ marginLeft: "2px" }}
                    percent={fine_FCV}
                  />
                </Col>

                <Col span={6} style={{ marginTop: "5%", marginLeft: "12%" }}>
                  {InitializedataArray.find(
                    (it) => it.name === "Initialize Completed"
                  ) &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {fine_FCV >= 100 ? (
                        <ImArrowUp className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowUp
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.fineCVIncreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowUp size={30} />
                    </div>
                  )}
                </Col>

                <Col span={6} style={{ marginTop: "5%", marginLeft: "12%" }}>
                  {InitializedataArray.find(
                    (it) => it.name === "Initialize Completed"
                  ) &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {fine_FCV <= 0 ? (
                        <ImArrowDown className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowDown
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.fineCVDecreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowDown size={30} />
                    </div>
                  )}
                </Col>

                <Row
                  className="progress_title"
                  style={{ marginTop: "6px", marginLeft: "25%" }}
                >
                  <strong>Fine Control Valve</strong>
                </Row>
              </Row>
            </Col>

            <Col xl={4}>
              <Row gutter={[8, 4]} className="progress_box">
                <Button
                  type="primary"
                  shape="round"
                  size={"large"}
                  className={
                    this.props.app.bargingEvent == false
                      ? "barger_btn"
                      : "barger_btn2"
                  }
                  icon={<CaretUpOutlined />}
                  style={{ marginLeft: "20%", width: "8em" }}
                  disabled={this.props.app.bargingButtonActivity}
                  onClick={() => this.purgingClick()}
                >
                  Purging
                </Button>

                <Row
                  className="progress_title"
                  style={{ marginTop: "30px", marginLeft: "30%" }}
                >
                  <strong>Purging Air</strong>
                </Row>
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  updateBargingEvent,
  updatingAirFCVInput,
  updatingGasFCVInput,
};

const CVStage = connect(mapStateToProps, mapDispatchToProps)(CVStageComponent);

export default CVStage;
