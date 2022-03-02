import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import GraphComponent from "./ChartComponent";
import { connect } from "react-redux";
import { updateTableViewData } from "../../../Redux/action";
import { dashboardSensor } from "../../../Services/constants";
import { getTableView } from "../../../Services/requests";

const { sensorLabel, dummyData, chartMax } = dashboardSensor;

class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartValue: [],
      textColor: "",
      cardList: [],
      dummygraphData: [
        {
          T1T2: dummyData, //dummyData = 0 in constant page
          T3T4: dummyData,
          rpm1rpm2: dummyData,
          G1G2: dummyData,
          LubeOilPr: dummyData,
          AirMassFlow: dummyData,
          AirtoFuelRatio: dummyData,
          testdataTime: dummyData,
        },
        {
          T1T2: dummyData,
          T3T4: dummyData,
          rpm1rpm2: dummyData,
          G1G2: dummyData,
          LubeOilPr: dummyData,
          AirMassFlow: dummyData,
          AirtoFuelRatio: dummyData,
          testdataTime: dummyData,
        },
        {
          T1T2: dummyData,
          T3T4: dummyData,
          rpm1rpm2: dummyData,
          G1G2: dummyData,
          LubeOilPr: dummyData,
          AirMassFlow: dummyData,
          AirtoFuelRatio: dummyData,
          testdataTime: dummyData,
        },
        {
          T1T2: dummyData,
          T3T4: dummyData,
          rpm1rpm2: dummyData,
          G1G2: dummyData,
          LubeOilPr: dummyData,
          AirMassFlow: dummyData,
          AirtoFuelRatio: dummyData,
          testdataTime: dummyData,
        },
        {
          T1T2: dummyData,
          T3T4: dummyData,
          rpm1rpm2: dummyData,
          G1G2: dummyData,
          LubeOilPr: dummyData,
          AirMassFlow: dummyData,
          AirtoFuelRatio: dummyData,
          testdataTime: dummyData,
        },
        {
          T1T2: dummyData,
          T3T4: dummyData,
          rpm1rpm2: dummyData,
          G1G2: dummyData,
          LubeOilPr: dummyData,
          AirMassFlow: dummyData,
          AirtoFuelRatio: dummyData,
          testdataTime: dummyData,
        },
      ],
    };
  }

  //Rendering the 6 graph y axis limits while updatinh the table
  componentDidMount() {
    getTableView((data) => {
      //getting this function(data) from request page
      const arrStr = this.props.app.targetKeys; //covertion string to number
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      let filteredTableData = data.filter((_, index) =>
        dashboardDataNumArr.includes(index)
      );
      //update the tableView rendering the component
      this.props.updateTableViewData(filteredTableData);
    });
  }

  //Initially to render graph with 0 value
  interval = setInterval(() => {
    {
      this.props.app.chartData.length !== 0
        ? this.prepareChartParams(this.props.app.chartData)
        : this.prepareChartParams(this.state.dummygraphData);
    }
  }, 1000);

  prepareChartParams = (chartdata) => {
    let t1t2 = [];
    let t3t4 = [];
    let rpm1rpm2 = [];
    let g1g2 = [];
    let lubeoilpr = [];
    let airmassflow = [];
    let airtofuelratio = [];

    let date_Time = [];
    for (let i = 0; i < 6; i++) {
      t1t2.push(chartdata[i].T1T2);
      t3t4.push(chartdata[i].T3T4);
      rpm1rpm2.push(chartdata[i].rpm1rpm2);
      g1g2.push(chartdata[i].G1G2);
      lubeoilpr.push(chartdata[i].LubeOilPr);
      airmassflow.push(chartdata[i].AirMassFlow);
      airtofuelratio.push(chartdata[i].AirtoFuelRatio);

      date_Time.push(
        new Date(chartdata[i].date_Time).toLocaleTimeString([], {
          hour12: false,
        })
      );
    }

    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i)); //covertion string to number

    let filteredDataLabel = sensorLabel.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    ); //chartlabel

    let chartArray = [];
    chartArray.push(t1t2);
    chartArray.push(t3t4);
    chartArray.push(rpm1rpm2);
    chartArray.push(g1g2);
    chartArray.push(lubeoilpr);
    chartArray.push(airmassflow);
    chartArray.push(airtofuelratio);

    let filteredData = chartArray.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    );
    let filteredDataText;
    {
      this.props.app.chartData[0]
        ? (filteredDataText = Object.values(this.props.app.chartData[0]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredDataText = []);
    }

    let textColor;
    const chartValue = [];
    for (let i = 0; i < filteredData.length; i++) {
      if (this.props.app.tableViewData) {
        let chart = {
          size: 8,
          labels: date_Time,
          dataSet: {
            title: filteredDataText,
            chartData: filteredData[i],
            filteredDataLabel: filteredDataLabel[i],
            chartBackgroundColor: ["rgba(24,144,255,0.2)"],
            chartBorderColor: [
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
            ],
            chartTextColor: textColor,

            upperLimitVal: this.props.app.tableViewData[i].graph_upper,
            lowerLimitVal: this.props.app.tableViewData[i].graph_lower,
          },
        };
        chartValue.push(chart);
        this.setState({
          cardList: chartValue,
        });
      }
    }
  };

  render() {
    if (
      this.state.cardList !== undefined &&
      this.state.cardList.length >= chartMax
    ) {
      return (
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {this.state.cardList
              ? this.state.cardList.map((it, y) => {
                  return (
                    <Col span={8}>
                      <Row style={{ paddingTop: "30px" }}>
                        <Card
                          style={{
                            backgroundColor: "#131633",
                            height: "250px",
                            border: "none",
                            borderRadius: "0px",
                            width: "450px",
                          }}
                        >
                          {it.title}
                          <GraphComponent
                            data={
                              it.dataSet.chartData ? it.dataSet.chartData : []
                            }
                            labels={
                              it.dataSet.filteredDataLabel
                                ? it.dataSet.filteredDataLabel
                                : []
                            }
                            label={
                              it.dataSet.filteredDataLabel
                                ? it.dataSet.filteredDataLabel
                                : "No Label"
                            }
                            title={
                              it.dataSet.title[y]
                                ? it.dataSet.title[y]
                                : "No Data"
                            }
                            backgroundColor={
                              it.dataSet.chartBackgroundColor
                                ? it.dataSet.chartBackgroundColor
                                : []
                            }
                            borderColor={
                              it.dataSet.chartBorderColor
                                ? it.dataSet.chartBorderColor
                                : []
                            }
                            textColor={
                              it.dataSet.chartTextColor
                                ? it.dataSet.chartTextColor
                                : []
                            }
                            upperLimit={
                              it.dataSet.upperLimitVal
                                ? it.dataSet.upperLimitVal
                                : []
                            }
                            lowerLimit={
                              it.dataSet.lowerLimitVal
                                ? it.dataSet.lowerLimitVal
                                : []
                            }
                          />
                        </Card>
                      </Row>
                    </Col>
                  );
                })
              : []}
          </Row>
        </div>
      );
    } else {
      return <div className="site-card-wrapper"></div>;
    }
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateTableViewData,
};
const card = connect(mapStateToProps, mapDispatchToProps)(CardComponent);
export default card;
