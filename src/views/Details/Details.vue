<template>
  <div class="details-page">
    <div class="content">
      <headers></headers>

      <div class="info">
        <!--banner图  -->
        <div class="goods-image">
          <img :src="httpUrlImg + details.path" alt="" />
        </div>
        <!-- 信息 -->
        <div class="info-box">
          <div class="tips">{{ details.type }}</div>
          <!-- 价格 -->
          <p class="price">
            <span>{{ details.price }}</span> 元
          </p>
          <!-- 规格 -->

          <div class="item" v-for="item in dataList" :key="item.name">
            <img :src="item.icon" alt="" />
            <p>
              <span class="name">{{ item.name }}: </span>
              <span>{{ item.value }}</span>
            </p>
          </div>
        </div>
        <!-- 详情图 -->
        <div class="backg"></div>
        <div class="detail-image">
          <div class="title">
            <TitleBox title="商品介绍" :more="false"></TitleBox>
          </div>

          <div class="img-box" v-html="details.text"></div>
        </div>
      </div>

      <div class="line"></div>
    </div>

    <div class="buy">
      <div @click.stop="handelOpenLink" class="btn">立即购买</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Headers from "@/components/Headers.vue";

import TitleBox from "@/components/Titlebox.vue";
import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: { Headers, TitleBox } })
export default class NewComponent extends Vue {
  private matalId = "";

  private httpUrlImg = httpUrlImg;

  private get details(): DetailData {
    return this.$store.state.front.details;
  }

  private get dataList() {
    const list = [
      {
        icon: require("../../assets/product/icon-mingcheng.png"),
        value: this.details.title,
        name: "名称",
      },
      {
        icon: require("../../assets/product/icon-guige.png"),
        value: this.details.norms,
        name: "规格",
      },
      {
        icon: require("../../assets/product/icon-chupingfang.png"),
        value: this.details.supply,
        name: "出品方",
      },
    ];

    return list;
  }

  created() {
    this.getMatalId();
    this.$store.dispatch({ type: "front/getDetails", id: this.matalId });
  }

  getMatalId() {
    const { id } = this.$route.query;
    this.matalId = id as string;
  }

  handelOpenLink() {
    location.href = "https://mp.weixin.qq.com/s/Vpw4IS49QkyWaLfQ9thVCA";
  }
}
</script>


<style scoped lang="scss">
.details-page {
  height: 100%;
  width: 100%;
  overflow: auto;

  .info {
    .goods-image {
      height: 7.5rem;
      background: #e5e5e5;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-box {
      font-size: 0.26rem;
      padding: 0.34rem {
        top: 0;
      }
      .tips {
        margin-left: auto;
        width: 0.66rem;
        height: 0.44rem;
        background: linear-gradient(
          rgba(255, 79, 3, 1) 0%,
          rgba(255, 129, 28, 1) 100%
        );
        border-radius: 0 0 0.06rem 0.06rem;
        color: white;
        font-size: 0.26rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .price {
        font-size: 0.28rem;
        padding-bottom: 0.24rem;
        span {
          color: #f39850;
          font-size: 0.48rem;
        }
      }

      .item {
        padding-bottom: 0.24rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 0.26rem;
          height: 0.26rem;
        }

        p {
          flex: 1 1 auto;
          padding-left: 0.24rem;

          .name {
            color: #999999;
          }
        }
      }
    }

    .backg {
      height: 0.24rem;
      background: #e5e5e5;
    }
    .detail-image {
      padding: 0.34rem 0;
      .title {
        padding: 0 0.34rem;
      }

      .img-box {
        padding: 0.34rem;
        height: auto;
        >>> img {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  .line {
    padding-bottom: 1.4rem;
  }

  .buy {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(52, 184, 160, 1);
    box-shadow: 0 0 0.1rem 0 rgba(56, 56, 56, 0.09);
    background: white;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.84rem;
      height: 0.72rem;
      border: 1px solid rgba(52, 184, 160, 1);
      border-radius: 0.72rem;
      font-size: 0.28rem;
    }
  }
}
</style>