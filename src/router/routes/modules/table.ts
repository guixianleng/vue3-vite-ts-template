export default {
  path: 'table',
  name: 'table',
  component: () => import('/@/views/table/index.vue'),
  meta: {
    locale: '列表页',
    requiresAuth: true,
    icon: 'ant-design:table-outlined',
    order: 3,
  },
  children: [
    {
      path: 'base',
      name: 'base',
      component: () => import('/@/views/table/base/index.vue'),
      meta: {
        locale: '基础表格',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
}
