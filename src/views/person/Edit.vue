<template>
    <el-form :model="formData" label-width="120px">
        <el-form-item label="姓名">
            <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="身份证">
            <el-input v-model="formData.id" />
        </el-form-item>
        <el-form-item label="所属场所">

            <el-select v-model="formData.venueId" placeholder="Select">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>

        </el-form-item>
        <el-form-item label="门牌号">
            <el-input v-model="formData.address" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script  setup lang="ts">

import { onMounted, ref, reactive } from 'vue'
import { venueApi,personApi } from "@/api/index"
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()  //带r的是负责页面跳转
const route = useRoute()   //不带r的是获取当前页面url的相关参数
const options = ref([])
const formData = reactive({
    name: '',
    phone: '',
    id: '',
    address: '',
    venueId: 0

})
onMounted(()=>{

    formData.id = route.query.id
    callPersonApi()
    callVenueApi()
})
const callVenueApi =()=>{

venueApi.select.call().then((res:any)=>{

    options.value = res.list
    formData.venueId = res.list[0].id
})

}
const callPersonApi = ()=>{

    personApi.select.call({id:formData.id }).then((res:any)=>{

        const  currPerson  = res.list[0];
        formData.name = currPerson.name
        formData.address = currPerson.address
        formData.phone = currPerson.phone
        formData.venueId = currPerson.venueId
    })
}
const onSubmit = () => {

personApi.update.call(formData).then((respone: any) => {

    if (respone === 1) {
        ElMessage({
            message: '修改成功.',
            type: 'success',
        })

    }

})

}
</script>