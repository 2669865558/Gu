<template>
  <el-form :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="省市区">
      <el-cascader :options="options" v-model="selectedOptions">
      </el-cascader>
    </el-form-item>
    <el-form-item label="场所名">
      <el-input v-model="formData.name" placeholder="请输入场所名关键字" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>



  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="编号" width="70" />
    <el-table-column fixed prop="name" label="场所名" width="120" />
    <el-table-column prop="img" label="门面图" width="200">
      <template #default="scope">
        <el-image style="width:50px; height:50px" :src="scope.row.img" />
      </template>
    </el-table-column>
    <el-table-column prop="address" label="具体地址" width="400" />
    <el-table-column prop="brief" label="备注" width="400" />
    <el-table-column prop="seq" label="排序" width="70" />
    <el-table-column fixed="right" label="操作" width="230">
      <template #default="scope">
        <el-button type="success" size="small" @click="handleClick" >场所码</el-button>
        <el-button link type="primary" size="small" @click="editClick(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="deleteClick(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, next" :total="pageinfo.total" :page-size="pageinfo.pageSize" @current-change="pageChange" />

  <el-drawer v-model="drawer" title="场所码" direction="ltr">
    <el-card class="card">
      <span class="title">{{ ma.title }}</span>

      <figure class="qrcode">
        <vue-qrcode :value="ma.url" tag="img"></vue-qrcode>
        <img class="qrcode__image" :src="ma.img" />
      </figure>

      <div style="padding: 14px">
        <div class="bottom">
          <time class="time">打开 [支付宝/微信/豫事办] 扫一扫</time>
        </div>
      </div>
    </el-card>
  </el-drawer>

</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { venueApi } from "@/api/index"
import { useRouter, useRoute } from 'vue-router'
import { regionData } from 'element-china-area-data'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()
const options = ref(regionData)
const tableData = ref([])
const selectedOptions = ref([])

const drawer = ref(false)
const ma = reactive({
  title:"",
  img:"",
  url:""
})


const pageinfo  =reactive({
  total:4,
  pageSize:2,
  PageNum:1
})

const formData = reactive({
  name: ""
})
onMounted(() => {
  //做你想做的事情
  onSubmit()
})
const editClick = (row:any) =>{
  // console.log(row)
  router.push({name:"venue-edit",query:{id:row.id}})
}

const deleteClick = (row: any) => {
  ElMessageBox.confirm(
      '确定要删除 [' + row.name + '] 吗?',
      '通知',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {

        venueApi.delete.call({ id: row.id }).then((res: any) => {
          if (res === 1) {
            onSubmit()
          }
        })
      })
      .catch(() => {
      })
}

const pageChange = (num:any)=>{
  // console.log(num)
  //直接修改页码
  pageinfo.PageNum = num
  onSubmit()
}
const handleClick = (row:any) => {
  // console.log('click')
  ma.title = row.name
  ma.img = row.img
  ma.url  = "http://127.0.0.1:8084?venueId="+row.id
  drawer.value = true

}
const onSubmit = () => {


  let params: any = {}

  if (formData.name != "") {
    params.name = formData.name
  }
  if (selectedOptions.value.length == 3) {
    params.country = selectedOptions.value[2]
  }

  params.pageSize = pageinfo.pageSize
  params.pageNum = pageinfo.PageNum

  venueApi.select.call(params).then((res: any) => {
    pageinfo.total = res.total
    tableData.value = res.list
  })
}





</script>


<style scoped>

</style>