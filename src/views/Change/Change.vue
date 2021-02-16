<template>
  <div class="change-page">
    <header @click.stop="$router.back()">
      <img src="../../assets/admin/icon-back.png" alt="" />
      <p>{{ title }}</p>
    </header>

    <form>
      <div class="line">
        <input v-model.trim="inputValue" type="text" />
      </div>

      <div v-if="jobList.length" class="jobs">
        <div
          class="item"
          @click.stop="inputValue = i"
          v-for="i in jobList"
          :key="i"
        >
          {{ i }}
        </div>
      </div>

      <div class="tips">
        <p>{{ tips }}</p>
      </div>

      <div class="btn" @click.stop="handelSubmit">确定</div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class ChangePage extends Vue {
  private title = "";
  private tips = "";
  private formData = {};
  private type!: string;

  private inputValue = "";

  private jobList: Array<string> = [];

  private get managerInfo() {
    return this.$store.getters["admin/managerInfo"];
  }

  created() {
    const { type } = this.$route.query;
    this.initTitle(type as string);
    this.type = type as string;
  }

  initTitle(v: string) {
    switch (v) {
      case "job":
        this.title = "修改职位";
        this.tips = "请从以上职位中选择或输入您的职位";
        this.jobList = [
          "支行长",
          "营业主管",
          "客户经理",
          "理财经理",
          "产品经理",
        ];
        break;
      case "summary":
        this.title = "修改专业领域";
        this.tips = "请输入个人专业领域信息";
        break;
      case "sign":
        this.title = "修改个性签名";
        this.tips = "请输入个性签名，展示个人风采";
        break;

      default:
        break;
    }

    this.inputValue = this.managerInfo[v];
  }

  handelSubmit() {
    if (this.inputValue.length) {
      switch (this.type) {
        case "job":
          this.upadataJob();
          break;

        case "summary":
          this.upadatasummary();
          break;

        case "sign":
          this.upadataSign();
          break;

        default:
          break;
      }
    }
  }

  upadataJob() {
    this.$store
      .dispatch({
        type: "admin/changeJob",
        job_name: this.inputValue,
      })
      .then(() => {
        this.$router.back();
      });
  }

  upadataSign() {
    this.$store
      .dispatch({ type: "admin/changeSign", sign: this.inputValue })
      .then(() => {
        this.$router.back();
      });
  }

  upadatasummary() {
    this.$store
      .dispatch({
        type: "admin/changeSummary",
        summary_name: this.inputValue,
      })
      .then(() => {
        this.$router.back();
      });
  }
}
</script>


<style scoped lang="scss">
.change-page {
  min-height: 100%;
  width: 100%;
  background: #eeeeee;
  position: relative;
  padding: 0.24rem 0.3rem;

  header {
    width: max-content;
    font-size: 0.34rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    img {
      width: 0.16rem;
      height: 0.32rem;
    }
    p {
      padding: 0 0.2rem;
    }
  }

  form {
    font-size: 0.3rem;

    .line {
      padding: 1rem 0 0.12rem;
      border: none {
        bottom: 1px rgba(139, 18, 27, 1) solid;
      }

      input {
        width: 100%;
        height: 0.4rem;
        padding: 0.2rem;
        outline: none;
        border: none;
        background: #eeeeee;
      }
    }

    .tips {
      color: #999999;
    }

    .jobs {
      padding-bottom: 0.3rem;
      .item {
        height: 0.72rem;
        border-bottom: 1px rgba(206, 206, 206, 1) dashed;
        display: flex;
        align-items: center;
        padding: 0 0.38rem;
      }
    }

    .btn {
      width: 4.8rem;
      height: 0.84rem;
      background: rgba(150, 10, 21, 1);
      border-radius: 0.84rem;
      margin: 1rem auto;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
    }
  }
}
</style>