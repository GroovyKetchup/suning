(() => {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const login = document.querySelector('#login');
    const register = document.querySelector('#register');

    login.addEventListener('click', function () {
        ajaxRequest({
            type: 'POST',
            url: '/user/login',
            header: {
                'Content-Type': 'application/json'
            },
            query: {
                username: username.value,
                password: password.value
            },
            fn: (data) => {
                if(JSON.parse(data).code == 1) {
                  window.location.href = 'http://localhost:3000/index.html'
                  alert('登錄成功')
                }else{
                  alert(JSON.parse(data).msg)
                }
            }
        })
    })

    register.addEventListener('click', function() {
        ajaxRequest({
            type: 'POST',
            url: '/user/register',
            header: {
                'Content-Type': 'application/json'
            },
            query: {
                username: username.value,
                password: password.value
            },
            fn: (data) => {
                if(JSON.parse(data).code == 1) {
                  alert('注册成功')
                  username.value = ''
                  password.value = ''
                }else{
                  alert('注册失败')
                }
            }
        })
    })
})();