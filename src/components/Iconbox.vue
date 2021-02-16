<template>
  <div class="out">
    <img
      @click.stop="handelCallPhone"
      src="../assets/icon-phone.png"
      class="animate__animated animate__infinite animate__pulse"
      alt=""
    />
    <img
      @click.stop="handelWeVisity"
      class="animate__animated animate__infinite animate__pulse"
      src="../assets/icon-wechat.png"
      alt=""
    />
    <img
      @click.stop="handelPushHome"
      class="animate__animated animate__infinite animate__pulse"
      v-if="home"
      src="../assets/icon-zhuye.png"
      alt=""
    />

    <Modalw
      @wclose="handelWeVisity"
      :wechatImage="userInfo.wechat_name"
      :show="showWe"
    ></Modalw>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Modalw from "@/views/Home/components/model-w.vue";

@Component({ components: { Modalw } })
export default class NewComponent extends Vue {
  @Prop() private home!: boolean;

  private showWe = false;

  private get userInfo(): UserInfor {
    return this.$store.getters["front/userInfor"];
  }

  // 拨打电话
  handelCallPhone() {
    window.location.href = `tel:${this.userInfo.mobile}`;
  }

  // 控制弹窗
  handelWeVisity() {
    this.showWe = !this.showWe;
  }

  // 返回主页
  handelPushHome() {
    const ID = this.$route.query.ID;
    this.$router.push({ name: "Home", query: { ID } });
  }
}
</script>


<style scoped lang="scss">
.out {
  display: flex;
  align-items: center;
  img {
    width: 0.58rem;
    height: 0.58rem;
    margin-left: 0.2rem;
  }
}
</style>