import React, { Component } from "react";
import { Col, Row, Input, Button, Form, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { updateAppState, updateForgotEvent } from "../../../Redux/action";
import { forgotValidation } from "../../../Services/requests";
import { CompanyDetails, FormDetails } from "../../../Services/constants";

const {
  enter_email,
  enter_password,
  confirm_password,
  password_notmatch,
  alert_email,
} = FormDetails;
const { company_name, company_data } = CompanyDetails;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      IsUserName: false,
    };
  }

  //error aler box close fn
  alertOnClose = () => {
    this.setState({
      IsUserName: "",
    });
  };

  //Form submit fn
  submitOnFinish = (values) => {
    forgotValidation(values, (data) => {
      let inputData = data.toString();
      if (inputData == "success") {
        this.props.updateAppState("login");
      } else {
        this.state.IsUserName = true;
        this.setState({ redirect: false });
      }
    });
  };

  //return login page event
  backToLoginEvent = () => {
    this.props.updateAppState("login");
  };

  render() {
    const IsUserName = this.state.IsUserName;
    return (
      <div className="background">
        <div className="wrapper">
          <div className="form-holder">
            <Row>
              {/* <!-- Logo & Information Panel--> */}
              <Col span={12}>
                <div className="info" style={{ paddingTop: "10rem" }}>
                  <h1
                    style={{ color: "white", fontSize: "calc(14px + 1.8vw)" }}
                  >
                    {company_name}
                  </h1>
                  <p>{company_data}</p>
                </div>
              </Col>
              {/* <!-- Form Panel    --> */}
              <Col span={12}>
                <div className="form d-flex align-items-center">
                  <div className="content" style={{ paddingTop: "5rem" }}>
                    <Form
                      initialValues={{ remember: true }}
                      onFinish={this.submitOnFinish}
                    >
                      <Form.Item
                        name="user_name"
                        rules={[{ required: true, message: enter_email }]}
                      >
                        <Input
                          className="form-input"
                          style={{ backgroundColor: "transparent" }}
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Email_ID"
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: enter_password }]}
                        hasFeedback
                      >
                        <Input.Password
                          style={{ backgroundColor: "transparent" }}
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          placeholder="Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>

                      <Form.Item
                        name="Confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: confirm_password,
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(password_notmatch);
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          style={{ backgroundColor: "transparent" }}
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          placeholder="Confirm Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>

                      {IsUserName ? (
                        <Alert
                          className="alert_error"
                          message={alert_email}
                          closable
                          onClose={this.alertOnClose}
                          type="error"
                        />
                      ) : (
                        ""
                      )}
                      <Form.Item
                        style={{
                          paddingTop: "35px",
                          paddingBottom: "30px",
                          paddingLeft: "40%",
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          style={{ width: "84px" }}
                        >
                          Submit
                        </Button>
                      </Form.Item>

                      <div>
                        <p
                          style={{
                            color: "rgb(151, 150, 151)",
                            fontSize: "calc(7px + 0.7vw)",
                          }}
                        >
                          Back to Login page?
                          <a
                            onClick={this.backToLoginEvent}
                            className="forgot-pass"
                          >
                            Login
                          </a>
                        </p>
                      </div>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  updateAppState,
  updateForgotEvent,
};

const forgotPasswordPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

export default forgotPasswordPage;
