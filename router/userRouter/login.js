import { User } from '../../model/user'


export default async (req,res,next) => {
    const { username,password } = req.body;
    const userData = await User.find()
    let index = userData.findIndex(item => item.username === username);

    if(index == -1) {
        res.send({code: 0,msg: `用户名${username}不存在`})
        return;
    }

    if(password !== userData[index].password) {
        res.send({code: 0, msg: `密码错误`})
        return;
    }

    res.send({code: 1, msg: `登录成功`});
}