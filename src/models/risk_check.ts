import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { RiskCheckEntity } from './entity';
import {
  saveRiskCheckRecord,
  getRiskCheckList,
  saveRiskCheckModify,
  saveRiskCheckInspect,
  uploadFile,
  fetchPic,
  fetchFileNameList,
  downloadFile,
} from '@/services/risk_check';
import { UserModelState } from './user';

export interface RiskCheckModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: RiskCheckEntity[];
  };
  fileTokenList?: string[];
  picBase64List?: string[];
  fileNameList?: { name: string; token: string }[];
}

export interface RiskCheckModelType {
  namespace: 'riskCheck';
  state: RiskCheckModelState;
  effects: {
    getRiskCheckList: Effect;
    saveRiskCheckRecord: Effect;
    saveRiskCheckModify: Effect;
    saveRiskCheckInspect: Effect;
    uploadFile: Effect;
    fetchPic: Effect;
    fetchFileNameList: Effect;
    downloadFile: Effect;
  };
  reducers: {
    save: Reducer<RiskCheckModelState, any>;
    reset: Reducer<RiskCheckModelState, any>;
  };
}

const RiskCheck: RiskCheckModelType = {
  namespace: 'riskCheck',
  state: {
    listData: { pageSizel: 10, currentPage: 0, total: 10, dataSource: [] },
  },

  effects: {
    *getRiskCheckList({ payload }, { call, put }) {
      try {
        const res = yield call(getRiskCheckList, payload);
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
    *saveRiskCheckRecord({ payload }, { select, call, put }) {
      try {
        const res = yield call(saveRiskCheckRecord, payload);
        if (res.status === 200) {
          message.success('保存成功');
          const riskCheckState: RiskCheckModelState = yield select(
            (state: { riskCheck: RiskCheckModelState }) => state.riskCheck,
          );
          const user: UserModelState = yield select(
            (state: { user: UserModelState }) => state.user,
          );
          yield put({
            type: 'getRiskCheckList',
            payload: {
              currentPage: riskCheckState.listData.currentPage,
              pageSize: riskCheckState.listData.pageSizel,
              riskCheckEntity: {
                entId: user.currentUser?.userInfo?.entid,
              },
            },
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *saveRiskCheckModify({ payload }, { select, call, put }) {
      try {
        const res = yield call(saveRiskCheckModify, payload);
        if (res.status === 200) {
          message.success('保存成功');
          const riskCheckState: RiskCheckModelState = yield select(
            (state: { riskCheck: RiskCheckModelState }) => state.riskCheck,
          );
          const user: UserModelState = yield select(
            (state: { user: UserModelState }) => state.user,
          );
          yield put({
            type: 'getRiskCheckList',
            payload: {
              currentPage: riskCheckState.listData.currentPage,
              pageSize: riskCheckState.listData.pageSizel,
              riskCheckEntity: {
                entId: user.currentUser?.userInfo?.entid,
                status: 'checked',
              },
            },
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *saveRiskCheckInspect({ payload }, { select, call, put }) {
      try {
        const res = yield call(saveRiskCheckInspect, payload);
        if (res.status === 200) {
          message.success('保存成功');
          const riskCheckState: RiskCheckModelState = yield select(
            (state: { riskCheck: RiskCheckModelState }) => state.riskCheck,
          );
          const user: UserModelState = yield select((state: { v: UserModelState }) => state.user);
          yield put({
            type: 'getRiskCheckList',
            payload: {
              currentPage: riskCheckState.listData.currentPage,
              pageSize: riskCheckState.listData.pageSizel,
              riskCheckEntity: {
                entId: user.currentUser?.userInfo?.entid,
                status: 'modified',
              },
            },
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *uploadFile({ payload }, { call, put }) {
      try {
        const res = yield call(uploadFile, payload);
        if (res.status === 200) {
          yield put({
            type: 'reset',
            payload: res.data,
            index: 'fileTokenList',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *fetchPic({ payload }, { call, put }) {
      try {
        const res = yield call(fetchPic, payload);
        if (res.status === 200) {
          yield put({
            type: 'reset',
            payload: res.data,
            index: 'picBase64List',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *fetchFileNameList({ payload }, { call, put }) {
      try {
        const res = yield call(fetchFileNameList, payload);
        if (res.status === 200) {
          yield put({
            type: 'reset',
            payload: res.data,
            index: 'fileNameList',
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *downloadFile({ payload, fileName }, { call }) {
      try {
        const res = yield call(downloadFile, payload);
        const blob = new Blob([res], {
          type: res.type,
        });
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const filename = fileName;
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
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

export default RiskCheck;
