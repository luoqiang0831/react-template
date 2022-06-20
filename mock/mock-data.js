// /** MOCK 模拟数据拦截ajax请求 **/

const MockJs = require('mockjs')
const { post } = require('./fetch')
const bodyParser = require('body-parser') // 引入中间件
const SERVER_URL = 'http://corp.m.stage.dongfangfuli.com'
// 参数序列化
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // 解析urlencoded类型

// /** 数据模版 **/
// const ajaxTest = {
//   status: 200,
//   "data|1-10": [
//     {
//       "id|+1": 1,
//       email: "@EMAIL",
//     },
//   ],
// };

// module.exports = (url, params) => {
//   return Mock.mock(ajaxTest);
// };
function Init(app) {
  app.get('/cart/getCartList', function (req, res) {
    res.json({ aaa: '111' })
  })

  /** 数据模版 **/
  const list = {
    code: 0,
    'data|1-10': [
      {
        'id|+1': 1,
        email: '@EMAIL',
      },
    ],
  }

  app.post('/api/list', function (req, res) {
    res.json(MockJs.mock(list))
  })

  /** 数据模版 **/
  const addressList = {
    code: 0,
    'data|1-1': [
      {
        id: 1,
        name: '如家酒店（上海市长宁区中山公园北侧定西路188号16弄)',
        score: 4.4,
        location: '距定西路266m,长宁区中山公园北侧定西路188号',
      },
      {
        id: 2,
        name: '桔子酒店（上海市长宁区中山公园）',
        score: 4.2,
        location: '距定西路266m,长宁区中山公园北侧定西路188弄',
      },
      {
        id: 3,
        name: '桔子酒店（上海交大定西路店）',
        score: 4.2,
        location: '距定西路266m,长宁区中山公园北侧定西路188弄',
      },
    ],
  }
  app.post('/api/addressList', function (req, res) {
    res.json(MockJs.mock(addressList))
  })

  // app.post(
  //   "/gw/app/api/health/sales/page/queryPageConfig",
  //   function (req, res) {
  //     res.json(MockJs.mock(homeJsonData));
  //   }
  // );

  // 影响代理，滚粗！
  // app.post(
  //   "/gw/app/api/health/sales/page/queryPageConfig",
  //   function (req, res) {
  //     res.json(MockJs.mock(selectPlanConfigData));
  //   }
  // );

  // app.post("/api/health/sales/plan/initConditions", function (req, res) {
  //   res.json(MockJs.mock(areaData));
  // });

  // app.post(
  //   "/gw/app/api/health/sales/plan/queryFamilyMemberListById",
  //   function (req, res) {
  //     res.json(MockJs.mock(bookPersonInfo()));
  //   }
  // );
  // app.post(
  //   "/mallapi/user/checkLogin",
  //   urlencodedParser,
  //   function (req, response) {
  //     try {
  //       const params = {
  //         platform: 1,
  //         unionFlag: 1,
  //         cityId: 145,
  //         city: 145,
  //         ignore: false,
  //         union: "bfd",
  //         account: "liuqiang",
  //         password: "123456",
  //         loginType: 1,
  //         ...req.body,
  //       };
  //       // 请求 网关token
  //       post(`${SERVER_URL}/user/front/user/login`, params, {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           Cookie: "company=xiaolang;",
  //         },
  //       })
  //         .then(({ _, res }) => {
  //           // 处理cookie Domain
  //           let cookies = res.headers["set-cookie"];
  //           if (Array.isArray(cookies))
  //             cookies = cookies.map(cookie =>
  //               cookie.replace(/Domain=.*;/gi, "Domain=localhost;")
  //             );
  //           // 再次请求token验证接口
  //           post(`${SERVER_URL}/mallapi/user/checkLogin`, params, {
  //             headers: {
  //               "Content-Type": "application/x-www-form-urlencoded",
  //               // Cookie: cookies.join(";"),
  //             },
  //           }).then(({ data }) => {
  //             // response.setHeader("set-cookie", cookies);
  //             response.send(data);
  //           });
  //         })
  //         .catch(res => {
  //           console.log(res);
  //         });

  //       // response.json(MockJs.mock({}));
  //     } catch (error) {
  //       console.log("-----------/user/front/user/login Error-------------");
  //       console.log(error);
  //       response.send(error);
  //     }
  //   }
  // );
}

module.exports = Init
