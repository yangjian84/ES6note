<template>
  <div class="product-page" ref="productlist">
    <div class="content">
      <headers></headers>
      <!-- banner -->
      <div class="banner">
        <img src="../../assets/product/banner-touzilijin.png" alt="" />
      </div>
      <!-- 列表 -->

      <div class="goods-list">
        <Recommend v-for="i in productList" :goods="i" :key="i.id"></Recommend>
        <p class="sub">更多产品敬请期待</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Headers from "@/components/Headers.vue";
import Recommend from "@/components/Recommend.vue";
import ScrollBe from "@/utils/srcolls";

@Component({
  components: { Headers, Recommend },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$nextTick().then(() => {
        from.name === "Details" &&
          ((vm.$refs.productlist as HTMLDivElement).scrollTop = Number.parseInt(
            localStorage.lastScrollProduct
          ));
      });
    });
  },
})
export default class Product extends Vue {
  $refs!: {
    productlist: HTMLDivElement;
  };

  private page = 1;

  private get productList(): Array<MatalData> {
    return this.$store.state.front.productList;
  }
  private get productListEnd(): Array<MatalData> {
    return this.$store.state.front.productListEnd;
  }

  created() {
    this.$store.dispatch({ type: "front/getProductList", page: this.page });
  }

  mounted() {
    const el = this.$refs.productlist;
    const scrollBe = new ScrollBe(el);

    scrollBe.onScrollBottom(() => {
      this.page++;
      this.productListEnd &&
        this.$store.dispatch({
          type: "front/getProductList",
          page: this.page,
          push: true,
        });
    });

    scrollBe.onScroll(() => {
      localStorage.setItem("lastScrollProduct", el.scrollTop.toString());
    });
  }
}
</script>


<style scoped lang="scss">
.product-page {
  height: 100%;
  width: 100%;
  overflow: auto;

  .content {
    min-height: 100%;

    .banner {
      height: 5.7rem;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .goods-list {
      padding: 0.34rem 0.34rem 0;
      .sub {
        color: #999999;
        font-size: 0.28rem;
        text-align: center;
        padding: 0.24rem;
        border-top: #f6f6f6 1px solid;
      }
    }
  }
}
</style>