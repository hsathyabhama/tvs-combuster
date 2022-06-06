import React from "react";
import { Col, Row, Button, Form, Transfer, message, notification } from "antd";
import { connect } from "react-redux";
import { updateDashboardData, updateTargetKeys } from "../../../Redux/action";
import {
  dashboardDataMessage,
  dashboardDataVal,
  targetKeysVal,
} from "../../../Services/constants";
const { message_title, description_data, msg_warning } = dashboardDataMessage;

const key = "updatable";
class TransferElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [],
      targetKeys: [],
      dashboardData: dashboardDataVal,
    };
  }

  componentDidMount() {
    this.getMock();
    this.setState({
      targetKeys: this.props.app.targetKeys,
    });
  }

  //transfering data event
  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < this.state.dashboardData.length; i++) {
      const data = {
        key: this.state.dashboardData[i].key,
        title: this.state.dashboardData[i].Name,
        chosen: this.state.dashboardData[i].chosen,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  //Notification for more than 1 turbine
  openNotification = (value) => {
    setTimeout(() => {
      notification.open({
        key,
        message: message_title,
        description: description_data,
        value,
      });
    }, 1000);
  };

  //transfering data onclick
  handleChange = (targetKeys, direction, moveKeys) => {
    if (targetKeys.length < 3) {
      this.openNotification("bottomRight");
    }
    if (targetKeys.length > 3) {
      message.warning(msg_warning);
    } else {
      this.setState({
        targetKeys,
      });
      if (targetKeys.length < 3) {
        this.openNotification("bottomRight");
      } else {
        this.props.updateTargetKeys(targetKeys);
      }
    }
  };

  //resetting data
  clearChosen = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < this.state.dashboardData.length; i++) {
      const data = {
        key: this.state.dashboardData[i].key,
        title: this.state.dashboardData[i].Name,
        chosen: this.state.dashboardData[i].chosen,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
    this.props.updateTargetKeys(targetKeysVal);
  };

  renderItem = (item) => {
    const customLabel = <span className="custom-item">{item.title}</span>;

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <h2 className="component-heading">Dashboard Configuration</h2>
          </Col>
          <Col span={12}>
            <h2 className="component-heading">Selected Param</h2>
          </Col>
        </Row>
        <Form>
          <Transfer
            dataSource={this.state.mockData}
            listStyle={{
              width: 550,
              height: 350,
            }}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={this.renderItem}
          />
          <Row
            style={{
              paddingTop: "25px",
              paddingLeft: "40%",
              paddingBottom: "10px",
            }}
          >
            <Col xs={3}>
              <Form.Item style={{ paddingLeft: "70%" }}>
                <Button onClick={() => this.clearChosen()}> Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateDashboardData,
  updateTargetKeys,
};

const transferPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferElement);

export default transferPage;
