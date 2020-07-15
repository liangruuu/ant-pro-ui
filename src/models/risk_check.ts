import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { RiskCheckEntity } from './entity';
import {
  saveRiskCheckRecord,
  getRiskCheckList,
  saveRiskCheckModify,
  saveRiskCheckInspect,
} from '@/services/risk_check';
import { getAuthority } from '@/utils/authority';

export interface RiskCheckModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: RiskCheckEntity[];
  };
}

export interface RiskCheckModelType {
  namespace: 'riskCheck';
  state: RiskCheckModelState;
  effects: {
    getRiskCheckList: Effect;
    saveRiskCheckRecord: Effect;
    saveRiskCheckModify: Effect;
    saveRiskCheckInspect: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
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
    *saveRiskCheckRecord({ payload }, { select, call, put }) {
      try {
        const res = yield call(saveRiskCheckRecord, payload);
        if (res.code === 200) {
          message.success('保存成功');
          const riskCheckState: RiskCheckModelState = yield select(
            (state: { riskCheck: RiskCheckModelState }) => state.riskCheck,
          );
          yield put({
            type: 'getRiskCheckList',
            payload: {
              currentPage: riskCheckState.listData.currentPage,
              pageSize: riskCheckState.listData.pageSizel,
              riskCheckEntity: {
                entId: getAuthority().toString(),
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
        if (res.code === 200) {
          message.success('保存成功');
          const riskCheckState: RiskCheckModelState = yield select(
            (state: { riskCheck: RiskCheckModelState }) => state.riskCheck,
          );
          yield put({
            type: 'getRiskCheckList',
            payload: {
              currentPage: riskCheckState.listData.currentPage,
              pageSize: riskCheckState.listData.pageSizel,
              riskCheckEntity: {
                entId: getAuthority().toString(),
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
        if (res.code === 200) {
          message.success('保存成功');
          const riskCheckState: RiskCheckModelState = yield select(
            (state: { riskCheck: RiskCheckModelState }) => state.riskCheck,
          );
          yield put({
            type: 'getRiskCheckList',
            payload: {
              currentPage: riskCheckState.listData.currentPage,
              pageSize: riskCheckState.listData.pageSizel,
              riskCheckEntity: {
                entId: getAuthority().toString(),
                status: 'modified',
              },
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
  },
};

export default RiskCheck;
