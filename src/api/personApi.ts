import http from "@/http/index"


export default{


    insert:{
        name:"新增人员",
        url:"/yunji-api/person/insert",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)
        }
    },
    update:{
        name:"新增人员",
        url:"/yunji-api/person/update",
        call: async function (params:any ={}) {
            return await http.put(this.url,params)

        }
    },
    updateFaceFlag:{
        name:"更新采集信息",
        url:"/yunji-api/person/update/faceflag",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)

        }
    },
    select:{
        name:"查询人员列表",
        url:"/yunji-api/person/select",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)

        }
    },
    delete:{
        name:"删除人员",
        url:"/yunji-api/person/delete",
        call: async function (params:any ={}) {
            return await http.delete(this.url,params)

        }
    },
}
