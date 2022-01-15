const proxy = {
  'GET /users': (req, res) => {
    res.send({
      data: [
        {
          userId: 'lipei',
          userName: '李裴',
          userAge: 12,
        },
      ],
      code: '0000',
      message: 'success',
    });
  },
  'POST /oauth/login': {
    data: {
      userInfo: {
        userId: 'lipei',
        userName: '李裴',
        userAge: 28,
      },
      token: '1111111111',
    },
    code: '0000',
    message: 'success',
  },
  'POST /oauth/logout': (req, res) => {
    res.send({ data: { flag: true, msg: '连接成功' }, code: '0000', message: 'success' });
  },
};
module.exports = proxy;
