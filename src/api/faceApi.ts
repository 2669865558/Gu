import http from "@/http/index"


export default{


    up:{
        name:"采集人脸",
        url:"/face-api/face/up",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)

        }
    },
    check:{
        name:"人脸校验",
        url:"/face-api/face/check",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)

        }
    },

}
