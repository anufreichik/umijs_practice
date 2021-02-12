import {Effect, Reducer} from 'umi';
import { ITask } from "@/pages/task/Tasks";
import{v4 as uuidv4 } from 'uuid';
import {  select } from 'redux-saga/effects'

export interface IState {
  tasksList?: ITask[];
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    getTasks: Effect;
    deleteById:Effect;
    updateById:Effect;
    create:Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}
const initialState= {
  tasksList:
    [
      {
        _id:uuidv4(),
        name: 'First todo',
        completed: true,
        status: 'done'
      }, {
      _id:uuidv4(),
      name: 'Second todo',
      completed: false,
      status: 'review'
    }, {
      _id:uuidv4(),
      name: 'Third todo',
      completed: false,
      status: 'review'
    }, {
      _id:uuidv4(),
      name: 'Fourth todo',
      completed: false,
      status: 'progress'
    }
    ]
}

const Model: IModel = {
  namespace: 'Task',

  state: initialState,

  effects: {
    *getTasks(_, { call, put }) {
    },
    *deleteById({ payload }, { call, put }) {
      const state=  yield select();
      const newData = state.Task.tasksList.filter((el:ITask)=>el._id!==payload);
      yield put({ type: 'save', payload: { tasksList: newData }, });
    },
    *updateById({ payload }, { call, put }) {
      const state=  yield select();
      const newData = state.Task.tasksList.map((el:ITask)=>{
        if(el._id===payload._id) return {...el, ...payload}
        else return el;
      });
      yield put({ type: 'save', payload: { tasksList: newData }, });
    },

    *create({ payload }, { call, put }) {
      const state=  yield select();
      const newData =[...state.Task.tasksList, payload];
      yield put({ type: 'save', payload: { tasksList: newData }, });
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
