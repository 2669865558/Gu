<template>

  <el-row :gutter="20">
    <el-col :span="12">
      <div class="wrapp">
        <div :style="{ color: msg === '检测到人脸' ? 'green' : 'red' }" class="status">
          {{ msg }}
        </div>
        <div class="videoWrapp">
          <video id="myVideo" autoplay loop muted preload="preload"></video>
          <canvas id="myCanvas" ref="myCanvas" height="200" width="200"></canvas>
        </div>

        <div class="cjbt">
          <el-button type="primary" @click="start">采集</el-button>
        </div>
      </div>

    </el-col>
    <el-col :span="12">
      <el-space wrap>
        <el-image v-if="img != ''" :src="img" class="img" />
        <el-button type="success" @click="up">上传</el-button>
      </el-space>
    </el-col>

  </el-row>


</template>

<script  lang="ts" setup>

import {onMounted, reactive, ref} from 'vue'
import {faceApi, personApi} from "@/api/index"
import {useRoute} from 'vue-router'
import {ElMessage} from 'element-plus'

const route = useRoute()
const personData = reactive({
  id: "",
  venueId: 0
})
const img = ref('')
const msg = ref("");

const collecting = ref(false)

onMounted(() => {

  personData.id = route.query.id?.toString()
  personData.venueId = Number(route.query.venueId)
  init()
})

const up = () => {
  faceApi.up.call({ id: personData.id, venueId: personData.venueId, faceImg: img.value }).then((res: any) => {

    if (res === 1) {

      personApi.updateFaceFlag.call({ id: personData.id }).then((res2: any) => {

        if (res2 === 1) {
          ElMessage({
            message: '采集成功.',
            type: 'success',
          })
        }

      })
    }

  })
}



let trackerTask: any = null;

// 标识用的画布
const myCanvas = ref();

// 实例颜色检查器
const myTracker: any = new tracking.ObjectTracker("face");
myTracker.setInitialScale(4);
myTracker.setStepSize(2);
myTracker.setEdgesDensity(0.1);

const start = () => {
  trackerTask.run()
  collecting.value = true;
}
const init = () => {
  // 触发颜色检查器
  trackerTask = tracking.track("#myVideo", myTracker, { camera: true });
  // 监听颜色检查器
  myTracker.on("track", (event: any) => {

    const context = myCanvas.value?.getContext("2d") as CanvasRenderingContext2D;

    context.clearRect(0, 0, myCanvas.value.width, myCanvas.value.height);

    if (event.data.length === 0) {
      msg.value = "没识别到人脸...";
    } else {


      msg.value = "检测到人脸";
      ////////////画框

      event.data.forEach((rect: any) => {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
      ///////////

      if (collecting.value == true) {
        trackerTask.stop();
        const myVideo = document.querySelector("#myVideo") as HTMLVideoElement;
        context.drawImage(myVideo, 0, 0, myCanvas.value.width, myCanvas.value.height);
        img.value = myCanvas.value.toDataURL("image/png") //将画布数据转成base64数据

      }

    }
  })
}


</script>

<style  scoped>
.wrapp {
  height: 300px;
  background: url('/images/bg.jpeg') no-repeat;
  background-size: 100% 100%;
  padding-top: 10px;

}

.videoWrapp {
  width: 200px;
  height: 200px;
  margin: auto;
  margin-top: 30px;
  position: relative;

}

#myCanvas {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

#myVideo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.status {

  text-align: center;
}

.cjbt {
  text-align: center;
  margin-top: 10px;
}

.rect {
  border: 2px solid #081797;
  left: -1000px;
  position: absolute;
  top: -1000px;
}

.img {
  border: 1px solid #cccccc;

  border-radius: 5px;
  width: 100px;
  height: 100px;

}
</style>
