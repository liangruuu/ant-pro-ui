import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdentpersontype } from './entity';
import { fetchCdEntPersonType } from '@/services/cd_ent_person_type';

export interface CdEntPersonTypeModelState {
  cdEntPersonTypeList: Cdentpersontype[];
}

export interface CdEntPersonTypeModelType {
  namespace: 'cdEntPersonType';
  state: CdEntPersonTypeModelState;
  effects: {
    fetchCdEntPersonType: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdEntPersonType: CdEntPersonTypeModelType = {
  namespace: 'cdEntPersonType',
  state: {
    cdEntPersonTypeList: [],
  },

  effects: {
    *fetchCdEntPersonType({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdEntPersonType, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdEntPersonTypeList',
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

export default CdEntPersonType;
