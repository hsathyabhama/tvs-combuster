import React, { Component } from "react";
import StatusBlock from "../../Components/TestPageComponent/StatusBlock";
import { Table, Row, Col } from "antd";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import { getTableView } from "../../../Services/requests";

const columns = [
  {
    title: "Param",
    dataIndex: "Paramname",
    key: "Paramname",
  },
  {
    title: "lowerlimit",
    dataIndex: "lowerlimit",
    key: "lowerlimit",
  },
  {
    title: "unitName",
    dataIndex: "unitname",
    key: "unitname",
  },
  {
    title: "upperlimit",
    dataIndex: "upperlimit",
    key: "upperlimit",
  },
  {
    title: "Live Value",
    dataIndex: "liveData",
    key: "",
    render(liveData, upperlimit, lowerlimit) {
      const getColor = () => {
        if (parseInt(liveData) > parseInt(upperlimit.upperlimit)) return "red";
        if (parseInt(liveData) < parseInt(upperlimit.lowerlimit))
          return "yellow";
        return "#03fc28";
      };
      return {
        props: {
          style: { color: getColor() },
        },
        children: <div>{liveData}</div>,
      };
    },
  },
];

const columns1 = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    render(text, record) {
      const getColor = () => {
        if (text === "Reset Values") return "Reset Values  " + record.value;
        return text;
      };
      return {
        children: getColor(),
      };
    },
  },
  {
    title: "testcommandsTime",
    dataIndex: "testcommandsTime",
    key: "testcommandsTime",
  },
];

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabledata: [],
      alldata: [],
      filteredTableData: [],
    };
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: "Table View",
      type: "Dashboard",
    });

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

  //getting live data in every delay loop
  testClick = () => {
    const liveDataObj = this.props.app.chartData[0];
    this.state.tabledata.map((item) => {
      const key = item["paramindex"];
      Object.keys(liveDataObj).map((it) => {
        if (it === key) {
          item["liveData"] = liveDataObj[it];
        }
      });
    });
  };

  // delay for rendering table in tableView
  interval = setInterval(() => {
    this.testClick();
  });

  render() {
    return (
      <div>
        <StatusBlock />
        <div>
          <Row>
            <Col>
              <Table
                style={{ marginTop: "50px", minWidth: "700px", float: "left" }}
                size="middle"
                pagination={false}
                columns={columns}
                dataSource={this.state.filteredTableData}
              />
            </Col>
            <Col>
              <Table
                size="middle"
                style={{
                  marginTop: "50px",
                  paddingLeft: "30%",
                  minWidth: "690px",
                  float: "right",
                }}
                pagination={false}
                columns={columns1}
                dataSource={this.props.app.turboStart.reverse()}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateTitleElements,
};
const Tabledata = connect(mapStateToProps, mapDispatchToProps)(TableView);
export default Tabledata;
