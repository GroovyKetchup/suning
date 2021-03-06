window.addEventListener('load',function() {
    var banner = document.querySelector('.banner');
    var ul = banner.querySelector('ul');
    var ol = banner.querySelector('ol');
    var w = banner.offsetWidth;
    var index = 0;
    var startX = 0;
    var moveX = 0;
    var flag = false;

    //动态复制第一张图片到最后和复制第一张图片到最前面。
    var liFirst = ul.children[0].cloneNode(true);
    ul.appendChild(liFirst);
    var liLast = ul.children[ul.children.length - 2].cloneNode(true);
    ul.insertBefore(liLast,ul.children[0]);

    // 动态生成小圆圈
    var max = ul.children.length - 2; 
    for(var i = 0;i < max;i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
    }
    ol.children[0].className = 'current';
    //有动画
    function oneTransition() {
        var x = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX('+x+'px)';
    };
    //无动画
    function noTransition() {
        var x = -index * w;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX('+x+'px)';
    };
    var timer = setInterval(function() {
        index++;
        oneTransition();
    },2000);

    ul.addEventListener('transitionend',function() {
        if(index >= max) {
            index = 0;
            noTransition();
        }else if(index < 0) {
            index = max;
            noTransition();
        }
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

    ul.addEventListener('touchstart',function(e) {
        clearInterval(timer);
        timer = null;
        e.preventDefault();
        startX = e.targetTouches[0].pageX;
    })

    ul.addEventListener('touchmove',function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var x = -index * w + moveX;
        ul.style.transform = 'translateX('+x+'px)';
        flag = true;
    })

    ul.addEventListener('touchend',function() {
        if(flag) {
            if(Math.abs(moveX) > 100) {
                if(moveX > 0) {
                    index --;
                }else if (moveX < 0) {
                    index ++;
                }
                if(index < 0){
                    index = max;
                    noTransition();
                }else {
                    oneTransition();
                }
            }else {
                oneTransition();
            }
            flag = false;
        }
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            oneTransition();
        },2000);
    })
})