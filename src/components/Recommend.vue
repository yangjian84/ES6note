<template>
  <div class="out">
    <div class="img-box">
      <img :src="httpUrlImg + goods.path" alt="" />
    </div>

    <div class="info">
      <p class="title">{{ goods.title }}</p>

      <div class="price-box">
        <p class="price">
          <span>{{ goods.price }}</span> 元
        </p>
        <div @click.stop="handelPushDetail(goods.id)" class="btn">
          <span>查看详情</span>
        </div>
      </div>

      <p class="sub">{{ goods.supply }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: {} })
export default class NewComponent extends Vue {
  @Prop() private goods!: MatalData;
  private httpUrlImg = httpUrlImg;

  // 详情跳转
  handelPushDetail(id: number) {
    const ID = this.$route.query.ID;
    this.$router.push({ path: "/details", query: { id: id.toString(), ID } });
  }
}
</script>


<style scoped lang="scss">
.out {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 0.6rem;

  .img-box {
    flex: 0 0 1.56rem;
    height: 1.56rem;
    background: #e5e5e5;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    flex: 1 1 auto;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.28rem;
    padding: 0 0.16rem;

    p {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price-box {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      .price {
        span {
          color: #f39850;
          font-size: 0.48rem;
        }
      }
      .btn {
        width: 1.5rem;
        height: 0.58rem;
        border: 1px solid rgba(52, 184, 160, 1);
        border-radius: 0.58rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.26rem;
        color: rgba(52, 184, 160, 1);
      }
    }

    .sub {
      font-size: 0.24rem;
      color: #999999;
    }
  }
}
</style>