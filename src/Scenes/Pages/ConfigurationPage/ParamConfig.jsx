import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTitleElements } from "../../../Redux/action";
import { Col, Row, Layout } from "antd";
import TableElement from "../../Components/subComponents/TableElement";

class ParamConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramData: "",
    };
  }

  render() {
    const appData = this.props.app;
    return (
      <div style={{ paddingTop: "1px" }}>
        <div style={{ paddingTop: "25px" }}>
          <Layout className="bottom-container">
            <Row>
              <Col span={8}>
                <h2 className="component-heading">
                  Color Range Configuration Table
                </h2>
              </Col>
            </Row>
            {appData.paramConfig && appData.paramConfig.length > 1 ? (
              <TableElement
                data={appData ? appData.paramConfig : []}
                childrenColumnName={"paramconfig"}
                configIdKeyValue={"paramconfig_id"}
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
  app: state.app,
});

const mapDispatchToProps = {
  updateTitleElements,
};

const paramContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParamConfig);
export default paramContainer;
