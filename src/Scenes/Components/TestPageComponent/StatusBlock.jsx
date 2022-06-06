import React, { Component } from "react";
import { Col, Row, Progress } from "antd";
import { connect } from "react-redux";
import { dashboardSensor } from "../../../Services/constants";
import { getTableView } from "../../../Services/requests";
const { sensorLabel, n_shutdown, e_shutdown, live, offline } = dashboardSensor;

const styles = {
  online: {
    color: "#03fc28",
    position: "absolute",
    right: 20,
    top: 83,
    fontWeight: "bold",
    fontSize: "calc(7px + 0.8vw)",
  },
  offline: {
    color: "red",
    position: "absolute",
    right: 20,
    top: 83,
    fontWeight: "bold",
    fontSize: "calc(7px + 0.8vw)",
  },
};

class StatusBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: this.props.cardlist,
      persons: [],
      tabledata: [],
      filteredTableData: [],
    };
  }

  componentDidMount() {
    //getting data from DB once
    getTableView((data) => {
      const arrStr = this.props.app.targetKeys; //covertion string to number
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      this.setState({
        tabledata: data,
      });
      //filtering the limit values
      let filteredTableData = this.state.tabledata.filter((_, index) =>
        dashboardDataNumArr.includes(index)
      );
      this.setState({
        filteredTableData: filteredTableData,
      });
    });
  }

  render() {
    let nShutdown = false;
    let eShutdown = false;
    let persons;
    let persons1;
    let filteredData;
    let filteredData1;
    let receivedDate;
    let colors = [];

    //covertion string to number
    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i));

    // let turboStart = [];
    let turboStart = this.props.app.turboStart;

    if (turboStart.length >= 0) {
      turboStart.map((they) => {
        if (they.name === "N.Shutdown Completed") {
          nShutdown = true;
        } else if (they.name === "E.Shutdown Completed") {
          eShutdown = true;
        }
      });
    }

    //filltering the status block label
    let filteredDataLabel = sensorLabel.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    );

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

    {
      this.props.app.chartData[0]
        ? (receivedDate = this.props.app.chartData[0].testdataTime)
        : (receivedDate = null);
    }

    //Assigning statusblock data color variation
    /* eslint-disable */
    this.state.filteredTableData
      ? this.state.filteredTableData.map((it, y) => {
          if (parseInt(persons[y]) > parseInt(it.upperlimit)) {
            colors = colors.concat("red");
          } else if (parseInt(persons[y]) < parseInt(it.lowerlimit)) {
            colors = colors.concat("yellow");
          } else {
            colors = colors.concat("#03fc28");
          }
        })
      : [];

    const date = new Date();
    const db_date = new Date(receivedDate);
    let isActive = false;

    if (this.props.app.showTarget === true) {
      isActive = true;
    }

    return (
      <div>
        <div>
          <Row>
            {eShutdown ? (
              <p style={styles.offline}>{e_shutdown}</p>
            ) : (
              <Row>
                {nShutdown ? (
                  <p style={styles.offline}>{n_shutdown}</p>
                ) : (
                  <Row>
                    {isActive ? (
                      <p style={styles.online}>{live}</p>
                    ) : (
                      <p style={styles.offline}>{offline}</p>
                    )}
                  </Row>
                )}
              </Row>
            )}
          </Row>
        </div>
        <Row>
          {persons.map((It, y) => (
            <Col xs={4} sm={6} style={{ paddingRight: "10px", width: "230px" }}>
              <div className="statistic-block block">
                <Row>
                  {/* up and down arrow column */}
                  <Col>
                    {persons1[y] <= It ? (
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
                  <Col className="number">
                    {/* getting the color from the color array */}
                    <span style={{ color: colors[y] }}>{It}</span>
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
                <div>
                  <strong>{filteredDataLabel[y]}</strong>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {};
const statuspage = connect(mapStateToProps, mapDispatchToProps)(StatusBlock);
export default statuspage;
