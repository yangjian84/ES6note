<template>
  <div class="home-page" ref="homeref">
    <div class="content">
      <header>
        <!-- 标题 -->
        <div class="title">
          <img src="../../assets/home/logo.png" class="logo" alt="" />
          <p class="font">{{ userInfo.institution_name }}</p>
        </div>
        <!-- 用户信息 -->
        <div class="user-info">
          <div class="info">
            <div class="img-header">
              <img :src="httpUrlImg + userInfo.path" alt="" />
            </div>

            <div class="name-box">
              <p>
                <span>{{ userInfo.name }}</span> 的工作室
              </p>
              <div v-if="userInfo.job" class="manger">
                {{ userInfo.job }}
              </div>
            </div>

            <div class="icon-box">
              <icon-box></icon-box>
            </div>
          </div>
          <div class="card">
            <div @click.stop="handelMeVisity" class="more">
              <span>查看更多</span>
              <img src="../../assets/home/icon-jiantou.png" alt="" />
            </div>
            <div class="item">
              <span class="ti">个性签名</span>
              <p class="sign">
                {{ userInfo.sign }}
              </p>
            </div>

            <div class="item">
              <span class="ti">证书</span>
              <div class="credential">
                <div v-for="i in userInfo.cert" :key="i.id">
                  <img
                    @click.stop="previewImage"
                    :src="httpUrlImg + i.path"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <!-- 开户 -->
        <div class="account">
          <div
            @click.stop="handelOpenLink(i.link, i.id)"
            v-for="i in account"
            :key="i.id"
            class="img-box"
          >
            <img :src="httpUrlImg + i.path" alt="" />
          </div>
        </div>
        <!-- 金融产品 -->
        <div class="financial">
          <title-box
            title="金融产品"
            @title-click="handelOpenLink(hasMorePage.link, hasMorePage.id)"
          ></title-box>
          <!-- 半图 -->
          <div class="half-img">
            <div class="img-box" v-for="i in homeHarf" :key="i.id">
              <img
                @click.stop="handelOpenLink(i.link, i.id)"
                v-if="i.id !== 25"
                :src="httpUrlImg + i.path"
                alt=""
              />

              <wx-open-launch-weapp
                username="gh_3c1a725bbf1c"
                id="wx-open-launch"
                path="pages/index/index.html?bank=014"
                v-else
              >
              </wx-open-launch-weapp>
            </div>
          </div>
          <!-- 全图 -->
          <div class="line-img">
            <div
              @click.stop="handelOpenLink(i.link, i.id)"
              v-for="i in longImg"
              :key="i.id"
              class="img-box"
            >
              <img :src="httpUrlImg + i.path" alt="" />
            </div>
          </div>
        </div>

        <!-- 金品推荐 -->
        <div class="recommended">
          <title-box
            title="金品推荐"
            @title-click="handelPushDetailsList"
          ></title-box>
          <div class="goods-box">
            <recommend v-for="i in metals" :goods="i" :key="i.id"></recommend>
          </div>
        </div>
      </main>

      <footer v-if="wxSdkReady">
        <!-- 下载 -->
        <div v-if="hasDown" class="down-app">
          <div
            @click.stop="handelOpenLink(hasDown.link, hasDown.id)"
            class="btn"
          >
            <span>点我下载邮储手机银行 ></span>
          </div>
        </div>

        <!-- 首页底部跳转 -->
        <div class="eat-box footer-img">
          <div
            @click.stop="handelOpenLink(item.link, item.id)"
            v-for="item in jump"
            :key="item.id"
            class="img-box"
          >
            <img :src="httpUrlImg + item.path" alt="" />
          </div>
        </div>
        <!-- 更多服务 -->
        <div v-if="hasMore" class="more-box footer-img">
          <div @click.stop="handelUeVisity" class="img-box">
            <img :src="httpUrlImg + hasMore.path" alt="" />
          </div>
        </div>
      </footer>

      <!-- 访客 -->
      <div class="views">
        <img src="../../assets/home/icon-eye.png" alt="" />
        <span>访客</span>
        <span>{{ userInfo.visit }}</span>
      </div>
    </div>
    <Modalm
      @wclose="handelMeVisity"
      :userInfo="userInfo"
      :show="showMe"
    ></Modalm>
    <Modalu @wclose="handelUeVisity" :show="showUe"></Modalu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBox from "@/components/Iconbox.vue";
import TitleBox from "@/components/Titlebox.vue";
import Recommend from "@/components/Recommend.vue";

