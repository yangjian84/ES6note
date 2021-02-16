<template>
  <div class="credit-page">
    <div class="content">
      <headers></headers>

      <div class="item-box">
        <div
          @click.stop="handelOpenLink(i.link, i.id)"
          class="item"
          v-for="i in creditList"
          :key="i.title"
        >
          <div class="img-box">
            <img :src="httpUrlImg + i.path" alt="" />
          </div>

          <p class="title">{{ i.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Headers from "@/components/Headers.vue";

import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: { Headers } })
export default class NewComponent extends Vue {
  private httpUrlImg = httpUrlImg;

  // 请求数据
  created() {
    this.$store.dispatch({
      type: "front/getLoadData",
      data: { channel: "LOAN" },
    });
  }

  private get creditList(): Array<ChannelItem> {
    return this.$store.state.front.creditList;
  }

  // open link
  handelOpenLink(link: string, id: number) {
    this.$store.dispatch({ type: "front/openLink", id, link });
  }
}
</script>


<style scoped lang="scss">
.credit-page {
  height: 100%;
  width: 100%;
  overflow: auto;

  .content {
    min-height: 100%;

    .item-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .item {
        flex: 0 0 50%;
        text-align: center;
        padding: 0.7rem 0;

        .img-box {
          margin: 0 auto;
          width: 1.16rem;
          height: 1.16rem;
          margin-bottom: 0.24rem;
          background: #e5e5e5;
          border-radius: 100%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>