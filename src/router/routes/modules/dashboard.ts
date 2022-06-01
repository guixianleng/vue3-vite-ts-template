export default {
  path: 'dashboard',
  name: 'Dashboard',
  component: () => import('/@/views/dashboard/workplace/index.vue'),
  meta: {
    locale: '仪表盘',
    icon: 'mdi:monitor-dashboard',
    requiresAuth: true,
    roles: ['*'],
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('/@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: '工作台',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}
