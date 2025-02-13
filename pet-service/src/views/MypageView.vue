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
            <button @click="isEditing = true" class="edit-btn">정보 수정</button>
            <button @click="openDeleteModal" class="delete-btn">회원 탈퇴</button>
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

      <!-- 탈퇴 확인 모달 -->
        <div v-if="isModalVisible" class="modal-overlay">
            <div class="modal-content">
                <h3>정말 탈퇴하시겠습니까?</h3>
                <div class="modal-buttons">
                    <button @click="deleteAccount" class="confirm-btn">탈퇴하기</button>
                    <button @click="closeDeleteModal" class="cancel-btn">취소</button>
                </div>
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
        isModalVisible: false,
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
      openDeleteModal() {
      this.isModalVisible = true; // 모달을 띄운다
    },
    closeDeleteModal() {
      this.isModalVisible = false; // 모달을 닫는다
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
          this.$router.push('/'); // 로그인 페이지로 리디렉션
        } else {
          alert('Failed to delete account.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account.');
      }
      this.closeDeleteModal(); // 모달 닫기
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

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.modal-content h3 {
    margin-bottom: 3rem;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.confirm-btn, .cancel-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-btn {
  background-color: #f44336;
  color: white;
}
</style>
  