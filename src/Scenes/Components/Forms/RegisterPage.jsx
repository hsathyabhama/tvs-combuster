import React, { Component } from "react";
import { Col, Row, Input, Button, Form, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { updateAppState } from "../../../Redux/action";
import { registerPageValidation } from "../../../Services/requests";
import { CompanyDetails, FormDetails } from "../../../Services/constants";

const {
  confirm_password,
  enter_email,
  enter_username,
  enter_password,
  password_notmatch,
  alert_registered_email,
  email_notvalid,
  success_msg,
  alert_username_taken,
  alert_email_taken,
} = FormDetails;
const { company_name, company_data } = CompanyDetails;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsuserName_reg: false,
      Isemail_reg: false,
    };
  }

  //error alert close fn
  alertOnClose = (e) => {
    this.setState({
      IsuserName_reg: "",
      Isemail_reg: "",
    });
  };

  //Form onfinish fn
  submitRegister = (values) => {
    registerPageValidation(values, (data) => {
      let inputData = data.toString();
      if (inputData === success_msg) {
        this.setState({ redirect: true });
        this.props.updateAppState("login");
      } else if (inputData === alert_username_taken) {
        this.state.IsuserName_reg = true;
        this.setState({ redirect: false });
      } else if (inputData === alert_email_taken) {
        this.state.Isemail_reg = true;
        this.setState({ redirect: false });
      }
    });
  };

  //onclick login event
  backToLoginEvent = () => {
    this.props.updateAppState("login");
  };

  render() {
    const IsuserName_reg = this.state.IsuserName_reg;
    const Isemail_reg = this.state.Isemail_reg;
    return (
      <div className="background">
        <div className="wrapper">
          <div className="form-holder ">
            <Row style={{ width: "" }}>
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
                      name="register"
                      initialValues={{ remember: true }}
                      onFinish={this.submitRegister}
                    >
                      <Form.Item
                        name="user_name"
                        rules={[{ required: true, message: enter_username }]}
                      >
                        <Input
                          style={{ backgroundColor: "transparent" }}
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Username"
                        />
                      </Form.Item>

                      <Form.Item
                        name="user_email"
                        rules={[
                          {
                            type: "email",
                            message: email_notvalid,
                          },
                          {
                            required: true,
                            message: enter_email,
                          },
                        ]}
                      >
                        <Input
                          style={{ backgroundColor: "transparent" }}
                          prefix={
                            <MailOutlined className="site-form-item-icon" />
                          }
                          placeholder="E-Mail "
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

                      {IsuserName_reg ? (
                        <Alert
                          className="alert_error"
                          closable
                          onClose={this.alertOnClose}
                          message={alert_registered_email}
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
                          style={{ width: "82px" }}
                        >
                          Signup
                        </Button>
                      </Form.Item>

                      <div>
                        <p
                          style={{
                            color: "rgb(151, 150, 151)",
                            fontSize: "calc(7px + 0.7vw)",
                          }}
                        >
                          Already have an account?
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
};

const registerPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
export default registerPage;
