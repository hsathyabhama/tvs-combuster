const url = {
  BASE_URL: 'http://localhost:5000/',
  LOGIN_VALIDATION: 'login_validation.php',
  FORGOT_VALIDATION: 'forget.php',
  REGISTERPAGE_VALIDATION: 'Registration.php',
  TURBO_CONFIG: 'turbo_config.php',
  TURBO_CONFIG_SUBMIT: 'turbo_config_validation.php',
  TEST_CONFIG: 'test_config.php',
  PARAM_CONFIG: 'param_config.php',
  UPDATE_CONFIG_DATA: 'testconfigedit.php',
  TABLE_VIEW: 'tableview.php',
  SHUTDOWN_CLICK: 'shutdown.php',
  TURBOID_VALUE: 'turboIdValue.php',
  TABLE_STATUSDATA: 'statusValue.php',  
  DELAY_DATA: 'configuration.php',     
  LOGOUT_EVENT: 'logout.php',  
}

const FormDetails = {
  enter_email: 'Please input your e-mail!',
  enter_password: 'Please input your password!',
  enter_username: 'Please input your username!',
  email_notvalid: 'The input is not valid E-mail!',
  password_notmatch: 'The two passwords that you entered do not match!',
  confirm_password: 'Please confirm your password!',
  alert_email: 'Please enter a valid e-mail',
  alert_registered_email: 'Sorry... e-mail already registered',
  alert_msg_login: 'Username or Password is incorrect',
  success_msg: 'success',
  alert_username_taken: 'Sorry... username already taken',
  alert_email_taken: 'email already taken'

}
const CompanyDetails = {
  year: '2021',
  company_name: 'EnerTek Combuster',
  company_data: 'A product powerd by Vaigunth EnerTek (Pvt.) Ltd.',
  company_link: 'http://www.v-enertek.com/',
  drdo_logo: 'https://www.drdo.gov.in/sites/default/files/drdo_logo_0.png',
}

const dashboardDataVal = [
  { "key": "0", "Name": "Combustor Outlet Temperature", "chosen": true },
  { "key": "1", "Name": "TurboCharger Outlet Temperature", "chosen": true },
  { "key": "2", "Name": "RPM sensor", "chosen": true },
  { "key": "3", "Name": "Combuster Inlet Pressure", "chosen": true },
  { "key": "4", "Name": "Gas Inlet Pressure", "chosen": true },
  { "key": "5", "Name": "Gas Flow", "chosen": true },
  { "key": "6", "Name": "Ventury Meter", "chosen": false },

]

const dashboardSensor = {
  sensorLabel: [
    "Combustor Outlet Temperature", "TurboCharger Outlet Temperature", "Rpm sensor",
    "Combuster Inlet Pressure","Gas Inlet Pressure", "Gas Flow","Ventury Meter",
   ],
  dummyData: 0,
  chartMax: 5,
  n_shutdown: 'N-Shutdown',
  e_shutdown: 'E-Shutdown',
  live: 'LIVE',
  offline: 'OFFLINE',

  sensorLabel_row2 : [
    "Beta", "AirtoFuelRatio", "AirMassFlow",
  ],

  //filter for statusblockRow2 
  //number should be 2 less than the actual index like c13 = 11  
    targetKeysVal_row2 :  [10, 11, 12],
}
const targetKeysVal = ["0","1", "2", "3", "4", "5"]

const titleElements = [
  {
    title: '',
    type: '',
  }
]

const testParamHash = { 
  Initializedata: ['Communication', 'Initialize Started', 'Initialize Completed'],
  Startdata: ['Start Completed', 'Ignite', 'Pilot Gas Opened', 'Stage 1', 'Main Gas Opened','Stage 2', 'Pilot Gas Closed','Stage 3'],
  nShutdowndata: ['N.Shutdown Initiated', 'N.Shutdown Completed'],
  eShutdowndata: ['E.Shutdown Initiated', 'E.Shutdown Completed'],
  Resetdata: ['Reset Values'],
  Tester_warning: 'Already exists',
  Witness_warning: 'Already exists',
  duplicate_msg: 'Duplicate value',
  warning_Id: "Please select the turbo ID",
  warning_burnermode: "Please select turbo mode",
  warning_controlunit: "Please select control unit",
  warning_name: "Please enter tester name",
  alert_targetval: "Please enter target values",
}

const helpPopup = {
  value: 'VALVE STATUS AT :',
  SV1_coolingAir: 'CoolingAir :',
  SV2_pilot_flameAir: 'PilotFlameAir :',
  SV3_naturalGas: 'NaturalGas : ',
  SV4_gas_pilotFlame: 'GasPilotFlame : ',
  SV5_diliute: 'Diliute : ',  
  ErrorCode: 'ERROR CODE : ',
}

const turboConfigValue = {
  installed_turbine: 1,
  nozzleArea_min: 0.0002,
  nozzleArea_max: 0.0005,
  nozzleArea_step: 0.0001,
  nozzleArea_defalutValue: 0.00023,  
  error_turbo_msg: 'Turbo ID alreadt exists',
  error_blade_msg: 'Please enter number of blades',
  added_turbo_msg: 'TurboID added successfully',
  message_title: "INSTALLED MORE THAN 1 TURBINES",
  description_data:
    "The system is installed with more than 1 turbines. Make sure there is only 1 turbine is installed. ",
}

const dashboardDataMessage = {
  transfer_warning: 'Select transfer data',
  transfer_success: 'Submitted successfully',
  message_title: "SELECTED SENSORS ",
  description_data: " Must select 6 sensors.",
  msg_warning: "Select only 6 data",
}

const endurence = {
  RPM: "53900+/-1%",
  Minutes: "10+/-1",
  trubineInletTemp: "700/-50"
}

const performance = {
  RPM1: "41500+/-1%",
  RPM2: "49000+/-1%",
  Minutes: "2",
  trubineInletTemp: "700/-50",
  ComprInletPr: '',
  ComprOutletPr: '',
  PrRatio: '2.4+/-0.1',
  AirMassFlow: '0.97'
}

const ComparisonTableDetails = {
  FixedSpeed: '5000',
  FixedOilPr: '5.00 - 6.00',
  FixedOilTemp: '70 - 80',
  FixedTurbineInletGasTemp: '300 - 400',
  FixedComprInletPr: '2 - 8',
  FixedComprOutletPr: '3',
  FixedPrRatio: '40',
  FixedComperMassFlowRate: '50',
  FixedTotalMassFlowOfAir: '10',
}

const Details = {
  Speed: '3000',
  OilPr: '5.55',
  OilTemp: '75',
  TurbineInletGasTemp: '350',
  ComprInletPr: '2',
  ComprOutletPr: '30000',
  PrRatio: '490000',
  ComperMassFlowRate: '55000',
  TotalMassFlowOfAir: '9000',
}

const reportAlert = {
  turboID_alert: "Select the turbo ID",
  testNo_alert: "Select the test No",
  testno_check: "Check the test No"
}

export {
  url, FormDetails, CompanyDetails,
  dashboardDataVal, targetKeysVal,
  titleElements, dashboardSensor,
  testParamHash, turboConfigValue,
  dashboardDataMessage, endurence, performance,
  ComparisonTableDetails, Details, helpPopup, reportAlert
}
