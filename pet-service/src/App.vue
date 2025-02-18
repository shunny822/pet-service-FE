<script>
import NavigationBar from "./components/NavigationBar.vue";
import LoginView from "./views/LoginView.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
    LoginView
  },
  data() {
    return {
      loggedIn: false, // 로그인 상태를 관리
    };
  },
  created() {
    // localStorage에서 userId를 확인
    const userId = localStorage.getItem("userId");
    this.loggedIn = userId != null; // userId가 있으면 true, 없으면 false
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("userId"); // localStorage에서 userId 제거
      this.loggedIn = false; // 로그아웃 처리
    },
  },
};
</script>

<template>
  <div id="app">
    <div v-if="loggedIn">
      <NavigationBar @logout="handleLogout" />
      <router-view />
    </div>
    <LoginView v-else />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
