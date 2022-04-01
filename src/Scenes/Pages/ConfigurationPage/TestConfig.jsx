import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateTestConfigPage,
  updateTitleElements,
} from "../../../Redux/action";
import { Col, Row, Layout } from "antd";
import TableElement from "../../Components/subComponents/TableElement";

class TestConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: "",
    };
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: "Test Config",
      type: "Config",
    });
  }

  render() {
    const testdata = this.props.app;
    return (
      <div>
        <div>
          <Layout className="bottom-container">
            <Row>
              <Col span={8}>
                <h2 className="component-heading">Test Configuration</h2>
              </Col>
            </Row>
            {testdata.testConfigPage && testdata.testConfigPage.length > 0 ? (
              <TableElement
                data={testdata.testConfigPage ? testdata.testConfigPage : []}
                editable={true}
                editableColumn={[
                  {
                    editFeild: "testparamvalue",
                    inputType: "input",
                  },
                ]}
                childrenColumnName={"testparamconfig"}
                configIdKeyValue={"testparamconfig_id"}
                parent={"testConfig"}
              />
            ) : (
              []
            )}
            <div></div>
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
  updateTestConfigPage,
  updateTitleElements,
};

const testContainer = connect(mapStateToProps, mapDispatchToProps)(TestConfig);
export default testContainer;
