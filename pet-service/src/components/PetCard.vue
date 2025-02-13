<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  
  export default {
    name: 'DogCarousel',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        dogs: [
          {
            id: 1,
            name: '콩',
            breed: '시바견',
            age: 3,
            image: '/시바견.jpeg'
          },
          {
            id: 2,
            name: 'Bella',
            breed: 'Labrador',
            age: 5,
            image: '/시바견.jpeg'
          },
          {
            id: 3,
            name: 'Charlie',
            breed: 'Beagle',
            age: 2,
            image: '/시바견.jpeg'
          }
        ]
      };
    }
  };
</script>

<template>
    <div class="carousel-container">
    <!-- TODO: swiper 고치기 -->
      <swiper
        :slides-per-view="1"
        :space-between="10"
        :loop="true"
        :pagination="true"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide v-for="dog in dogs" :key="dog.id">
          <div class="dog-card">
            <div class="dog-image">
              <img :src="dog.image" alt="Dog Photo" />
            </div>
            <div class="dog-info">
              <h3>{{ dog.name }}</h3>
              <p>{{ dog.breed }} / {{ dog.age }}살</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<style scoped>
  .carousel-container {
    width: 45rem;
    margin: 0 auto;
    margin-top: 15rem;
  }
  
  .dog-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: #FFCDDF;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 80px 0;
    width: 30rem;
    margin: 0 auto;
  }
  
  .dog-image img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
  }
  
  .dog-info h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .dog-info p {
    margin: 5px 0;
    color: #666;
  }
</style>
  