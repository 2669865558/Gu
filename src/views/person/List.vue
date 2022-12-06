<template>
    <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="场所">
            <el-select v-model="formData.venueId" placeholder="Select">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机">
            <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />

        <el-table-column  label="采集" width="120">
            <template #default="scope">
<!--              <el-button type="danger" size="small" @click="handleClick(scope.row)">未采集</el-button>-->
              <el-tag v-if="(scope.row.faceFlag == 0)" type="danger">未采</el-tag>
              <el-tag v-if="(scope.row.faceFlag == 1)" type="success">已采</el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="id" label="身份证号" width="180" />

        <el-table-column prop="address" label="门牌号" width="400" />

        <el-table-column fixed="right" label="操作" width="230">
            <template #default="scope">
                <el-button type="success" size="small" @click="handleClick(scope.row)">采集</el-button>
                <el-button link type="primary" size="small" @click="editClick(scope.row)">编辑</el-button>
                <el-button link type="primary" size="small" @click="deleteClick(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="pageInfo.total" :page-size="pageInfo.pageSize"
        @current-change="pageChange" />
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {personApi, venueApi} from "@/api/index"
import {useRoute, useRouter} from 'vue-router'
import {ElMessageBox} from 'element-plus'

const router = useRouter()  //带r的是负责页面跳转
const route = useRoute()   //不带r的是获取当前页面url的相关参数
const options = ref([{ id: 0, name: "所有场所" }])
const tableData = ref([])
const formData = reactive({
    name: "",
    venueId: 0,
    phone: ""
})

const pageInfo = reactive({
    total: 0,
    pageSize: 3,
    pageNum: 1
})
const pageChange = (num: any) => {

    pageInfo.pageNum = num
    onSubmit()
}

onMounted(() => {
    callVenueApi()
    onSubmit()
})

const callVenueApi = () => {

    venueApi.select.call().then((res: any) => {

        res.list.forEach(item => {
            options.value.push(item)
        });


        // formData.venueId = res.list[0].id
    })

}
const editClick = (row: any) => {
    router.push({ name: "person-edit", query: { id: row.id , venueId: row.venueId} })
}

const handleClick = (row:any)=>{
  router.push({ name: "person-face", query: { id: row.id } })
}

const onSubmit = () => {

    let params: any = {}

    if (formData.name.trim() != "") {
        params.name = formData.name
    }
    if (formData.phone.trim() != "") {
        params.phone = formData.phone
    }
    if (formData.venueId != 0) {
        params.venueId = formData.venueId
    }

    params.pageSize = pageInfo.pageSize   //一页多少条的参数

    params.pageNum = pageInfo.pageNum    //你要查询第几页

    personApi.select.call(params).then((res: any) => {

        pageInfo.total = res.total
        tableData.value = res.list;
    })
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

            personApi.delete.call({ id: row.id }).then((res: any) => {
                if (res === 1) {
                    onSubmit()
                }
            })

        })
        .catch(() => {

        })
}



</script>