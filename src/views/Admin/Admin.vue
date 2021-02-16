<template>
  <div class="home-page">
    <div class="backge">
      <img src="../../assets/login/icon-bg.png" alt="" class="bg-right" />
    </div>

    <div class="content">
      <div class="logo">
        <img src="../../assets/admin/logo.png" alt="" />
      </div>

      <div class="user-img">
        <div class="user-header">
          <img
            v-if="managerInfo.path"
            :src="httpUrlImg + managerInfo.path"
            alt=""
          />
          <img v-else src="../../assets/admin/touxiang.png" alt="" />
        </div>

        <div class="btn-box">
          <div @click.stop="handlePushFront" class="btn">
            <span>{{ managerInfo.name }} 的工作室</span>
          </div>
          <p class="tips">点击上方按钮进入工作室</p>
        </div>
      </div>

      <div class="router-box">
        <img
          @click.stop="$router.push('/userinfo')"
          src="../../assets/admin/banner.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { httpUrlImg } from "@/utils/httpRequest";
// import { SHA1 } from "crypto-js";

@Component({ components: {} })
export default class AdminPage extends Vue {
  private httpUrlImg = httpUrlImg;

  private get managerInfo(): UserInfor {
    return this.$store.getters["admin/managerInfo"];
  }

  // 跳转
  handlePushFront() {
    const ID = this.managerInfo.manager_id;
    //   .toString()
    //   .toLocaleUpperCase();

    this.$store.dispatch({
      type: "front/getMainData",
      id: ID,
    }); // 加载数据
    this.$router.push({
      name: "Home",
      query: { ID } as {},
    });
  }
}
</script>


<style scoped lang="scss">
.home-page {
  height: 100%;
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
    width: 100%;
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
  }

  .content {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    font-size: 0.34rem;
    color: white;

    .logo {
      padding: 0.8rem 0;
      img {
        display: block;
        width: 3.18rem;
        height: 0.54rem;
        margin: 0 auto;
      }
    }

    .user-img {
      width: 4.94rem;
      height: 4.94rem;
      margin: 0 auto;
      background: url("../../assets/admin/icon-shezhitouxiang.png") no-repeat
        center center;
      background-size: contain;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .user-header {
        width: 2.4rem;
        height: 2.4rem;
        position: relative;
        z-index: -1;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .btn-box {
        position: absolute;
        text-align: center;
        bottom: 0;

        .btn {
          width: 3.4rem;
          height: 0.6rem;
          background: linear-gradient(
            to right,
            rgba(252, 154, 60, 1) 0%,
            rgba(252, 175, 47, 1) 100%
          );
          border-radius: 0.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.18rem;
        }

        .tips {
          font-size: 0.24rem;
        }
      }
    }

    .router-box {
      padding: 0.5rem 0;

      img {
        width: 6.1rem;
        height: 1.98rem;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>