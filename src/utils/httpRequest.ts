/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import router from '@/router';
import { imgHttps, httpUrl } from "@/store/apis"

export const httpUrlImg = imgHttps;

export interface AxResponseType {
    code: number;
    data: {
        message: string;
        page?: number;
        page_size?: number;
        count?: number;
        total_page?: number;
        list?: Array<unknown>;
        entity?: {
            // eslint-disable-next-line @typescript-eslint/member-delimiter-style
            [name: string]: any
        };
        token?: string;
    };
}

export interface RequestOption {
    url: string;
    data?: unknown;
}


/**
 * 配置request请求时的默认参数
 */
export default function httpRequest(option: RequestOption) {
    const { url, data } = option
    const token = localStorage.token;
    return new Promise((resolve: ((value: AxResponseType) => void), reject) => {
        axios({
            url,
            data,
            method: "POST",
            baseURL: httpUrl,
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }
        }).then(res => {
            const { code } = res.data as AxResponseType;
            if (code < 10000) {
                if (code === 401) {
                    localStorage.removeItem('managerInfo');
                    localStorage.removeItem('lastScrollHome');
                    localStorage.removeItem('lastScrollProduct');
                    router.replace('/login')
                }
                else {
                    resolve(res.data)
                }
            } else {
                // notification.error({ message: "ERROR", description: "请求错误" });
                reject(res.data);
            }
        }).catch((error) => {
            reject(error.response);
            // notification.error({ message: "ERROR", description: "发生预期之外错误" })
        })
    })
} 
