<template>
  <div class="code-manager">
    <h1 class="title">코드관리</h1>
    
    <div class="panels-container">
      <!-- Left Panel - Code Groups -->
      <div class="panel">
        <div class="panel-header">
          <h2>코드그룹</h2>
          <button class="btn btn-primary" @click="showAddGroupModal = true">추가</button>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>그룹ID</th>
              <th>그룹명</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="group in codeGroups" 
                :key="group.id"
                :class="{ 'selected': selectedGroup?.id === group.id }"
                @click="selectGroup(group)">
              <td>{{ group.id }}</td>
              <td>{{ group.classification }}</td>
              <td>
                <button class="btn btn-danger" @click.stop="deleteCodeGroup(group.id)">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Right Panel - Code Details -->
      <div class="panel">
        <div class="panel-header">
          <h2>코드상세</h2>
          <button class="btn btn-primary" 
                  :disabled="!selectedGroup"
                  @click="showAddDetailModal = true">추가</button>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>코드</th>
              <th>품종</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, index) in codeDetails" :key="detail.code">
              <td>{{ detail.code }}</td>
              <td>{{ detail.breed }}</td>
              <td>
                <button class="btn btn-danger" @click="deleteCodeDetail(detail.code)">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Code Group Modal -->
    <div class="modal" v-if="showAddGroupModal">
      <div class="modal-content">
        <h3>코드그룹 추가</h3>
        <form @submit.prevent="createCodeGroup">
          <div class="form-group">
            <label>그룹ID:</label>
            <input v-model="newGroup.groupId" type="number" required>
          </div>
          <div class="form-group">
            <label>분류명:</label>
            <input v-model="newGroup.classification" type="text" required>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn" @click="showAddGroupModal = false">취소</button>
            <button type="submit" class="btn btn-primary">저장</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Code Detail Modal -->
    <div class="modal" v-if="showAddDetailModal">
      <div class="modal-content">
        <h3>코드상세 추가</h3>
        <form @submit.prevent="createCodeDetail">
          <input type="hidden" name="codeGroupId" :value="selectedGroup?.id">
          <div class="form-group">
            <label>코드:</label>
            <input v-model="newDetail.code" type="number" required>
          </div>
          <div class="form-group">
            <label>품종:</label>
            <input v-model="newDetail.breed" type="text" required>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn" @click="showAddDetailModal = false">취소</button>
            <button type="submit" class="btn btn-primary">저장</button>
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
      codeGroups: [],
      codeDetails: [],
      selectedGroup: null,
      showAddGroupModal: false,
      showAddDetailModal: false,
      newGroup: {
        groupId: '',
        classification: ''
      },
      newDetail: {
        code: '',
        breed: ''
      }
    }
  },
  
  async created() {
    try {
      await this.fetchCodeGroups()
      console.log('Loaded code groups:', this.codeGroups) // 데이터 확인용 로그
    } catch (error) {
      console.error('Failed to load initial data:', error)
    }
  },
  
  methods: {
    async fetchCodeGroups() {
      try {
        const response = await fetch(`${SERVER_URL}/code-group`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Received code groups:', data) // 응답 데이터 확인용 로그
        this.codeGroups = data.codeGroupList
      } catch (error) {
        console.error('Error fetching code groups:', error)
        this.codeGroups = [] // 에러 시 빈 배열로 초기화
      }
    },

    async selectGroup(group) {
      this.selectedGroup = group
      this.newDetail.codeGroupId = group.id
      try {
        const response = await fetch(`${SERVER_URL}/code-detail/${group.id}`)
        const data = await response.json()
        this.codeDetails = data.codeDetailList
      } catch (error) {
        console.error('Error fetching code details:', error)
      }
    },

    async createCodeGroup() {
      try {
        const response = await fetch(`${SERVER_URL}/code-group`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newGroup)
        })
        
        if (response.ok) {
        //   const newGroup = await response.json()
          this.codeGroups.push({id: this.newGroup.groupId, classification: this.newGroup.classification})
          this.showAddGroupModal = false
          this.newGroup = { id: '', classification: '' }
        }
      } catch (error) {
        console.error('Error creating code group:', error)
      }
    },

    async createCodeDetail() {
      try {
        const detailData = {
          ...this.newDetail,
          codeGroupId: this.selectedGroup.id
        }
        
        const response = await fetch(`${SERVER_URL}/code-detail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(detailData)
        })
        
        if (response.ok) {
          this.codeDetails.push(this.newDetail)
          this.showAddDetailModal = false
          this.newDetail = { code: '', breed: '' }
        }
      } catch (error) {
        console.error('Error creating code detail:', error)
      }
    },

    async deleteCodeGroup(groupId) {
      if (!confirm('정말 삭제하시겠습니까?')) return
      
      try {
        const response = await fetch(`http://localhost:8080/api/v1/code-group/${groupId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          this.codeGroups = this.codeGroups.filter(group => group.id !== groupId)
          if (this.selectedGroup?.id === groupId) {
            this.selectedGroup = null
            this.codeDetails = []
          }
        }
      } catch (error) {
        console.error('Error deleting code group:', error)
      }
    },

    async deleteCodeDetail(detailId) {
      if (!confirm('정말 삭제하시겠습니까?')) return
      
      try {
        const response = await fetch(`http://localhost:8080/api/v1/code-detail/${detailId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          this.codeDetails = this.codeDetails.filter(detail => detail.code !== detailId)
        }
      } catch (error) {
        console.error('Error deleting code detail:', error)
      }
    }
  }
}
</script>

<style scoped>
.code-manager {
  padding: 20px;
  max-width: 1200px;
  margin: 100px auto;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.panels-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.panel {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

tr.selected {
  background-color: #e8f0fe;
}

tr:hover {
  background-color: #f5f5f5;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #4285f4;
  color: white;
}

.btn-primary:disabled {
  background-color: #b3b3b3;
  cursor: not-allowed;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>