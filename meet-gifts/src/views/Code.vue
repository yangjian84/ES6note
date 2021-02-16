<template>
	<div class="code-page">
		<Form class="code-form-content">
			<Field class="code-form-item" input-align="center" type="number" maxlength="2" v-model="code" placeholder="确认券码" />
			<Field class="code-form-item" v-model="codeTo" type="number" maxlength="2" input-align="center" placeholder="再次确认券码" />
			<Button round block type="info" @click.native="buttonClick">参与抽奖</Button>
		</Form>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from "vue-property-decorator";
	import {
		Form,
		Field,
		Button,
		Toast
	} from "vant";
	import httpRequest from "@/utils/request";
	import {
		throttle
	} from "@/utils/throttle";
	import {
		AxiosResponse
	} from "axios";

	@Component({
		components: {
			Form,
			Field,
			Button
		},
		name: "CodePage"
	})
	export default class CodePage extends Vue {
		private code = "";
		private codeTo = "";

		private sendCode = throttle(() => {
			this.sendCode_();
		}, 1000);

		canIn(): boolean {
			return this.code === this.codeTo && !!this.code;
		}

		buttonClick() {
			if (this.canIn()) {
				this.sendCode();
			} else {
				Toast({
					message: "提交验证失败",
					duration: 1000
				});
			}
		}

		sendCode_() {
			httpRequest({
					url: "/apis/sendcodein",
					data: {
						code: this.code
					}
				})
				.then((res) => {
					Toast.success({
						message: res ? .data ? .message || "请求成功",
						duration: 5000,
					});
					this.code = "";
					this.codeTo = "";
				})
				.catch((err: AxiosResponse) => {
					Toast({
						message: err.data.message,
						duration: 5000
					});
				});
		}
	}
</script>


<style scoped lang="scss">
	.code-page {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;

		.code-form-content {
			display: block;
			width: 80%;

			.code-form-item {
				margin-bottom: 0.4rem;
				border: none;
				outline: none;
				text-align: center;

				&::after {
					border: none;
				}
			}
		}
	}
</style>
