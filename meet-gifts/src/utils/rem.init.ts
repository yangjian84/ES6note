(function () {
    const setRootSize = () => {
        let width = document.documentElement.clientWidth || window.innerWidth;
        width > 750 && (width = 750);
        width < 320 && (width = 320);
        const fontSize = `${width / 7.5}px`;
        document.documentElement.style.fontSize = fontSize;
        document.body.style.fontSize = '18px';
    };
    window.addEventListener('resize', () => {
        setRootSize()
    });
    setRootSize();





    const u = navigator.userAgent;
    let flag;
    let myFunction!: NodeJS.Timeout;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        document.body.addEventListener('focusin', () => {  //软键盘弹起事件
            flag = true;
            clearTimeout(myFunction);
        })
        document.body.addEventListener('focusout', () => { //软键盘关闭事件
            flag = false;
            if (!flag) {
                myFunction = setTimeout(function () {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })//重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)

                }, 200);
            } else {
                return;
            }
        });


    } else {
        return;
    }

    // const coverSupport = 'CSS' in window && typeof CSS.supports === 'function' && (CSS.supports('top: env(a)') || CSS.supports('top: constant(a)'));
    // const mateContent = `width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0${coverSupport ? ', viewport-fit=cover' : ''}`;
    // const mateTag = document.createElement('meta');
    // mateTag.setAttribute('name', 'viewport');
    // mateTag.setAttribute('content', mateContent);
    // document.head.appendChild(mateTag);

})();


