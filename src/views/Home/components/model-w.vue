<template>
  <transition @after-enter="handelWeVisity_" name="fade">
    <div v-show="show" class="modal-wechat">
      <transition @after-leave="$emit('wclose')" name="downin">
        <div v-show="showWe_" class="trans-box">
          <div class="img-box">
            <img :src="httpUrlImg + wechatImage" alt="" />
          </div>
          <p class="tips">长按识别二维码添加工作人员</p>
          <img
            @click.stop="handelWeVisity_"
            src="../../../assets/home/icon-cha.png"
            alt=""
            class="close"
          />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: {} })
export default class NewComponent extends Vue {
  @Prop() private show!: boolean;
  @Prop() private wechatImage!: string;

  private httpUrlImg = httpUrlImg;

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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111;
  background: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  .trans-box {
    width: 5.06rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .img-box {
      width: 5.06rem;
      height: 5.06rem;
      background: white;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .tips {
      font-size: 0.36rem;
      font-weight: 700;
      padding: 0.2rem 0 0.3rem;
      color: white;
    }

    .close {
      width: 0.74rem;
      height: 0.74rem;
    }
  }
}
</style>