import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import TurboConfig from "./ConfigurationPage/TurboConfig";
import DashboardConfig from "./ConfigurationPage/DashboardConfig";
import FooterElement from "../Components/footer/FooterElement";
import HeaderComponent from "../Components/Header/HeaderComponent";
import TitleElement from "../Components/subComponents/TitleElement";
import LeftbarComponent from "../Components/LeftBar/LeftbarComponent";
import TestPage from "./TestPage";
import GraphView from "../Pages/DashboardPage/GraphView";
import TableView from "./DashboardPage/TableView";
import RunningReport from "./Reports/RunningReport";
import TestConfig from "./ConfigurationPage/TestConfig";
import ParamConfig from "./ConfigurationPage/ParamConfig";
import ExportData from "./Reports/ExportData";
import PerformanceReport from "./Reports/PerformanceReport";
import EndurenceReport from "./Reports/EndurenceReport";
import PerformanceAfterEndurence from "./Reports/PerformanceAfterEndurence";
import axios from "axios";
import {
  updateTurboConfig,
  updateTestConfigPage,
  updateParamConfig,
  updateUserParameter,
  updateTableStatusData,
  updateTestIdCount,
  updateTableViewData,
  updateChartData,
  initiateTurboStart,
} from "../../Redux/action";
import {
  getTurboConfigData,
  getTestConfigData,
  getParamConfigData,
  turbineConfigSubmit,
  requestStatusData,
  getHandleChangetestID,
  getTableView,
  gettingChartData,
  getSensorData,
} from "../../Services/requests";

const { Content, Header, Footer } = Layout;

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testDataInsert: false,
    };
  }

  componentDidMount() {
    // fetch turbo config data on application load
    getTurboConfigData((data) => {
      this.props.updateTurboConfig(data);
    });

    // fetch test config data on application load
    getTestConfigData((data) => {
      this.props.updateTestConfigPage(data);
    });

    // fetch param config data on application load
    getParamConfigData((data) => {
      this.props.updateParamConfig(data);
    });

    // fetch turboconfig submit form data on application load
    turbineConfigSubmit((data) => {
      this.props.updateTurboConfig(data);
    });

    // fetch turboconfig installed data on application load
    requestStatusData((data) => {
      this.props.updateTableStatusData(data);
    });

    // fetch turbine ID Name  on application load
    getHandleChangetestID((data) => {
      this.props.updateTestIdCount(data);
    });

    // fetch graphvalue on application load
    getTableView((data) => {
      //getting this function(data) from request page
      const arrStr = this.props.app.targetKeys; //covertion string to number
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      let filteredTableData = data.filter((_, index) =>
        dashboardDataNumArr.includes(index)
      );
      this.props.updateTableViewData(filteredTableData);
    });

    // fetch TestDatainsert on application load
    if (this.state.testDataInsert === false) {
      axios
        .post("http://localhost:7000/testdatainsert.php", {})
        .then(function (response) {
          this.setState({
            testDataInsert: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // fetch livedata from DB application load
    setInterval(() => {
      gettingChartData((data) => {
        this.props.updateChartData(data);
      });
    }, this.props.app.delayValue);

    setInterval(() => {
      getSensorData((data) => {
        let val = data;
        if (this.props.app.communication === true && val.length >= 1) {
          this.props.initiateTurboStart(val);
        }
      });
    }, 1000);
  }

  render() {
    const appData = this.props.app;
    const { mainPage } = appData;
    return (
      <Layout>
        <Header style={{ paddingLeft: "10px", paddingRight: "0" }}>
          <HeaderComponent />
        </Header>
        <Layout>
          <LeftbarComponent />
          <Content>
            <TitleElement />
            {mainPage === "graphView" ? <GraphView /> : []}
            {mainPage === "tableView" ? <TableView /> : []}
            {mainPage === "turboConfig" ? <TurboConfig /> : []}
            {mainPage === "dashboardConfig" ? <DashboardConfig /> : []}
            {mainPage === "testConfig" ? <TestConfig /> : []}
            {mainPage === "paramConfig" ? <ParamConfig /> : []}
            {mainPage === "testPage" ? <TestPage /> : []}
            {mainPage === "runningReport" ? <RunningReport /> : []}
            {mainPage === "exportData" ? <ExportData /> : []}
            {mainPage === "performanceReport" ? <PerformanceReport /> : []}
            {mainPage === "endurenceReport" ? <EndurenceReport /> : []}
            {mainPage === "performanceafterEndurence" ? (
              <PerformanceAfterEndurence />
            ) : (
              []
            )}
          </Content>
        </Layout>
        <Footer>
          <FooterElement />
        </Footer>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  updateTurboConfig,
  updateTestConfigPage,
  updateTableStatusData,
  updateParamConfig,
  updateUserParameter,
  updateTestIdCount,
  updateTableViewData,
  updateChartData,
  initiateTurboStart,
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
export default MainContainer;
