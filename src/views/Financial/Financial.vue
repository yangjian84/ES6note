<template>
  <div class="financial-page">
    <div class="content">
      <headers></headers>

      <div class="item-box">
        <div class="item" v-for="i in financialList" :key="i.id">
          <div @click.stop="handelOpenLink(i.link, i.id)" class="img-box">
            <img :src="httpUrlImg + i.path" alt="" />
          </div>
        </div>

        <div class="line"></div>
      </div>
    </div>

    <!-- 底部图片 -->
    <img src="../../assets/credit/image.png" class="bg-button" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Headers from "@/components/Headers.vue";
import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: { Headers } })
export default class NewComponent extends Vue {
  private httpUrlImg = httpUrlImg;

  created() {
    this.$store.dispatch({
      type: "front/getLoadData",
      data: { channel: "INVEST" },
    });
  }

  private get financialList(): Array<ChannelItem> {
    return this.$store.state.front.financialList;
  }

  // open link
  handelOpenLink(link: string, id: number) {
    this.$store.dispatch({ type: "front/openLink", id, link });
  }
}
</script>


<style scoped lang="scss">
.financial-page {
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;

  .content {
    min-height: 100%;
    .item-box {
      padding: 0.4rem 0.34rem;

      .item {
        padding-bottom: 0.24rem;
        .img-box {
          height: 2.3rem;
          background: #e5e5e5;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .line {
        padding-bottom: 1.4rem;
      }
    }
  }

  .bg-button {
    display: block;
    height: 1.36rem;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
</style>