import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdrisklevel } from './entity';
import { fetchCdRiskLevel } from '@/services/cd_risk_level';

export interface CdRiskLevelModelState {
  cdRiskLevelList: Cdrisklevel[];
}

export interface CdRiskLevelModelType {
  namespace: 'cdRiskLevel';
  state: CdRiskLevelModelState;
  effects: {
    fetchCdRiskLevel: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdRiskLevel: CdRiskLevelModelType = {
  namespace: 'cdRiskLevel',
  state: {
    cdRiskLevelList: [],
  },

  effects: {
    *fetchCdRiskLevel({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdRiskLevel, payload);
        if (res.status === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdRiskLevelList',
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

export default CdRiskLevel;