import Modalu from "./components/model-u.vue";
import Modalm from "./components/model-m.vue";
import ScrollBe from "@/utils/srcolls";

import { httpUrlImg } from "@/utils/httpRequest";

@Component({
  components: { IconBox, TitleBox, Recommend, Modalu, Modalm },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$nextTick().then(() => {
        (vm.$refs.homeref as HTMLDivElement).scrollTop = Number.parseInt(
          localStorage.lastScrollHome
        );
      });
    });
  },
})
export default class HomePage extends Vue {
  $refs!: {
    homeref: HTMLDivElement;
  };

  private showUe = false;
  private showMe = false;
  private httpUrlImg = httpUrlImg;
  $WX!: SdkConfig;

  // 用户信息
  private get userInfo(): UserInfor {
    return this.$store.getters["front/userInfor"];
  }
  // 商品
  private get metals(): Array<MatalData> {
    return this.$store.getters["front/metals"];
  }
  // 推荐半图
  private get homeHarf(): Array<ChannelItem> {
    return this.$store.getters["front/homeHarf"];
  }

  // 开户
  private get account(): Array<ChannelItem> {
    return this.$store.getters["front/account"];
  }

  // 长图
  private get longImg(): Array<ChannelItem> {
    return this.$store.getters["front/longImg"];
  }

  // 邮储食堂
  private get jump(): Array<ChannelItem> {
    return this.$store.getters["front/jump"];
  }
  // 更多
  private get hasMore(): ChannelItem {
    return this.$store.getters["front/hasMore"];
  }

  // 下载手机银行
  private get hasDown(): ChannelItem {
    return this.$store.getters["front/hasOther"];
  }
  // 更多跳转
  private get hasMorePage(): ChannelItem {
    return this.$store.getters["front/hasMorePage"];
  }

  private get wxSdkReady(): boolean {
    const ready = this.$store.state.front.sdkReady;
    ready && this.shareSetting();
    return ready;
  }

  mounted() {
    const el = this.$refs.homeref;
    const scrollBe = new ScrollBe(el);
    scrollBe.onScroll(() => {
      localStorage.setItem("lastScrollHome", el.scrollTop.toString());
    });

    this.$watch(
      "homeHarf",
      (val: Array<ChannelItem>) => {
        const imgUrl = val?.find((item) => item.id === 25)?.path;
        imgUrl && this.handelOpenMini(imgUrl);
      },
      { immediate: true }
    );
  }

  updated() {
    this.$nextTick().then(() => {
      this.$refs.homeref.scrollTop = Number.parseInt(
        localStorage.lastScrollHome
      );
    });
  }

  handelOpenMini(url: string) {
    const el = document.querySelector("#wx-open-launch");

    const halfImg = document
      .querySelector(".half-img")
      ?.querySelector(".img-box")
      ?.querySelector("img");
    const img = document.createElement("img");
    img.setAttribute("src", httpUrlImg + url);
    const width = halfImg?.width,
      height = halfImg?.height;

    img.setAttribute("style", `width: ${width}px; height: ${height}px;`);

    const tp = document.createElement("script");
    tp.setAttribute("type", "text/wxtag-template");

    tp.appendChild(img);

    el?.appendChild(tp);
  }

  // 跳转链接
  handelOpenLink(link: string, id: number) {
    const { ID = 0 } = this.$route.query;

    switch (id) {
      case 1:
        this.$router.push({ name: "Credit", query: { ID: ID as string } });
        break;
      case 3:
        this.$router.push({ name: "Financial", query: { ID: ID as string } });
        break;

      default:
        this.$store.dispatch({ type: "front/openLink", id, link });
        break;
    }
  }

  // 跳转
  handelPushDetailsList() {
    const { ID = 0 } = this.$route.query;
    this.$router.push({ name: "Product", query: { ID: ID as string } });
  }
  // 微信二维码弹窗
  handelUeVisity() {
    this.showUe = !this.showUe;
  }
  handelMeVisity() {
    this.showMe = !this.showMe;
  }

  // 图片预览
  previewImage() {
    const urls = this.userInfo.cert.map((item) => this.httpUrlImg + item.path);
    this.$WX.previewImage({
      current: this.httpUrlImg + this.userInfo.cert[0].path,
      urls, // 需要预览的图片http链接列表
    });
  }

