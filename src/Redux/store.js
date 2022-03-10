import { dashboardDataVal, targetKeysVal, titleElements } from '../Services/constants'

const InitialState = {
  mainPage: 'testPage',
  appState: "login",
  userName: '',
  userParams: '',
  leftBarView: false,
  collapsed: true,
  titleElements: titleElements,
  turboChargerType: 1,
  IsLogin: false,
  IsUserName: [],

  // -- config page -- //
  testConfigPage: [],
  turboConfig: [],
  paramConfig: [],
  dashboardData: dashboardDataVal,
  targetKeys: targetKeysVal,
  tableViewData: [],
  notifyStatus: 'false',

  // -- test details -- //
  testIdValue: '',
  turboIdTestCount: '',
  testDropdown: 'sub1',

  // -- test page -- //
  statusData: '',
  reset: false,
  chartData: [0, 0, 0, 0, 0, 0, 0, 0],
  chartData2: [0, 0, 0, 0],
  shutdownInitiated: false,
  communicationFailed: false,
  communication: false,
  targetState: false,
  showReset: false,
  showTarget: false,
  turboStart: [],
  stageThree: false,
  targetRPM: '',
  targetTemp: '',
  resetTemp: '',
  resetRPM: '',
  startDisable: false,
  testIdData: 0,
  delayValue: 1000,
  cvStageValue: [],
  resetButtonClick: 1,
  lubeOilValue: 0,
  bargingButtonActivity: false,
  bargingEvent: false,
}
export default InitialState