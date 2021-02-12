import {Effect, Reducer} from 'umi';
import { queryGetBooks } from "@/pages/book/queries";
import { IBook } from "@/pages/book/BookList";

export interface IState {
  booksList?: IBook[];
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    getBooks: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'Book',

  state: {},

  effects: {
    *getBooks(_, { call, put }) {
      const data = yield call(queryGetBooks);
      yield put({ type: 'save', payload: {booksList:data}});
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
