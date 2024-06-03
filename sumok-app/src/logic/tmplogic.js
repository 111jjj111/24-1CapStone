import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const map = ref(null);
    const marker = ref(null);

    onMounted(() => {
      map.value = new naver.maps.Map(document.getElementById('map'), {
        center: new naver.maps.LatLng(37.5665, 126.9780), 
        zoom: 10
      });

    
      marker.value = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.9780),
        map: map.value,
        title: 'Current Location'
      });

      // 위치 업데이트 주기적으로 호출
      setInterval(updateLocation, 5000); 
    });

    const updateLocation = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/current_location');
        const { lat, lng } = response.data;

        const newPosition = new naver.maps.LatLng(lat, lng);

        // 마커 위치 업데이트
        marker.value.setPosition(newPosition);
        
        // 지도 중심 업데이트
        map.value.setCenter(newPosition);
      } catch (error) {
        console.error('Error fetching current location:', error);
      }
    };

    return {};
  }
};
