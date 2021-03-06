import { User } from '../../model/user'

export default async (req,res,next) => {
    const { username,password } = req.body;
    let userData = await User.find()

    // 验证用户名是否已经存在
    if(userData.findIndex(item => item.username === username) !== -1) {
        res.send({code: 0, msg: `用户名${username}已经被注册`})
        return;
    }
    User.create({username,password});
    res.send({code: 1,msg: `注册成功`})
}