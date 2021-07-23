import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleLeftBar, updateAppState } from '../../../Redux/action'
import {
  MenuUnfoldOutlined, MenuFoldOutlined,
} from '@ant-design/icons';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      showCompanyName: true,
    }
  }
  collapse = () => {
    this.props.toggleLeftBar()
  }
  backToLoginEvent = () => {
    window.location.reload(false);
  }
  render() {
    const appData = this.props.app;
    const collapsed = appData.leftBarView;
    return (
      <div className="site-layout-background">
        <div className="logo" >
          {this.state.showCompanyName ? <LogoValue /> : null}
        </div>
        {
          React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: this.collapse,
            })}

        <div class="logout-element">
          <div className="logout-content" onClick={this.backToLoginEvent}>
            <text className="logout-btn"> Logout</text>
          </div>

          <div className="welcome-message">
            <text>Welcome {appData.userName}</text>
          </div>
        </div>
      </div>
    )
  }
}
const LogoValue = () => (
  <div className="testlogo" >
    <text style={{ color: '#42dad6', fontSize: "20px" }}>ENERTEK</text>
    <text style={{ color: '#8a8d93', fontSize: "20px" }}>COMBUSTER</text>
  </div>
)

const mapStateToProps = state => ({
  collapsed: state.app.collapsed,
  user: state.app.userParams,
  app: state.app
})

const mapDispatchToProps = {
  toggleLeftBar,
  updateAppState
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)

export default HeaderContainer;