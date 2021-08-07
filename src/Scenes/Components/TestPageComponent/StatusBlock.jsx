import React, { Component } from "react";
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { dashboardSensor } from "../../../Services/constants";
const { sensorLabel, n_shutdown, live, offline } = dashboardSensor;

const styles = {
  online: {
    color: "green",
    position: "absolute",
    right: 20,
    top: 120,
    fontWeight: "bold",
    fontSize: 20
  },
  offline: {
    color: "red",
    position: "absolute",
    right: 20,
    top: 120,
    fontWeight: "bold",
    fontSize: 20
  }
}

class StatusBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: this.props.cardlist,
      persons: [],
      isRpmUpArrow: true,
      isT1UpArrow: true,
      isT2UpArrow: true,
      isT9UpArrow: true,
      isP2UpArrow: true
    }
  }
  render() {
    let nShutdown = false;
    let persons;
    let persons1;
    let filteredData;
    let filteredData1;
    let receivedDate;

    //covertion string to number
    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i));

    this.props.app.turboStart.map(they => {
      if (they.name === 'N.Shutdown Completed') {
        nShutdown = true
      }
    })

    //filltering the status block label
    let filteredDataLabel = sensorLabel.filter((_, index) => dashboardDataNumArr.includes(index));
    {
      this.props.app.chartData[0] ?
        filteredData = Object.values(this.props.app.chartData[0]).filter((_, index) => dashboardDataNumArr.includes(index)) : filteredData = []
    }

    {
      this.props.app.chartData[1] ?
        filteredData1 = Object.values(this.props.app.chartData[1]).filter((_, index) => dashboardDataNumArr.includes(index)) : filteredData = []
    }

    { this.props.app.chartData[0] ? persons = filteredData : persons = [0, 0, 0, 0, 0, 0] }
    { this.props.app.chartData[1] ? persons1 = filteredData1 : persons1 = [0, 0, 0, 0, 0, 0] }

    {
      this.props.app.chartData[0] ? receivedDate = this.props.app.chartData[0].testdatadate : receivedDate = null
    }

    const date = new Date();
    const db_date = new Date(receivedDate);
    let isActive = false;

    if (this.props.app.showTarget === true) {
      isActive = true
    }
    return (
      <div >
        <div>
          <Row>
            {nShutdown ?
              <p style={styles.offline}>{n_shutdown}</p>
              :
              <Row>
                {isActive ?
                  <p style={styles.online}>{live}</p>
                  :
                  <p style={styles.offline}>{offline}</p>
                }
              </Row>
            }
          </Row>
        </div>
        <Row >
          {
            persons.map((It, y) =>
              <Col span={4} style={{ paddingRight: "10px" }}>
                <div className="statistic-block block" >
                  <Row className="progress-details d-flex align-items-end justify-content-between">
                    {/* up and down arrow column */}
                    <Col>
                      {(persons1[y] < It) ?
                        <img src="./images/up-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '30px' }} />
                        : <img src="./images/down-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '30px' }} />}
                    </Col>
                    {/* value displaying column */}
                    <Col className="number dashtext-1" style={{ paddingLeft: '20%', fontSize: '23px' }}>
                      <span>{It}</span>
                    </Col>
                  </Row>

                  <div className="progress progress-template">
                    <div role="progressbar" style={{ width: '100%', ariavaluenow: '30', ariavaluemin: '0', ariavaluemax: '100' }}
                      className="progress-bar progress-bar-template dashbg-1"></div>
                  </div>
                  {/*  Title column */}
                  <div className="title">
                    <div style={{ fontSize: '10px' }}><strong>{filteredDataLabel[y]}</strong></div>
                  </div>
                </div>
              </Col>
            )
          }
        </Row>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {}
const statuspage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBlock)
export default statuspage;