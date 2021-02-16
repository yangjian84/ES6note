<template>
  <div class="headers">
    <div class="user">
      <img src="../assets/credit/icon-geren.png" alt="" />
      <span>{{ userInfo.name }}的工作室</span>
    </div>

    <icon-box :home="true"></icon-box>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBox from "@/components/Iconbox.vue";

@Component({ components: { IconBox } })
export default class NewComponent extends Vue {
  // 用户信息
  private get userInfo(): UserInfor {
    return this.$store.getters["front/userInfor"];
  }
}
</script>


<style scoped lang="scss">
.headers {
  height: 1.28rem;
  background: linear-gradient(
    to right,
    rgba(25, 191, 197, 1) 0%,
    rgba(26, 198, 159, 1) 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.34rem;
  position: sticky;
  top: 0;

  .user {
    font-size: 0.32rem;
    color: white;
    img {
      width: 0.24rem;
      height: 0.3rem;
      margin-right: 0.18rem;
    }
  }
}
</style>