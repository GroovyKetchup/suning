    function ajaxRequest(options) {
        //请求参数拼接函数
        const queryFormat = (data) => {
            let arr = [];
            for(let i in data) {
                arr.push(`${i}=${data[i]}`);
            }
            arr.join('&');
            return arr;
        }

        //创建AJAX连接
        const xhr = new XMLHttpRequest();  
        
        //默认参数
        let defaultData = {
            type: 'GET',
            url: '',
            header: {
                'Content-Type': 'application/x-www-form-enurlcoded'
            },
            query: '',
            fn: () => {}
        }

        //当传入参数时，覆盖默认函数
        Object.assign(defaultData,options);

        //调用请求参数拼接函数
        let params;
        if(defaultData.query !== ''){
            params = queryFormat(defaultData.query);
        }
        let url = defaultData.url;
        let type = defaultData.type;
        let fn = defaultData.fn;
        let header = defaultData.header;
        //GET方式
        if(type == 'GET') {
            xhr.setRequestHeader('certificate',localStorage.getItem('certificate'));
            if(params) {
                url = url + '?' +params;
            }
        }
        
        //开启连接
        xhr.open(type,url,true);

        //POST方式
        if(defaultData.type == 'POST') {
            //判断请求头部内容发送方式
            xhr.setRequestHeader('Content-Type',defaultData.header['Content-Type']);
            xhr.setRequestHeader('certificate',localStorage.getItem('certificate'));
            if(header['Content-Type'] == 'application/json') {
                xhr.send(JSON.stringify(defaultData.query));
            }else {
                xhr.send(params);
            }
        }else {
            xhr.send();
        }

        xhr.onload = function (){
            //判断响应信息发送方式
            let response = xhr.responseText;
            let contentType = xhr.getResponseHeader('Content-Type');
            if(contentType == 'application/json') {
                response = JSON.parse(response);
            }
            fn(response,xhr);
        }

    }