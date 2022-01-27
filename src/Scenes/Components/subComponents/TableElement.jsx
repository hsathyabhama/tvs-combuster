import React, { Component } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  Table,
  Space,
  Input,
  Popconfirm,
  Button,
  Col,
  Row,
  Select,
  Tooltip,
} from "antd";
import { connect } from "react-redux";
import {
  updateConfigData,
  getTurboConfigData,
  getTestConfigData,
  getParamConfigData,
  requestStatusData,
} from "../../../Services/requests";
import { turboConfigValue } from "../../../Services/constants";
import {
  updateTurboConfig,
  updateTestConfigPage,
  updateParamConfig,
  updateTableStatusData,
  updateNotifyAction,
} from "../../../Redux/action";

const { installed_turbine } = turboConfigValue;
const { Option } = Select;
const { Map } = require("immutable");
const { Column } = Table;
const text = <span>Click Start Edit</span>;

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: null,
      editMode: false,
      editSession: false,
      editRowIndex: null,
      editData: [],
      editCancel: false,
      col: "",
      turbo_status: [
        { status: "installed" },
        { status: "Completed" },
        { status: "OnHold" },
      ],
    };
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  //Onclick for edit button
  handleEditButtonClick = (index) => {
    this.setState({
      editMode: true,
      editRowIndex: index,
    });
  };

  //Onclick for startedit button
  startEdit = () => {
    this.setState({
      editSession: true,
    });
  };

  //Onchange for table input
  updateInputValue = (event, colName) => {
    const { editData: newEditData } = this.state;
    newEditData[colName] = event.target.value;
    this.setState({ editData: newEditData });
  };

  //Onchange for table select input
  updateSelectValue = (event, colName) => {
    const { editData: newEditData } = this.state;
    newEditData[colName] = event;
    this.setState({ editData: newEditData });
  };

  //Onclick for edit cancel
  cancelEditMode = () => {
    let key = this.props.childrenColumnName;
    this.setState({
      editMode: false,
      editRowIndex: null,
      editData: [],
      editCancel: false,
    });

    //geting data from request page & updating to the turboconfig store
    getTurboConfigData((data) => {
      this.props.updateTurboConfig(data);
    });

    //geting data from request page & updating to the testconfig store
    getTestConfigData((data) => {
      this.props.updateTestConfigPage(data);
    });

    //geting data from request page & updating to the paramconfig store
    getParamConfigData((data) => {
      this.props.updateParamConfig(data);
    });
  };

  //Onclick for save data
  updateData = (value) => {
    console.log(this.state.editRowIndex);
    const configDataValue = {
      page: this.props.childrenColumnName,
      editData: Object.assign({}, this.state.editData),
      editRowIndex: this.state.editRowIndex,
      turboIdVal: value.turboconfig_id,
      paramIdVal: value.paramconfig_id,
      testIdVal: value.testparamconfig_id,
    };

    //updating edit table data to store
    updateConfigData(configDataValue, (data) => {
      if (data) {
        let key = this.props.childrenColumnName;
        this.setState({
          editMode: false,
          editRowIndex: null,
          editData: [],
          editCancel: false,
        });

        if (key === "testparamconfig") {
          this.props.updateTestConfigPage(data);
        } else if (key === "turboconfig") {
          this.props.updateTurboConfig(data);
        }
      } else {
        console.log(`500: error data response`);
      }

      //getting data from request page
      requestStatusData((data) => {
        this.props.updateTableStatusData(data);
        if (typeof data !== "string" && data.length > 1) {
          this.props.updateNotifyAction("true");
        } else if (
          typeof data !== "string" &&
          data.length <= installed_turbine
        ) {
          this.props.updateNotifyAction("false");
        }
      });
    });
  };

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data || [],
    };
  }

  render() {
    const { data: tableData, editMode, editCancel, editSession } = this.state;
    const { editableColumn } = this.props;
    const editRowIndex = this.state.editRowIndex;

    if (editSession && tableData.length !== 0 && tableData !== "no_data") {
      tableData.forEach((it, index) => {
        console.log(editSession && index !== editRowIndex);
        it["Edit"] = (
          <Space size="middle">
            <Tooltip placement="rightBottom" title={text}>
              <EditOutlined
                style={{
                  fontSize: "18px",
                  cursor:
                    editRowIndex && index != editRowIndex
                      ? "not-allowed !important"
                      : "pointer",
                }}
                onClick={() => {
                  if (editSession && !editRowIndex && editRowIndex !== 0) {
                    this.handleEditButtonClick(index);
                  } else if (index === editRowIndex) {
                    this.handleEditButtonClick(index);
                  }
                }}
              />{" "}
            </Tooltip>
          </Space>
        );
      });
    }
    // }

    if (editCancel && !editMode) {
      tableData.forEach((item, index) => {
        if (index === editRowIndex) {
          Object.keys(item).map((it) => {
            if (it !== "Edit") {
              editableColumn.map((colName) => {
                if (it === colName) {
                  item[it] = item[it].props.defaultValue;
                }
              });
            }
          });
        }
      });
    }
    if (editMode) {
      tableData.forEach((item, currentIndex) => {
        if (currentIndex === editRowIndex) {
          Object.keys(item).map((it) => {
            if (it === "Edit") {
              item[it] = (
                <span>
                  <a
                    onClick={() => this.updateData(item)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={this.cancelEditMode}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              );
            } else {
              editableColumn.map((colName) => {
                if (colName.inputType === "input") {
                  if (it === colName.editFeild)
                    item[it] = (
                      <Input
                        style={{ width: "200px" }}
                        defaultValue={item[it]}
                        value={this.state.it}
                        onChange={(e) =>
                          this.updateInputValue(e, colName.editFeild)
                        }
                      ></Input>
                    );
                }
                if (colName.inputType === "select") {
                  if (it === colName.editFeild)
                    item[it] = (
                      <Input.Group compact>
                        <Select
                          defaultValue={item[it]}
                          style={{ width: "300px" }}
                          onChange={(e) =>
                            this.updateSelectValue(e, colName.editFeild)
                          }
                        >
                          {this.state.turbo_status.map((status) => (
                            <Option value={status.status}>
                              {status.status}
                            </Option>
                          ))}
                        </Select>
                      </Input.Group>
                    );
                }
              });
            }
          });
        }
      });
    }

    let columns = [];
    if (
      (tableData !== null || tableData !== undefined) &&
      tableData.length > 0
    ) {
      columns = Object.keys(tableData[0]);
    }
    return (
      <div>
        <div>
          <Row style={{ float: "right" }}>
            {this.props.childrenColumnName === "testparamconfig" ? (
              <Col xs={12}>
                <Button type="primary" onClick={this.updateData}>
                  {" "}
                  Reset
                </Button>
              </Col>
            ) : (
              []
            )}
            <Col xs={12}>
              {this.props.childrenColumnName !== "paramconfig" ? (
                <Button
                  type="primary"
                  style={{ width: "6rem" }}
                  onClick={this.startEdit}
                >
                  Start Edit
                </Button>
              ) : (
                []
              )}
            </Col>
          </Row>
        </div>

        <Table
          dataSource={tableData}
          size="middle"
          style={{
            backgroundColor: "#131633",
            paddingBottom: "10px",
            marginTop: "10px",
          }}
        >
          {columns && columns.length > 0
            ? columns.map((col) => {
                if (col !== this.props.configIdKeyValue) {
                  return <Column title={col} key={col} dataIndex={col} />;
                } else {
                  console.log(this.state.col);
                }
              })
            : []}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateTurboConfig,
  updateTestConfigPage,
  updateParamConfig,
  updateTableStatusData,
  updateNotifyAction,
};

const tablePage = connect(mapStateToProps, mapDispatchToProps)(TableComponent);

export default tablePage;
