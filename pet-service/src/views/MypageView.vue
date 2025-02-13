<template>
    <div class="mypage-container">
      <div class="mypage-content">
        <div class="profile-picture">
          <img src="/default_profile.png" alt="Profile Picture" class="profile-img" />
        </div>
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p>Email: {{ user.email }}</p>
          <p>Phone: {{ user.phoneNumber }}</p>
        </div>
        <div class="buttons">
          <button @click="modifyUserInfo" class="edit-btn">Edit Info</button>
          <button @click="deleteAccount" class="delete-btn">Delete Account</button>
        </div>
      </div>
    </div>
</template>
  
  <script>
import { SERVER_URL } from '@/common/constant';

  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          phoneNumber: '',
        }
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        try {
          const response = await fetch(SERVER_URL + '/members/1');
          const data = await response.json();
          
          if (response.ok) {
            this.user = data;
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      modifyUserInfo() {
        this.$router.push('/modify-user-info'); // 사용자 정보를 수정하는 페이지로 이동
      },
      async deleteAccount() {
        try {
          const response = await fetch('', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 토큰 인증
            }
          });
  
          if (response.ok) {
            alert('Your account has been deleted successfully.');
            this.$router.push('/'); // 로그인 페이지로 리디렉션
          } else {
            alert('Failed to delete account.');
          }
        } catch (error) {
          console.error('Error deleting account:', error);
          alert('Error deleting account.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .mypage-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .mypage-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  .profile-picture .profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  
  .user-info {
    margin-bottom: 2rem;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .edit-btn, .delete-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  
  .edit-btn:hover, .delete-btn:hover {
    opacity: 0.8;
  }
  </style>
  