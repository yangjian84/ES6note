<template>
  <div class="userinfo-page">
    <header>
      <img src="../../assets/admin/x-bg.png" class="bg-right" alt="" />
      <div @click.stop="handleChangeImg('path')" class="user-img">
        <img
          v-if="managerInfo.path"
          :src="httpUrlImg + managerInfo.path"
          alt=""
        />
        <img v-else src="../../assets/admin/icon-bianjitouxiang.png" alt="" />
        <p>点击编辑头像</p>
      </div>
    </header>

    <div class="info-box">
      <Lines
        v-for="i in dataList"
        :key="i.id"
        :name="i.name"
        :value="i.value"
        :icon="i.icon"
        :line="i.line"
        :more="i.more"
        :type="i.type"
        @updata-wx="handleChangeImg('wechat_name')"
      >
      </Lines>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Lines from "./components/Line.vue";
import ImgModal from "@/components/imgShow/ImgShow";
import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: { Lines } })
export default class UserInfo extends Vue {
  $WX!: SdkConfig;

  private httpUrlImg = httpUrlImg;

  private get managerInfo(): UserInfor {
    return this.$store.getters["admin/managerInfo"];
  }

  private get dataList() {
    const {
      name,
      mobile,
      job,
      number,
      summary,
      sign,
      // eslint-disable-next-line @typescript-eslint/camelcase
      wechat_name,
      // eslint-disable-next-line @typescript-eslint/camelcase
      institution_name,
      cert,
      visit,
    } = this.managerInfo;
    const data = [
      {
        name: "姓名",
        value: name,
        icon: require("../../assets/admin/icon-xingming.png"),
        id: 0,
      },
      {
        name: "手机号",
        value: mobile,
        icon: require("../../assets/admin/icon-shoujihao.png"),
        id: 1,
      },
      {
        name: "职位",
        value: job,
        icon: require("../../assets/admin/icon-zhiwei.png"),
        id: 2,
        more: 1,
        type: "job",
      },
      {
        name: "工号",
        value: number,
        icon: require("../../assets/admin/icon-gonghao.png"),
        id: 3,
      },
      {
        name: "专业领域",
        value: summary,
        icon: require("../../assets/admin/icon-zhuanyelingyu.png"),
        id: 4,
        more: 1,
        type: "summary",
      },
      {
        name: "个性签名",
        value: sign,
        icon: require("../../assets/admin/icon-gexingqianmng.png"),
        id: 5,
        more: 1,
        type: "sign",
      },
      {
        name: "微信二维码图片",
        // eslint-disable-next-line @typescript-eslint/camelcase
        value: wechat_name,
        icon: require("../../assets/admin/icon-weiixn.png"),
        id: 6,
        more: 2,
      },
      {
        name: "",
        value: "",
        icon: "",
        id: 10,
        line: true,
      },
      {
        name: "所属单位",
        // eslint-disable-next-line @typescript-eslint/camelcase
        value: institution_name,
        icon: require("../../assets/admin/icon-suoshudanwei.png"),
        id: 7,
      },
      {
        name: "",
        value: "",
        icon: "",
        id: 11,
        line: true,
      },
      {
        name: "我的证书",
        value: cert,
        icon: require("../../assets/admin/icon-zhengshu.png"),
        id: 8,
        more: 3,
      },
      {
        name: "浏览量统计",
        value: visit,
        icon: require("../../assets/admin/icon-liulanliang.png"),
        id: 9,
        more: 4,
      },
    ];
    return data;
  }

  handleChangeImg(type: string) {
    this.$WX.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: (res: { localIds: Array<string> }) => {
        const localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        this.$WX.getLocalImgData({
          localId, // 图片的localID
          success: async (base: { localData: string }) => {
            let { localData } = base;

            if (localData.indexOf("data:image") === -1) {
              //判断是否有这样的头部
              localData = "data:image/jpg;base64," + localData;
            }

            const res = await this.$store.dispatch({
              type: "admin/updateImage",
              base64: localData,
            });
            res.id &&
              ImgModal({
                visiable: true,
                imgSrc: localData,
                btnClick: () => {
                  switch (type) {
                    case "path":
                      this.handelChoeeImg({ id: res.id, path: res.name });
                      break;
                    case "wechat_name":
                      this.handelChoeeWxImg({
                        id: res.id,
                        wechat_name: res.name,
                      });

                      break;
                    default:
                      break;
                  }
                },
              });
          },
        });
      },
    });
  }

  handelChoeeImg(option: { id: number; path: string }) {
    const { id, path } = option;
    this.$store.dispatch({
      type: "admin/changeImage",
      image_id: id,
      path,
    });
  }

  handelChoeeWxImg(option: { id: number; wechat_name: string }) {
    const { id, wechat_name } = option;
    this.$store.dispatch({
      type: "admin/changeWxImage",
      image_id: id,
      wechat_name,
    });
  }
}
</script>


<style scoped lang="scss">
.userinfo-page {
  min-height: 100%;
  width: 100%;
  background: #eeeeee;

  header {
    height: 2rem;
    background: linear-gradient(
      to right,
      rgba(26, 190, 198, 1),
      rgba(26, 199, 154, 1)
    );
    position: relative;
    display: flex;
    justify-content: center;

    .bg-right {
      position: absolute;
      width: 4.04rem;
      height: 1.54rem;
      top: 0;
      right: 0;
    }

    .user-img {
      width: 1.48rem;
      text-align: center;
      font-size: 0.24rem;
      position: relative;
      bottom: -50%;

      img {
        display: block;
        width: 1.48rem;
        height: 1.48rem;
        margin-bottom: 0.12rem;
        border-radius: 100%;
      }
    }
  }

  .info-box {
    background: white;
    padding: 1.3rem 0 0.2rem;
  }
}
</style>