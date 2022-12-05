<template>
  <!--  首页-->

  <!--  <img v-if="imageDate.imgBase64" :src="imageDate.imgBase64" class="avatar"  @click="drawer = true">-->
<!--  <img v-if="props.modelValue != ''" :src="props.modelValue" class="avatar" @click="drawer = true">-->
  <img v-if="props.modelValue != ''" :src="props.modelValue" class="img" @click="drawer = true">

  <el-icon v-else class="avatar-uploader-icon" @click="drawer = true">
    <Plus/>
  </el-icon>
  <!--  <img v-if="props.modelValue != ''" :src="props.modelValue" class="img" @click="drawer = true" />-->
  <!--   <img v-if="props.modelValue != ''" :src="props.modelValue" class="img" @click="drawer = true" />-->
  <!--  <el-button type="primary" @click="drawer = true">-->
  <!--    open-->

  <!--  </el-button>-->


  <el-drawer v-model="drawer" title="图库" size="45%">

    <el-upload class="avatar-uploader" :show-file-list="false" :onChange="onChange" :auto-load="false">
      <img v-if="imageDate.imgBase64" :src="imageDate.imgBase64" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!--分割线-->
    <el-divider border-style="dotted"/>

    <el-row :gutter="20">
      <el-col v-for="(item, index) in imgList">
        <el-image style="width: 100px; height: 100px" :src="item.img" @click="post(item.img)"/>
      </el-col>
    </el-row>

  </el-drawer>

  <!--  <el-image style="width: 100px; height: 100px" :src="url"></el-image>-->


</template>

<script setup lang="ts">


import {onMounted, ref, reactive} from 'vue'
import {girlApi} from "@/api/index";
import {tukuApi} from "@/api/index"
import {read} from 'fs';
import {ElMessage} from 'element-plus'


const imageDate = reactive({
  imgBase64: '',
  imgName: ''
})

const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
const imageUrl = ref('');
const imgList = ref([])
const drawer = ref(false)
const props = defineProps({modelValue: {type: String, default: ""}})
const emit = defineEmits(['update:modelValue'])

const onChange = (uploadFile: any, uploadFiles: any) => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageDate.imgBase64 = reader.result
    imageDate.imgName = uploadFile.name
    console.log(uploadFile.name)
    console.log(imageDate)
    // console.log('111222')
    uploadImg()
    // console.log('333444')

  }
}


const callImgApi = () => {
  tukuApi.select.call().then((response: any) => {
    // console.log(response)
    imgList.value = response

  })
}


const uploadImg = () => {
  tukuApi.upload.call({name: imageDate.imgName, base64: imageDate.imgBase64}).then((response: any) => {


    // console.log(response)
    // callImgApi()

    if (response === 1) {

      ElMessage({
        message: '上传成功.',
        type: 'success',
      })
      callImgApi()

      imageDate.imgBase64 = ""

    }


  })
  // tukuApi.upload.call({name: imageDate.imgName, base64: imageDate.imgBase64}).then((response: any) => {
  //   console.log(response)
  // }
}

onMounted(() => {
  callImgApi()

  // girlApi.select.call().then(resonse => {
  //     console.log(resonse)
  // }
})

const post = (imgUrl:any) => {
  // props.modelValue = imgUrl
  emit('update:modelValue',imgUrl)
  drawer.value=false
}

</script>

<style>
.avatar-uploader .el-upload {
  border: 2px dashed red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.img {
  width: 100px;
  height: 100px;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  padding: 2px;
}
</style>