// import Taro from '@tarojs/taro';
import * as indexApi from './service';

export default {
  namespace: 'index',
  state: {
    data: [],
    text: 'text'
  },

  effects: {
    * getLists({ payload }, { call, put }) {
      const { error, result } = yield call(indexApi.getLists, {
        ...payload
      })
      if (!error) {
        yield put({
          type: 'updateState',
          payload: {
            data: result
          }
        })
      }
    },

    * setText({ payload }, { call, put }) {
      // const response = yield call(queryIdentification, payload);
      yield put({
        type: 'saveText',
        payload,
      });
    },
  },

  reducers: {
    updateState(state, { payload: data }) {
      return { ...state, ...data }
    },
    saveText(state, action) {
      return {
        ...state,
        text: action.payload,
      };
    },
  }

}
