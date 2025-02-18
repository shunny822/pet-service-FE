<template>
  <div class="container">

    <main class="main-content">
      <h2>펫시터 프로필</h2>
      
      <div class="search-section">
        <div class="search-container">
          <label for="search">검색</label>
          <input 
            type="text" 
            id="search" 
            v-model="searchKeyword"
            placeholder="지역을 입력하세요"
          >
          <button @click="searchPetSitters" class="search-button">검색</button>
        </div>
        <button @click="goToRegister" class="register-button">펫시터 등록</button>
      </div>

      <div class="pet-sitter-grid">
        <div 
          v-for="sitter in petSitters" 
          :key="sitter.id"
          class="pet-sitter-card"
          @click="goToDetail(sitter.id)"
        >
          <h3>{{ sitter.name }}님</h3>
          <ul>
            <li>주소: {{ sitter.address }}</li>
            <li>시간당 요금: {{ formatPrice(sitter.pricePerHour) }}원</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PetSitterList',
  data() {
    return {
      petSitters: [],
      searchKeyword: ''
    }
  },
  methods: {
    async fetchPetSitters() {
      try {
        const response = await fetch('http://localhost:8080/api/v1/pet-sitters')
        const data = await response.json()
        this.petSitters = data.petSitterList
      } catch (error) {
        console.error('Failed to fetch pet sitters:', error)
      }
    },
    async searchPetSitters() {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/pet-sitters?location=${this.searchKeyword}`)
        const data = await response.json()
        this.petSitters = data.petSitterList
      } catch (error) {
        console.error('Failed to search pet sitters:', error)
      }
    },
    formatPrice(price) {
      return price.toLocaleString()
    },
    goToRegister() {
      this.$router.push('/pet-sitter-register')
    },
    goToDetail(id) {
      this.$router.push(`/pet-service-request`)
      // this.$router.push(`/pet-sitter/${id}`)
    }
  },
  mounted() {
    this.fetchPetSitters()
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
  max-width: 1200px;
  margin: 100px auto;
  padding: 2rem;
}

.main-content h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.search-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-container input {
  padding: 0.5rem;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button, .register-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button {
  background-color: #1a237e;
  color: white;
}

.register-button {
  background-color: #2196f3;
  color: white;
}

.pet-sitter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.pet-sitter-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.pet-sitter-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pet-sitter-card h3 {
  margin: 0 0 1rem 0;
}

.pet-sitter-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pet-sitter-card li {
  margin-bottom: 0.5rem;
}
</style>