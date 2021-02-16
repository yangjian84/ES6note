<template>
  <div class="visit-page">
    <header>
      <div class="user">
        <div class="img-box">
          <img
            v-if="managerInfo.path"
            :src="httpUrlImg + managerInfo.path"
            alt=""
          />
          <img v-else src="../../assets/admin/touxiang.png" alt="" />
        </div>

        <div class="info">
          <p>{{ managerInfo.name }}的工作室</p>
          <p>
            总浏览量：<span>{{ count }}</span
            >次
          </p>
        </div>

        <img src="" class="bg" alt="" />
      </div>

      <div class="title">
        <p>浏览内容</p>
        <p>今日浏览量</p>
      </div>
      <div class="line"></div>
    </header>

    <div class="content">
      <div class="item" v-for="i in statistics" :key="i.title">
        <p>{{ i.title }}</p>
        <p class="value">{{ i.number }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: {} })
export default class VisitPage extends Vue {
  private get managerInfo(): UserInfor {
    return this.$store.getters["admin/managerInfo"];
  }
  private get statistics(): Array<{ title: string; number: number }> {
    return this.$store.state.admin.statistics;
  }

  private get count(): number {
    return this.$store.state.admin.count;
  }

  private httpUrlImg = httpUrlImg;

  created() {
    this.$store.dispatch({ type: "admin/getVisitNum" });
  }
}
</script>


<style scoped lang="scss">
.visit-page {
  min-height: 100%;

  header {
    position: sticky;
    top: 0;
    .user {
      height: 2rem;
      background-image: linear-gradient(
        to right,
        rgba(26, 190, 198, 1),
        rgba(26, 199, 154, 1)
      );
      color: white;
      position: relative;
      font-size: 0.24rem;
      padding: 0 0.66rem;
      display: flex;
      align-items: center;
      .img-box {
        flex: 0 0 auto;
        width: 1.6rem;
        height: 1.6rem;
        background: rgba($color: #ffffff, $alpha: 0.3);
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 80%;
          height: 80%;
          border-radius: 100%;
        }
      }
      .info {
        height: 1.4rem;
        flex: 1 1 auto;
        padding-left: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span {
          font-size: 0.5rem;
        }
      }
      .bg {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 2.56rem;
        height: 1.72rem;
      }
    }

    .title {
      padding: 0 0.66rem;
      height: 0.9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #199c8d;
      font-size: 0.3rem;
    }

    .line {
      margin: 0 0.34rem;
      height: 1px;
      background: rgba(162, 162, 162, 1);
    }
  }

  .content {
    .item {
      padding: 0 0.66rem;
      height: 0.9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.3rem;

      .value {
        width: 1.5rem;
        text-align: center;
      }
    }
  }
}
</style>