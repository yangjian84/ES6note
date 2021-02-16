/* eslint-disable @typescript-eslint/no-explicit-any */
interface HomePage {
    metal: Array<MatalData>;  // 金属
    page: Array<ChannelItem>;
    user_info: UserInfor;
}


interface UserInfor {
    name: string;   // name
    job: string;  // job
    summary: string;   //专业
    cert: Array<{ path: string; id: string }>;  // 证书
    sign: string;  // 签名
    number: string;  // 工号
    mobile: string; // 联系方式
    path: string;  // 头像路径
    wechat_name: string; // 微信二维码
    visit: number;   // 访问量
    manager_id: number;
    institution_name?: string; // 分行信息
}





interface ChannelItem {
    id: number;
    channel: ChannelType;
    link: string;    // 外链
    path: string;   // 图路径
    title: string;  // 标题
}


interface MatalData {
    id: number;
    path: string;  //  图路径
    supply: string;  // tips
    title: string;  // 标题
    price: string; // price
}


interface DetailData {
    id: number;
    norms: string; // 规格
    path: string; // 图片路径
    price: string;
    supply: string; // 出品
    text: string;
    title: string; // name
}

interface ChannelType {
    channel: "INDEX_TOP_RECOMMEND"  // 首页推荐
    | "BOTTOM_SERVE"  //  首页底部更多
    | "OPEN_ACCOUNT"  //  一键开户
    | "OTHER"  //  其他
    | "LOAN"  //  贷款
    | "INVEST"  //  投资相关
    | "RECOMMOND"  //  no
    | "BOTTOM_JUMP"  //  邮储食堂
    | "INDEX_BIG_IMG"; //  长图
}



interface SdkConfig {
    config: any;

    ready: any;

    updateAppMessageShareData: any;

    updateTimelineShareData: any;

    onMenuShareWeibo: any;

    onMenuShareQZone: any;

    startRecord: any;

    stopRecord: any;

    onVoiceRecordEnd: any;

    playVoice: any;

    pauseVoice: any;

    stopVoice: any;

    onVoicePlayEnd: any;

    uploadVoice: any;

    downloadVoice: any;

    chooseImage: any;

    previewImage: any;

    uploadImage: any;

    downloadImage: any;

    translateVoice: any;

    getNetworkType: any;
    getLocalImgData: any;

    openLocation: any;

    getLocation: any;

    hideOptionMenu: any;

    showOptionMenu: any;

    hideMenuItems: any;

    showMenuItems: any;

    hideAllNonBaseMenuItem: any;

    showAllNonBaseMenuItem: any;

    closeWindow: any;

    scanQRCode: any;

    chooseWXPay: any;

    openProductSpecificView: any;

    addCard: any;

    chooseCard: any;

    openCar: any;
}