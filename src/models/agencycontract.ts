import { Effect } from 'dva';
import { Reducer } from 'react';
import { message } from 'antd';
import { Agencycontract, Ent } from './entity';
import { fetchList, saveAgencycontract, deleteAgencycontractById } from '@/services/agencycontract';

export interface AgencycontractModelState {
  listData: {
    pageSizel: number;
    currentPage: number;
    total: number;
    dataSource: Agencycontract[];
  };
  nowEnt?: Ent;
}

export interface AgencycontractModelType {
  namespace: 'agencycontractModel';
  state: AgencycontractModelState;
  effects: {
    fetchList: Effect;
    saveAgencycontract: Effect;
    deleteAgencycontractById: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const AgencycontractModel: AgencycontractModelType = {
  namespace: 'agencycontractModel',
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
    *saveAgencycontract({ payload }, { select, call, put }) {
      try {
        const res = yield call(saveAgencycontract, payload);
        if (res.status === 200) {
          message.success('保存成功');
          const agencycontractModel: AgencycontractModelState = yield select(
            (state: { agencycontractModel: AgencycontractModelState }) => state.agencycontractModel,
          );
          yield put({
            type: 'fetchList',
            payload: {
              currentPage: agencycontractModel.listData.currentPage,
              pageSize: agencycontractModel.listData.pageSizel,
              agencycontract: { agencyid: agencycontractModel.nowEnt?.sid },
            },
          });
        }
      } catch (e) {
        message.error(e || '未知错误');
      }
    },
    *deleteAgencycontractById({ payload }, { select, call, put }) {
      try {
        const res = yield call(deleteAgencycontractById, payload);
        if (res.status === 200) {
          message.success('保存成功');
          const agencycontractModel: AgencycontractModelState = yield select(
            (state: { agencycontractModel: AgencycontractModelState }) => state.agencycontractModel,
          );
          yield put({
            type: 'fetchList',
            payload: {
              currentPage: agencycontractModel.listData.currentPage,
              pageSize: agencycontractModel.listData.pageSizel,
              agencycontract: { agencyid: agencycontractModel.nowEnt?.sid },
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

export default AgencycontractModel;
