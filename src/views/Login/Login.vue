<template>
  <div class="home-page">
    <div class="backge">
      <img src="../../assets/login/icon-bg.png" alt="" class="bg-right" />
      <img src="../../assets/login/login-bottom.png" alt="" class="bg-bottom" />
    </div>

    <div class="content">
      <div class="ti-image">
        <img src="../../assets/login/icon-you.png" alt="" />
      </div>

      <p class="title">云工作室管理平台</p>

      <div class="login-img">
        <img src="../../assets/login/login-bg.png" alt="" />
      </div>

      <form class="from-box">
        <my-input-com
          v-for="item in formData"
          :type="item.type"
          :before="item.icon"
          :after="item.code"
          :key="item.name"
          :placeholder="item.placeholder"
          v-model="forms[item.name]"
          :reg="item.reg"
          :mobile="forms.mobile"
          :username="forms.username"
        />
        <div @click="handelSubmit" class="submit">
          <span>登录</span>
        </div>
      </form>

      <div class="bottom"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyInputCom from "./components/my-input.vue";

@Component({ components: { MyInputCom } })
export default class LoginPage extends Vue {
  private formData = [
    {
      name: "username",
      reg: /^(?:[\u4e00-\u9fa5·]{2,8})$/,
      icon: require("../../assets/login/icon-user.png"),
      type: "text",
      placeholder: "姓名(2-8位汉字)",
    },
    {
      name: "mobile",
      reg: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
      icon: require("../../assets/login/icon-phone.png"),
      type: "number",
      placeholder: "手机号",
    },
    {
      name: "code",
      reg: /[0-9]{4,8}/,
      icon: require("../../assets/login/icon-code.png"),
      code: true,
      type: "number",
      placeholder: "验证码",
    },
  ];

  private forms: {
    username: string;
    mobile: string;
    code: string;
    [name: string]: string;
  } = {
    username: "",
    mobile: "",
    code: "",
  };

  created() {
    this.handelExpLogin();
  }

  // 判断是否有登录数据
  handelExpLogin() {
    try {
      const { manager_id } = JSON.parse(localStorage.managerInfo || "{}");
      const { uid } = JSON.parse(localStorage.userinfo || "{}");
      manager_id && uid && this.$router.replace({ name: "Admin" });
    } catch (error) {
      console.log(error);
    }
  }

  checkForm() {
    const canSubmit: Array<boolean> = [];
    for (let i = 0; i < this.formData.length; i++) {
      canSubmit.push(
        this.formData[i].reg.test(this.forms[this.formData[i].name])
      );
    }
    return canSubmit.every((item) => item);
  }

  hanndelTips(message: string) {
    Vue.toasted.show(message);
  }

  handelSubmit() {
    if (!this.checkForm()) {
      this.hanndelTips("信息填写错误");
    } else {
      this.$store
        .dispatch({ type: "admin/login", data: this.forms })
        .then((res: { code: number; message: string }) => {
          const { code, message } = res;
          this.hanndelTips(message);
          code === 200 && this.$router.push("/admin");
        });
    }
  }
}
</script>


<style scoped lang="scss">
.home-page {
  min-height: 100%;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(26, 190, 198, 1),
    rgba(26, 199, 154, 1)
  );
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .backge {
    position: absolute;
    z-index: 1;
    width: 7.5rem;
    margin: 0 auto;
    height: 100%;
    bottom: 0;

    .bg-right {
      position: absolute;
      width: 4.1rem;
      height: 4.42rem;
      top: 0.5rem;
      right: 0;
    }

    .bg-bottom {
      position: absolute;
      width: 7.5rem;
      height: 1.5rem;
      bottom: 0;
      right: 0;
    }
  }

  .content {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    font-size: 0.28rem;

    .ti-image {
      padding: 0.74rem 0;
      text-align: center;
      img {
        width: 4.62rem;
        height: 0.54rem;
      }
    }

    .title {
      font-size: 0.46rem;
      font-weight: 700;
      color: #ffe880;
      text-align: center;
      padding-bottom: 0.44rem;
    }

    .login-img {
      text-align: center;
      padding-bottom: 0.66rem;
      img {
        width: 5.36rem;
        height: 2.86rem;
      }
    }

    .from-box {
      width: 4.66rem;
      margin: 0 auto;

      .submit {
        display: flex;
        height: 0.82rem;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 0.82rem;
        background: linear-gradient(
          rgba(253, 153, 60, 1),
          rgba(252, 174, 45, 1)
        );
      }
    }

    .bottom {
      padding-bottom: 0.8rem;
    }

    .message {
      position: absolute;
      top: 50%;
      left: calc(50% - 2rem);
      width: 4rem;
      padding: 0 0.12rem;
      height: 0.8rem;
      font-size: 0.28rem;
      color: white;
      background: rgba($color: #000000, $alpha: 0.3);
      border-radius: 0.1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>