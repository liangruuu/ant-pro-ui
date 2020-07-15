import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdentpersontype } from './entity';
import { fetchEntPersonType } from '@/services/cd_ent_person_type';

export interface CdEntPersonTypeModelState {
  cdEntPersonTypeList: Cdentpersontype[];
}

export interface CdEntPersonTypeModelType {
  namespace: 'cdentpersontype';
  state: CdEntPersonTypeModelState;
  effects: {
    fetchEntPersonType: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdEntPersonType: CdEntPersonTypeModelType = {
  namespace: 'cdentpersontype',
  state: {
    cdEntPersonTypeList: [],
  },

  effects: {
    *fetchEntPersonType({ payload }, { call, put }) {
      try {
        const res = yield call(fetchEntPersonType, payload);
        if (res.code === 'ok') {
          yield put({
            type: 'save',
            payload: res.content.data,
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
