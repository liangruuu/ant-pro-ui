import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdsuperviselevel } from './entity';
import { fetchCdSuperviseLevel } from '@/services/cd_supervise_level';

export interface CdSuperviseLevelModelState {
  cdSuperviseLevelList: Cdsuperviselevel[];
}

export interface CdSuperviseLevelModelType {
  namespace: 'cdSuperviseLevel';
  state: CdSuperviseLevelModelState;
  effects: {
    fetchCdSuperviseLevel: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdSuperviseLevel: CdSuperviseLevelModelType = {
  namespace: 'cdSuperviseLevel',
  state: {
    cdSuperviseLevelList: [],
  },

  effects: {
    *fetchCdSuperviseLevel({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdSuperviseLevel, payload);
        if (res.status === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdSuperviseLevelList',
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

export default CdSuperviseLevel;
