import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import moment from 'moment';
import { Agency } from './entity';
import { saveAgency, fetchList, getAgencyById } from '../services/agency';

export interface AgencyModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: Agency[];
  };
  agencyDetail?: Agency;
}

export interface AgencyModelType {
  namespace: 'agencyModel';
  state: AgencyModelState;
  effects: {
    fetchList: Effect;
    saveAgency: Effect;
    getAgencyById: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
    clean: Reducer<any, any>;
  };
}

const AgencyModel: AgencyModelType = {
  namespace: 'agencyModel',
  state: {
    listData: { pageSizel: 10, currentPage: 0, total: 10, dataSource: [] },
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      try {
        const res = yield call(fetchList, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: {
              pageSize1: res.data.size,
              currentPage: res.data.number,
              total: res.data.totalElements,
              dataSource: res.data.content,
            },
            index: 'listData',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *saveAgency({ payload }, { call }) {
      try {
        const res = yield call(saveAgency, payload);
        if (res.code === 200) {
          message.success('保存成功');
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *getAgencyById({ payload }, { call, put }) {
      try {
        const res = yield call(getAgencyById, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: {
              ...res.data,
              estdate: moment(res.data.estdate, 'YYYY-MM-DD '),
            },
            index: 'agencyDetail',
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
        [index]: {
          ...state[index],
          ...payload,
        },
      };
    },
    clean(state, { index }) {
      return {
        ...state,
        [index]: undefined,
      };
    },
  },
};

export default AgencyModel;
