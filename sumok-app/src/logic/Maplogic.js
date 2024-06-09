import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const map = ref(null);
    const markers = ref({});

    onMounted(() => {
      map.value = new naver.maps.Map(document.getElementById('map'), {
        center: new naver.maps.LatLng(37.5665, 126.9780),
        zoom: 13
      });

      updateBusLocation(); // 초기 버스 위치 업데이트
      createOrUpdateMarker('학성공원', 35.55685, 129.3383);
      createOrUpdateMarker('태화로터리', 35.54657, 129.3073);
      createOrUpdateMarker('공업탑로터리', 35.53270, 129.3056);
      createOrUpdateMarker('신복로터리', 35.55081, 129.2631);
      createOrUpdateMarker('동의대학교', 35.14374, 129.0346);

      setInterval(updateBusLocation, 5000);
    });

    const updateBusLocation = async () => {
      try {
        const response = await axios.get('http://113.198.229.225:5001/test/max_num', {});
        const markerData = response.data;

        const title = markerData.num;
        const lat = markerData.latitude;
        const lng = markerData.longitude;

        createOrUpdateMarker(title, lat, lng);

        // 버스 위치로 맵 중심을 이동
        map.value.setCenter(new naver.maps.LatLng(lat, lng));
      } catch (error) {
        console.error('Error fetching bus location:', error);
      }
    };

    const createOrUpdateMarker = (title, lat, lng) => {
      if (markers.value[title]) {
        markers.value[title].setPosition(new naver.maps.LatLng(lat, lng));
      } else {

        let iconUrl;

        if (title === '학성공원' || title === '태화로터리' || title === '공업탑로터리' || title === '신복로터리' || title === '동의대학교') {
          iconUrl = '기본 이미지 경로';
        } else {
          iconUrl = 'https://cdn-icons-png.flaticon.com/512/6556/6556198.png'; // 버스 이미지 경로
        }
    
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: map.value,
          title: title,
          
          icon: {
            url: iconUrl, 
            size: new naver.maps.Size(40, 40), 
            scaledSize: new naver.maps.Size(30, 25), 
            origin: new naver.maps.Point(0, 0), 
            anchor: new naver.maps.Point(20, 20) 
          }
        });
        markers.value[title] = marker;
      }
    };
    



    return {
      map,
      markers
    };
  }
};
