import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdadminorg } from './entity';
import { fetchCdAdminOrg } from '@/services/cd_admin_org';

export interface CdAdminOrgModelState {
  cdAdminOrgList: Cdadminorg[];
}

export interface CdAdminOrgModelType {
  namespace: 'cdAdminOrg';
  state: CdAdminOrgModelState;
  effects: {
    fetchCdAdminOrg: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdAdminOrg: CdAdminOrgModelType = {
  namespace: 'cdAdminOrg',
  state: {
    cdAdminOrgList: [],
  },

  effects: {
    *fetchCdAdminOrg({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdAdminOrg, payload);
        if (res.status === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdAdminOrgList',
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
