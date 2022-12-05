<template>


  <el-form :model="formData" label-width="120px">
    <el-form-item label="场所名">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="省市区">
      <el-cascader :options="options" v-model="selectedOptions" @change="handleChange">
      </el-cascader>
    </el-form-item>
    <el-form-item label="门面图">
      <TukuVue v-model:modelValue="formData.img"></TukuVue>
    </el-form-item>

    <el-form-item label="坐标">
      <el-button :icon="Search" circle @click="drawer = true">
      </el-button>
      <el-input v-model="formData.lng">
        <template #prepend>经度</template>
      </el-input>
      <el-input v-model="formData.lat">
        <template #prepend>维度</template>
      </el-input>
      <el-input v-model="formData.address">
        <template #prepend>地址</template>
      </el-input>
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="formData.brief" :rows="3" type="textarea" />
    </el-form-item>

    <el-form-item label="排序">
      <el-input-number v-model="formData.seq" :min="1" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加</el-button>

    </el-form-item>
  </el-form>

  <el-drawer v-model="drawer" title="百度地图" size="50%" >
    <baidu-map class="bm-view" center="郑州" :scroll-wheel-zoom="true">
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-marker :position="{ lng: formData.lng, lat: formData.lat }" :dragging="true"
                 :icon="{ url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: { width: 300, height: 157 } }"
                 @dragend="mapDragend"></bm-marker>
    </baidu-map>
  </el-drawer>


</template>
<script setup lang="ts">
import { onMounted, ref, reactive, } from 'vue'
import { regionData } from 'element-china-area-data'
import {Search} from '@element-plus/icons-vue'
import TukuVue from '@/components/Tuku1.vue';
import { getAddressByPoints } from 'vue-baidu-map-3x';
// import { venueApi } from '@/api/index'
import { ElMessage } from 'element-plus'
import {venueApi} from '@/api/index'

const drawer = ref(false)

const options = ref(regionData)
const selectedOptions = ref([])
const formData = reactive({
  name: '',
  img: '',
  province: '',
  city: '',
  country: '',
  lng: '113.666342',
  lat: '34.753084',
  address: '',
  brief: '',
  seq: 1

})

const mapDragend = (event: any) => {

  formData.lat =  event.point.lat
  formData.lng =  event.point.lng

  const config = { location: [event.point.lat, event.point.lng] };

  getAddressByPoints(config, ['FMYihQ2aXcKidOkniSS9hv68QcH7gskK']).then((response: any) => {
    formData.address  = response.formatted_address
  });

}
const handleChange = (PCC: any) => {
  formData.province = PCC[0]
  formData.city = PCC[1]
  formData.country = PCC[2]
}
const onSubmit = () => {
  // console.log(formData)
  venueApi.insert.call(formData).then((respone:any)=>{
    if(respone === 1){
      ElMessage({
        message: '新增成功.',
        type: 'success',
      })
    }

  })
}

onMounted(()=>{

})

</script>

<style>
.bm-view {
  width: 100%;
  height: 400px;
}
</style>