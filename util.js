import fs from 'fs'

//读取文件
export function readFile(filePath) {
    let json = fs.readFileSync(filePath,'utf-8');
    if(!json) {
        json = '[]';
    }
    return JSON.parse(json);
}

//将数据写入文件
export function writeFile(filePath,data) {
    if(data !== 'string') {
        data = JSON.stringify(data);
    }
    fs.writeFileSync(filePath,data,'utf-8');
}

export function createCertificate(str) {
    let arr = new Array();
    // 转为ASCII码
    for(let i in str) {
        arr.push(str.charCodeAt(i))
    }
    // 变为16进制
    arr.map(item => item.toString(16));
    // 打乱数组
    arr.sort(() => Math.random * 100 - 50);
    arr = arr.join('');
    
    //规定统一10位验证码
    if(arr.length > 10){
        arr = arr.substr(0,10);
    }

    if(arr.length <10) {
        let index = 10-arr.length;
        let str = '';
        for(let i = 1;i <= index;i++) {
            str = str.concat(parseInt(Math.random()*10).toString());
        }
        arr = arr.concat(str);
    }
    return arr;
}