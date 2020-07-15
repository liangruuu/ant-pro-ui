import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { User } from './entity';
import { fetchList, saveUser } from '@/services/user';

export interface UserModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: User[];
  };
}

export interface UserModelType {
  namespace: 'userModel';
  state: UserModelState;
  effects: {
    fetchList: Effect;
    saveUser: Effect;
    fetchPersonType: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const UserModel: UserModelType = {
  namespace: 'userModel',
  state: {
    listData: { pageSizel: 10, currentPage: 0, total: 10, dataSource: [] },
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      try {
        const res = yield call(fetchList, payload);
        if (res.code === 'ok') {
          yield put({
            type: 'save',
            payload: {
              pageSize1: res.content.data.size,
              currentPage: res.content.data.number,
              total: res.content.data.totalElements,
              dataSource: res.content.data.content,
            },
            index: 'listData',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *saveUser({ payload }, { call }) {
      try {
        const res = yield call(saveUser, payload);
        if (res.code === 'ok') {
          message.success('保存成功');
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *fetchPersonType({ payload }, { call, put }) {
      try {
        const res = yield call(fetchList, payload);
        if (res.code === 'ok') {
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
  },
};

export default UserModel;
