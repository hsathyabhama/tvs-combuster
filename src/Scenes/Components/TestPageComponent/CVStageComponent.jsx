import React, { Component } from "react";
import { Row, Layout, Progress, Col, Button } from "antd";
import { connect } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { fcvTransferEvent } from "../../../Services/requests";
import { testParamHash } from "../../../Services/constants";
import { updateBargingEvent } from "../../../Redux/action";
import axios from "axios";
import { CaretUpOutlined } from "@ant-design/icons";

const { Initializedata, Startdata, nShutdowndata, eShutdowndata } =
  testParamHash;
class CVStageComponent extends Component {
  constructor(props) {
    super(props);
  }

  //FCV value increasing and decreasing
  comprAirFcvIncreseClick = () => {
    const body = {
      state: 1,
      fcvValue: this.props.app.chartData[0].AirFCV,
      decimalNum: this.props.app.cvStageValue.CompAirFCV,
      operationType: 1,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  comprAirFcvDecreseClick = () => {
    const body = {
      state: 1,
      fcvValue: this.props.app.chartData[0].AirFCV,
      decimalNum: this.props.app.cvStageValue.CompAirFCV,
      operationType: 2,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  mainGasIncreseClick = () => {
    const body = {
      state: 2,
      fcvValue: this.props.app.chartData[0].MainGasFCV,
      decimalNum: this.props.app.cvStageValue.MainGasFCV,
      operationType: 1,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  mainGasDecreseClick = () => {
    const body = {
      state: 2,
      fcvValue: this.props.app.chartData[0].MainGasFCV,
      decimalNum: this.props.app.cvStageValue.MainGasFCV,
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
          }}
        >
          <Row>
            <Col xs={2} sm={4}>
              <Row className="progress_box" style={{ marginRight: "10px" }}>
                <div>
                  <Row gutter={8}>
                    {/* <Col span={12}> */}
                    <div style={{ marginTop: "17%" }}>
                      <Progress
                        strokeWidth={10}
                        strokeColor="#03fc28"
                        type="circle"
                        width={65}
                        style={{ marginLeft: "2px" }}
                        percent={comprAir_FCV}
                      />
                    </div>
                    {/* </Col> */}

                    <Col
                      span={6}
                      style={{ marginTop: "23%", marginLeft: "10%" }}
                    >
                      {StartdataArray.find((it) => it.name === "Stage 3") &&
                      nShutdowndataArray.length === 0 &&
                      eShutdowndataArray.length === 0 ? (
                        <div>
                          {comprAir_FCV >= 100 ? (
                            <ImArrowUp
                              className="arrow-btn-disable"
                              size={30}
                            />
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

                    <Col
                      span={6}
                      style={{ marginTop: "23%", marginLeft: "2%" }}
                    >
                      {StartdataArray.find((it) => it.name === "Stage 3") &&
                      nShutdowndataArray.length === 0 &&
                      eShutdowndataArray.length === 0 ? (
                        <div>
                          {comprAir_FCV <= 0 ? (
                            <ImArrowDown
                              className="arrow-btn-disable"
                              size={30}
                            />
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
                  </Row>

                  <Row>
                    <div
                      className="progress_title"
                      style={{ marginTop: "5px", marginLeft: "30px" }}
                    >
                      <strong>Compressor Air FCV </strong>
                    </div>
                  </Row>
                </div>
              </Row>
            </Col>

            <Col xs={2} sm={4}>
              <Row className="progress_box" style={{ marginRight: "10px" }}>
                <div>
                  <Row gutter={8}>
                    <div style={{ marginTop: "17%" }}>
                      <Progress
                        strokeWidth={10}
                        strokeColor="#03fc28"
                        type="circle"
                        width={65}
                        style={{ marginLeft: "2px" }}
                        percent={mainGas_FCV}
                      />
                    </div>

                    <Col
                      span={6}
                      style={{ marginTop: "23%", marginLeft: "5%" }}
                    >
                      {StartdataArray.find((it) => it.name === "Stage 3") &&
                      nShutdowndataArray.length === 0 &&
                      eShutdowndataArray.length === 0 ? (
                        <div>
                          {mainGas_FCV >= 100 ? (
                            <ImArrowUp
                              className="arrow-btn-disable"
                              size={30}
                            />
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

                    <Col
                      span={6}
                      style={{ marginTop: "23%", marginLeft: "0%" }}
                    >
                      {StartdataArray.find((it) => it.name === "Stage 3") &&
                      nShutdowndataArray.length === 0 &&
                      eShutdowndataArray.length === 0 ? (
                        <div>
                          {mainGas_FCV <= 0 ? (
                            <ImArrowDown
                              className="arrow-btn-disable"
                              size={30}
                            />
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
                  </Row>

                  <Row>
                    <div
                      className="progress_title"
                      style={{ marginTop: "5px", marginLeft: "50px" }}
                    >
                      <strong>Main Gas FCV</strong>
                    </div>
                  </Row>
                </div>
              </Row>
            </Col>

            <Col xs={2} sm={4}>
              <Row className="progress_box" style={{ marginLeft: "2px" }}>
                <div>
                  <Row gutter={8}>
                    <div style={{ marginTop: "17%" }}>
                      <Progress
                        strokeWidth={10}
                        strokeColor="#03fc28"
                        type="circle"
                        width={65}
                        style={{ marginLeft: "2px" }}
                        percent={fine_FCV}
                      />
                    </div>

                    <Col
                      span={6}
                      style={{ marginTop: "23%", marginLeft: "10%" }}
                    >
                      {InitializedataArray.find(
                        (it) => it.name === "Initialize Completed"
                      ) &&
                      nShutdowndataArray.length === 0 &&
                      eShutdowndataArray.length === 0 ? (
                        <div>
                          {fine_FCV >= 100 ? (
                            <ImArrowUp
                              className="arrow-btn-disable"
                              size={30}
                            />
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

                    <Col span={6} style={{ marginTop: "23%" }}>
                      {InitializedataArray.find(
                        (it) => it.name === "Initialize Completed"
                      ) &&
                      nShutdowndataArray.length === 0 &&
                      eShutdowndataArray.length === 0 ? (
                        <div>
                          {fine_FCV <= 0 ? (
                            <ImArrowDown
                              className="arrow-btn-disable"
                              size={30}
                            />
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
                  </Row>
                  <Row>
                    <div
                      className="progress_title"
                      style={{ marginTop: "5px", marginLeft: "30px" }}
                    >
                      <strong>Fine Control Valve</strong>
                    </div>
                  </Row>
                </div>
              </Row>
            </Col>

            <Col xs={2} sm={4}>
              <Row
                gutter={8}
                className="progress_box"
                style={{ marginLeft: "10px" }}
              >
                <div style={{ marginTop: "25px" }}>
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

                  <Row>
                    <div
                      className="progress_title"
                      style={{ marginTop: "30px", marginLeft: "30%" }}
                    >
                      <strong>Purging Air</strong>
                    </div>
                  </Row>
                </div>
              </Row>
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

const mapDispatchToProps = { updateBargingEvent };

const CVStage = connect(mapStateToProps, mapDispatchToProps)(CVStageComponent);

export default CVStage;
