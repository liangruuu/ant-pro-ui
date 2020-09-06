import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdstandlevel } from './entity';
import { fetchCdStandLevel } from '@/services/cd_stand_level';

export interface CdStandLevelModelState {
  cdStandLevelList: Cdstandlevel[];
}

export interface CdStandLevelModelType {
  namespace: 'cdStandLevel';
  state: CdStandLevelModelState;
  effects: {
    fetchCdStandLevel: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdStandLevel: CdStandLevelModelType = {
  namespace: 'cdStandLevel',
  state: {
    cdStandLevelList: [],
  },

  effects: {
    *fetchCdStandLevel({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdStandLevel, payload);
        if (res.status === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdStandLevelList',
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

export default CdStandLevel;
