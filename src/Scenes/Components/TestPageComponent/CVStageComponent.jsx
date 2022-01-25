import React, { Component } from "react";
import { Row, Layout, Progress, Col } from "antd";
import { connect } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { fcvTransferEvent } from "../../../Services/requests";
import { testParamHash } from "../../../Services/constants";

const { Initializedata, Startdata, nShutdowndata, eShutdowndata } =
  testParamHash;
class CVStageComponent extends Component {
  constructor(props) {
    super(props);
  }

  //FCV value increasing and decreasing
  comprAirFcvIncreseClick = () => {
    let comprAirIncreseVal =
      parseFloat(this.props.app.chartData[0].AirFCV) +
      parseFloat(this.props.app.cvStageValue.CompAirFCV);

    const body = {
      state: 1,
      fcvValue: comprAirIncreseVal,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  comprAirFcvDecreseClick = () => {
    let compeAirDecreseVal =
      parseFloat(this.props.app.chartData[0].AirFCV) -
      parseFloat(this.props.app.cvStageValue.CompAirFCV);

    const body = {
      state: 1,
      fcvValue: compeAirDecreseVal,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  mainGasIncreseClick = () => {
    let mainGasIncreseVal =
      parseFloat(this.props.app.chartData[0].MainGasFCV) +
      parseFloat(this.props.app.cvStageValue.MainGasFCV);

    const body = {
      state: 2,
      fcvValue: mainGasIncreseVal,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  mainGasDecreseClick = () => {
    let mainGasDecreseVal =
      parseFloat(this.props.app.chartData[0].MainGasFCV) -
      parseFloat(this.props.app.cvStageValue.MainGasFCV);

    const body = {
      state: 2,
      fcvValue: mainGasDecreseVal,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fineCVIncreseClick = () => {
    let fineCVIncreseVal =
      parseFloat(this.props.app.chartData[0].FineFCV) +
      parseFloat(this.props.app.cvStageValue.FineControlValve);

    const body = {
      state: 3,
      fcvValue: fineCVIncreseVal,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fineCVDecreseClick = () => {
    let fineCVDecreseVal =
      parseFloat(this.props.app.chartData[0].FineFCV) -
      parseFloat(this.props.app.cvStageValue.FineControlValve);

    const body = {
      state: 3,
      fcvValue: fineCVDecreseVal,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  render() {
    let comprAir_FCV = this.props.app.chartData[0].AirFCV;
    let mainGas_FCV = this.props.app.chartData[0].MainGasFCV;
    let fine_FCV = this.props.app.chartData[0].FineFCV;
    let turboStart = this.props.app.turboStart;
    // let turboStart = [];
    // if (this.props.app.turboStart) {
    //   turboStart = this.props.app.turboStart;
    // }

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
            <Col span={8}>
              <Row className="progress_box" style={{ marginRight: "10px" }}>
                <div>
                  <Row gutter={8}>
                    <Col span={12}>
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
                    </Col>

                    <Col span={6} style={{ marginTop: "17%" }}>
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

                    <Col span={6} style={{ marginTop: "18%" }}>
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
                      style={{ marginTop: "5px" }}
                    >
                      <strong>Compressor Air FCV </strong>
                    </div>
                  </Row>
                </div>
              </Row>
            </Col>

            <Col span={8}>
              <Row className="progress_box" style={{ marginRight: "10px" }}>
                <div>
                  <Row gutter={8}>
                    <Col span={12}>
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
                    </Col>

                    <Col span={6} style={{ marginTop: "17%" }}>
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

                    <Col span={6} style={{ marginTop: "18%" }}>
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
                      style={{ marginTop: "5px" }}
                    >
                      <strong>Main Gas FCV</strong>
                    </div>
                  </Row>
                </div>
              </Row>
            </Col>

            <Col span={8}>
              <Row className="progress_box" style={{ marginLeft: "px" }}>
                <div>
                  <Row gutter={8}>
                    <Col span={12}>
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
                    </Col>
                    <Col span={6} style={{ marginTop: "17%" }}>
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

                    <Col span={6} style={{ marginTop: "18%" }}>
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
                      style={{ marginTop: "5px" }}
                    >
                      <strong>Fine Control Valve</strong>
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

const mapDispatchToProps = {};

const CVStage = connect(mapStateToProps, mapDispatchToProps)(CVStageComponent);

export default CVStage;
