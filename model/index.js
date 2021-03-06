import mongoose from 'mongoose'

// 连接数据库
mongoose.connect('mongodb://localhost/suning',{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('数据库连接成功');})
.catch(err => console.log('数据库连接失败',err))