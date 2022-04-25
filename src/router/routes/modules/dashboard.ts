export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('/@/views/dashboard/workplace/index.vue'),
  meta: {
    locale: 'dashboard',
    icon: 'mdi:monitor-dashboard',
    requiresAuth: true,
    roles: ['*'],
  },
}
