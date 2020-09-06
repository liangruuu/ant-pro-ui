import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdsafecheck } from './entity';
import { fetchCdSafeCheck } from '@/services/cd_safe_check';

export interface CdSafeCheckModelState {
  cdSafeCheckList: Cdsafecheck[];
}

export interface CdSafeCheckModelType {
  namespace: 'cdSafeCheck';
  state: CdSafeCheckModelState;
  effects: {
    fetchCdSafeCheck: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdSafeCheck: CdSafeCheckModelType = {
  namespace: 'cdSafeCheck',
  state: {
    cdSafeCheckList: [],
  },

  effects: {
    *fetchCdSafeCheck({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdSafeCheck, payload);
        if (res.status === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdSafeCheckList',
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

export default CdSafeCheck;
