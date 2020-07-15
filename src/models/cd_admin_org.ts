import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdadminorg } from './entity';
import { fetchAdminOrg } from '@/services/cd_admin_org';

export interface CdAdminOrgModelState {
  adminOrgList: Cdadminorg[];
}

export interface CdAdminOrgModelType {
  namespace: 'cdadminorg';
  state: CdAdminOrgModelState;
  effects: {
    fetchAdminOrg: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdAdminOrg: CdAdminOrgModelType = {
  namespace: 'cdadminorg',
  state: {
    adminOrgList: [],
  },

  effects: {
    *fetchAdminOrg({ payload }, { call, put }) {
      try {
        const res = yield call(fetchAdminOrg, payload);
        if (res.code === 'ok') {
          yield put({
            type: 'save',
            payload: res.content.data,
            index: 'typeList',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
  },

  reducers: {
    save(state, { payload, index }) {
      return {
        ...state,
        [index]: payload,
      };
    },
  },
};

export default CdAdminOrg;
