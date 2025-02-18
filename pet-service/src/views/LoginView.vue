<script>
import { SERVER_URL } from '@/common/constant';

export default {
data() {
    return {
    email: '',
    password: ''
    };
},
methods: {
    async handleLogin() {
      const requestData = {
        email: this.email,
        password: this.password
      };
      
      try {
        const response = await fetch(SERVER_URL + '/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
          throw new Error('Login failed with status: ' + response.status);
        }
        
        // TODO: 토큰 처리
        const data = await response.json();
        console.log(data)
        localStorage.setItem('userId', data);
        this.$router.push('');
      } catch (error) {
        console.log(error)
        alert('Invalid email or password. Please try again.');
      }
    }
}
};
</script>

<template>
    <div class="login-container">
      <div class="login-box">
        <h2>로그인</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required placeholder="Enter your password" />
          </div>
          <button type="submit" class="login-btn">Login</button>
        </form>
        <a href="/signup">회원가입</a>
      </div>
    </div>
</template>

<style scoped>
/* 전체 화면을 꽉 채우는 로그인 컨테이너 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

/* 로그인 박스 스타일 */
.login-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* 제목 스타일 */
h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 24px;
}

/* 입력 그룹 스타일 */
.input-group {
  margin-bottom: 30px;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 30px;
  text-align: left;
}

.input-group input {
  width: 20rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.input-group input:focus {
  outline: none;
  border-color: #1e3a8a; /* Focus 시 파란색 */
}

/* 로그인 버튼 스타일 */
.login-btn {
  width: 21.5rem;
  padding: 10px;
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 50px;
}

.login-btn:hover {
  background-color: #1d335a; /* Hover 시 색상 변경 */
}
</style>
