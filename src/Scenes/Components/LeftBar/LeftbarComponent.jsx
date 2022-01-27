import React, { Component } from "react";
import { Layout, Menu, Space } from "antd";
import { connect } from "react-redux";
import { navigateMainPage, updateTableStatusData } from "../../../Redux/action";
import { requestStatusData } from "../../../Services/requests";
import {
  DashboardOutlined,
  FolderOutlined,
  LineChartOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { GiPaperWindmill } from "react-icons/gi";
import { DiYii } from "react-icons/di";
import { FiSettings, FiActivity } from "react-icons/fi";
import { AiOutlineTable, AiFillDatabase, AiFillSignal } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { CgPerformance } from "react-icons/cg";

const { SubMenu } = Menu;
const { Sider } = Layout;

class LeftbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed_view: false,
      showMainViewSideBarText: true,
      showReportsSideBarText: true,
    };
    this.siderHandleClick = this.siderHandleClick.bind(this);
  }

  //onclick function for toggle collapse
  siderHandleClick = (e, data) => {
    this.props.navigateMainPage(e.key);

    //getting installed turbine name form db
    requestStatusData((data) => {
      this.props.updateTableStatusData(data);
    });
  };

  render() {
    const communication = this.props.app.communication;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.leftBarView.leftBarView}
      >
        <Menu
          theme="dark"
          onClick={this.siderHandleClick}
          defaultSelectedKeys={["3"]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            icon={<DashboardOutlined />}
            title="Dashboard"
            style={{ fontSize: "15px" }}
          >
            <Menu.Item
              key="graphView"
              icon={<LineChartOutlined style={{ color: "#42dbdc" }} />}
            >
              {" "}
              Graph View
            </Menu.Item>
            <Menu.Item
              key="tableView"
              icon={<AiOutlineTable style={{ color: "#42dbdc" }} />}
            >
              {" "}
              Table View{" "}
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="testPage" icon={<DashboardOutlined />}>
            <Space style={{ marginBottom: "10px" }}> Test </Space>
          </Menu.Item>
          <SubMenu
            key="sub2"
            icon={<ToolOutlined />}
            title="Configuration"
            style={{ fontSize: "15px" }}
          >
            {communication ? (
              <Menu.Item
                key="turboConfig"
                disabled
                icon={<GiPaperWindmill style={{ color: "#42dbdc" }} />}
              >
                {" "}
                Turbo Config{" "}
              </Menu.Item>
            ) : (
              <Menu.Item
                key="turboConfig"
                icon={<GiPaperWindmill style={{ color: "#42dbdc" }} />}
              >
                {" "}
                Turbo Config{" "}
              </Menu.Item>
            )}

            <Menu.Item
              key="dashboardConfig"
              icon={<FiSettings style={{ color: "#42dbdc" }} />}
            >
              Dashboard Config{" "}
            </Menu.Item>
            <Menu.Item
              key="testConfig"
              icon={<DiYii style={{ color: "#42dbdc" }} />}
            >
              {" "}
              Test Config
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            icon={<FolderOutlined />}
            title="Report"
            style={{ fontSize: "15px" }}
          >
            <Menu.Item
              key="exportData"
              icon={<AiFillDatabase style={{ color: "#42dbdc" }} />}
            >
              Export Data{" "}
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = (state) => ({
  leftBarView: state.app,
  app: state.app,
});

const mapDispatchToProps = {
  navigateMainPage,
  updateTableStatusData,
};

const leftBar = connect(mapStateToProps, mapDispatchToProps)(LeftbarComponent);

export default leftBar;
