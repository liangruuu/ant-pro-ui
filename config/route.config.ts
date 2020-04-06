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
        authority: ['admin', 'user', 'qy100', 'qy200'],
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
                redirect: '/info/companylist',
              }, {
                path: '/info/companylist',
                name: 'companylist',
                component: './info/CompanyList',
              }, {
                path: '/info/companyinfo/:id',
                name: 'companyinfo',
                component: './info/CompanyInfo',
                hideInMenu: true
              }, {
                path: '/info/manager',
                name: 'manager',
                component: './info/SecurityManager',
                hideInMenu: true
              }, {
                path: '/info/organization',
                name: 'organization',
                component: './info/SecurityOrganization'
              }, {
                path: '/info/proxylist',
                name: 'proxylist',
                component: './info/ProxyOrganization'
              }, {
                path: '/info/proxyinfo',
                name: 'proxyinfo',
                component: './info/ProxyInfo',
                hideInMenu: true
              }, {
                path: '/info/insurancelist',
                name: 'insurancelist',
                component: './info/InsuranceOrganization'
              }, {
                path: '/info/insuranceinfo',
                name: 'insuranceinfo',
                component: './info/InsuranceOrganizationInfo',
                hideInMenu: true
              }
            ],
          }, {
            path: '/risk',
            icon: 'table',
            name: 'risk',
            routes: [
              {
                path: '/risk',
                redirect: '/risk/diagram',
              }, {
                path: '/risk/diagramupload',
                name: 'diagramupload',
                component: './risk/DiagramUpload',
              }, {
                path: '/risk/diagramdetail/:id',
                name: 'diagramdetail',
                component: './risk/DiagramDetail',
                hideInMenu: true
              }, {
                path: '/risk/diagramlist',
                name: 'diagramlist',
                component: './risk/DiagramList',
              }, {
                path: '/risk/risklist',
                name: 'risklist',
                component: './risk/RiskList'
              }, {
                path: '/risk/riskchecklist',
                name: 'riskchecklist',
                component: './risk/RiskCheckList'
              }, {
                path: '/risk/riskcheckdetail/:id',
                name: 'riskcheckdetail',
                component: './risk/RiskCheckDetail',
                hideInMenu: true
              }, {
                path: '/risk/legalpersoncheck',
                name: 'legalpersoncheck',
                component: './risk/LegalPersonCheck',
              }, {
                path: '/risk/chemicalsmanage',
                name: 'chemicalsmanage',
                component: './risk/ChemicalsManage',
                hideInMenu: true
              }, {
                path: '/risk/riskwarning',
                name: 'riskwarning',
                component: './risk/RiskWarning',
                hideInMenu: true
              }, {
                path: '/risk/hiddendangerlist',
                name: 'hiddendangerlist',
                component: './risk/HiddenDangerList',
                hideInMenu: true
              }, {
                path: '/risk/riskmanagepromise',
                name: 'riskmanagepromise',
                component: './risk/RiskManagePromise'
              }, {
                path: '/risk/riskreadytochecklist',
                name: 'riskreadytochecklist',
                component: './risk/RiskReadyToCheckList'
              }, {
                path: '/risk/riskpromisecheck/:id',
                name: 'riskpromisecheck',
                component: './risk/RiskManagePromiseCheck',
                hideInMenu: true
              }, {
                path: '/risk/dailyriskmanagepromise',
                name: 'dailyriskmanagepromise',
                component: './risk/DailyRiskManagePromise'
              }, {
                path: '/risk/tbdmission',
                name: 'tbdmission',
                component: './risk/TBDMission'
              }, {
                path: '/risk/checksituationrecord',
                name: 'checksituationrecord',
                component: './risk/CheckSituationRecord'
              }, {
                path: '/risk/hiddentroubleshootsituation',
                name: 'hiddentroubleshootsituation',
                component: './risk/HiddenTroubleShootSituation'
              }, {
                path: '/risk/hiddentroubleshootsituationrecord',
                name: 'hiddentroubleshootsituationrecord',
                component: './risk/HiddenTroubleShootSituationRecord'
              }, {
                path: '/risk/tbdhiddentroublelist',
                name: 'tbdhiddentroublelist',
                component: './risk/TBDHiddenTroubleList'
              }, {
                path: '/risk/hiddentroubleresolverecord',
                name: 'hiddentroubleresolverecord',
                component: './risk/HiddenTroubleResolveRecord'
              }, {
                path: '/risk/hiddentrouberesolvechecklist',
                name: 'hiddentrouberesolvechecklist',
                component: './risk/HiddenTroubleResolveCheckList'
              }, {
                path: '/risk/hiddentroubleresolveecheck',
                name: 'hiddentroubleresolveecheck',
                component: './risk/HiddenTroubleResolveCheck'
              }, {
                path: '/risk/hiddentroubleresolvetbdmiddlechecklist',
                name: 'hiddentroubleresolvetbdmiddlechecklist',
                component: './risk/HiddenTroubleResolveTBDMiddleCheckList'
              }, {
                path: '/risk/hiddentroubleresolvetbdmiddlecheck',
                name: 'hiddentroubleresolvetbdmiddlecheck',
                component: './risk/HiddenTroubleResolveTBDMiddleCheck'
              }, {
                path: '/risk/hiddentroubleresolvesituation',
                name: 'hiddentroubleresolvesituation',
                component: './risk/HiddenTroubleResolveSituation'
              }, {
                path: '/risk/hiddentroubleresolvetmiddlecheckstatus',
                name: 'hiddentroubleresolvetmiddlecheckstatus',
                component: './risk/HiddenTroubleResolveMiddleCheckStatus'
              }
            ]
          }, {
            path: '/rule',
            icon: 'table',
            name: 'rule',
            routes: [
              {
                path: '/rule',
                redirect: '/rule/dangecheckrule',
              }, {
                path: '/rule/dangecheckrule',
                name: 'dangecheckrule',
                component: './rule/DangeCheckRule',
              }, {
                path: '/rule/educationrule',
                name: 'educationrule',
                component: './rule/EducationRule'
              }, {
                path: '/rule/meetingrule',
                name: 'meetingrule',
                component: './rule/MeetingRule'
              }, {
                path: '/rule/operationrule',
                name: 'operationrule',
                component: './rule/OperationRule'
              }, {
                path: '/rule/responsiblerule',
                name: 'responsiblerule',
                component: './rule/ResponsibleRule'
              }, {
                path: '/rule/contingencyplan',
                name: 'contingencyplan',
                component: './rule/ContingencyPlan'
              }
            ]
          }, {
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
              }
            ]
          }, {
            path: '/system',
            icon: 'table',
            name: 'system',
            routes: [
              {
                path: '/system',
                redirect: '/system/dangecheckrule',
              }, {
                path: '/system/authoritymanage',
                name: 'authoritymanage',
                component: './system/AuthorityManage',
              }, {
                path: '/system/emergencymanage',
                name: 'emergencymanage',
                component: './system/EmergencyManage'
              }, {
                path: '/system/rolemanage',
                name: 'rolemanage',
                component: './system/RoleManage'
              }, {
                path: '/system/systemlog',
                name: 'systemlog',
                component: './system/SystemLog'
              }, {
                path: '/system/thirdpartymanage',
                name: 'thirdpartymanage',
                component: './system/ThirdPartyManage'
              }
            ]
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
]