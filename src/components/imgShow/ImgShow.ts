import Vue from "vue";
import Com from "./ImgShow.vue";

// 注册子类
const ImgShow = Vue.extend(Com);



export default function ImgModal(option: { imgSrc?: string; visiable: boolean; showCenter?: boolean; btnClick?: () => void }) {
  const { imgSrc, visiable, showCenter = true, btnClick } = option;

  // 实例化子类
  const imgShowCom = new ImgShow({
    propsData: {
      imgSrc,
      visiable,
      showCenter
    },
  });

  const vm = imgShowCom.$mount();

  // 子类挂载
  window.document.body.appendChild(vm.$el);

  // 监听事件销毁组件
  vm.$on("visible", () => {
    vm.$destroy();
  });



  vm.$on('handelChossImg', () => {
    btnClick && btnClick();
  })

}
