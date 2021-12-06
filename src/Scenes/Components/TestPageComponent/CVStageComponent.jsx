import React, { Component } from "react";
import { Row, Layout, Progress, Col } from "antd";
import { connect } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { fcvTransferEvent } from "../../../Services/requests";

class CVStageComponent extends Component {
  constructor(props) {
    super(props);
  }

  fineCVIncreseClick = () => {
    let fineCVIncreseVal =
      parseInt(this.props.app.chartData[0].FineFCV) +
      parseInt(this.props.app.cvStageValue[0].FinetuneCV);

    const body = {
      state: 1,
      fcvValue: fineCVIncreseVal,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fineCVDecreseClick = () => {
    let fineCVDecreseVal =
      parseInt(this.props.app.chartData[0].FineFCV) -
      parseInt(this.props.app.cvStageValue[0].FinetuneCV);

    const body = {
      state: 1,
      fcvValue: fineCVDecreseVal,
    };
    fcvTransferEvent(body, (data) => {});
  };

  //CV msg onclick
  fuelCVIncreseClick = () => {
    let fuelCVIncreseVal =
      parseInt(this.props.app.chartData[0].FuelFCV) +
      parseInt(this.props.app.cvStageValue[0].FueltuneCV);

    const body = {
      state: 2,
      fcvValue: fuelCVIncreseVal,
    };
    fcvTransferEvent(body, (data) => {
      console.log(data);
    });
  };

  fuelCVDecreseClick = () => {
    let fuelCVDecreseVal =
      parseInt(this.props.app.chartData[0].FuelFCV) -
      parseInt(this.props.app.cvStageValue[0].FueltuneCV);

    const body = {
      state: 2,
      fcvValue: fuelCVDecreseVal,
    };
    fcvTransferEvent(body, (data) => {});
  };

  render() {
    return (
      <div>
        <Layout style={{ backgroundColor: "transparent", paddingTop: "20px" }}>
          <Row>
            <Row>
              <div className="title">
                <div style={{ fontSize: "19px", color: "white" }}>
                  <strong>FineTune CV</strong>
                </div>
              </div>
              <Col span={14}>
                <div className="statistic-block block">
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={60}
                    style={{ marginLeft: "2px" }}
                    percent={this.props.app.chartData[0].FineFCV}
                  />
                </div>
              </Col>
              <Col span={6} style={{ marginTop: "17%" }}>
                <div className="arrow-btn">
                  <ImArrowUp
                    size={30}
                    onClick={() => this.fineCVIncreseClick()}
                  />
                </div>
              </Col>
              <Col span={4} style={{ marginTop: "18%" }}>
                <div className="arrow-btn">
                  <ImArrowDown
                    size={30}
                    onClick={() => this.fineCVDecreseClick()}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <div className="title">
                <div style={{ fontSize: "19px", color: "white" }}>
                  <strong>FuelTune CV</strong>
                </div>
              </div>
              <Col span={14}>
                <div className="statistic-block block">
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={60}
                    style={{ marginLeft: "2px" }}
                    percent={this.props.app.chartData[0].FuelFCV}
                  />
                </div>
              </Col>
              <Col span={6} style={{ marginTop: "17%" }}>
                <div className="arrow-btn">
                  <ImArrowUp
                    size={30}
                    onClick={() => this.fuelCVIncreseClick()}
                  />
                </div>
              </Col>
              <Col span={4} style={{ marginTop: "18%" }}>
                <div className="arrow-btn">
                  <ImArrowDown
                    size={30}
                    onClick={() => this.fuelCVDecreseClick()}
                  />
                </div>
              </Col>
            </Row>
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
