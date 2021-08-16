import React, { Component } from "react";
import {
  Col,
  Row,
  Layout,
  Input,
  Button,
  Select,
  Form,
  Spin,
  message,
} from "antd";
import axios from "axios";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import jsPDF from "jspdf";
import Doc from "./DocService";
import { CompanyDetails, reportAlert } from "../../../Services/constants";
import "jspdf-autotable";
import logo2 from "../../../Images/logo2.png";
const { drdo_logo } = CompanyDetails;
const { turboID_alert, testNo_alert, testno_check } = reportAlert;
const { Option } = Select;

class RunningReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportOut1: [],
      testno: [],
      testno1: [],
      turboIdVal: [],
      tester: "",
      witness: "",
      loading: false,
      defaultTestno: "Select Turbo ID",
    };
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: "Running Report",
      type: "Report",
    });
  }

  getReportPDF = () => {
    var doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(75, 10, "RUNNING TEST REPORT");
    var image = new Image();
    image.src = "../../../Images/up-arrow-1.gif";
    doc.addImage(logo2, "PNG", 10, 25, 75, 20);
    doc.autoTable({
      html: "#report-constants",
      startX: 50,
      startY: 51,
      margins: {
        top: 40,
        bottom: 60,
        left: 5,
        right: 5,
      },
      headerStyles: {
        lineWidth: 0.1,
        fillColor: "white",
        textColor: "black",
        fontStyle: "bold",
        lineColor: "black",
        halign: "center",
      },

      bodyStyles: {
        lineColor: "black",
      },
      tableWidth: "wrap",
      theme: "grid",
    });
    doc.autoTable({
      html: "#example1",
      startY: 70,
      didParseCell: function (cell, data) {
        if (
          cell.row.section === "body" &&
          (cell.row.index === 1 || cell.row.index === 3)
        ) {
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.textColor = "black";
        }
      },
      margins: {
        top: 40,
        bottom: 60,
        left: 5,
        right: 5,
      },
      headerStyles: {
        lineWidth: 0.1,
        fillColor: "white",
        textColor: "black",
        fontSize: 6,
        fontStyle: "bold",
        lineColor: "black",
        halign: "center",
      },
      bodyStyles: {
        lineColor: "black",
        fontSize: 6,
        fontStyle: "bold",
      },
      theme: "grid",
    });

    let finalY = doc.lastAutoTable.finalY;

    let tester = this.state.tester;
    if (null != localStorage.getItem("rTestedBy")) {
      tester = localStorage.getItem("rTestedBy");
    }
    let rWitnessName = this.state.witness;
    if (
      null !== localStorage.getItem("rWitnessName") &&
      localStorage.getItem("rWitnessName") !== undefined
    ) {
      rWitnessName = localStorage.getItem("rWitnessName");
    }
    doc.setFontSize(8);
    //doc.setTextColor(255, 0, 0);
    doc.text(15, finalY + 10, "Tested By: ");

    const textWidth = doc.getTextWidth("Tested By: ");
    doc.setLineWidth(0.3);
    doc.setDrawColor(0, 0, 0);
    doc.line(15, finalY + 11, 10 + (textWidth + 4), finalY + 11);
    var testerAry = tester.split(",");
    var incrementHeight = 5;
    if (testerAry.length > 0) {
      for (var i = 0; i < testerAry.length; i++) {
        doc.text(15, finalY + 13 + incrementHeight, testerAry[i]);
        incrementHeight += 5;
      }
    }
    doc.text(150, finalY + 10, "Witnessed By: ");
    const textWidth1 = doc.getTextWidth("Witnessed By: ");
    doc.line(150, finalY + 11, 150 + (textWidth1 - 2), finalY + 11);
    var rWitnessNameAry = rWitnessName.split(",");
    incrementHeight = 5;
    if (rWitnessNameAry.length > 0) {
      for (i = 0; i < rWitnessNameAry.length; i++) {
        doc.text(150, finalY + 13 + incrementHeight, rWitnessNameAry[0]);
        incrementHeight += 5;
      }
    }
    doc.save("RunningReport.pdf");
  };

  //view the report in table
  getReport = () => {
    if (this.state.turboIdVal === "" || this.state.turboIdVal.length === 0) {
      message.warning(turboID_alert);
    } else if (this.state.testno1 === "" || this.state.testno1.length === 0) {
      message.warning(testNo_alert);
    }
    if (
      this.state.turboIdVal !== "" &&
      this.state.testno1 !== "" &&
      this.state.turboIdVal.length !== 0 &&
      this.state.testno1.length !== 0
    ) {
      axios
        .post("http://192.168.0.167:5000/runningReport.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          console.log(typeof res.data);
          if (res.data.length > 5 && typeof res.data !== "string") {
            this.setState({
              reportOut1: res.data,
            });
          } else {
            message.warning(testno_check);
          }
        })
        .catch((err) => {
          console.log(err.res);
        });
      this.setState({ loading: true });
      axios
        .post("http://192.168.0.167:5000/getnames.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          this.setState({
            tester: res.data[0].tester,
            witness: res.data[0].witness,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err.res);
        });
    }
  };

  createPdf = (html) => Doc.createPdf(html);

  //select the TestID
  handleChangeTestID = (value) => {
    axios
      .post("http://192.168.0.167:5000/exportData.php", { turboIdVal: value })
      .then((res) => {
        let data = res.data;
        if (typeof data === "string") {
          this.setState({
            testno: [],
          });
        } else if (data.length > 0 && typeof data !== "string") {
          this.setState({
            testno: data,
          });
        }
        this.setState({
          turboIdVal: value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //select the TstNO
  handleChangeTestNO = (value) => {
    this.setState({
      testno1: value,
    });
  };

  render() {
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;
    const reportOut = this.state.reportOut1;
    return (
      <div>
        <Layout className="layout-container">
          <h2 className="h2">Running Report</h2>
          <Form onFinish={this.onFinish}>
            <Row style={{ paddingTop: "10px" }}>
              <Col sm={2}>
                <label className="label">
                  Turbo ID<i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
              </Col>
              <Col sm={10}>
                <Col sm={10}>
                  <Form.Item name="option">
                    <Input.Group compact>
                      <Input.Group compact>
                        <Select
                          defaultValue="Select Turbo ID"
                          style={{ width: "300px" }}
                          onChange={this.handleChangeTestID}
                        >
                          {testIdValue.map((it) => (
                            <Option key={it.turboname} value={it.turboname}>
                              {it.turboname}
                            </Option>
                          ))}
                        </Select>
                      </Input.Group>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Col>

              <Col sm={2}>
                <label className="label">
                  Test No<i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Form.Item name="options">
                  <Input.Group compact>
                    <Select
                      defaultValue={this.state.defaultTestno}
                      style={{ width: "300px" }}
                      onChange={this.handleChangeTestNO}
                    >
                      testno ?
                      {testno.map((it) => (
                        <Option key={it.testno} value={it.testno}>
                          {it.testno}
                        </Option>
                      ))}{" "}
                      : []
                    </Select>
                  </Input.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row
              style={{
                paddingTop: "0px",
                paddingLeft: "38%",
                paddingBottom: "10px",
              }}
            >
              <Col xs={4}>
                <Form.Item>
                  <Button onClick={this.getReport}> View</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>
        <Button
          onClick={this.getReportPDF}
          style={{
            marginLeft: "1270px",
            marginBottom: "10px",
            marginTop: "10px",
            width: "140px",
          }}
        >
          Export Report
        </Button>
        <Spin tip="Loading..." size="large" spinning={this.state.loading}>
          <Layout
            className="bottom-container"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              border: "solid white",
            }}
          >
            <div id="allreport">
              <div
                className="mx-auto"
                style={{ marginBottom: "1%", marginTop: "2%" }}
              >
                <div
                  className="sparkline12-hd"
                  style={{ paddingBottom: "5px" }}
                >
                  <div
                    className="main-sparkline12-hd"
                    style={{ textAlign: "center" }}
                  >
                    <h1>Running Report</h1>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <img alt="logo" src={drdo_logo} />
                <table id="report-constants" style={{ marginTop: "10px" }}>
                  <tr>
                    <td>SERIAL NUMBER</td>
                    <td>{this.state.turboIdVal}</td>
                  </tr>
                  <tr>
                    <td>TEST ID</td>
                    <td>{this.state.testno1}</td>
                  </tr>
                </table>

                <table
                  className="table table-striped table-sm export-table"
                  id="example1"
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                        colSpan="10"
                      >
                        RUNNING IN TEST
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Speed
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Duration
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Compressor <br />
                        Inlet Temp
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Compressor
                        <br />
                        Outlet Temp
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Compressor
                        <br />
                        Outlet Pr
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Turbine <br />
                        Inlet Temp
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Turbine
                        <br /> Outlet Temp
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Kerosine
                        <br />
                        Flow Rate
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Compressor <br /> Pr Ratio
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Mass <br /> Flow Rate
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        RPM
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        minutes
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Pressure
                        <br />
                        (kg/cm^2)
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Tempr.
                        <br />
                        (deg.C)
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        kg/cm^2
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        deg.C
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        deg.C
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        kg/cm^2
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        %
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportOut.map((it) => (
                      <tr>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.speed}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Duration}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_Inlet}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_Outlet}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Compr_Outlet_Pr}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_InletTemp}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_OutletTemp}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}></td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_Outlet}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {" "}
                          {it.Mass_Flow_Rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-lg-1"></div>
                <div className="col-lg-4">
                  <label>
                    <b>
                      <u>Tested By: {this.state.tester}</u>
                    </b>
                  </label>
                  <br />
                  <table>
                    <tr ng-repeat="tb in TestedBy">
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-4">
                  <label>
                    <b>
                      <u>Witnessed By: {this.state.witness}</u>
                    </b>
                  </label>
                  <br />
                  <table>
                    <tr ng-repeat="wn in WitnessName">
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div className="col-lg-1"></div>
              </div>
            </div>
          </Layout>
        </Spin>
        ,
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

const runningReport = connect(
  mapStateToProps,
  mapDispatchToProps
)(RunningReport);

export default runningReport;
