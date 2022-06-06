export default {
  path: 'result',
  name: 'result',
  component: () => import('/@/views/result/index.vue'),
  meta: {
    locale: '结果页',
    requiresAuth: true,
    icon: 'ant-design:check-circle-outlined',
    order: 6,
  },
  children: [
    {
      path: '403',
      name: '403',
      component: () => import('/@/views/result/403/index.vue'),
      meta: {
        locale: '403',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '404',
      name: '404',
      component: () => import('/@/views/result/404/index.vue'),
      meta: {
        locale: '404',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '500',
      name: '500',
      component: () => import('/@/views/result/500/index.vue'),
      meta: {
        locale: '500',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'success',
      name: 'Success',
      component: () => import('/@/views/result/success/index.vue'),
      meta: {
        locale: '成功页',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'fail',
      name: 'Fail',
      component: () => import('/@/views/result/fail/index.vue'),
      meta: {
        locale: '失败页',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}
