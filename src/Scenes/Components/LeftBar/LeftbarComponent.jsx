import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { navigateMainPage } from '../../../Redux/action'
import {
  DashboardOutlined, FolderOutlined,
  LineChartOutlined, ToolOutlined,
} from '@ant-design/icons';
import { GiPaperWindmill } from "react-icons/gi";
import { DiYii } from "react-icons/di";
import { FiSettings, FiSliders, FiActivity } from "react-icons/fi";
import { AiOutlineTable, AiFillDatabase } from "react-icons/ai";

const { SubMenu } = Menu;
const { Sider } = Layout;
class LeftbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed_view: false,
      showMainViewSideBarText: true,
      showReportsSideBarText: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = e => {
    console.log('click ', e);
    this.props.navigateMainPage(e.key)
  }
  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.leftBarView.leftBarView}>
        <Menu
          theme="dark"
          onClick={this.handleClick}
          defaultSelectedKeys={['3']}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<DashboardOutlined />} title="Dashboard" style={{ fontSize: '15px' }} >
            <Menu.Item key="graphView" icon={<LineChartOutlined style={{ color: '#42dbdc' }} />}>  Graph View</Menu.Item>
            <Menu.Item key="tableView" icon={<AiOutlineTable style={{ color: '#42dbdc' }} />}>  Table View </Menu.Item>
          </SubMenu>
          <Menu.Item key="testPage" icon={<DashboardOutlined />} >
            <text style={{ marginBottom: '10px' }}>  Test </text>
          </Menu.Item>
          <SubMenu key="sub2" icon={<ToolOutlined />} title="Configuration" style={{ fontSize: '15px' }}  >
            <Menu.Item key="turboConfig" icon={<GiPaperWindmill style={{ color: '#42dbdc' }} />}> Turbo Config </Menu.Item>
            <Menu.Item key="dashboardConfig" icon={<FiSettings style={{ color: '#42dbdc' }} />}>Dashboard Config </Menu.Item>
            <Menu.Item key="paramConfig" icon={<FiSliders style={{ color: '#42dbdc' }} />}> Param Config </Menu.Item>
            <Menu.Item key="testConfig" icon={<DiYii style={{ color: '#42dbdc' }} />}>  Test Config</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<FolderOutlined />} title="Report" style={{ fontSize: '15px' }}  >
            <Menu.Item key="runningReport" icon={<FiActivity style={{ color: '#42dbdc' }} />}>Running Report </Menu.Item>
            <Menu.Item key="demo" icon={<AiFillDatabase style={{ color: '#42dbdc' }} />}>Export Data </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  leftBarView: state.app
  // user: state.app
})

const mapDispatchToProps = {
  navigateMainPage
}

const leftBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftbarComponent)

export default leftBar;