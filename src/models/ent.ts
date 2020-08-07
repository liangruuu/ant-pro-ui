import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import moment from 'moment';
import { Ent } from './entity';
import { saveEnt, fetchList, getEntById } from '../services/ent';

export interface EntModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: Ent[];
  };
  entDetail?: Ent;
  entType?: string;
}

export interface EntModelType {
  namespace: 'entModel';
  state: EntModelState;
  effects: {
    fetchList: Effect;
    saveEnt: Effect;
    getEntById: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
    clean: Reducer<any, any>;
  };
}

const EntModel: EntModelType = {
  namespace: 'entModel',
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
    *saveEnt({ payload }, { select, call, put }) {
      try {
        const res = yield call(saveEnt, payload);
        if (res.code === 200) {
          message.success('保存成功');
          const entState: EntModelState = yield select(
            (state: { entState: EntModelState }) => state.entState,
          );
          yield put({
            type: 'fetchList',
            payload: {
              currentPage: entState.listData.currentPage,
              pageSize: entState.listData.pageSizel,
              ent: { entType: entState.entType },
            },
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *getEntById({ payload }, { call, put }) {
      try {
        const res = yield call(getEntById, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: {
              ...res.data,
              estdate: moment(res.data.estdate, 'YYYY-MM-DD '),
            },
            index: 'entDetail',
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

export default EntModel;
