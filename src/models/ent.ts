import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Ent } from './entity';
import { saveEnt, fetchList, getEntById, getAllEntList } from '../services/ent';

export interface EntModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: Ent[];
  };
  entDetail?: Ent;
  entType?: string;
  entList?: Ent[];
}

export interface EntModelType {
  namespace: 'entModel';
  state: EntModelState;
  effects: {
    fetchList: Effect;
    saveEnt: Effect;
    getEntById: Effect;
    getAllEntList: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
    reset: Reducer<any, any>;
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
          const entModel: EntModelState = yield select(
            (state: { entModel: EntModelState }) => state.entModel,
          );
          yield put({
            type: 'fetchList',
            payload: {
              currentPage: entModel.listData.currentPage,
              pageSize: entModel.listData.pageSizel,
              ent: { entType: entModel.entType },
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
            type: 'reset',
            payload: res.data,
            index: 'entDetail',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *getAllEntList({ payload }, { call, put }) {
      try {
        const res = yield call(getAllEntList, payload);
        if (res.code === 200) {
          yield put({
            type: 'reset',
            payload: res.data,
            index: 'entList',
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
    reset(state, { payload, index }) {
      return {
        ...state,
        [index]: payload,
      };
    },
  },
};

export default EntModel;
