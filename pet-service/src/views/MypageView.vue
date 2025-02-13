<template>
    <div class="mypage-container">
      <div class="mypage-content">
        <div class="profile-picture">
          <img src="/default_profile.png" alt="Profile Picture" class="profile-img" />
        </div>
        
        <!-- 사용자 정보 표시 또는 수정 상태에 따라 다르게 보여줌 -->
        <div class="user-info" v-if="!isEditing">
          <h3>{{ user.name }}</h3>
          <p>Email: {{ user.email }}</p>
          <p class="second-p">Phone: {{ user.phoneNumber }}</p>
          <div class="buttons">
            <button @click="isEditing = true" class="edit-btn">Edit Info</button>
            <button @click="deleteAccount" class="delete-btn">Delete Account</button>
          </div>
        </div>
  
        <div class="user-info" v-if="isEditing">
          <form @submit.prevent="handleSaveChanges">
            <div class="input-group">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="editedUser.name" />
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="editedUser.email" />
            </div>
            <div class="input-group">
              <label for="phoneNumber">Phone</label>
              <input type="text" id="phoneNumber" v-model="editedUser.phoneNumber" />
            </div>
            <div class="buttons">
              <button type="submit" class="save-btn">Save Changes</button>
              <button type="button" @click="isEditing = false" class="cancel-btn">Cancel</button>
            </div>
          </form>
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
        },
        editedUser: {
          name: '',
          email: '',
          phoneNumber: '',
        },
        isEditing: false, // 수정 모드 상태
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
            // 수정할 때 사용할 초기 값 설정
            this.editedUser = { ...data };
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      // TODO: 회원정보 수정 API 연동
      async handleSaveChanges() {
        try {
          const response = await fetch('', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 인증 토큰
            },
            body: JSON.stringify(this.editedUser),
          });
  
          if (response.ok) {
            const data = await response.json();
            this.user = data; // 서버에서 수정된 사용자 데이터를 받아와서 업데이트
            this.isEditing = false; // 수정 모드 종료
            alert('User info updated successfully.');
          } else {
            console.error('Failed to update user info');
            alert('Failed to update user info');
          }
        } catch (error) {
          console.error('Error updating user info:', error);
          alert('Error updating user info');
        }
      },
      async deleteAccount() {
        try {
          const response = await fetch('', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            }
          });
  
          if (response.ok) {
            alert('Your account has been deleted successfully.');
            this.$router.push('/');
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
    margin-top: 3rem;
  }
  
  .user-info {
    margin-bottom: 2rem;
  }

  .user-info h3 {
    margin-bottom: 3rem;
  }

  .second-p {
    margin-bottom: 3rem;
  }
  
  .input-group {
    margin-bottom: 1rem;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    text-align: left;
  }
  
  .input-group input {
    width: 90%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin: 0 0.7rem;
  }
  
  .edit-btn, .delete-btn, .save-btn, .cancel-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .save-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .cancel-btn {
    background-color: #ccc;
    color: white;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  </style>
  