  // 分享设置
  shareSetting() {
    const { title, desc, imgUrl, link } = {
      title: "中国邮政储蓄银行江西省分行·云工作室",
      desc: `${
        this.userInfo.institution_name + this.userInfo.name
      }，为您提供全方位、专业化财富管理方案，借贷还款不用愁！`,
      imgUrl: `${this.httpUrlImg + this.userInfo.path}`,
      link: `${location.href}`,
    };

    this.$WX.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        // console.log("success");
      },
    });

    this.$WX.updateTimelineShareData({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        // console.log("success");
      },
    });
  }
}
</script>


<style scoped lang="scss">
.home-page {
  height: 100%;
  overflow: auto;
  // width: 7.5rem;
  width: 100%;
  scroll-behavior: smooth;

  .content {
    min-height: 100%;
    padding: 0.44rem 0.34rem;
    position: relative;
    background: url("../../assets/home/bg.png") no-repeat top center;
    background-size: contain;

    header {
      .title {
        padding-bottom: 0.4rem;
        color: white;

        .logo {
          width: 2.12rem;
          height: 0.38rem;
          position: relative;
          margin-bottom: 0.24rem;
        }
        .font {
          font-size: 0.3rem;
          font-weight: bold;
        }
      }

      .user-info {
        padding-bottom: 0.7rem;
        .info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.28rem;

          .img-header {
            flex: 0 0 auto;
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 100%;
            overflow: hidden;
            background: white;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .name-box {
            font-weight: 700;
            color: white;
            padding: 0 0.24rem;
            flex: 1 1 auto;
            p {
              font-size: 0.3rem;
              span {
                font-size: 0.46rem;
                padding-right: 0.16rem;
              }
            }

            .manger {
              display: flex;
              justify-content: center;
              align-items: center;
              min-width: 1.48rem;
              width: min-content;
              padding: 0 0.12rem;
              height: 0.48rem;
              background: rgba(237, 213, 132, 1);
              border-radius: 0.48rem;
              font-size: 0.28rem;
              color: #545555;
              margin-top: 0.16rem;
            }
          }

          .icon-box {
            flex: 0 0 auto;
          }
        }
        .card {
          background: white;
          padding: 0.24rem 0.6rem 0.4rem;
          border-radius: 0.1rem;
          box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.1);
          font-size: 0.3rem;

          .more {
            text-align: end;
            padding-bottom: 0.24rem;
            font-size: 0.28rem;
            img {
              width: 0.12rem;
              height: 0.2rem;
              margin-left: 0.08rem;
            }
          }

          .item {
            padding-bottom: 0.24rem;
            display: flex;
            .ti {
              flex: 0 0 1.4rem;
              font-weight: 700;
            }
            .sign {
              flex: 1 1 auto;
              color: #353636;
            }

            .credential {
              flex: 1 1 auto;
              overflow: auto;
              display: flex;
              div {
                flex: 0 0 0.9rem;
                // background: #e5e5e5;
                min-height: 1.28rem;
                margin-right: 0.24rem;

                img {
                  width: 100%;
                  height: auto;
                }
              }
            }
          }
        }
      }
    }

    main {
      .account {
        padding-bottom: 0.46rem;
        .img-box {
          height: 1.66rem;
          // background: #e5e5e5;
          margin-bottom: 0.24rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .financial {
        padding-bottom: 0.7rem;
        .half-img {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding-top: 0.24rem;
          .img-box {
            width: 3.26rem;
            height: 1.94rem;
            margin-bottom: 0.24rem;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .line-img {
          .img-box {
            height: 1.96rem;
            // background: #e5e5e5;
            margin-bottom: 0.24rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .recommended {
        .goods-box {
          padding-top: 0.58rem;
        }
      }
    }

    footer {
      .down-app {
        padding-bottom: 0.3rem;
        .btn {
          margin: 0 auto;
          width: 4.6rem;
          height: 0.62rem;
          background: linear-gradient(
            to left,
            rgba(232, 175, 67, 1) 0%,
            rgba(236, 203, 76, 1) 100%
          );
          border-radius: 0.06rem;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.3rem;
        }
      }

      .footer-img {
        .img-box {
          height: 2rem;
          // background: #e5e5e5;
          margin-bottom: 0.24rem;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .views {
      min-width: 2.4rem;
      height: 0.58rem;
      background: rgba(121, 200, 190, 1);
      border-radius: 0.3rem 0 0 0.3rem;
      position: absolute;
      top: 0.48rem;
      right: 0;
      font-size: 0.28rem;
      font-weight: 500;
      color: white;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      img {
        width: 0.34rem;
        height: 0.24rem;
      }
      span {
        line-height: 1;
      }
    }
  }
}
</style>