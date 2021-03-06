import express from 'express'
import path from 'path'
import userRouter from './router/userRouter'

// 连接数据库
require('./model/index')

const app = express();

app.use(express.static(path.join(__dirname,'./public')));
app.use(express.json());
app.use(express.urlencoded());

//用户信息路由
app.use('/user',userRouter);

app.listen(3000,() => {console.log('http server had run at 3000');})