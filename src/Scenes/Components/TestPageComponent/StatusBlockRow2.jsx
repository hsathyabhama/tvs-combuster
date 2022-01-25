import React, { Component } from "react";
import { Col, Row, Progress } from "antd";
import { connect } from "react-redux";
import { dashboardSensor } from "../../../Services/constants";
import CVStageComponent from "./CVStageComponent";

const { sensorLabel_row2, targetKeysVal_row2 } = dashboardSensor;

class StatusBlockRow2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
    };
  }

  render() {
    let persons;
    let persons1;
    let filteredData;
    let filteredData1;
    const dashboardDataNumArr = targetKeysVal_row2;

    {
      this.props.app.chartData[0]
        ? (filteredData = Object.values(this.props.app.chartData[0]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredData = []);
    }

    {
      this.props.app.chartData[1]
        ? (filteredData1 = Object.values(this.props.app.chartData[1]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredData1 = []);
    }

    {
      this.props.app.chartData[0]
        ? (persons = filteredData)
        : (persons = [0, 0, 0]);
    }

    {
      this.props.app.chartData[1]
        ? (persons1 = filteredData1)
        : (persons1 = [0, 0, 0]);
    }

    return (
      <div style={{ marginTop: "25px" }}>
        <Row>
          {persons.map((It, y) => (
            <Col style={{ paddingRight: "10px", width: "230px" }}>
              <div className="statistic-block block">
                <Row className="progress-details d-flex align-items-end justify-content-between">
                  {/* up and down arrow column */}
                  <Col>
                    {persons1[y] < It ? (
                      <img
                        src="./images/up-arrow-1.gif"
                        alt="Arrow"
                        style={{
                          width: "20px",
                          height: "30px",
                          marginTop: "8px",
                          marginLeft: "30px",
                        }}
                      />
                    ) : (
                      <img
                        src="./images/down-arrow-1.gif"
                        alt="Arrow"
                        style={{
                          width: "20px",
                          height: "30px",
                          marginTop: "8px",
                          marginLeft: "30px",
                        }}
                      />
                    )}
                  </Col>

                  {/* value displaying column */}
                  <Col
                    className="number dashtext-1"
                    style={{
                      paddingLeft: "20%",
                      fontSize: "17px",
                      color: "lime",
                    }}
                  >
                    {/* getting the color from the color array */}
                    <span>{It}</span>
                  </Col>
                </Row>

                <div className="progress progress-template">
                  <div
                    role="progressbar"
                    style={{
                      width: "100%",
                      ariavaluenow: "30",
                      ariavaluemin: "0",
                      ariavaluemax: "100",
                    }}
                    className="progress-bar progress-bar-template dashbg-1"
                  ></div>
                </div>
                {/*  Title column */}
                <div className="title">
                  <div style={{ fontSize: "8px" }}>
                    <strong>{sensorLabel_row2[y]}</strong>
                  </div>
                </div>
              </div>
            </Col>
          ))}

          <Col>
            <CVStageComponent />
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {};
const statuspage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBlockRow2);
export default statuspage;
