import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdrisktype } from './entity';
import { fetchCdRiskType } from '@/services/cd_risk_type';

export interface CdRiskTypeModelState {
  cdRiskTypeList: Cdrisktype[];
}

export interface CdRiskTypeModelType {
  namespace: 'cdRiskType';
  state: CdRiskTypeModelState;
  effects: {
    fetchCdRiskType: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdRiskType: CdRiskTypeModelType = {
  namespace: 'cdRiskType',
  state: {
    cdRiskTypeList: [],
  },

  effects: {
    *fetchCdRiskType({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdRiskType, payload);
        if (res.status === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdRiskTypeList',
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

export default CdRiskType;
