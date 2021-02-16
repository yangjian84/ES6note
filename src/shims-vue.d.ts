declare module '*.vue' {
  import Vue from 'vue';
  export default Vue
}

declare module 'crypto-js' {
  export const SHA1: (targer: string) => string
}

declare module 'jweixin-module' {
  const model: SdkConfig
  export default model
}



