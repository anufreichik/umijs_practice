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
    plusOne: Effect;
    minusOne:Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
    plusOne: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'Counter',

  state: {counter:0},

  effects: {
    //OPTION 1 getting state and then using save reducer
    *addOne({ payload }, { call, put }) {
      const state = yield select();
      yield put({ type: 'save', payload: {counter:state.Counter.counter + 1} });
    },


    //OPTION 2 using reducer plusOne
    *plusOne({ payload }, { call, put }) {
      yield put({ type: 'plusOne' });
    },


    //OPTION 1 getting state and then using save reducer
    *minusOne({ payload }, { call, put }) {
      //const state = yield select();
       const counterState = (state:any) => state.Counter;
       const state = yield select(counterState);
      yield put({ type: 'save', payload: {counter:state.counter - 1} });
    },

  },

  reducers: {
    //using reducer
    plusOne(state: any, { payload }: any) {
      return {
        ...state,
       counter: state.counter+1
      };
    },

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
