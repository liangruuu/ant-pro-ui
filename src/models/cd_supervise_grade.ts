import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Cdsupervisegrade } from './entity';
import { fetchCdSuperviseGrade } from '@/services/cd_supervise_grade';

export interface CdSuperviseGradeModelState {
  cdSuperviseGradeList: Cdsupervisegrade[];
}

export interface CdSuperviseGradeModelType {
  namespace: 'cdSuperviseGrade';
  state: CdSuperviseGradeModelState;
  effects: {
    fetchCdSuperviseGrade: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const CdSuperviseGrade: CdSuperviseGradeModelType = {
  namespace: 'cdSuperviseGrade',
  state: {
    cdSuperviseGradeList: [],
  },

  effects: {
    *fetchCdSuperviseGrade({ payload }, { call, put }) {
      try {
        const res = yield call(fetchCdSuperviseGrade, payload);
        if (res.status === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'cdSuperviseGradeList',
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

export default CdSuperviseGrade;
