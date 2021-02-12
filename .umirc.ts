import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/user', component: '@/pages/User' },
    { path: '/counter', component: '@/pages/counter/Counter' },
    { path: '/book', component: '@/pages/book/BookList' },
    { path: '/task', component: '@/pages/task/Tasks' },
    { path: '/task/:taskId', component: '@/pages/task/TaskForm' },
  ],
  fastRefresh: {},
});
