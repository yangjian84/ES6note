<template>
  <transition @after-leave="closed" name="fade">
    <div v-if="show" class="modal">
      <div class="content">
        <div class="img-box">
          <img
            class="showAll"
            :class="{ showCenter: showCenter }"
            :src="imgSrc"
            alt=""
          />
        </div>
        <div @click.stop="handelChossImg" class="btn">使用该图片</div>
      </div>

      <img
        @click.stop="handelHide"
        src="../../assets/home/icon-cha.png"
        class="close"
        alt=""
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class Modal extends Vue {
  @Prop() private visiable!: boolean;
  @Prop() private showCenter!: boolean;
  @Prop() private imgSrc!: string;

  private show = false;

  mounted() {
    this.show = this.visiable;
  }

  private closed(): void {
    this.$emit("visible");
  }

  handelHide() {
    this.show = false;
  }

  handelChossImg() {
    this.$emit("handelChossImg");
    this.show = false;
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  z-index: 12;
  background: rgba($color: #000000, $alpha: 0.3);
  display: grid;
  place-content: center;

  .content {
    width: 5.84rem;
    background: white;
    border-radius: 0.1rem;
    display: grid;
    place-items: center;

    padding: 0.5rem;
    .img-box {
      width: 4.7rem;
      min-height: 4.7rem;
      .showAll {
        width: 4.7rem;
        height: auto;
      }
      .showCenter {
        width: 4.7rem;
        height: 4.7rem;
        object-fit: cover;
      }
    }

    .btn {
      margin-top: 0.2rem;
      width: 3.5rem;
      height: 0.7rem;
      background: rgba(0, 122, 255, 1);
      border-radius: 0.7rem;
      color: white;
      display: grid;
      place-items: center;
      font-size: 0.28rem;
    }
  }

  .close {
    width: 0.75rem;
    height: 0.75rem;
    margin: 0.2rem auto 0;
  }
}
</style>
