import http  from "@/http/index"


export default{


    insert:{
        name:"新增场所",
        url:"/yunji-api/venue/insert",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)
        }
    },

    select:{
        name:"查询场所列表",
        url:"/yunji-api/venue/select",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)

        }
    },
    delete:{
        name:"删除场所",
        url:"/yunji-api/venue/delete",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)
        }
    },
    update:{
        name:"新增场所",
        url:"/yunji-api/venue/update",
        call: async function (params:any ={}) {
            return await http.put(this.url,params)

        }
    },
}
