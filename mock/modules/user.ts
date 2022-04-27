export default [
  {
    url: '/api/user/info',
    method: 'get',
    timeout: 200,
    response: ({ body }) => {
      console.log('body==>', body)
      return {
        status: 0,
        message: 'success',
        data: {
          id: 0,
          username: 'admin',
          password: 'any',
          name: 'Admin',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          introduction: 'I am a super administrator',
          email: 'admin@test.com',
          phone: '1234567890',
          roles: ['admin'],
        },
      }
    },
  },
]
