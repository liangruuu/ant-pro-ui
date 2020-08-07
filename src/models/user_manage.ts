import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { User } from './entity';
import { fetchList, saveUser, getUserById, deleteUserById } from '@/services/user';

export interface UserModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: User[];
  };
  userDetail?: User;
  entid?: string;
}

export interface UserModelType {
  namespace: 'userModel';
  state: UserModelState;
  effects: {
    fetchList: Effect;
    saveUser: Effect;
    getUserById: Effect;
    deleteUserById: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
    clean: Reducer<any, any>;
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
    *saveUser({ payload }, { select, call, put }) {
      try {
        const res = yield call(saveUser, payload);
        if (res.code === 200) {
          message.success('保存成功');
          const useState: UserModelState = yield select(
            (state: { useState: UserModelState }) => state.useState,
          );
          yield put({
            type: 'fetchList',
            payload: {
              currentPage: useState.listData.currentPage,
              pageSize: useState.listData.pageSizel,
              user: { entid: useState.entid },
            },
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *getUserById({ payload }, { call, put }) {
      try {
        const res = yield call(getUserById, payload);
        if (res.code === 200) {
          yield put({
            type: 'save',
            payload: res.data,
            index: 'userDetail',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *deleteUserById({ payload }, { select, call, put }) {
      try {
        const res = yield call(deleteUserById, payload);
        if (res.code === 200) {
          message.success('保存成功');
          const useState: UserModelState = yield select(
            (state: { useState: UserModelState }) => state.useState,
          );
          yield put({
            type: 'fetchList',
            payload: {
              currentPage: useState.listData.currentPage,
              pageSize: useState.listData.pageSizel,
              user: { entid: useState.entid },
            },
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

export default UserModel;
