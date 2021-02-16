<template>
  <div :class="['my-input', { error }]">
    <div class="before" v-if="before">
      <img :src="before" alt="" />
    </div>

    <input
      :placeholder="placeholder"
      @input="handelInput"
      v-model="inputValue"
      class="inputer"
      :type="type"
    />

    <div v-if="after" class="after" :class="{ gary: sended }">
      <span @click.stop="handelSendCode">
        {{ sended ? codeTime + "s后重试" : "获取验证码" }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class MyInputCom extends Vue {
  @Prop() private before!: string;
  @Prop() private after!: string;
  @Prop() private placeholder!: string;
  @Prop() private reg!: RegExp;
  @Prop({ default: "text" }) private type!: string;
  @Prop() private mobile!: string;
  @Prop() private username!: string;

  private codeTime = 60;
  private sended = false;
  private inputValue = "";
  private error = false;

  handelInput() {
    this.error = !this.reg.test(this.inputValue);

    this.$emit("input", this.inputValue);
  }

  // 发送验证码
  handelSendCode() {
    const REG = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;

    if (!REG.test(this.mobile)) {
      this.$toasted.show("手机格式错误");
      return;
    }
    if (this.sended) return;

    this.$store
      .dispatch({
        type: "admin/sendCode",
        data: { username: this.username, mobile: Number.parseInt(this.mobile) },
      })
      .then((res) => {
        if (res.code === 200) {
          this.$toasted.show("获取成功");
          this.sended = true;

          const timer = setInterval(() => {
            this.codeTime -= 1;
            if (this.codeTime <= 0) {
              clearInterval(timer);
              this.sended = false;
              this.codeTime = 60;
            }
          }, 1000);
        } else {
          this.$toasted.show(res?.data?.message || "未知错误");
        }
      });
  }
}
</script>


<style scoped lang="scss">
.my-input {
  height: 0.82rem;
  padding: 0.28rem 0.32rem;
  background: white;
  border-radius: 0.82rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;

  .before {
    flex: 0 0 auto;
    width: 0.3rem;
    height: 0.3rem;
    position: relative;
    img {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }

  .inputer {
    flex: 1 1 auto;
    border: none;
    outline: none;
    font-size: inherit;
    padding: 0 0.2rem;
    width: 0.4rem;

    &::placeholder {
      color: #c0c0c0;
    }
  }

  .after {
    flex: 0 0 1.64rem;
    height: 0.48rem;
    font-size: 0.2rem;
    color: white;
    background: #19c6a1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.24rem;
    border-radius: 0.48rem;
  }

  .gary {
    background: rgba($color: #aaaaaa, $alpha: 1);
  }
}
</style>