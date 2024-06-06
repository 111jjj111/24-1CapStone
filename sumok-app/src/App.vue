
<template>
  <MapTemplate :centerMap="centerMap" />
</template>

<script>
import MapTemplate from './components/MapTemplate.vue';
import MapLogic from './logic/tmplogic.js';

export default {
  components: {
    MapTemplate
  },
  setup() {
    return {
      ...MapLogic.setup()
    };
  }
};
</script>

<style src="./style/Mapstyle.css"></style>
