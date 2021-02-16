<template>
  <transition @after-enter="handelWeVisity_" name="fade">
    <div @click.self="handelWeVisity_" v-show="show" class="modal-wechat">
      <transition @after-leave="$emit('wclose')" name="downin">
        <div v-show="showWe_" class="trans-box">
          <img src="../../../assets/home/tanchuang.png" alt="" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class NewComponent extends Vue {
  @Prop() private show!: boolean;

  private showWe_ = false;

  handelWeVisity_() {
    this.showWe_ = !this.showWe_;
  }
}
</script>


<style scoped lang="scss">
.modal-wechat {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  .trans-box {
    width: 6rem;
    height: 7rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>