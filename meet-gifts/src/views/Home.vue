<template>
  <div class="home-page">
    <div class="top-bg">
      <img
        class="animate__animated animate__slideInDown"
        src="../assets/icons/ding.png"
        alt=""
      />
    </div>

    <div class="bottom-bg">
      <img src="../assets/icons/bgs.png" alt="" />
    </div>

    <div class="year-bg">
      <img
        ref="yearFont"
        @animationend.once="addFontAmi"
        class="animate__animated animate__backInDown"
        src="../assets/icons/T.png"
        alt=""
      />
    </div>

    <div class="machine-bg">
      <div class="machine animate__animated animate__bounceInUp">
        <div ref="codeContent" class="code-number-box">
          <div ref="codeWarper" class="code-warper">
            <div
              v-for="codeItem in codeDataList"
              :key="codeItem.cid"
              class="code-content animate__animated"
            >
              <span
                v-for="(code, index) in activeCodeArr(codeItem.codeNo)"
                :key="index"
              >
                {{ code }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="button-bg"
      @transitionend="buttonCransOver"
      :class="[{ 'button-click': giftButtonClick }]"
    >
      <div
        @click.stop="handelGetGift"
        class="button-content animate__animated animate__bounceInUp"
      >
        {{ doing ? "停止" : "开始" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "animate.css";
import httpRequest from "@/utils/request";
import { throttle } from "@/utils/throttle";
import { Dialog, Toast } from "vant";

interface CodeData {
  codeNo: string;
  cid: number;
}

@Component({
  components: {},
  name: "HomePage",
})
export default class HomePage extends Vue {
  private giftButtonClick = false;
  private buttonUnclick = true;
  private doing = false;
  private activCodeItem!: CodeData;
  private timer!: number;
  private codeDataList: Array<CodeData> = [];

  $refs!: {
    button: HTMLElement;
    yearFont: HTMLElement;
    codeContent: HTMLElement;
    codeWarper: HTMLElement;
  };

  activeCodeArr(code: string) {
    return code.split("");
  }

  created() {
    this.getCodeList();
  }

  getCodeList() {
    httpRequest({ url: "/apis/getcodelist" })
      .then((res) => {
        const {
          data: { list = [] },
        } = res;
        this.codeDataList = list;
      })
      .catch(() => {
        Toast({ message: "获取奖券列表失败", duration: 0 });
      });
  }

  addFontAmi() {
    this.$refs.yearFont.classList.remove("animate__backInDown");
    this.$refs.yearFont.classList.add(
      ...[
        "animate__pulse",
        "animate__delay",
        "animate__slow",
        "animate__infinite",
      ]
    );
  }

  handelGetGift = throttle(() => {
    this.buttonUnclick = false;
    this.handelGetGift_();
  }, 500);

  handelGetGift_() {
    if (this.doing === true) {
      this.stopListRender();
    } else {
      this.mapCodeList();
    }
  }

  buttonCransOver() {
    this.giftButtonClick = false;
  }

  mapCodeList() {
    this.doing = true;
    this.giftButtonClick = true;
    const childHeight = this.$refs.codeWarper.children[0].clientHeight;

    const handel = () => {
      const { clientHeight } = this.$refs.codeWarper;
      const { scrollTop } = this.$refs.codeContent;

      if (scrollTop >= clientHeight - childHeight) {
        this.$refs.codeContent.scrollTop = 0;
        this.activCodeItem = this.codeDataList[0];
      } else {
        this.$refs.codeContent.scrollTop = scrollTop + 20;

        const index = Math.ceil(this.$refs.codeContent.scrollTop / childHeight);

        this.$refs.codeContent.scrollTop;

        this.activCodeItem = this.codeDataList[index];
      }
      this.timer = requestAnimationFrame(handel);
    };

    this.timer = requestAnimationFrame(handel);
  }

  stopListRender() {
    cancelAnimationFrame(this.timer);

    const childHeight = this.$refs.codeWarper.children[0].clientHeight;

    const activeIndex = this.codeDataList.findIndex(
      (item) => item.cid === this.activCodeItem.cid
    );

    this.$refs.codeContent.scrollTop = activeIndex * childHeight;

    this.doing = false;
    this.giftButtonClick = true;

    Dialog.confirm({
      message: "幸运号",
      title: this.activCodeItem.codeNo,
      confirmButtonText: "移出奖池",
      cancelButtonText: "保留奖池",
      beforeClose: (action, done) => {
        action === "confirm" && this.removeCodeItem();
        done();
      },
    });
  }

  removeCodeItem() {
    this.codeDataList = this.codeDataList.filter(
      (item) => item.cid !== this.activCodeItem.cid
    );
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  width: 100%;
  position: relative;
  background: url("../assets/icons/home-bg.jpg") no-repeat center center / cover;

  .top-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    img {
      width: 100%;
      height: 3.88rem;
    }
  }
  .bottom-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    img {
      width: 100%;
      height: 9.46rem;
    }
  }
  .year-bg {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 22;
    img {
      width: 100%;
      height: 5.64rem;
    }
  }
  .machine-bg {
    position: absolute;
    bottom: 1.26rem;
    left: 0;
    z-index: 21;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .machine {
      width: 6.86rem;
      height: 6.24rem;
      background: url(../assets/icons/machine.png) no-repeat center center /
        contain;
      display: flex;
      justify-content: center;
      position: relative;

      .code-number-box {
        position: absolute;
        bottom: 2.64rem;
        font-size: 1.4rem;
        color: #ff0719;
        width: 4.06rem;
        height: 1.68rem;
        display: flex;
        align-items: flex-start;
        font-weight: border;
        overflow: hidden;

        .code-warper {
          width: 100%;
          display: flex;
          flex-direction: column;

          .code-content {
            width: 100%;
            height: 1.68rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      }
    }
  }
  .button-bg {
    position: absolute;
    bottom: 1.92rem;
    left: 0;
    z-index: 26;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    transition: transform 0.2s;
    transform-origin: bottom;

    .button-content {
      width: 3.6rem;
      height: 0.94rem;
      padding-bottom: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url(../assets/icons/button.png) no-repeat center center /
        contain;
      font-size: 0.36rem;
      color: white;
      font-weight: bold;
    }
  }

  // .button-bg-ani {
  //   animation: button-animate 1s infinite alternate ease-in-out;
  // }

  .button-click {
    transform: scaleY(0.8);
  }
}

@keyframes button-animate {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0.84);
  }
}
</style>

<style >
.van-dialog__header {
  font-size: 0.5rem;
  color: #ff0719;
}
</style>
