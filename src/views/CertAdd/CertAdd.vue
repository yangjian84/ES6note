<template>
  <div class="out">
    <img class="logo" src="../../assets/admin/x-bg.png" alt="" />
    <img class="bottom-img" src="../../assets/admin/image.png" alt="" />

    <div class="title">证书设置</div>
    <form ref="cer_img">
      <input
        class="ti"
        v-model="certName"
        placeholder="请输入证书名称"
        type="text"
      />
      <input
        class="sub"
        v-model="certNumb"
        placeholder="证书编号：请输入证书编号"
        type="text"
      />
    </form>

    <div @click.stop="handelKeepImg" class="btn">保存</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import html2canvas from "html2canvas";
import ImgModal from "@/components/imgShow/ImgShow";

@Component({ components: {} })
export default class AddCert extends Vue {
  $refs!: {
    cer_img: HTMLElement;
  };

  private certName = "";
  private certNumb = "";

  private clicked = false;

  private get managerInfo(): UserInfor {
    return this.$store.getters["admin/managerInfo"];
  }

  handelKeepImg() {
    if (this.clicked) {
      return;
    }

    if (!this.certName) {
      Vue.toasted.show("请输入证书名称");
      return;
    }
    if (!this.certNumb) {
      Vue.toasted.show("请输入证书编号");
      return;
    }
    this.clicked = true;
    this.$toasted.show("证书生成中...");
    const timer = setTimeout(() => {
      this.clicked = false;
      clearTimeout(timer);
    }, 5000);
    html2canvas(this.$refs.cer_img, { backgroundColor: null }).then(
      async (canvas) => {
        const res = await this.$store.dispatch({
          type: "admin/updateImage",
          base64: canvas.toDataURL("image/png"),
        });

        res.id &&
          ImgModal({
            visiable: true,
            imgSrc: canvas.toDataURL("image/png"),
            showCenter: false,
            btnClick: () => {
              this.handelChoeeImg({ id: res.id.toString(), path: res.name });
              this.$router.back();
            },
          });
      }
    );
  }

  handelChoeeImg(option: { id: string; path: string }) {
    const cert = this.managerInfo.cert.concat();
    cert.push(option);
    const { id } = option;
    this.$store.dispatch({
      type: "admin/changeCertImage",
      image_id: id,
      cert,
    });
  }
}
</script>


<style scoped lang="scss">
.out {
  z-index: 10;
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    to right,
    rgba(26, 190, 198, 1),
    rgba(26, 199, 154, 1)
  );
  font-size: 0.36rem;
  color: white;

  .logo {
    width: 4.04rem;
    height: 1.54rem;
    position: absolute;
    right: 0;
    top: 0;
  }

  .bottom-img {
    width: 100%;
    height: 1.36rem;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  .title {
    padding: 0.8rem 0 0.4rem;
    text-align: center;
    font-weight: 700;
  }

  form {
    width: 5.72rem;
    height: 8.1rem;
    background: url("../../assets/admin/certempty.png") no-repeat center;
    background-size: contain;
    margin: 0 auto;
    margin-bottom: 0.4rem;
    padding: 4rem 0 2.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    input {
      outline: none;
      border: none;
      text-align: center;
      background: transparent;
    }

    input:placeholder-shown {
      color: #000000;
      font-weight: 700;
    }

    .ti {
      font-size: 0.34rem;
    }
    .sub {
      font-size: 0.28rem;
    }
  }

  .btn {
    width: 3.76rem;
    height: 0.7rem;
    background: linear-gradient(
      rgba(253, 153, 60, 1) 0%,
      rgba(253, 175, 47, 1) 100%
    );
    box-shadow: 0px 2px 1px 0px rgba(130, 175, 131, 1);
    border-radius: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
}
</style>