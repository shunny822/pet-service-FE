<template>
    <nav class="navbar">
      <div class="logo" @click="goToHome">
        Pet-Service
      </div>
  
      <div class="nav-links">
        <button class="nav-button" @click="navigateTo('codemanagement')">관리자</button>
        <button class="nav-button" @click="navigateTo('login')">로그인</button>
        <button class="nav-button" @click="navigateTo('shop')">쇼핑몰</button>
        <button class="nav-button" @click="navigateTo('pet-sitter')">펫시터</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavigationBar",
    methods: {
      goToHome() {
        this.$router.push("/");
      },
      navigateTo(page) {
        this.$router.push(`/${page}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e3a8a; /* Navy blue */
  padding: 1rem 3rem;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #3b82f6; /* Light blue */
}
  </style>
  