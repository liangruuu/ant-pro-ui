import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { router } from 'umi';

import { fakeAccountLogin, login } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // });
      const response = yield call(login, payload);
      // Login successfully
      if (response.code === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: 'ok',
        });
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params as { redirect: string };
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }
        router.replace(redirect || '/');
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: 'error',
        });
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      localStorage.removeItem('token');
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    // changeLoginStatus(state, { payload }) {
    //   setAuthority(payload.currentAuthority);
    //   return {
    //     ...state,
    //     status: payload.status,
    //     type: payload.type,
    //   };
    // },
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        type: 'account',
        status: payload,
      };
    },
  },
};

export default Model;
