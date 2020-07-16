export interface Ent {
  sid: number;
  regno?: string;
  entname?: string;
  uniscid?: string;
  enttype?: string;
  industryCategory?: string;
  organizationClass?: string;
  nationalEnconomy?: string;
  regAddress?: string;
  regType?: string;
  keyEnt?: number;
  largeScale?: number;
  optype?: string;
  higherUp?: string;
  staffNum?: number;
  scale?: string;
  lerep?: string;
  lerepTel?: number;
  regcap?: number;
  currency?: string;
  dom?: string;
  oploc?: string;
  opfrom?: Date;
  opto?: Date;
  opscope?: string;
  opscotype?: string;
  regorg?: string;
  regstate?: string;
  estdate?: Date;
  apprdate?: Date;
  revdate?: Date;
  sugrevreason?: string;
  linkmanname?: string;
  linkmancerno?: string;
  linkmanphone?: string;
  operatingLongitude?: number;
  operatingLatitude?: number;
  hazardousChemicals?: number;
  limitedSpace?: number;
  combustibleDust?: number;
  metalSmelting?: number;
  specialEquipment?: number;
  gas?: number;
  fourpic?: string;
  annualSales?: number;
  areaid?: string;
  superviseLevel?: string;
  superviseGrade?: string;
  standLevelCode?: string;
  safecheckType?: string;
  superviseType?: string;
  honestygrade?: string;
}

export interface User {
  sid: number;
  loginname: string;
  pwd: string;
  name: string;
  sex: string;
  idNumber: string;
  tele: string;
  position: string;
  certificateNumber: string;
  issueUnit: string;
  issueDate: Date;
  expireDate: Date;
  safetyTraining: string;
  entid: number;
  deptid: string;
  job: string;
  areaid: string;
  persontype: string;
  userclass: string;
}

export interface Cdentpersontype {
  sid: string;
  content: string;
  status: string;
}

export interface Cdadminorg {
  sid: string;
  content: string;
  pid: string;
  codelevel: number;
}

export interface Cdrisktype {
  sid: string;
  content: string;
  status: string;
}

export interface Cdrisklevel {
  sid: string;
  content: string;
  status: string;
}

export interface Cdregstate {
  sid: string;
  content: string;
  status: string;
}

export interface Cdscale {
  sid: string;
  content: string;
  status: string;
}

export interface Cdsupervisegrade {
  sid: string;
  content: string;
  status: string;
}

export interface Cdsuperviselevel {
  sid: string;
  content: string;
  status: string;
}

export interface Cdarea {
  sid: string;
  content: string;
  pid: string;
  codelevel: number;
}

export interface Cdhonesty {
  sid: string;
  content: string;
  status: string;
}

export interface Cdsafecheck {
  sid: string;
  content: string;
  status: string;
}

export interface Cdstandlevel {
  sid: string;
  content: string;
  status: string;
}

export interface RiskCheckEntity {
  id: string;
  entId: string;
  status: string;
  riskType: string;
  riskSource: string;
  riskLevel: string;
  riskDescription: string;
  modifyMeasure: string;
  modifyTimeLimit: string;
  riskPicList: string[];
  checker: string;
  checkDate: string;
  modifyCharger: string;
  modifySituation: string;
  modifyFile: string;
  modifyPicList: string[];
  modifier: string;
  modifyDate: string;
}
