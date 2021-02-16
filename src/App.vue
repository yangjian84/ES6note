<template>
  <div id="app">
    <keep-alive :include="['HomePage', 'Product']">
      <router-view />
    </keep-alive>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { appid } from "@/store/apis";
import { AxResponseType } from "./utils/httpRequest";

export default Vue.extend({
  methods: {
    wxLogin(option: { id?: string; uri?: string }) {
      const { id, uri } = option;
      const scope = "snsapi_base";
      const project = "studio";
      // const url = `https://auth.jxhconline.com#appid=${appid}&scope=${scope}&redirect=${location.origin}&id=${id}&uri=${uri}`;
      const url = `https://auth.jxhconline.com#appid=${appid}&scope=${scope}&project=${project}&id=${id}&uri=${uri}`;
      window.location.href = url;
    },
    loginBefore() {
      const pathName = location.pathname;

      const pathArr = [
        "/login",
        "/admin",
        "/userinfo",
        "/change",
        "/cert",
        "/certadd",
        "/visit",
      ];

      switch (pathArr.includes(pathName)) {
        case true:
          this.adminLogin();
          break;

        default:
          this.frontLogin();
          break;
      }
    },
    frontLogin() {
      const {
        query: { code, ID },
      } = this.$route;

      const hasId = location.search.match(/\?ID=/i)?.input?.split("=")[1];

      if (code) {
        this.$store
          .dispatch({
            type: "front/getUid", // assesstoken
            code,
          }) // 尝试获取用户信息
          .then(({ code: sCode, data: { entity } }: AxResponseType) => {
            if (sCode === 200) {
              localStorage.setItem("userinfo", JSON.stringify(entity));
              this.$router.replace({
                name: "Home",
                query: { ID },
              }); //  重定向
              this.$store.dispatch({
                type: "front/getMainData",
                id: ID,
              }); // 加载数据
            } else {
              alert("登录失败，页面参数丢失，请联系客户经理重新分享页面");
            }
          })
          .catch(() => {
            this.$toasted.show("网路错误");
          });
      } else if (ID || hasId) {
        localStorage.userinfo
          ? this.$store.dispatch({ type: "front/getMainData", id: ID || hasId }) // 加载数据加载数据
          : this.wxLogin({ id: (ID as string) || hasId }); // 重新登录
      } else {
        this.wxLogin({});
        alert("页面参数丢失，请联系客户经理重新分享页面");
      }
    },
    adminLogin() {
      const hasCode = location.search.match(/\?code=/i)?.input?.split("=")[1];
      !hasCode && this.wxLogin({ uri: "/login" });
      hasCode && this.$router.replace({ name: "Login" });
    },
  },
  created() {
    this.loginBefore();
  },
});
</script>


<style >
html,
body,
#app {
  margin: 0;
  height: 100%;
}
p,
li,
ul {
  margin: 0;
}

* {
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}
.toast-class {
  opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.downin-enter-active,
.downin-leave-active {
  transition: all 0.5s;
}
.downin-enter, .downin-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
}
</style>
