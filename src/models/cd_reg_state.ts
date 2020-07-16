import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdregstate } from './entity';
import { fetchCdRegState } from '@/services/cd_reg_state';

export interface CdRegStateModelState {
  cdRegStateList: Cdregstate[];
}

export interface CdRegStateModelType {
  namespace: 'cdRegState';
  state: CdRegStateModelState;
  effects: {
    fetchCdRegState: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdRegState: CdRegStateModelType = {
  namespace: 'cdRegState',
  state: {
    cdRegStateList: [],
  },

  effects: {
    *fetchCdRegState({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdRegState, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdRegStateList',
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

export default CdRegState;
