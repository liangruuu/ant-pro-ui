import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { TreeNode } from './entity';
import { fetchCdIndustry, fetchSuperviseTypeTree } from '@/services/cd_industry';

export interface CdIndustryModelState {
  cdIndustryTree?: TreeNode[];
  cdSuperviseTypeTree?: TreeNode[];
}

export interface CdIndustryModelType {
  namespace: 'cdIndustry';
  state: CdIndustryModelState;
  effects: {
    fetchCdIndustry: Effect;
    fetchSuperviseTypeTree: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdIndustry: CdIndustryModelType = {
  namespace: 'cdIndustry',
  state: {},

  effects: {
    *fetchCdIndustry({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdIndustry, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdIndustryTree',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *fetchSuperviseTypeTree({ payload }, { call, put }) {
      try {
        const res = yield call(fetchSuperviseTypeTree, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdSuperviseTypeTree',
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

export default CdIndustry;
