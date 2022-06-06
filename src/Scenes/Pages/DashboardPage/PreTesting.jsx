import React, { Component } from "react";
import {
  updateTitleElements,
  updatePreTestKey,
  updatePreTestValue,
  updatePreTestStatus,
} from "../../../Redux/action";
import { connect } from "react-redux";
import { checkPreTesting } from "../../../Services/requests";
import { Layout, Input, Select, Form, Switch, Col, Row, Button } from "antd";

const { Option, OptGroup } = Select;

class PreTesting extends Component {
  componentDidMount() {
    this.props.updateTitleElements({
      title: "PreTesting",
      type: "Dashboard",
    });
  }
  handleChangeSensor = (value, key) => {
    let data = key.key;
    this.props.updatePreTestKey(data);
    this.props.updatePreTestValue(value);
  };

  onChangeSwitch = (value) => {
    this.props.updatePreTestStatus(value);
  };

  preTest = () => {
    const body = {
      keyValue: this.props.app.preTestValue,
      status: this.props.app.preTestStatus,
    };
    checkPreTesting(body, (data) => {});
  };

  render() {
    return (
      <div>
        <Layout className="layout-container">
          <h2 className="component-heading">Pre-Testing</h2>
          <Row>
            <Form name="control-ref" style={{ padding: "2%" }}>
              <Form.Item name="PerTest Sensors" label="PerTest Sensors">
                <Input.Group compact>
                  <Select
                    style={{ width: "300px" }}
                    defaultValue={this.props.app.preTestKey}
                    onChange={this.handleChangeSensor}
                  >
                    {this.props.app.preTestStatus === true ? (
                      <OptGroup label="Sensor">
                        {this.props.app.preTestingSensor.map((it) => (
                          <Option disabled key={it.name} value={it.keyvalue}>
                            {it.name}
                          </Option>
                        ))}
                      </OptGroup>
                    ) : (
                      <OptGroup label="Sensor">
                        {this.props.app.preTestingSensor.map((it) => (
                          <Option key={it.name} value={it.keyvalue}>
                            {it.name}
                          </Option>
                        ))}
                      </OptGroup>
                    )}
                  </Select>
                </Input.Group>
              </Form.Item>
            </Form>

            <Col style={{ padding: "3%" }}>
              <Switch
                defaultChecked={this.props.app.preTestStatus}
                onChange={this.onChangeSwitch}
              />
            </Col>
          </Row>

          <Row style={{ marginLeft: "25%", paddingBottom: "2%" }}>
            {this.props.app.startDisable === true ? (
              <Button disabled>Test</Button>
            ) : (
              <Button htmlType="button" onClick={() => this.preTest()}>
                Test
              </Button>
            )}
          </Row>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateTitleElements,
  updatePreTestKey,
  updatePreTestValue,
  updatePreTestStatus,
};

const preTest = connect(mapStateToProps, mapDispatchToProps)(PreTesting);

export default preTest;
