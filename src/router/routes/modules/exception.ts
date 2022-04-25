export default {
  path: 'exception',
  name: 'exception',
  component: () => import('/@/views/exception/index.vue'),
  meta: {
    locale: '异常页',
    requiresAuth: true,
    icon: 'ant-design:exclamation-circle-outlined',
    order: 6,
  },
  children: [
    {
      path: '403',
      name: '403',
      component: () => import('/@/views/exception/403/index.vue'),
      meta: {
        locale: '403',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '404',
      name: '404',
      component: () => import('/@/views/exception/404/index.vue'),
      meta: {
        locale: '404',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '500',
      name: '500',
      component: () => import('/@/views/exception/500/index.vue'),
      meta: {
        locale: '500',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}
