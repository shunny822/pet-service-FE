<script>
import { SERVER_URL } from '@/common/constant';

export default {
data() {
    return {
    email: '',
    password1: '',
    password2: '',
    name: '',
    phoneNumber: ''
    };
},
methods: {
    async handleSignup() {
      const requestData = {
        email: this.email,
        password1: this.password1,
        password2: this.password2,
        name: this.name,
        phoneNumber: this.phoneNumber
      };
      
      try {
        const response = await fetch(SERVER_URL + '/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
          throw new Error('Signup failed with status: ' + response.status);
        }
        this.$router.push('/login');
      } catch (error) {
        alert('Check your input values. Please try again.');
      }
    }
}
};
</script>

<template>
    <div class="signup-container">
      <div class="signup-box">
        <h2>회원가입</h2>
        <form @submit.prevent="handleSignup">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
          </div>
          <div class="input-group">
            <label for="password1">Password</label>
            <input type="password" id="password1" v-model="password1" required placeholder="Enter your password" />
          </div>
          <div class="input-group">
            <label for="password2">Password Check</label>
            <input type="password" id="password2" v-model="password2" required placeholder="Check your password" />
          </div>
          <div class="input-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required placeholder="Enter your name" />
          </div>
          <div class="input-group">
            <label for="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" v-model="phoneNumber" required placeholder="Enter your phoneNumber" />
          </div>
          <button type="submit" class="signup-btn">signup</button>
        </form>
      </div>
    </div>
</template>

<style scoped>
/* 전체 화면을 꽉 채우는 로그인 컨테이너 */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

/* 로그인 박스 스타일 */
.signup-box {
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
.signup-btn {
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

.signup-btn:hover {
  background-color: #1d335a; /* Hover 시 색상 변경 */
}
</style>
