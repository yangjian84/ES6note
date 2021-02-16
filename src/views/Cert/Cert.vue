<template>
  <div class="cert-page">
    <div class="content">
      <header>
        <p>证书管理</p>
        <div @click.stop="$router.back()" class="btn">完成</div>
      </header>

      <div class="main">
        <div class="grid-box">
          <div class="img-box" v-for="i in managerInfo.cert" :key="i.id">
            <img :src="httpUrlImg + i.path" alt="" />
            <div
              @click.stop="handelSelcet(i.id.toString())"
              class="ct"
              :class="[{ selcet: selectId.includes(i.id.toString()) }]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-add">
      <div @click.stop="$router.push('/certadd')" class="item">
        <img src="../../assets/admin/icon-tianjiam.png" alt="" />
        <p>添加</p>
      </div>
      <div @click.stop="deleteCert" class="item">
        <img src="../../assets/admin/icon-delectx.png" alt="" />
        <p class="delete">删除</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { httpUrlImg } from "@/utils/httpRequest";

@Component({ components: {} })
export default class CertPage extends Vue {
  private get managerInfo(): UserInfor {
    return this.$store.getters["admin/managerInfo"];
  }
  private httpUrlImg = httpUrlImg;
  private selectId: Array<string> = [];

  handelSelcet(id: string) {
    if (this.selectId.includes(id)) {
      const index = this.selectId.findIndex((item) => item == id);
      this.selectId.splice(index, 1);
    } else {
      this.selectId.push(id);
    }
  }

  deleteCert() {
    if (this.selectId.length === 0) {
      // notification({ content: "请选择证书" });
      Vue.toasted.show("请选择证书");
      return;
    }

    this.$store
      .dispatch({
        type: "admin/deleteCertImage",
        image_id: this.selectId,
      })
      .then(() => {
        this.selectId = [];
      });
  }
}
</script>


<style scoped lang="scss">
.cert-page {
  height: 100%;
  width: 100%;
  overflow: auto;
  background: url("../../assets/admin/cert-bg.png") no-repeat center top;
  background-size: contain;
  position: relative;
  background-color: #eeeeee;

  .content {
    height: calc(100% - 1.1rem);
    padding: 0 0.34rem 0.34rem;
    display: flex;
    flex-direction: column;

    header {
      padding: 1.1rem 0 0.34rem;
      flex: 0 0 auto;

      display: flex;
      justify-content: space-between;
      align-items: center;

      color: white;
      p {
        font-size: 0.36rem;
        font-weight: bold;
      }
      .btn {
        width: 1.64rem;
        height: 0.46rem;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 0.46rem;
        font-size: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .main {
      flex: 1 1 auto;
      overflow: auto;
      background: white;
      border-radius: 0.1rem;
      padding: 0.7rem 0.24rem;

      .grid-box {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: repeat(3, calc(100% / 3));
        place-items: center;
        row-gap: 0.7rem;

        .img-box {
          width: 1.5rem;
          height: 2.5rem;
          background: #eeeeee;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }

          .ct {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: background-color 0.5s;
            background-color: rgba($color: #000000, $alpha: 0);
          }

          .selcet {
            background: url("../../assets/admin/icon-yixuan.png") no-repeat
              bottom right;
            background-size: 0.34rem 0.34rem;
            background-color: rgba($color: #000000, $alpha: 0.3);
          }
        }
      }
    }
  }

  .bottom-add {
    height: 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background: #d9d9d9;

    .item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.26rem;
      color: #999999;
      flex-direction: column;

      img {
        width: 0.44rem;
        height: 0.44rem;
        margin-bottom: 0.1rem;
      }

      .delete {
        color: #16b5af;
      }
    }
  }
}
</style>