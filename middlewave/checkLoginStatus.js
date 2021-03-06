import { readFile } from '../util'
import { isLoginPath } from '../global'
import url from 'url'

export default (req,res,next) => {
    // 白名单
    const whiteList = [
        {url: '/user/register',method: 'POST'},
        {url: '/user/login',method: 'POST'}
    ]

    const pathname = url.parse(req.url).pathname;
    const method = req.method;
    const wlIndex = whiteList.findIndex(item => pathname === item.url && method === item.method);
    if(wlIndex !== -1) {
        next();
        return;
    }

    //进行验证
    const certificate = req.body.certificate;
    let isLogin = readFile(isLoginPath);
    const index = isLogin.findIndex(item => item.certificate === certificate);

    if(index === -1) {
        res.send({code: 0, msg: '未登录'});
        return;
    }

    next();
}