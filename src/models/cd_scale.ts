import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdscale } from './entity';
import { fetchCdScale } from '@/services/cd_scale';

export interface CdScaleModelState {
  cdScaleList: Cdscale[];
}

export interface CdScaleModelType {
  namespace: 'cdScale';
  state: CdScaleModelState;
  effects: {
    fetchCdScale: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdScale: CdScaleModelType = {
  namespace: 'cdScale',
  state: {
    cdScaleList: [],
  },

  effects: {
    *fetchCdScale({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdScale, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdScaleList',
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

export default CdScale;
