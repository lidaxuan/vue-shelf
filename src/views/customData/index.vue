<template>
  <div>
    <div>
      <div>摄像头实时画面</div>
      <div class="hm">
        <video ref="video" v-if="photo" autoplay></video>
        <img :src="photoUrl" v-else>
      </div>
    </div>
    <div class="maT10">
      <el-button @click="takePhoto">
        拍照
      </el-button>
      <el-button @click="retake">
        重拍
      </el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      photo: true,
      photoUrl: '',
    }
  },
  mounted() {
    // this.retake()
    console.log(navigator)
  },
  methods: {
    retake() {
      navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
          this.$refs.video.srcObject = stream
        })
        .catch((error) => {
          console.error(error)
        })
      this.photoUrl = ''
      this.photo = true
    },

    takePhoto() {
      const canvas = document.createElement('canvas')
      canvas.width = this.$refs.video.style.videoWidth
      canvas.height = this.$refs.video.style.videoHeight
      canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height)
      this.photoUrl = canvas.toDataURL('image/png')

      this.clearVideo()
      this.photo = false
      //将图片发送到接口
      let file = this.base64ImgtoFile(this.photoUrl)
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('fileReName', 'true')

    },
    base64ImgtoFile(dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {type: mime})
    },
    clearVideo() {
      const stream = this.$refs.video.srcObject
      const tracks = stream.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
      this.$refs.video.srcObject = null
    }
  }
}

//在离开当前页面的时候把摄像头关了，不然页面一直会显示摄像头的图标
// onBeforeUnmount(() => {
//   video.value.srcObject = null
// })
</script>

<style scoped lang="scss">
.hm {
  width: 400px;
  height: 300px;

  video,
  img {
    width: 100%;
  }
}
</style>

