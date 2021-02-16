<template>
  <div class="out">
    <p class="title">{{ title }}</p>
    <div @click.stop="$emit('title-click')" v-if="more" class="more">
      <span>查看更多</span>
      <img src="../assets/home/icon-jiantou.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class NewComponent extends Vue {
  @Prop() private title!: string;
  @Prop({ default: true }) private more!: boolean;
}
</script>


<style scoped lang="scss">
.out {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 0.38rem;
    font-weight: 700;
    width: max-content;
    background: linear-gradient(#ffffff 70%, #f9e4b0 30%);
  }

  .more {
    color: #656766;
    font-size: 0.28rem;
    img {
      width: 0.12rem;
      height: 0.2rem;
      margin-left: 0.2rem;
    }
  }
}
</style>