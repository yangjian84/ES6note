
/* eslint-disable @typescript-eslint/no-explicit-any */
export function throttle(fn: (...v: any) => any, interval = 800): any {
    let timer: NodeJS.Timeout, canDo = true;

    return (v: any) => {

        if (canDo) {
            fn(v);
            canDo = false;
        }

        if (timer) {
            return;
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = 0 as unknown as NodeJS.Timeout;
            canDo = true;
        }, interval)
    }

}



export function throttleAfter(fn: (...v: any) => any, interval = 800): any {
    let timer: NodeJS.Timeout;

    return (v: any) => {

        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                clearTimeout(timer);
                fn(v);
            }, interval);
            return;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = 0 as unknown as NodeJS.Timeout;
            fn(v);
        }, interval);
    }

}


