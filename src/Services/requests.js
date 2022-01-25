import axios from 'axios';
import { url } from './constants';

const URL = url
const BASE_URL = URL.BASE_URL
const loginValidationUrl = `${BASE_URL}${URL.LOGIN_VALIDATION}`
const forgotValidationUrl = `${BASE_URL}${URL.FORGOT_VALIDATION}`
const registerPageValidationUrl = `${BASE_URL}${URL.REGISTERPAGE_VALIDATION}`
const turboConfigUrl = `${BASE_URL}${URL.TURBO_CONFIG}`
const turboConfigSubmitUrl = `${BASE_URL}${URL.TURBO_CONFIG_SUBMIT}`
const configTableUrl = `${BASE_URL}${URL.TEST_CONFIG}`
const paramConfigUrl = `${BASE_URL}${URL.PARAM_CONFIG}`
const shutdownClickEventUrl = `${BASE_URL}${URL.SHUTDOWN_CLICK}`
const updateConfigDataUrl = `${BASE_URL}${URL.UPDATE_CONFIG_DATA}`
const tableViewUrl = `${BASE_URL}${URL.TABLE_VIEW}`
const turboIdValueUrl = `${BASE_URL}${URL.TURBOID_VALUE}`
const tableStatusDataUrl = `${BASE_URL}${URL.TABLE_STATUSDATA}` 
const delayDataUrl = `${BASE_URL}${URL.DELAY_DATA}`
const logoutEventUrl = `${BASE_URL}${URL.LOGOUT_EVENT}`
const graphDataUrl = `http://localhost:8001/graph.php`  
const sensorDataUrl = `http://localhost:8002/getdata.php`
const fcvStageUrl = `http://localhost:8003/fcvStage.php`

// Form requests
const loginValidation = (values, callBack) => {
  axios.post(loginValidationUrl, values)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
}
const forgotValidation = (values, callBack) => {
  axios.post(forgotValidationUrl, values)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};
const registerPageValidation = (values, callBack) => {
  axios.post(registerPageValidationUrl, values)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};
// Table & config table request
const getTurboConfigData = (callBack) => {
  axios.get(turboConfigUrl).then(res => {
    let turboData = res.data
    callBack(turboData)
  }).catch((err) => {
    console.log(err);
  })
}
const updateConfigData = (data, callBack) => {
  axios.post(updateConfigDataUrl, data)
    .then(res => {
      let configData = res.data
      callBack(configData)

    }).catch(err => {
      console.log(err.res)
    })
}

const getTableView = (callBack) => {
  axios.post(tableViewUrl)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

const getTestConfigData = (callBack) => {
  axios.get(configTableUrl)
    .then(res => {
      let testData = res.data;
      callBack(testData)
    }).catch((err) => {
      console.log(err);
    })
}
const getParamConfigData = (callBack) => {
  axios.get(paramConfigUrl)
    .then(res => {
      let paramData = res.data
      callBack(paramData)
    }).catch((err) => {
      console.log(err);
    })
}

// TurboConfig page request
const turbineConfigSubmit = (body, callBack) => {
  axios.post(turboConfigSubmitUrl, body)
    .then(res => {
      if (res.data) {
        callBack(res.data)
      }
    }).catch(err => {
      console.log(err.res)
    })
}

// Test page request
const shutdownClickEvent = (callBack) => {
  axios.post(shutdownClickEventUrl)
    .then(function (response) {
      let shutdownValue = response
      callBack(shutdownValue)
    }).catch((err) => {
      console.log(err);
    })
}
const requestStatusData = (callBack) => {
  axios.get(tableStatusDataUrl)
    .then(res => {
      let Data = res.data;
      callBack(Data)
    }).catch(err => {
      console.log(err);
    })
}
const gettingChartData = (body,callBack) => {
  axios.post(graphDataUrl, body)
    .then(res => {
      let chartdata = res.data;
      callBack(chartdata)

    }).catch(err => {
      console.log(err);
    })
}

const getSensorData = (callBack) => {
  axios.post(sensorDataUrl)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

const getHandleChangetestID = (body, callBack) => {
  axios.post(turboIdValueUrl, body)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};


const gettingDelayValue = (callBack) => {
  axios.post(delayDataUrl)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

const logoutEvent = (callBack) => {
  axios.post(logoutEventUrl)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

const fcvTransferEvent = (body,callBack) => {
  axios.post(fcvStageUrl, body)
    .then(res => {
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

export {
  getTurboConfigData, turbineConfigSubmit,
  getTestConfigData, getParamConfigData,
  shutdownClickEvent, updateConfigData, 
  loginValidation, forgotValidation,
  registerPageValidation, getTableView,
  getSensorData, getHandleChangetestID,
  requestStatusData, gettingChartData, 
  gettingDelayValue, logoutEvent,fcvTransferEvent
  
}
