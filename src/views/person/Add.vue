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
            <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, } from 'vue'
import { venueApi,personApi } from '@/api/index'
import { ElMessage } from 'element-plus'
const options = ref([])
const formData = reactive({
    name: '',
    phone: '',
    id: '',
    address: '',
    venueId: 0

})
onMounted(()=>{
    callVenueApi()
})
const callVenueApi =()=>{

    venueApi.select.call().then((res:any)=>{
        console.log(res.list)
        options.value = res.list
        formData.venueId = res.list[0].id
    })

}
const onSubmit = () => {

    personApi.insert.call(formData).then((respone: any) => {

        if (respone === 1) {
            ElMessage({
                message: '新增成功.',
                type: 'success',
            })

        }

    })

}

</script>