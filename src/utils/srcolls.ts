
export default class ScrollBe {
    constructor(el: HTMLElement) {
        this.el = el;
    }

    private el!: HTMLElement;






    onScroll(func: () => void) {
        this.el.addEventListener("scroll", () => {
            func && func();
        }, { capture: true })
    }



    /**
     * @param func 
     * @param dist 触底距离，默认50
     * @param time 节流时间，默认1000
     */
    onScrollBottom(func: () => void, dist = 50, time = 1000) {
        let canDo = true, timer!: number;
        const scrollIndex = [0, 0];

        this.el.addEventListener("scroll", () => {
            const scrollDist = this.el.scrollHeight - this.el.scrollTop;  // 滚动距离
            const scrollDist_ = this.el.offsetHeight + dist; // 触底距离

            scrollIndex.push(this.el.scrollTop);  // 记录上一次滚动值
            scrollIndex.shift();

            if (scrollDist <= scrollDist_) {
                if (canDo) {
                    func();
                    canDo && (timer = setTimeout(() => {  // 节流处理
                        const [last, news] = scrollIndex;
                        last > news && (canDo = true);  // 回滚节流
                        clearTimeout(timer);
                    }, time));
                    canDo = false;
                }
            }

        }, { capture: true });
    }


}