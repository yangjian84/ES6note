<template>
  <div v-if="line" class="line"></div>

  <div @click.stop="handelClick" v-else class="out">
    <div class="head">
      <img :src="icon" alt="" />
      <p>{{ name }}</p>
    </div>

    <div class="foot">
      <img v-if="more" src="../../../assets/admin/icon-jiantou.png" alt="" />
      <p
        v-if="
          name !== '微信二维码图片' &&
          name !== '浏览量统计' &&
          name !== '我的证书'
        "
      >
        {{ value }}
      </p>
      <img
        class="p"
        v-if="name === '微信二维码图片'"
        @click.stop="$emit('updata-wx')"
        :src="httpUrlImg + value"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: {} })
export default class NewComponent extends Vue {
  @Prop() private icon!: string;
  @Prop() private name!: string;
  @Prop() private value!: string;
  @Prop() private line!: boolean;
  @Prop() private more!: number;
  @Prop() private type!: string;

  private httpUrlImg = httpUrlImg;

  handelClick() {
    switch (this.more) {
      case 1:
        this.$router.push({
          name: "Change",
          query: { type: this.type },
        });
        break;
      case 3:
        this.$router.push("/cert");
        break;
      case 4:
        this.$router.push("/visit");
        break;

      default:
        break;
    }
  }
}
</script>


<style scoped lang="scss">
.line {
  height: 0.3rem;
  background: #eeeeee;
}
.out {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.84rem;
  font-size: 0.28rem;
  font-weight: 500;
  padding: 0 0.5rem;

  p {
    padding: 0 0.18rem;
  }

  .head {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }

  .foot {
    flex: 0 0 auto;
    width: 2.5rem;
    min-width: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    img {
      width: 0.16rem;
      height: 0.28rem;
      order: 2;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      order: 1;
    }

    .p {
      order: 1;
      width: 0.64rem;
      height: 0.64rem;
      margin-right: 0.12rem;
    }
  }
}
</style>