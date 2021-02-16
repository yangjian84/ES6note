import Vue from 'vue'
import Vuex from 'vuex'
import httpRequest from '@/utils/httpRequest'
import { apis } from './apis'
// import notifications from '@/components/notifications/notification'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    front: {
      namespaced: true,
      state: {
        creditList: [] as Array<ChannelItem>,
        financialList: [] as Array<ChannelItem>,
        homePage: {} as HomePage,
        productList: [] as Array<MatalData>,
        details: {} as {},
        productListEnd: false,
        sdkReady: false,
      },
      mutations: {
        setHomePage(state, { data }) {
          state.homePage = data;
        },
        setCreditList(state, { list }) {
          state.creditList = list;
        },
        setFinancialList(state, { list }) {
          state.financialList = list;
        },
        setProductList(state, { list, end, push = false }) {
          push ? (state.productList.push(...list)) : (state.productList = list);
          state.productListEnd = end;
        },
        setDetails(state, { data }) {
          state.details = data
        },
        setSdkStatus(state, { data }) {
          state.sdkReady = data;
        }
      },
      actions: {
        getMainData({ commit }, { id }) {   // 主页图片

          const { uid } = JSON.parse(localStorage.userinfo || "{}");
          httpRequest({ url: apis.getMainPage, data: { manager_id: id, uid } }).then(res => {
            res.code === 200 && commit({ type: "setHomePage", data: res.data.entity })
          });
        },
        getLoadData({ commit }, { data }) {  // 子页面信息
          httpRequest({ url: apis.getLoad, data }).then(res => {
            const { data: { list } } = res;
            const { channel } = data as ChannelType

            if (res.code === 200) switch (channel) {
              case "LOAN":   // 理财
                commit({ type: "setCreditList", list })
                break;
              case "INVEST":   // 理财
                commit({ type: "setFinancialList", list })
                break;
              default:
                break;
            }
          })
        },
        getProductList({ commit }, { page = 1, push = false }) {  // 金品列表
          httpRequest({ url: apis.getMatalList, data: { page, page_size: 16 } }).then(res => {
            const { list, page = 1, total_page = 1 } = res.data;
            res.code === 200 && commit({ type: "setProductList", list, end: page < total_page, push })
          })
        },
        getDetails({ commit }, { id }) {  // 详情
          httpRequest({ url: apis.getDetails, data: { 'metal_id': id } }).then(res => {
            const { data: { entity }, code } = res;
            code === 200 && commit({ type: "setDetails", data: entity });
          })
        },
        openLink({ getters }, { id, link }) {  // 链接跳转记录访问量
          const { uid } = JSON.parse(localStorage.userinfo || "{}");
          httpRequest({ url: apis.addHis, data: { uid, manager_id: getters.userInfor.manager_id, page_id: id } }).then(() => {
            window.location.href = link;
          })
        },
        changeSdkStatu({ commit }, { data }) {
          commit({ type: "setSdkStatus", data })
        },
        getUid(_, { code }) {
          return httpRequest({ url: apis.getUid, data: { code } });
        }
      },
      getters: {
        userInfor(state) { return (state.homePage as HomePage).user_info || {} },
        metals(state) { return (state.homePage as HomePage).metal || [] },
        homeHarf(state) { return (state.homePage as HomePage).page?.filter(item => item.channel as unknown === "INDEX_TOP_RECOMMEND") },
        account(state) { return (state.homePage as HomePage).page?.filter(item => item.channel as unknown === "OPEN_ACCOUNT") },
        longImg(state) { return (state.homePage as HomePage).page?.filter(item => item.channel as unknown === "INDEX_BIG_IMG") },
        jump(state) { return (state.homePage as HomePage).page?.filter(item => item.channel as unknown === "BOTTOM_JUMP") },
        hasMore(state) { return (state.homePage as HomePage).page?.find(item => item.channel as unknown === "BOTTOM_SERVE") },
        hasOther(state) { return (state.homePage as HomePage).page?.find(item => item.channel as unknown === "OTHER" && item.title === "下载手机银行") },
        hasMorePage(state) { return (state.homePage as HomePage).page?.find(item => item.channel as unknown === "OTHER" && item.title === "查看更多") },
      }
    },
    admin: {
      namespaced: true,
      state: {
        managerInfo: {} as UserInfor,
        statistics: [],
        count: 0,
      },
      mutations: {
        setManagerInfo(state, { data, token }) {
          state.managerInfo = data;
          token && localStorage.setItem('token', token);
        },
        updataManagerInfo(state, payload) {
          delete payload.type;
          state.managerInfo = { ...state.managerInfo, ...payload };
        },
        setVisitNum(state, { list, count }) {
          state.statistics = list;
          state.count = count;
        }
      },
      actions: {
        login({ commit }, { data }) {  // 登录获取信息
          const { code, username, mobile } = data;
          return httpRequest({ url: apis.login, data: { code: Number.parseInt(code), userName: username, mobile: Number.parseInt(mobile) } }).then(res => {
            const { code, data } = res;
            code === 200 && commit({ type: "setManagerInfo", data: data.entity, token: data.token });

            return { code, message: data.message };
          })
        },
        changeJob({ getters, commit }, { job_name }) {  // 职位
          const { manager_id } = getters.managerInfo as UserInfor;
          httpRequest({ url: apis.updateJob, data: { manager_id, job_name } }).then(res => {
            const { code, data } = res;
            Vue.toasted.show(data.message)
            // notifications({ error: code !== 200, content: data.message });
            code === 200 && commit({ type: "updataManagerInfo", job: job_name })
          })
        },
        changeSummary({ getters, commit }, { summary_name }) {  // 专业
          const { manager_id } = getters.managerInfo as UserInfor;
          httpRequest({ url: apis.updateSummary, data: { manager_id, summary_name } }).then(res => {
            const { code, data } = res;
            Vue.toasted.show(data.message)
            // notifications({ error: code !== 200, content: data.message });
            code === 200 && commit({ type: "updataManagerInfo", summary: summary_name })
          })
        },
        changeSign({ getters, commit }, { sign }) { // 签名
          const { manager_id } = getters.managerInfo as UserInfor;
          httpRequest({ url: apis.updateSign, data: { manager_id, sign } }).then(res => {
            const { code, data } = res;
            Vue.toasted.show(data.message)
            // notifications({ error: code !== 200, content: data.message });
            code === 200 && commit({ type: "updataManagerInfo", sign })
          })
        },
        getVisitNum({ commit, getters }) {  // 浏览量
          const { manager_id } = getters.managerInfo as UserInfor;
          httpRequest({ url: apis.managerStatistics, data: { manager_id } }).then(res => {
            const { code, data: { list, count } } = res;
            code === 200 && commit({ type: "setVisitNum", list, count })
          })
        },
        updateImage(_, { base64 }) {  // 上传图片
          return httpRequest({ url: apis.updateImage, data: { base64_image_content: base64 } }).then(
            (res) => {
              const { code, data: { entity } } = res;
              if (code === 200) {
                return entity
              }
            }
          )
        },
        changeImage({ commit, getters }, { path, image_id }) {  // 头像
          const { manager_id } = getters.managerInfo as UserInfor;
          httpRequest({ url: apis.updateHead, data: { manager_id, image_id } }).then(res => {
            res.code === 200 && commit({ type: "updataManagerInfo", path })
          })
        },
        changeWxImage({ commit, getters }, { wechat_name, image_id }) {   // 微信二维码
          const { manager_id } = getters.managerInfo as UserInfor;
          httpRequest({ url: apis.updateWechat, data: { manager_id, image_id } }).then(res => {
            res.code === 200 && commit({ type: "updataManagerInfo", wechat_name })
          })
        },
        changeCertImage({ commit, getters }, { cert, image_id }) {   // 证书
          const { manager_id } = getters.managerInfo as UserInfor;
          httpRequest({ url: apis.addCert, data: { manager_id, image_id } }).then(res => {
            res.code === 200 && commit({ type: "updataManagerInfo", cert });
          })
        },
        deleteCertImage({ commit, getters }, { image_id }) {   // 删除证书
          const { manager_id, cert } = getters.managerInfo as UserInfor;
          httpRequest({ url: apis.deleteCert, data: { manager_id, image_id } }).then(res => {
            const newCert = cert.filter(item => {
              return !image_id.includes(item.id)
            });
            res.code === 200 && commit({ type: "updataManagerInfo", cert: newCert });
          })
        },
        sendCode(_, { data }) {
          return httpRequest({ url: apis.sendCode, data })
        }
      },
      getters: {
        managerInfo(state) {
          localStorage.setItem('managerInfo', JSON.stringify(state.managerInfo));
          const userInfo = JSON.parse(localStorage.managerInfo || "{}") as UserInfor;
          return (state.managerInfo as UserInfor).name ? state.managerInfo : userInfo
        }
      }
    }
  }
});

store.commit({ type: "admin/setManagerInfo", data: JSON.parse(localStorage.managerInfo || "{}") })


export default store;