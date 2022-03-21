import React, { Component } from "react";
import { Row, Layout } from "antd";
import { connect } from "react-redux";
import { updateTitleElements } from "../../../Redux/action";

class TitleElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: "",
    };
  }

  render() {
    const titleValue = this.props.app.titleElements;
    return (
      <div>
        <Layout style={{ backgroundColor: "#212840", paddingBottom: "5px" }}>
          <Row>
            <p style={{ color: "#42dad6", fontSize: "calc(9px + 0.9vw)" }}>
              EnerTek{" "}
            </p>
            <p style={{ color: "#585a5f", fontSize: "calc(9px + 0.9vw)" }}>
              {" "}
              / {titleValue.type} / {titleValue.title}{" "}
            </p>
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
};

const Title = connect(mapStateToProps, mapDispatchToProps)(TitleElement);
export default Title;
