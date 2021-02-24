import {Effect, Reducer} from 'umi';
import { queryCreateBook, queryDeleteBook, queryGetBooks } from "@/pages/book/queries";
import { IBook } from "@/pages/book/BookList";

export interface IState {
  booksList?: IBook[];
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    getBooks: Effect;
    deleteById:Effect;
    create:Effect;
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

    *deleteById({ payload }, { call, put }) {
      console.log(payload)
      const deleteResult  = yield call(queryDeleteBook,payload._id);
      if (!(deleteResult instanceof Error)) {
        yield put({ type: 'Book/getBooks' });
      }
    },

    *create({ payload }, { call, put }) {
      console.log(payload, 'payload create')
      const createResult  = yield call(queryCreateBook,payload);
      if (!(createResult instanceof Error)) {
        yield put({ type: 'Book/getBooks' });
      }
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
