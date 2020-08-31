export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/info',
          },
          {
            path: '/info',
            icon: 'table',
            name: 'info',
            routes: [
              {
                path: '/info',
                redirect: '/info/dashboardworkplace',
              },
              {
                name: 'dashboardworkplace',
                path: '/info/dashboardworkplace',
                component: './info/DashboardWorkplace',
              },
              {
                path: '/info/companylist',
                name: 'companylist',
                component: './info/CompanyList',
              },
              {
                path: '/info/companyinfo',
                name: 'companyinfo',
                component: './info/CompanyInfo',
              },
              {
                path: '/info/companyinfo/:id/legalperson',
                name: 'legalperson',
                component: './info/CompanyInfo/LegalPerson',
              },
              {
                path: '/info/securitymanager',
                name: 'manager',
                component: './info/SecurityManager',
              },
              {
                path: '/info/securitymanagerdetail',
                name: 'organization',
                component: './info/SecurityManagerDetail',
              },
              {
                path: '/info/proxylist',
                name: 'proxylist',
                component: './info/ProxyOrganization',
              },
              {
                path: '/info/proxyinfo',
                name: 'proxyinfo',
                component: './info/ProxyInfo',
              },
              {
                path: '/info/proxycontractputonrecords',
                name: 'proxycontractputonrecords',
                component: './info/ProxyContractPutOnRecords',
              },
              {
                path: '/info/contractputonrecords',
                name: 'contractputonrecords',
                component: './info/ContractPutOnRecords',
              },
              {
                path: '/info/addcontract',
                name: 'addcontract',
                component: './info/AddContract',
              },
              {
                path: '/info/insurancelist',
                name: 'insurancelist',
                component: './info/InsuranceOrganization',
              },
              {
                path: '/info/insuranceinfo',
                name: 'insuranceinfo',
                component: './info/InsuranceOrganizationInfo',
              },
              {
                path: '/info/insurancesalesmanmanagement',
                name: 'insurancesalesmanmanagement',
                component: './info/InsuranceSalesmanManagement',
              },
              {
                path: '/info/addinsurancesalesman',
                name: 'addinsurancesalesman',
                component: './info/AddInsuranceSalesman',
              },
            ],
          },
          {
            path: '/risk',
            icon: 'table',
            name: 'risk',
            routes: [
              {
                path: '/risk',
                redirect: '/risk/diagram',
              },
              {
                path: '/risk/diagramsearchent',
                name: 'diagramsearchent',
                component: './risk/DiagramSearchEnt',
              },
              {
                path: '/risk/diagramupload',
                name: 'diagramupload',
                component: './risk/DiagramUpload',
              },
              {
                path: '/risk/diagramdetail',
                name: 'diagramdetail',
                component: './risk/DiagramDetail',
              },
              {
                path: '/risk/diagramlist',
                name: 'diagramlist',
                component: './risk/DiagramList',
              },
              {
                path: '/risk/risklistmanagement',
                name: 'risklistmanagement',
                component: './risk/RiskListManagement',
              },
              {
                path: '/risk/securityrisklist',
                name: 'securityrisklist',
                component: './risk/SecurityRiskList',
              },
              {
                path: '/risk/risklistdetail',
                name: 'risklistdetail',
                component: './risk/RiskListDetail',
              },
              {
                path: '/risk/riskchecklist',
                name: 'riskchecklist',
                component: './risk/RiskCheckList',
              },
              {
                path: '/risk/riskcheckdetail',
                name: 'riskcheckdetail',
                component: './risk/RiskCheckDetail',
              },
              {
                path: '/risk/legalpersoncheck',
                name: 'legalpersoncheck',
                component: './risk/LegalPersonCheck',
              },
              {
                path: '/risk/riskwarning',
                name: 'riskwarning',
                component: './risk/RiskWarning',
              },
              {
                path: '/risk/hiddendangerlist',
                name: 'hiddendangerlist',
                component: './risk/HiddenDangerList',
              },
              {
                path: '/risk/riskmanagepromise',
                name: 'riskmanagepromise',
                component: './risk/RiskManagePromise',
              },
              {
                path: '/risk/riskreadytochecklist',
                name: 'riskreadytochecklist',
                component: './risk/RiskReadyToCheckList',
              },
              {
                path: '/risk/riskpromisecheck/:id',
                name: 'riskpromisecheck',
                component: './risk/RiskManagePromiseCheck',
              },
              {
                path: '/risk/dailyriskmanagepromise',
                name: 'dailyriskmanagepromise',
                component: './risk/DailyRiskManagePromise',
              },
              {
                path: '/risk/dailyriskmanagepromiserecord',
                name: 'dailyriskmanagepromiserecord',
                component: './risk/DailyRiskManagePromise/RiskManagePromiseRecord',
              },
              {
                path: '/risk/chemicalsmanage',
                name: 'chemicalsmanage',
                component: './risk/ChemicalsManage',
              },
              {
                path: '/risk/chemicalsmanageinforecord',
                name: 'chemicalsmanageinforecord',
                component: './risk/ChemicalsManage/ChemicalsInfoRecord',
              },
              {
                path: '/risk/chemicalsquery',
                name: 'chemicalsquery',
                component: './risk/ChemicalsQuery',
              },
              {
                path: '/risk/tbdmission',
                name: 'tbdmission',
                component: './risk/TBDMission',
              },
              {
                path: '/risk/checksituationrecord',
                name: 'checksituationrecord',
                component: './risk/CheckSituationRecord',
              },
              {
                path: '/risk/hiddentroubleshoot',
                name: 'hiddentroubleshoot',
                component: './risk/HiddenTroubleShoot',
              },
              {
                path: '/risk/hiddentroubleshootsituation',
                name: 'hiddentroubleshootsituation',
                component: './risk/HiddenTroubleShootSituation',
              },
              {
                path: '/risk/hiddentroubleshootsituationrecord',
                name: 'hiddentroubleshootsituationrecord',
                component: './risk/HiddenTroubleShootSituationRecord',
              },
              {
                path: '/risk/tbdhiddentroublelist',
                name: 'tbdhiddentroublelist',
                component: './risk/TBDHiddenTroubleList',
              },
              {
                path: '/risk/hiddentroubleresolverecord',
                name: 'hiddentroubleresolverecord',
                component: './risk/HiddenTroubleResolveRecord',
              },
              {
                path: '/risk/hiddentrouberesolvechecklist',
                name: 'hiddentrouberesolvechecklist',
                component: './risk/HiddenTroubleResolveCheckList',
              },
              {
                path: '/risk/hiddentroubleresolvecheck',
                name: 'hiddentroubleresolvecheck',
                component: './risk/HiddenTroubleResolveCheck',
              },
              {
                path: '/risk/hiddentroubleresolvetbdmiddlechecklist',
                name: 'hiddentroubleresolvetbdmiddlechecklist',
                component: './risk/HiddenTroubleResolveTBDMiddleCheckList',
              },
              {
                path: '/risk/hiddentroubleresolvetbdmiddlecheck',
                name: 'hiddentroubleresolvetbdmiddlecheck',
                component: './risk/HiddenTroubleResolveTBDMiddleCheck',
              },
              {
                path: '/risk/hiddentroubleresolvesituation',
                name: 'hiddentroubleresolvesituation',
                component: './risk/HiddenTroubleResolveSituation',
              },
              {
                path: '/risk/hiddentroubleresolvetmiddlecheckstatus',
                name: 'hiddentroubleresolvetmiddlecheckstatus',
                component: './risk/HiddenTroubleResolveMiddleCheckStatus',
              },
            ],
          },
          {
            path: '/rule',
            icon: 'table',
            name: 'rule',
            authority: ['admin', 'qyagy'],
            routes: [
              {
                path: '/rule',
                redirect: '/rule/rulevindicate',
              },
              {
                path: '/rule/rulevindicate',
                name: 'rulevindicate',
                component: './rule/RuleVindicate',
              },
              {
                path: '/rule/rulevindicatedetail',
                name: 'rulevindicatedetail',
                component: './rule/RuleVindicateDetail',
              },
              {
                path: '/rule/ruleexecute',
                name: 'ruleexecute',
                component: './rule/RuleExecute',
              },
              {
                path: '/rule/ruleexecutedetail',
                name: 'ruleexecutedetail',
                component: './rule/RuleExecuteDetail',
              },
              {
                path: '/rule/ruleexecutedetailadd',
                name: 'ruleexecutedetailadd',
                component: './rule/RuleExecuteDetail/RuleExecuteDetailAdd',
              },
            ],
          },
          {
            path: '/yjjsupervise',
            icon: 'table',
            name: 'yjjsupervise',
            authority: ['admin', 'yjjry'],
            routes: [
              {
                path: '/yjjsupervise',
                redirect: '/yjjsupervise/reportmanage',
              },
              {
                path: '/yjjsupervise/entsearch',
                name: 'entsearch',
                component: './yjjsupervise/EntSearch',
              },
              {
                path: '/yjjsupervise/workadviserecord',
                name: 'workadviserecord',
                component: './yjjsupervise/WorkAdvise/Record',
              },
              {
                path: '/yjjsupervise/workadvisequery',
                name: 'workadvisequery',
                component: './yjjsupervise/WorkAdvise/Query',
              },
              {
                path: '/yjjsupervise/admonitiontalkrecord',
                name: 'admonitiontalkrecord',
                component: './yjjsupervise/AdmonitionTalk/Record',
              },
              {
                path: '/yjjsupervise/admonitiontalkquery',
                name: 'admonitiontalkquery',
                component: './yjjsupervise/AdmonitionTalk/Query',
              },
              {
                path: '/yjjsupervise/admonitiontalkdetail',
                name: 'admonitiontalkdetail',
                component: './yjjsupervise/AdmonitionTalk/Detail',
              },
              {
                path: '/yjjsupervise/entcreditratingmanagement',
                name: 'entcreditratingmanagement',
                component: './yjjsupervise/EntCreditRatingManagement',
              },
              {
                path: '/yjjsupervise/entcreditratingmanagementrecord',
                name: 'entcreditratingmanagementrecord',
                component: './yjjsupervise/EntCreditRatingManagement/Record',
              },
              {
                path: '/yjjsupervise/entcreditmanagement',
                name: 'entcreditmanagement',
                component: './yjjsupervise/EntCreditManagement',
              },
            ],
          },
          {
            path: '/report',
            icon: 'table',
            name: 'report',
            routes: [
              {
                path: '/report',
                redirect: '/report/reportmanage',
              },
              {
                path: '/report/reportmanage',
                name: 'reportmanage',
                component: './report/ReportManage',
              },
            ],
          },
          {
            path: '/system',
            icon: 'table',
            name: 'system',
            routes: [
              {
                path: '/system',
                redirect: '/system/dangecheckrule',
              },
              {
                path: '/system/authoritymanage',
                name: 'authoritymanage',
                component: './system/AuthorityManage',
              },
              {
                path: '/system/emergencymanage',
                name: 'emergencymanage',
                component: './system/EmergencyManage',
              },
              {
                path: '/system/rolemanage',
                name: 'rolemanage',
                component: './system/RoleManage',
              },
              {
                path: '/system/systemlog',
                name: 'systemlog',
                component: './system/SystemLog',
              },
              {
                path: '/system/thirdpartymanage',
                name: 'thirdpartymanage',
                component: './system/ThirdPartyManage',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
