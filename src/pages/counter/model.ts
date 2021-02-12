import {Effect, Reducer} from 'umi';
import {  select } from 'redux-saga/effects';

export interface IState {
  counter?: Number;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    addOne: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'Counter',

  state: {counter:0},

  effects: {
    *addOne({ payload }, { call, put }) {
      const state = yield select();
      yield put({ type: 'save', payload: {counter:state.Counter.counter + 1} });
    },

  },

  reducers: {
    save(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },

    set(state: any, { payload }: any) {
      return payload;
    },
  },
};

export default Model;
