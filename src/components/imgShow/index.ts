import Com from "./ImgShow.vue";
import { VueConstructor } from "vue/types/umd";

export default (Vue: VueConstructor) => {
  Vue.component(Com.name, Com);
};
