<template>
  <div id="app">
    <div class="login-container">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.login-container {
  margin-top: 50px; /* 상단 여백 조절 */
}
</style>