import http from "@/http/index"


export default{


    heatmap:{
        name:"热力图数据接口",
        url:"/yunji-api/track/heatmap/select",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)

        }
    },


}
