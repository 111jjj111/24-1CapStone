// 기능을 수행하는 JavaScript 코드
import { onMounted, ref } from 'vue';
// import axios from 'axios';

export default {
  setup() {
    const map = ref(null);
    const markers = {};

    const locations = {
      changwon: new naver.maps.LatLng(35.2271, 128.6811),
      ulsan: new naver.maps.LatLng(35.5384, 129.3114),
      masan: new naver.maps.LatLng(35.1991, 128.5698)
    };

    onMounted(() => {
      map.value = new naver.maps.Map(document.getElementById('map'), {
        center: new naver.maps.LatLng(35.2271, 128.6811),
        zoom: 10
      });
    });

    const centerMap = (location) => {
      map.value.setCenter(locations[location]);
      map.value.setZoom(13);
      
      if (location === 'ulsan') {
        createMarker('학성공원', 35.55685, 129.3383);
        createMarker('태화로터리', 35.54657, 129.3073);
        createMarker('공업탑로터리', 35.53270, 129.3056);
        createMarker('신복로터리', 35.55081, 129.2631);
      }
      // if (location === 'changwon') {
      //   createMarker('학성공원', 35.55685, 129.3383);
      //   createMarker('태화로터리', 35.54657, 129.3073);
      //   createMarker('공업탑로터리', 35.53270, 129.3056);
      //   createMarker('신복로터리', 35.55081, 129.2631);
      // }
      // if (location === 'masan') {
      //   createMarker('학성공원', 35.55685, 129.3383);
      //   createMarker('태화로터리', 35.54657, 129.3073);
      //   createMarker('공업탑로터리', 35.53270, 129.3056);
      //   createMarker('신복로터리', 35.55081, 129.2631);
      // }
    };

    const createMarker = (title, lat, lng) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map.value,
        title: title
      });
      markers[title] = marker; // 마커를 객체에 저장
    };

    return {
      centerMap
    };
  }
};