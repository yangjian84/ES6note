<template>
  <transition @after-enter="handelWeVisity_" name="fade">
    <div v-show="show" class="modal-wechat">
      <transition @after-leave="$emit('wclose')" name="downin">
        <div v-show="showWe_" class="trans-box">
          <img
            @click.stop="handelWeVisity_"
            src="../../../assets/home/icom-cha.png"
            alt=""
            class="close"
          />

          <div
            v-for="item in dataList"
            :key="item.key"
            class="item"
            :class="[{ noLine: item.key === 4 }]"
            @click.stop="handelCallPhoe(item.key)"
          >
            <img :src="item.icon" alt="" />

            <div class="info">
              <p class="title">{{ item.title }}</p>
              <p class="sub">{{ item.value }}</p>
            </div>
          </div>
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
  @Prop() private userInfo!: UserInfor;

  private showWe_ = false;

  private get dataList() {
    const data = [
      {
        title: "工号",
        key: 1,
        icon: require("../../../assets/home/icon-gonghao.png"),
        value: this.userInfo.number || "00000000",
      },
      {
        title: "专业领域",
        key: 2,
        icon: require("../../../assets/home/icon-zhuanyelingyu.png"),
        value: this.userInfo.summary,
      },
      {
        title: "个性签名",
        key: 3,
        icon: require("../../../assets/home/icon-gexingqianming.png"),
        value: this.userInfo.sign,
      },
      {
        title: "客服电话：95580",
        key: 4,
        icon: require("../../../assets/home/icon-kefudianhua.png"),
        value: "点击可直接拨打",
      },
    ];

    return data.filter((item) => item.value);
  }

  handelWeVisity_() {
    this.showWe_ = !this.showWe_;
  }

  handelCallPhoe(key: number) {
    key === 4 && (window.location.href = "tel:95580");
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
    padding: 0.3rem;
    background: white;
    border-radius: 0.1rem;

    .close {
      width: 0.54rem;
      height: 0.54rem;
      display: block;
      margin-left: auto;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: rgba(193, 193, 193, 1) 1px solid;
      padding: 0.3rem 0;

      img {
        width: 0.72rem;
        height: 0.72rem;
      }
      .info {
        flex: 1 1 auto;
        padding-left: 0.24rem;
        font-size: 0.28rem;
        .title {
          font-size: 0.34rem;
          padding-bottom: 0.2rem;
        }
      }
    }
    .noLine {
      border-bottom: rgba(193, 193, 193, 0) 1px solid;
    }
  }
}
</style>