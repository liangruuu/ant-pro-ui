import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { fetchCdArea } from '@/services/cd_area';
import { TreeNode } from './entity';

export interface CdAreaModelState {
  cdAreaTree?: TreeNode[];
}

export interface CdAreaModelType {
  namespace: 'cdArea';
  state: CdAreaModelState;
  effects: {
    fetchCdArea: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdArea: CdAreaModelType = {
  namespace: 'cdArea',
  state: {},

  effects: {
    *fetchCdArea({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdArea, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdAreaTree',
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

export default CdArea;
