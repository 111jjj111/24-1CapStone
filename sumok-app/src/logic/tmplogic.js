import { onMounted, ref } from 'vue';
import axios from 'axios';  

export default {
  setup() {
    const map = ref(null);
    const markers = ref({});  

    onMounted(() => {
      map.value = new naver.maps.Map(document.getElementById('map'), {
        center: new naver.maps.LatLng(35.2271, 128.6811),
        zoom: 10
      });

      // 초기 마커 생성
      centerMap();
    });

    const centerMap = async () => {
      // 이전 마커 삭제
      clearMarkers();

      // 서버에서 마커 데이터 받아오기
      try {
        const response = await axios.get('http://113.198.229.225:5001/test/max_num');
        const markerData = response.data;
        createMarker(markerData.title, markerData.Latitude, markerData.Longitude);
      } catch (error) {
        console.error('Error fetching markers:', error);

        // 307 상태 코드가 반환된 경우, 새로운 URL로 재시도
        if (error.response && error.response.status === 307) {
          const redirectUrl = error.response.headers.location;
          if (redirectUrl) {
            console.log('Redirecting to:', redirectUrl);
            centerMapWithRedirect(redirectUrl);
          }
        }
      }
    };

    const centerMapWithRedirect = async (redirectUrl) => {
      try {
        const response = await axios.get(redirectUrl);
        const markerData = response.data;
        createMarker(markerData.title, markerData.Latitude, markerData.Longitude);
      } catch (error) {
        console.error('Error fetching markers with redirect:', error);
      }
    };

    const createMarker = (title, latitude, longitude) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(latitude, longitude),
        map: map.value,
        title: title
      });
      markers.value[title] = marker; 
      
      // 새로운 마커가 생성될 때마다 중심을 해당 마커로 이동
      map.value.setCenter(marker.getPosition());
      map.value.setZoom(13);
    };

    const clearMarkers = () => {
      // 이전에 생성된 모든 마커 삭제
      Object.values(markers.value).forEach(marker => {
        marker.setMap(null);
      });
      markers.value = {};
    };

    setInterval(() => {
      // 3초마다 서버에 요청을 보내기
      centerMap();
    }, 30000);

    return {
      centerMap
    };
  }
};
