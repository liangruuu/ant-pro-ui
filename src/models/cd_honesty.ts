import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdhonesty } from './entity';
import { fetchCdHonesty } from '@/services/cd_honesty';

export interface CdHonestyModelState {
  cdHonestyList: Cdhonesty[];
}

export interface CdHonestyModelType {
  namespace: 'cdHonesty';
  state: CdHonestyModelState;
  effects: {
    fetchCdHonesty: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdHonesty: CdHonestyModelType = {
  namespace: 'cdHonesty',
  state: {
    cdHonestyList: [],
  },

  effects: {
    *fetchCdHonesty({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdHonesty, payload);
        if (res.status === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdHonestyList',
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

export default CdHonesty;
