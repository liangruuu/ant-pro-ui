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
        authority: ['admin', 'user', 'qy100', 'qy200', 'qy300', 'qy500', 'zj100', 'yjj100'],
        routes: [
          {
            path: '/',
            redirect: '/info',
          },
          {
            path: '/info',
            icon: 'table',
            name: 'info',
            authority: ['yjj100'],
            routes: [
              {
                path: '/info',
                redirect: '/info/companylist',
              },
              {
                path: '/info/companylist',
                name: 'companylist',
                component: './info/CompanyList',
                authority: ['yjj100'],
              },
              {
                path: '/info/companyinfo/:id',
                name: 'companyinfo',
                component: './info/CompanyInfo',
                hideInMenu: true,
                authority: ['yjj100'],
              },
              {
                path: '/info/manager',
                name: 'manager',
                component: './info/SecurityManager',
                hideInMenu: true,
                authority: ['yjj100'],
              }, {
                path: '/info/organization',
                name: 'organization',
                component: './info/SecurityOrganization',
                authority: ['yjj100'],
              },
              {
                path: '/info/proxylist',
                name: 'proxylist',
                component: './info/ProxyOrganization',
                authority: ['yjj100'],
              },
              {
                path: '/info/proxyinfo',
                name: 'proxyinfo',
                component: './info/ProxyInfo',
                hideInMenu: true,
                authority: ['yjj100'],
              },
              {
                path: '/info/insurancelist',
                name: 'insurancelist',
                component: './info/InsuranceOrganization',
                authority: ['yjj100'],
              },
              {
                path: '/info/insuranceinfo',
                name: 'insuranceinfo',
                component: './info/InsuranceOrganizationInfo',
                hideInMenu: true,
                authority: ['yjj100'],
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
                path: '/risk/diagramupload',
                name: 'diagramupload',
                component: './risk/DiagramUpload',
                authority: ['qy100'],
              },
              {
                path: '/risk/diagramdetail/:id',
                name: 'diagramdetail',
                component: './risk/DiagramDetail',
                hideInMenu: true,
                authority: ['yjj100'],
              },
              {
                path: '/risk/diagramlist',
                name: 'diagramlist',
                component: './risk/DiagramList',
                authority: ['yjj100'],
              },
              {
                path: '/risk/risklist',
                name: 'risklist',
                component: './risk/RiskList',
                authority: ['qy100'],
              },
              {
                path: '/risk/riskchecklist',
                name: 'riskchecklist',
                component: './risk/RiskCheckList',
                authority: ['qy100'],
              },
              {
                path: '/risk/riskcheckdetail/:id',
                name: 'riskcheckdetail',
                component: './risk/RiskCheckDetail',
                hideInMenu: true,
                authority: ['qy100'],
              },
              {
                path: '/risk/legalpersoncheck',
                name: 'legalpersoncheck',
                component: './risk/LegalPersonCheck',
                authority: ['qy500'],
              },
              {
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
                component: './risk/RiskManagePromise',
                authority: ['qy100'],
              },
              {
                path: '/risk/riskreadytochecklist',
                name: 'riskreadytochecklist',
                component: './risk/RiskReadyToCheckList',
                authority: ['yjj100'],
              },
              {
                path: '/risk/riskpromisecheck/:id',
                name: 'riskpromisecheck',
                component: './risk/RiskManagePromiseCheck',
                hideInMenu: true,
                authority: ['yjj100'],
              },
              {
                path: '/risk/dailyriskmanagepromise',
                name: 'dailyriskmanagepromise',
                component: './risk/DailyRiskManagePromise',
                authority: ['qy100'],
              },
              {
                path: '/risk/tbdmission',
                name: 'tbdmission',
                component: './risk/TBDMission',
                authority: ['qy200'],
              },
              {
                path: '/risk/checksituationrecord',
                name: 'checksituationrecord',
                component: './risk/CheckSituationRecord',
                hideInMenu: true,
                authority: ['qy200'],
              },
              {
                path: '/risk/hiddentroubleshootsituation',
                name: 'hiddentroubleshootsituation',
                component: './risk/HiddenTroubleShootSituation',
                authority: ['qy200'],
              },
              {
                path: '/risk/hiddentroubleshootsituationrecord',
                name: 'hiddentroubleshootsituationrecord',
                component: './risk/HiddenTroubleShootSituationRecord',
                hideInMenu: true,
                authority: ['qy200'],
              },
              {
                path: '/risk/tbdhiddentroublelist',
                name: 'tbdhiddentroublelist',
                component: './risk/TBDHiddenTroubleList',
                authority: ['qy300', 'qy500'],
              },
              {
                path: '/risk/hiddentroubleresolverecord',
                name: 'hiddentroubleresolverecord',
                component: './risk/HiddenTroubleResolveRecord',
                hideInMenu: true,
                authority: ['qy300', 'qy500'],
              },
              {
                path: '/risk/hiddentrouberesolvechecklist',
                name: 'hiddentrouberesolvechecklist',
                component: './risk/HiddenTroubleResolveCheckList',
                authority: ['qy300', 'qy500'],
              },
              {
                path: '/risk/hiddentroubleresolveecheck',
                name: 'hiddentroubleresolveecheck',
                component: './risk/HiddenTroubleResolveCheck',
                hideInMenu: true,
                authority: ['qy300', 'qy500'],
              },
              {
                path: '/risk/hiddentroubleresolvetbdmiddlechecklist',
                name: 'hiddentroubleresolvetbdmiddlechecklist',
                component: './risk/HiddenTroubleResolveTBDMiddleCheckList',
                authority: ['yjj100'],
              },
              {
                path: '/risk/hiddentroubleresolvetbdmiddlecheck',
                name: 'hiddentroubleresolvetbdmiddlecheck',
                component: './risk/HiddenTroubleResolveTBDMiddleCheck',
                hideInMenu: true,
                authority: ['yjj100'],
              },
              {
                path: '/risk/hiddentroubleresolvesituation',
                name: 'hiddentroubleresolvesituation',
                component: './risk/HiddenTroubleResolveSituation',
                authority: ['yjj100', 'zj100'],
              },
              {
                path: '/risk/hiddentroubleresolvetmiddlecheckstatus',
                name: 'hiddentroubleresolvetmiddlecheckstatus',
                component: './risk/HiddenTroubleResolveMiddleCheckStatus',
                hideInMenu: true,
                authority: ['yjj100', 'zj100'],
              },
            ],
          },
          {
            path: '/rule',
            icon: 'table',
            name: 'rule',
            routes: [
              {
                path: '/rule',
                redirect: '/rule/dangecheckrule',
              },
              {
                path: '/rule/dangecheckrule',
                name: 'dangecheckrule',
                component: './rule/DangeCheckRule',
              },
              {
                path: '/rule/educationrule',
                name: 'educationrule',
                component: './rule/EducationRule',
              },
              {
                path: '/rule/meetingrule',
                name: 'meetingrule',
                component: './rule/MeetingRule',
              },
              {
                path: '/rule/operationrule',
                name: 'operationrule',
                component: './rule/OperationRule',
              },
              {
                path: '/rule/responsiblerule',
                name: 'responsiblerule',
                component: './rule/ResponsibleRule',
              },
              {
                path: '/rule/contingencyplan',
                name: 'contingencyplan',
                component: './rule/ContingencyPlan',
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
