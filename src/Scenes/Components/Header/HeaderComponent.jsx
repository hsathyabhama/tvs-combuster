import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleLeftBar, updateAppState } from "../../../Redux/action";
import { logoutEvent } from "../../../Services/requests";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Space } from "antd";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      showCompanyName: true,
    };
  }

  //function for collapse
  collapse = () => {
    this.props.toggleLeftBar();
  };

  //function for logout
  backToLoginEvent = () => {
    window.location.reload(false);
    logoutEvent((data) => {});
  };

  render() {
    const appData = this.props.app;
    const collapsed = appData.leftBarView;
    return (
      <div className="site-layout-background">
        <div className="logo">
          {this.state.showCompanyName ? <LogoValue /> : null}
        </div>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: this.collapse,
          }
        )}

        <div className="logout-element">
          <div className="logout-content" onClick={this.backToLoginEvent}>
            <a className="logout-btn"> Logout</a>
          </div>
        </div>
        <div className="welcome-message">
          <div>Welcome {appData.userName}</div>
        </div>
      </div>
    );
  }
}

const LogoValue = () => (
  <div className="testlogo">
    <Space style={{ color: "#42dad6", fontSize: "calc(9px + 0.8vw)" }}>
      ENERTEK
    </Space>
    <Space style={{ color: "#8a8d93", fontSize: "calc(9px + 0.8vw)" }}>
      COMBUSTER
    </Space>
  </div>
);

const mapStateToProps = (state) => ({
  collapsed: state.app.collapsed,
  user: state.app.userParams,
  app: state.app,
});

const mapDispatchToProps = {
  toggleLeftBar,
  updateAppState,
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

export default HeaderContainer;
