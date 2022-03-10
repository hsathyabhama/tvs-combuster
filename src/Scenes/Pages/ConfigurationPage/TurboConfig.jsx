import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateTurboConfig,
  updateTitleElements,
  updateTableStatusData,
  updateNotifyAction,
} from "../../../Redux/action";
import {
  turbineConfigSubmit,
  requestStatusData,
} from "../../../Services/requests";
import { turboConfigValue } from "../../../Services/constants";
import {
  Col,
  Row,
  Layout,
  Input,
  Button,
  Tooltip,
  InputNumber,
  DatePicker,
  Form,
  message,
  notification,
} from "antd";
import TableElement from "../../Components/subComponents/TableElement";
import moment from "moment";
import "moment/locale/zh-cn";

const {
  installed_turbine,
  nozzleArea_min,
  nozzleArea_max,
  nozzleArea_step,
  nozzleArea_defalutValue,
  error_turbo_msg,
  added_turbo_msg,
  message_title,
  description_data,
} = turboConfigValue;
const key = "updatable";

class TurboConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turboID: "",
      dateVal: "",
      nozzleArea: nozzleArea_defalutValue,
      discriptionVal: null,
    };
    this.updateDate = this.updateDate.bind(this);
  }

  //notification for more than 1 turbine active
  openNotification = (value) => {
    setTimeout(() => {
      notification.open({
        key,
        message: message_title,
        description: description_data,
        value,
        duration: 0,
      });
    }, 1000);
  };

  componentDidMount() {
    let data = this.props.appData.statusData;
    if (typeof data !== "string" && data.length > installed_turbine) {
      this.props.updateNotifyAction("true");
      this.openNotification();
    } else if (typeof data !== "string" && data.length <= installed_turbine) {
      this.props.updateNotifyAction("false");
    }

    this.props.updateTitleElements({
      title: "Turbo Config",
      type: "Config",
    });
  }

  //submit installed id in turboconfig
  onFinishSubmit = () => {
    const body = {
      turbo_id: this.state.turboID,
      date: this.state.dateVal,
      //nozzle_area: this.state.nozzleArea,
      descriptions: this.state.discriptionVal,
    };

    message.success(added_turbo_msg);

    turbineConfigSubmit(body, (data) => {
      this.props.updateTurboConfig(data);
    });

    //getting installed turbine name form db
    requestStatusData((data) => {
      this.props.updateTableStatusData(data);
      if (typeof data !== "string" && data.length > installed_turbine) {
        this.props.updateNotifyAction("true");
      } else if (typeof data !== "string" && data.length < installed_turbine) {
        this.props.updateNotifyAction("false");
      }
    });
  };

  //onChange events
  onchangeTurboID = (e) => {
    this.setState({
      turboID: e.target.value,
    });
  };

  updateDate = (date, dateString) => {
    this.setState({
      dateVal: dateString,
    });
  };

  handleNumber = (value) => {
    this.setState({
      nozzleArea: value,
    });
  };

  updateDiscription = (e) => {
    this.setState({
      discriptionVal: e.target.value,
    });
  };

  render() {
    const { appData } = this.props;
    const { turboConfig } = appData;
    if (this.props.appData.notifyStatus === "true") {
      this.openNotification("bottomRight");
    }

    return (
      <div>
        <Layout className="layout-container">
          <h2 className="h2">Turbo Configuration</h2>
          <Form
            onFinish={() => {
              const isDuplicateId = turboConfig
                .map((it) => it.turboname)
                .includes(this.state.turboID);
              {
                isDuplicateId
                  ? message.warning(error_turbo_msg)
                  : this.onFinishSubmit();
              }
            }}
          >
            <Row
              gutter={[16, 8]}
              style={{ paddingLeft: "20px", paddingTop: "20px" }}
            >
              <Form.Item
                name="Turbo ID"
                label="Turbo ID"
                rules={[{ required: true }]}
              >
                <Input
                  name="turbo_id"
                  style={{ width: "320px" }}
                  placeholder="Turbo ID"
                  defaultValue={this.state.turboID}
                  onChange={this.onchangeTurboID}
                />
              </Form.Item>

              <Form.Item
                style={{ paddingLeft: "15%" }}
                name="Date"
                label=" Installed Date"
                rules={[{ required: true }]}
              >
                <DatePicker
                  name="date"
                  disabledDate={(current) => {
                    return current && current > moment(Date.now());
                  }}
                  style={{ backgroundColor: "#131633" }}
                  onChange={this.updateDate}
                />
              </Form.Item>

              {/* <Col sm={2}>
                <label className="label">
                  Nozzle Area
                  <i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
              </Col> */}
              {/* <Col sm={6}>
                <div>
                  <Tooltip
                    placement="bottom"
                    title="Range 0.0002 to 0.0005 m2"
                    style={{ backgroundColor: "pink" }}
                  >
                    <div>
                      <InputNumber
                        style={{ width: "320px" }}
                        min={nozzleArea_min}
                        max={nozzleArea_max}
                        step={nozzleArea_step}
                        defaultValue={nozzleArea_defalutValue}
                        value={this.state.nozzleArea || nozzleArea_defalutValue}
                        onChange={this.handleNumber}
                        stringMode
                      />
                    </div>
                  </Tooltip>
                </div>
              </Col> */}
            </Row>
            <Row
              gutter={[16, 8]}
              style={{ paddingLeft: "20px", marginTop: "5px" }}
            >
              <Form.Item name="Description" label=" Description">
                <Tooltip placement="bottomLeft" title="Allowed 200 words only">
                  <Input
                    name="description"
                    style={{ height: "100px", width: "760px" }}
                    placeholder="Description..."
                    maxLength="200"
                    onChange={this.updateDiscription}
                  />
                </Tooltip>
              </Form.Item>
            </Row>

            <Row style={{ paddingTop: "25px", marginLeft: "90%" }}>
              <Form.Item>
                <Button htmlType="submit"> Save</Button>
              </Form.Item>
            </Row>
          </Form>
        </Layout>

        <div style={{ paddingTop: "25px" }}>
          <Layout className="bottom-container">
            <Row>
              <Col span={8}>
                <h2 className="h2">Turbo Configuration</h2>
              </Col>
            </Row>
            {turboConfig ? (
              <TableElement
                data={turboConfig}
                editable={true}
                editableColumn={[
                  {
                    editFeild: "description",
                    inputType: "input",
                  },
                  {
                    editFeild: "status",
                    inputType: "select",
                  },
                ]}
                childrenColumnName={"turboconfig"}
                configIdKeyValue={"turboconfig_id"}
              />
            ) : (
              []
            )}
          </Layout>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appData: state.app,
});

const mapDispatchToProps = {
  updateTurboConfig,
  updateTitleElements,
  updateTableStatusData,
  updateNotifyAction,
};

const TurboContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurboConfig);
export default TurboContainer;
