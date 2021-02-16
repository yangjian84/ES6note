<template>
  <div id="app">
    <router-view class="router-view" />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .router-view {
    height: 100%;
    width: 7.5rem;
  }
}
</style>
