import React, { Component } from "react";
import { Row, Layout, Progress, Col, Button, Input, Alert, Space } from "antd";
import { connect } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { fcvTransferEvent } from "../../../Services/requests";
import { testParamHash } from "../../../Services/constants";
import {
  updatingAirFCVInput,
  updatingGasFCVInput,
  updatingFourInchValInput,
} from "../../../Redux/action";
import axios from "axios";

const {
  Initializedata,
  Startdata,
  nShutdowndata,
  eShutdowndata,
  airFCVValue_warning,
  gasFCVValue_warning,
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
      this.props.app.airFCVInput < 0.01 ||
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
      this.props.app.airFCVInput < 0.01 ||
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
      this.props.app.gasFCVInput < 0.01 ||
      this.props.app.gasFCVInput > 0.55
    ) {
      this.setState({
        errormsg: gasFCVValue_warning,
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
      this.props.app.gasFCVInput < 0.01 ||
      this.props.app.gasFCVInput > 0.55
    ) {
      this.setState({
        errormsg: gasFCVValue_warning,
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
    if (
      this.props.app.fourInchvalveInput === 0 ||
      this.props.app.fourInchvalveInput === undefined ||
      this.props.app.fourInchvalveInput < 0.01 ||
      this.props.app.fourInchvalveInput > 0.55
    ) {
      this.setState({
        errormsg: gasFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 3,
      fcvValue: this.props.app.chartData[0].FineFCV,
      decimalNum: this.props.app.fourInchvalveInput,
      operationType: 1,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fineCVDecreseClick = () => {
    if (
      this.props.app.fourInchvalveInput === 0 ||
      this.props.app.fourInchvalveInput === undefined ||
      this.props.app.fourInchvalveInput < 0.01 ||
      this.props.app.fourInchvalveInput > 0.55
    ) {
      this.setState({
        errormsg: gasFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 3,
      fcvValue: this.props.app.chartData[0].FineFCV,
      decimalNum: this.props.app.fourInchvalveInput,
      operationType: 2,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
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
  onChange4inchValveInput = (event) => {
    this.props.updatingFourInchValInput(event.target.value);
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
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                    percent={comprAir_FCV}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "2%" }}>
                  {StartdataArray.find((it) => it.name === "Start Initiated") &&
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
                  {StartdataArray.find((it) => it.name === "Start Initiated") &&
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
                  style={{ marginTop: "9px", marginLeft: "34%" }}
                >
                  {this.props.app.turboChargerType == 1 ? (
                    <strong>2" Air FCV </strong>
                  ) : (
                    <strong>1" Air FCV </strong>
                  )}
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
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                    percent={mainGas_FCV}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "2%" }}>
                  {StartdataArray.find((it) => it.name === "Start Initiated") &&
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
                    name="MainGas"
                    style={{ width: "75px" }}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "18%" }}>
                  {StartdataArray.find((it) => it.name === "Start Initiated") &&
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
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                    percent={fine_FCV}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "2%" }}>
                  {this.props.app.startActive == false ||
                  eShutdowndataArray.length >= 1 ? (
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

                <Col span={4} style={{ marginTop: "2%", marginLeft: "2%" }}>
                  <Input
                    value={this.props.app.fourInchvalveInput}
                    onChange={this.onChange4inchValveInput}
                    name="FourInchValve"
                    style={{ width: "75px" }}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "18%" }}>
                  {this.props.app.startActive == false ||
                  eShutdowndataArray.length >= 1 ? (
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
                  style={{ marginTop: "5px", marginLeft: "30%" }}
                >
                  <strong>Purging Air FCV</strong>
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
  updatingAirFCVInput,
  updatingGasFCVInput,
  updatingFourInchValInput,
};

const CVStage = connect(mapStateToProps, mapDispatchToProps)(CVStageComponent);

export default CVStage;
