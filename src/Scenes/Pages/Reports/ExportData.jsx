import React, { Component } from "react";
import {
  Col,
  Row,
  Layout,
  Input,
  Button,
  Select,
  Table,
  Form,
  Spin,
  message,
} from "antd";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const { Option } = Select;
let paramObj = {};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 22,
  },
};
class ExportData extends Component {
  formRef = React.createRef(); //this is used to reset datas
  constructor(props) {
    super(props);
    this.state = {
      turboIdVal: "",
      testno: [],
      reportDetails: [],
      emptyTestno: false,
      loading: false,
      title: [],

      formulaUnit: {
        "Combustor Outlet Temperature": "°C",
        "RPM Sensor": "rpm",
        "Lube Oil Pressure": "Bar",
      },
      timeUnit: {
        testdataTime: "Time",
      },
    };
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: "ExportData",
      type: "Report",
    });

    let paramValue = this.props.app.paramConfig
      ? this.props.app.paramConfig
      : [];

    //while adding the unit row in the table,exported excel sheet not in the correct order,
    //so here changed the order of the array index value

    const index = [0, 1, 2];

    const createdData = index.map((i) => paramValue[i]);

    let createParam = this.props.app.paramConfig
      ? createdData.map((It) => It.Paramname)
      : [];
    let createUnit = this.props.app.paramConfig
      ? createdData.map((It) => It.unitname)
      : [];

    createParam.forEach((key, i) => (paramObj[key] = createUnit[i]));
  }
  //to reset the input box
  onReset = () => {
    this.formRef.current.resetFields();
  };
  //to view the report
  getReport = () => {
    if (this.state.turboIdVal === "" || this.state.turboIdVal.length === 0) {
      message.warning("Select the turbo ID");
    } else if (this.state.testno1 === "" || this.state.testno1 === undefined) {
      message.warning("Select the test No");
    }

    if (
      this.state.turboIdVal !== "" &&
      this.state.testno1 !== "" &&
      this.state.testno1 !== undefined &&
      this.state.turboIdVal.length !== 0
    ) {
      axios
        .post("http://localhost:5000/getReport.php", {
          //getting the exportData table value
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          var data = res.data;

          if (data.length > 5 && typeof data !== "string") {
            //updated the export data title
            this.setState({
              title: Object.keys(data[0]),
            });

            //merging the testdatatime,live data unit,formula unit
            let unitMerged = {
              ...this.state.timeUnit,
              ...paramObj,
              ...this.state.formulaUnit,
            };
            //concatinating the unitData with the live data
            let exportdataData = [].concat(unitMerged, data);

            //updating the data to the state
            this.setState({
              reportDetails: exportdataData,
            });
          } else {
            message.warning("Check the test No");
          }
        })
        .catch((err) => {
          console.log(err.res);
        });
      this.setState({ loading: true });
      axios
        .post("http://localhost:5000/getnames.php", {
          //getting the tester and witness name
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

  //select the TestID
  handleChangeTestID = (value) => {
    axios
      .post("http://localhost:5000/exportData.php", { turboIdVal: value })
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

  //select the Test Number
  handleChangetestNO = (value) => {
    this.setState({
      testno1: value,
    });
  };

  //exporting csv
  exportToCSV = (csvData, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  //export pdf
  // exportToPDF = () => {
  //   const input = document.getElementById("someRandomID");
  //   html2canvas(input).then((canvas) => {
  //     var imgWidth = 200;
  //     var imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     var position = 0;
  //     pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  //     pdf.save("download.pdf");
  //   });
  // };

  render() {
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;
    const columns = [
      {
        title: this.state.title[0],
        dataIndex: this.state.title[0],
        key: this.state.title[0],
        fixed: "left",
      },
      {
        title: this.state.title[1],
        dataIndex: this.state.title[1],
        key: this.state.title[1],
      },
      {
        title: this.state.title[2],
        dataIndex: this.state.title[2],
        key: this.state.title[2],
      },
      {
        title: this.state.title[3],
        dataIndex: this.state.title[3],
        key: this.state.title[3],
      },
    ];

    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout className="layout-container">
          <h2 className="component-heading"> Export Report</h2>
          <Form ref={this.formRef} name="control-ref">
            <Row style={{ paddingTop: "10px", marginLeft: "15px" }}>
              <Col sm={10}>
                <Form.Item
                  name="option"
                  label="Turbo ID"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
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

              <Form.Item
                name="options"
                label="Test No"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Group compact>
                  <Select
                    defaultValue="Select Test No"
                    style={{ width: "300px" }}
                    onChange={this.handleChangetestNO}
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
            </Row>
            <Row style={{ marginLeft: "32%", paddingBottom: "2%" }}>
              <Button htmlType="button" onClick={() => this.getReport()}>
                View
              </Button>

              <Button
                htmlType="button"
                style={{ marginLeft: "4%" }}
                onClick={this.onReset}
              >
                Reset
              </Button>
            </Row>
          </Form>
        </Layout>
        <Row justify="end" className="report-btn-block">
          <Button
            style={{
              width: "140px",
            }}
            variant="warning"
            onClick={(e) =>
              this.exportToCSV(this.state.reportDetails, "Export Report")
            }
          >
            Export in Excel
          </Button>
        </Row>

        <Spin tip="Loading..." size="large" spinning={this.state.loading}>
          <Layout className="export-layout">
            <div id="allreport">
              <div className="mx-auto" style={{ marginTop: "2%" }}>
                <div
                  className="main-sparkline12-hd"
                  style={{ textAlign: "center" }}
                >
                  <h1>Export Data</h1>
                </div>
              </div>
            </div>

            {this.state.title.length > 0 ? (
              <Table
                id="someRandomID"
                size="middle"
                columns={columns}
                pagination={false}
                dataSource={this.state.reportDetails}
                scroll={{ x: 500, y: 500 }}
              />
            ) : (
              <Table id="someRandomID" size="middle" scroll={{ x: 2000 }} />
            )}
          </Layout>
        </Spin>
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
const exportData = connect(mapStateToProps, mapDispatchToProps)(ExportData);
export default exportData;
