import httpRequest from "./httpRequest";
import { apis, appid } from '@/store/apis';
import { SHA1 } from 'crypto-js';
import jWeixin from 'jweixin-module';
import store from '@/store';




// 获取sdk_access_token
async function getSdkAccressToken() {

    const res = await httpRequest({ url: apis.token });
    const { access_token: sdk_access_token } = res.data?.entity as { access_token: string };
    return sdk_access_token;

}


//获取jsapi_ticket
async function getJsapiTicket() {

    const res = await httpRequest({ url: apis.tiket });
    const { ticket: sdk_ticket } = res.data?.entity as { ticket: string };
    return sdk_ticket;
}


export const sdkConfig = async () => {
    await getSdkAccressToken();
    const jsapi_ticket = await getJsapiTicket();
    const nonceStr = "Wm3WZYTPz0wzccnW";
    const timestamp = Math.floor(Date.now() / 1000);
    const url = window.location.href.split("#")[0];
    const signature = SHA1(`jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`).toString();
    const wxConfig = {
        appId: appid, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature,// 必填，签名
        jsApiList: ["chooseImage", 'getLocalImgData', 'updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
        openTagList: ['wx-open-launch-weapp']
    }

    await jWeixin.config(wxConfig);
    await jWeixin.ready(async () => {
        return await store.dispatch({ type: "front/changeSdkStatu", data: true });
    })
    return jWeixin
}




