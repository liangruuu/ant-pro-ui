import { Moment } from 'moment';

export interface Ent {
  sid: string;
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
  lerepTel?: string;
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
  estdate?: Moment;
  apprdate?: Moment;
  revdate?: Moment;
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
  entType: string;
  qualify?: string;
}

export interface User {
  sid: string;
  loginname: string;
  pwd: string;
  name: string;
  sex: string;
  idNumber: string;
  tele: string;
  position: string;
  certificateNumber: string;
  issueUnit: string;
  issueDate: Moment;
  expireDate: Moment;
  safetyTraining: string;
  entid: string;
  deptid: string;
  job: string;
  areaid: string;
  persontype: string;
  userclass: string;
}

export interface Agency {
  sid: string;
  entname: string;
  uniscid: string;
  estdate: Moment;
  lerep: string;
  regAddress: string;
  areaid: string;
  staffNum: number;
  qualify: string;
  lerepTel: string;
  dom: string;
  oploc: string;
  opfrom: string;
  opto: string;
  opscope: string;
  regorg: string;
  regstate: string;
  apprdate: Moment;
  linkmanid: string;
  linkmanphone: string;
  agencytype: string;
  regcapc;
}

export interface Agencycontract {
  sid: string;
  conname: string;
  conamount: Moment;
  constart: Moment;
  conend: Moment;
  docurl: string;
  uploader: string;
  uploaddate: Moment;
  agencyid: string;
  entid: string;
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

export interface TreeNode {
  value: string;
  title: string;
  key: string;
  selectable: boolean;
  children: TreeNode[];
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
