<template>
  <div class="container">
    <header class="header">
      <h1>Pet Service</h1>
      <nav>
        <a href="#">사용사명</a>
        <a href="#">소펫몰</a>
        <a href="#">펫시터</a>
      </nav>
    </header>

    <main class="main-content">
      <h2>펫시터 등록</h2>
      
      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-group">
          <label>주소:</label>
          <input 
            type="text" 
            v-model="formData.address" 
            required
            placeholder="주소를 입력하세요"
          >
        </div>

        <div class="form-group">
          <label>대상:</label>
          <div class="checkbox-group">
            <label v-for="pet in petTypes" :key="pet.id">
              <input 
                type="checkbox"
                :value="pet.id"
                v-model="formData.selectedPetTypes"
              >
              {{ pet.name }}
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>요일:</label>
          <div class="checkbox-group">
            <label v-for="day in days" :key="day.id">
              <input 
                type="checkbox"
                :value="day.id"
                v-model="formData.selectedDays"
              >
              {{ day.name }}
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>서비스:</label>
          <div class="checkbox-group">
            <label v-for="service in services" :key="service.id">
              <input 
                type="checkbox"
                :value="service.id"
                v-model="formData.selectedServices"
              >
              {{ service.name }}
            </label>
          </div>
        </div>

        <div class="form-group time-group">
          <label>시간:</label>
          <div class="time-inputs">
            <input 
              type="time" 
              v-model="formData.startTime"
              required
            >
            <span>~</span>
            <input 
              type="time" 
              v-model="formData.endTime"
              required
            >
          </div>
        </div>

        <div class="form-group">
          <label>시간당 요금:</label>
          <div class="price-input">
            <input 
              type="number" 
              v-model="formData.pricePerHour"
              required
              min="0"
            >
            <span>원</span>
          </div>
        </div>

        <div class="button-group">
          <button type="submit" class="submit-btn">등록</button>
          <button type="button" @click="handleCancel" class="cancel-btn">취소</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { SERVER_URL } from '@/common/constant';

export default {
  name: 'PetSitterRegister',
  data() {
    return {
      petTypes: [
        { id: 1000, name: '강아지' },
        { id: 2000, name: '고양이' },
        { id: 3000, name: '새' },
        { id: 4000, name: '도마뱀' },
        { id: 5000, name: '뱀' },
        { id: 6000, name: '설치류' }
      ],
      days: [
        { id: 1, name: '월요일' },
        { id: 2, name: '화요일' },
        { id: 3, name: '수요일' },
        { id: 4, name: '목요일' },
        { id: 5, name: '금요일' },
        { id: 6, name: '토요일' },
        { id: 7, name: '일요일' }
      ],
      services: [
        { id: 1, name: '산책' },
        { id: 2, name: '밥 주기' },
        { id: 3, name: '목욕' },
        { id: 4, name: '놀아주기' }
      ],
      formData: {
        address: '',
        selectedPetTypes: [],
        selectedDays: [],
        selectedServices: [],
        startTime: '',
        endTime: '',
        pricePerHour: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // const memberId = localStorage.getItem('memberId')

        const memberId = 2;
        if (!memberId) {
          alert('로그인이 필요합니다.')
          return
        }

        const requestData = {
          memberId: Number(memberId),
          address: this.formData.address,
          possiblePetTypes: this.formData.selectedPetTypes.join(', '),
          possibleDays: this.formData.selectedDays.join(', '),
          providingServices: this.formData.selectedServices.join(', '),
          startTime: this.formData.startTime,
          endTime: this.formData.endTime,
          pricePerHour: Number(this.formData.pricePerHour)
        }

        const response = await fetch(`${SERVER_URL}/pet-sitters`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        })

        if (!response.ok) {
          throw new Error('등록에 실패했습니다.')
        }

        alert('펫시터 등록이 완료되었습니다.')
        this.$router.push('/pet-sitter')
      } catch (error) {
        console.error('Failed to register:', error)
        alert(error.message)
      }
    },
    handleCancel() {
      this.$router.push('/pet-sitters')
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  background-color: #1a237e;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.header nav {
  display: flex;
  gap: 2rem;
}

.header nav a {
  color: white;
  text-decoration: none;
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.main-content h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.register-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}

.time-group .time-inputs {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-inputs input[type="time"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.price-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input input {
  width: 150px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn, .cancel-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.submit-btn {
  background-color: #2196f3;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.submit-btn:hover {
  background-color: #1976d2;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}
</style>