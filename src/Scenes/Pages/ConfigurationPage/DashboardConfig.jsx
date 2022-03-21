import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import TransferElement from "../../Components/subComponents/TransferElement";
import ParamConfig from "../ConfigurationPage/ParamConfig";
import { updateTitleElements } from "../../../Redux/action";

export class DashboardConfig extends Component {
  componentDidMount() {
    this.props.updateTitleElements({
      title: "Dashboard Config",
      type: "Config",
    });
  }

  render() {
    return (
      <div>
        <Layout className="transfer-layout">
          <div style={{ paddingLeft: "80px" }}>
            <TransferElement />
          </div>
        </Layout>

        <div>
          <ParamConfig />
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

const dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardConfig);

export default dashboard;
