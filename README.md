# express-notes
在线便签网站

线上预览：http://note.abc02.info

## 使用方法

```bash
# 克隆仓库
git clone git@github.com:yunyu950908/project-node-express.git
# cd 到仓库目录后安装依赖
npm i
# 启动本地服务器，打开 http://localhost:3000
npm start
# 当然你也可以指定端口( 比如开一个2233娘端口 )
PORT=2233 node ./bin/www
```

## 目前完成功能如下：

( 仅供参考学习 )

1. 完成 `toast` 模块，发送消息提示
2. 完成 `note` 模块，增删改
3. 完成 `waterfall` 模块，瀑布流布局
4. 定义路由 `api.js` 增删改查，mock 数据
5. 完成 `event`,订阅发布模式
6. 完成 `note-enter` 模块，控制 `Note` 事件
7. 完成 `note.js` 模块，使用 `sequelize` + `sqlite3` 存储数据
8. 完成路由 `api.js`, mock 数据改成真实数据
9. 完成路由 `auth.js`，调用 github-passport
10. 完成中间件 `app.js`，设置 `session`
11. 完成 `index.ejs` 模板，切换登录展示
12. 修正路由 `api.js`，`session` 判断用户增删改权限 + 错误信息反馈
13. 修正路由 `index.js`,`session` 判断登录状态
14. 修复若干 BUG
15. 功能完善中 ...（ 凑数 `(*^▽^*)`）

## 用到的技术栈

**前端：**
1. webpack 前端模块打包
2. SCSS 样式预处理器
3. npm 包管理
4. 模块化发开
5. JS 组件封装
6. pub / sub 设计模式
7. 前后端联调

**后端：**
1. express ( based on Node.js ) 路由 中间件
2. MVC 分离
3. sequelize + sqlite3 数据库
4. ejs 模板引擎
5. session
6. passport + github-passport
7. pm2
8. linux

## 其他
1. bug 提交或其他问题，移步 [ issue ](../../issues)
2. Author: AlbertLee
3. 协议 [ MIT ](./LICENSE)