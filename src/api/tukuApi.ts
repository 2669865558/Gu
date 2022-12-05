import http  from "@/http/index"
// 导入axios请求，再次封装。

export default{

    upload:{
        name:"上传图片",
        url:"/imgserver-api/upload",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)
        }
    },

    select:{
        name:"上传图片",
        url:"/imgserver-api/select",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)
        }
    }


}
