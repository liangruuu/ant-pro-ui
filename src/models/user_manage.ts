import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { User, Ent } from './entity';
import {
  fetchList,
  saveUser,
  deleteUserById,
  fetchSafetyOfficers,
  fetchUserById,
} from '@/services/user';

export interface UserManageModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: User[];
  };
  nowEnt?: Ent;
  userInfo?: User;
  safetyOfficers?: User[];
}

export interface UserModelType {
  namespace: 'userModel';
  state: UserManageModelState;
  effects: {
    fetchList: Effect;
    saveUser: Effect;
    fetchUserById: Effect;
    deleteUserById: Effect;
    fetchSafetyOfficers: Effect;
  };
  reducers: {
    save: Reducer<UserManageModelState, any>;
    reset: Reducer<UserManageModelState, any>;
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
        if (res.status === 200) {
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
        if (res.status === 200) {
          message.success('保存成功');
          const userModel: UserManageModelState = yield select(
            (state: { userModel: UserManageModelState }) => state.userModel,
          );
          yield put({
            type: 'fetchList',
            payload: {
              currentPage: userModel.listData.currentPage,
              pageSize: userModel.listData.pageSizel,
              user: { entid: userModel.nowEnt?.sid },
            },
          });
        } else if (res.status === 400) {
          message.error(res.data);
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *fetchUserById({ payload }, { call, put }) {
      try {
        const res = yield call(fetchUserById, payload);
        if (res.status === 200) {
          yield put({
            type: 'reset',
            payload: res.data,
            index: 'userInfo',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *deleteUserById({ payload }, { select, call, put }) {
      try {
        const res = yield call(deleteUserById, payload);
        if (res.status === 200) {
          message.success('保存成功');
          const userModel: UserManageModelState = yield select(
            (state: { userModel: UserManageModelState }) => state.userModel,
          );
          yield put({
            type: 'fetchList',
            payload: {
              currentPage: userModel.listData.currentPage,
              pageSize: userModel.listData.pageSizel,
              user: { entid: userModel.nowEnt?.sid },
            },
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *fetchSafetyOfficers({ payload }, { call, put }) {
      try {
        const res = yield call(fetchSafetyOfficers, payload);
        if (res.status === 200) {
          yield put({
            type: 'reset',
            payload: res.data,
            index: 'safetyOfficers',
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

export default UserModel;
