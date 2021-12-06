import InitialState from "./store"

const appReducer = (state = InitialState, action) => {
  const newState = {}
  Object.assign(newState, state)
  switch (action.type) {
  /* ---Main page --- */
    //userParams
    case 'UPDATE_USER_PARAMETER':
      newState.userParams = action.payload
      return newState
    //leftBarView
    case 'TOGGLE_LEFTBAR_VIEW':
      newState.leftBarView = !newState.leftBarView
      return newState
    //userName
    case 'UPDATE_USER_NAME':
      newState.userName = action.payload ? action.payload : []
      return newState
    //appState
    case 'UPDATE_APP_STATE':
      newState.appState = action.payload ? action.payload : 'login'
      return newState
    //mainPage
    case 'NAVIGATE_MAIN_PAGE':
      newState.mainPage = action.payload ? action.payload : "dashboardConfig"
      return newState
    //titleElements
    case 'UPDATE_TITLE_ELEMENTS':
      newState.titleElements = action.payload ? action.payload : []
      return newState
    //chartData

  /* ---status block --- */
    case 'UPDATE_CHART_DATA':
      newState.chartData = action.payload ? action.payload : []
      return newState

  /* ---config page --- */
    //testConfigPage
    case 'UPDATE_TEST_CONFIG_PAGE':
      newState.testConfigPage = action.payload ? action.payload : []
      return newState
    //turboConfig
    case 'UPDATE_TURBO_CONFIG':    
      newState.turboConfig = action.payload ? action.payload : []
      return newState
    //paramConfig
    case 'UPDATE_PARAM_CONFIG':
      newState.paramConfig = action.payload ? action.payload : []
      return newState
    //dashboardData
    case 'UPDATE_DASHBOARD_DATA':
      newState.dashboardData = action.payload ? action.payload : []
      return newState
    //targetKeys
    case 'UPDATE_TARGET_KEYS':
      newState.targetKeys = action.payload ? action.payload : []
      return newState
    //notifyStatus
    case 'UPDATE_NOTIFY_ACTION':
      newState.notifyStatus = action.payload ? action.payload : []
      return newState

  /* ---Table component --- */
    //tableViewData
    case 'UPDATE_TABLEVIEW_DATA':
      newState.tableViewData = action.payload ? action.payload : []
      return newState
    //tablestatusData
    case 'UPDATE_TABLE_STATUS_DATA':
      newState.statusData = action.payload ? action.payload : []
      return newState

  /* ---Form component --- */
    //IsLogin
    case 'UPDATE_LOGIN_EVENT':
      newState.IsLogin = action.payload ? action.payload : []
      return newState
    //IsUserName forgot
    case 'UPDATE_FORGOT_EVENT':
      newState.IsUserName = action.payload ? action.payload : []
      return newState


  /* ---Test page/test details --- */
        //testidvalue
    case 'UPDATE_TESTID_VALUE':
      newState.testIdValue = action.payload ? action.payload : []
      return newState

    //turboIdTestCount
    case 'UPDATE_TESTID_COUNT':
      newState.turboIdTestCount = action.payload ? action.payload : []
      return newState

    //turboChargerType
    case 'UPDATE_TURBO_MODE':
      newState.turboChargerType = action.payload
      return newState
     
    //plcControlType
    case 'UPDATE_PLC_CONTROLTYPE':
      newState.plcControlType = action.payload
      return newState

    //testDropdown
    case 'UPDATE_DROPDOWN':
      newState.testDropdown = action.payload
      return newState

  /* ---Test page/test initialize --- */
    //shutdownInitiated
    case 'SHUTDOWN_INITIATED':
      newState.shutdownInitiated = true
      return newState
    //showReset
    case 'SHOW_RESET_INITIATED':
      newState.showReset = true
      return newState
    //communicationFailed
    case 'COMMUNICATION_FAILED_INITIATED':
      newState.communicationFailed = action.payload 
      return newState
    //communication
    case 'COMMUNICATION_INITIATED':
      newState.communication = true
      return newState
    //targetState
    case 'TARGET_STATE_INITIATED':
      newState.targetState = !newState.targetState
      return newState
    //showTarget
    case 'SHOW_TARGET_INITIATED':
      newState.showTarget = true
      return newState
    //turboStart
    case 'TURBO_START_INITIATED':
      newState.turboStart = action.payload ? action.payload : []
      return newState
   
    //stageThree
    case 'STAGE_THREE_INITIATED':
      newState.stageThree = true
      newState.showReset = true
      return newState
   
    //targetRPM
    case 'TARGET_RPM':
      newState.targetRPM = action.payload
      return newState
    //targetTemp
    case 'TARGET_TEMP':
      newState.targetTemp = action.payload
      return newState
    //resetTemp
    case 'RESET_TEMP':
      newState.resetTemp = action.payload
      return newState
    //resetRPM
    case 'RESET_RPM':
      newState.resetRPM = action.payload
      return newState
  
    case 'STOP_DB_INSERT':
      newState.stageThree = false
      newState.communication = false
      newState.showTarget = false
      newState.showReset = false
      newState.targetRPM = ''
      newState.targetTemp = ''
      newState.shutdownInitiated = false
      return newState  

    //startDisable
    case 'SHUTDOWN_ENABLE_EVENT':
     newState.startDisable = action.payload
    return newState

    //testIdData
    case 'GETTING_TEST_ID_DATA':
      newState.testIdData = action.payload
     return newState 
                    
     //delayValue
    case 'FETCHING_DELAY_VALUE':
      newState.delayValue = action.payload
      return newState
    //cvStageValue
    case 'FETCHING_CVSTAGE_VALUE':
      newState.cvStageValue = action.payload
      return newState
      

    default:
      return newState
  }
}

export default appReducer
