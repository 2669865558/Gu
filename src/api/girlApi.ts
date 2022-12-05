import http  from "@/http/index"
// 导入axios请求，再次封装。

export default{


    select:{
        name:"查找女朋友",
        url:"/yunji/girl",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)
            
        }
    },
    insert:{
        name:"查找女朋友",
        url:"/yunji/girl",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)
            
        }
    },
    update:{
        name:"查找女朋友",
        url:"/yunji/girl",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)
            
        }
    },
}
