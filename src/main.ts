import {createApp} from 'vue'

import App from '@/App.vue'
//导入store
import store from './store/index'

//引入路由文件
import router from '@/router/index'

//引入Element组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//引入百度地图以及相关插件
import BaiduMap, {BmlMarkerClusterer} from 'vue-baidu-map-3x'

//引入二维码插件
import VueQrcode from '@chenfengyuan/vue-qrcode';
//引入人脸识别插件tracking
import "tracking";
import "tracking/build/data/face";
import "@/asset/trackingX.js"

//使用路由组件
const app = createApp(App)
//全局注册饿了么图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'FMYihQ2aXcKidOkniSS9hv68QcH7gskK',
});


//使用二维码插件
app.component(VueQrcode.name, VueQrcode);
app.component('bml-marker-cluster', BmlMarkerClusterer)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

