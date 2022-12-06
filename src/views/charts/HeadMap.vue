<template>

  <div>
    <baidu-map :center="center" :scroll-wheel-zoom="true" :zoom="14" class="map">
      <bml-heatmap :data="data" :max="max" :radius="20">
      </bml-heatmap>
    </baidu-map>

  </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {trackApi} from "@/api/index"

const max = ref(0)

const data = ref([]);
const center = reactive({
  lng: 113.8044655468814,
  lat: 34.79234184396662
})

onMounted(()=>{

  callTrackApi()
})

const  callTrackApi = ()=>{
  trackApi.heatmap.call().then((res:any)=>{

    res.sort((a,b)=> b.count -a.count)

    let highest = res[0];

    center.lat = highest.lat
    center.lng = highest.lng

    max.value = highest.count

    data.value = res
  })
}


</script>

<style scoped>
.map{
  width: 100%;
  height: 400px;
}


</style>