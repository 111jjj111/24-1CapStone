import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const map = ref(null);
    const marker = ref(null);

    onMounted(() => {
      map.value = new naver.maps.Map(document.getElementById('map'), {
        center: new naver.maps.LatLng(35.55685, 129.3383), 
        zoom: 10
      });

    
      marker.value = new naver.maps.Marker({
        position: new naver.maps.LatLng(35.55685, 129.3383),
        map: map.value,
        title: 'Current Location'
      });

      setInterval(updateLocation, 3000); 
    });

    const updateLocation = async () => {
      try {
        const response = await axios.put("http://113.198.229.225:1337/api/get-gps1s/1");
        const { lat, lng } = response.data;

        const newPosition = new naver.maps.LatLng(lat, lng);
        marker.value.setPosition(newPosition);
        
        map.value.setCenter(newPosition);
      } catch (error) {
        console.error('Error fetching current location:', error);
      }
    };

    return {};
  }
};
