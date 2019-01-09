<template>
<div>
  <div id="back" class="img2 note page" :style ="picture">  
  <div id="backimg" class="row">
  <div style="height:480px"></div>
  <div class="container col l3 m5 s8 offset-s2  offset-l4 offset-m0">
    <div class="upload">
      <div>
        <input class=" btn-floating pulse" type="file" id="fileUpload" @change="fileChange($event)">
        <label class="status deep-purple-text text-darken-4" style="font-size:15px">上传状态: <span>{{statusText}}</span></label>
      </div>
      <div style="height:20px"></div>
      <div class="upload-type">
        <button class="btn" @click="authUpload" :disabled="uploadDisabled">开始上传</button>
        <button class="btn" @click="pauseUpload" :disabled="pauseDisabled">暂停</button>
        <button class="btn" :disabled="resumeDisabled" @click="resumeUpload">恢复上传</button>
        <span >上传进度: <i id="auth-progress">{{authProgress}}</i> %</span>
      </div>
    </div>
  </div>
  </div> 
</div>
  </div>
</template>

<style scoped lang="scss">
#backimg
{
  height: 90.3vh;
}

</style>

<script>

  import axios from 'axios'
  export default {
    name: "Upload",
    data () {
      return {
        file: null,
        authProgress: 0,
        uploadDisabled: true,
        resumeDisabled: true,
        pauseDisabled: true,
        uploader: null,
        statusText: '',
         picture:{
          backgroundImage: "url(" + require("../images/uploadbackground.jpg") + ") ",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize:"1700px 945px",
          backgroundAttachment:"fixed",  
      },
      }
    },
    methods: {
      fileChange (e) {
        this.file = e.target.files[0]
        if (!this.file) {
          alert("请先选择需要上传的文件!")
          return
        }
        var Title = this.file.name
        var userData = '{"Vod":{}}'
        if (this.uploader) {
          this.uploader.stopUpload()
          this.authProgress = 0
          this.statusText = ""
        }
        this.uploader = this.createUploader()
        console.log(userData)
        this.uploader.addFile(this.file, null, null, null, userData)
        this.uploadDisabled = false
        this.pauseDisabled = true
        this.resumeDisabled = true
      },
      authUpload () {
        // 然后调用 startUpload 方法, 开始上传
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.uploadDisabled = true
          this.pauseDisabled = false
        }
      },
      // 暂停上传
      pauseUpload () {
        if (this.uploader !== null) {
          this.uploader.stopUpload()
          this.resumeDisabled = false
          this.pauseDisabled = true
        }
      },
      // 恢复上传
      resumeUpload () {
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.resumeDisabled = true
          this.pauseDisabled = false
        }
      },
      createUploader (type) {
        let self = this

        let uploader = new AliyunUpload.Vod({
          userId:'1449744008573090',
          region:"cn-shanghai",
          // 开始上传
          onUploadstarted: function (uploadInfo) {
        
            // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
            // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
            // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
            // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
            // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
            // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
            if (!uploadInfo.videoId) {
              console.log(uploadInfo.file.name)
              let createUrl = 'http://39.96.177.173/getkey'
              console.log(uploadInfo.file.name);
               axios.post(createUrl,{
                  videoName:uploadInfo.file.name,
                  title:'视频',
                  tags:'巴萨',
                  userid:'lc',
              }
            ).then(({data}) => {
                console.log(data);
                let uploadAuth = data.uploadAuth;
                let uploadAddress = data.uploadAddress;
                let videoId = data.videoId;
                console.log(uploadAuth)
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId) ;   
              })

              self.statusText = '文件开始上传...'
              console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            } else {
              let createUrl = 'http://39.96.177.173/getkey'
               axios.post(createUrl,{
                  videoName:uploadInfo.file.name,
                  title:'视频',
                  tags:'巴萨',
                  userid:'lc',
              }
            ).then(({data}) => {
                let uploadAuth = data.uploadAuth
                let uploadAddress = data.uploadAddress
                let videoId = data.videoId
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
              })
            }
          },
          // 文件上传成功
          onUploadSucceed: function (uploadInfo) {
            console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            self.statusText = '文件上传成功!'
          },
          // 文件上传失败
          onUploadFailed: function (uploadInfo, code, message) {
            console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
            self.statusText = '文件上传失败!'
          },
          // 取消文件上传
          onUploadCanceled: function (uploadInfo, code, message) {
            console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
            self.statusText = '文件已暂停上传'
          },
          // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
          onUploadProgress: function (uploadInfo, totalSize, progress) {
            console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
            let progressPercent = Math.ceil(progress * 100)
            self.authProgress = progressPercent
            self.statusText = '文件上传中...'
          },
          // 上传凭证超时
          onUploadTokenExpired: function (uploadInfo) {
            // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
            // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
            // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
            let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
            axios.get(refreshUrl).then(({data}) => {
              let uploadAuth = data.UploadAuth
              uploader.resumeUploadWithAuth(uploadAuth)
              console.log('upload expired and resume upload with uploadauth ' + uploadAuth)
            })
            self.statusText = '文件超时...'
          },
          // 全部文件上传结束
          onUploadEnd: function (uploadInfo) {
            console.log("onUploadEnd: uploaded all the files")
            self.statusText = '文件上传完毕'
          }
        })
        return uploader
      }
    }
  }

</script>