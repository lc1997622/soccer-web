<template>
 <div class="page">
    <nav class="red darken-4">
        <div class="nav-wrapper">
            <a class="sidenav-trigger show-on-large" @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
            <a class="brand-logo center">{{video}}</a>
        </div>
    </nav>
    <div class="grey darken-3 valign-wrapper" id="playcontainer">
        <div class="container">
            <video id="video" class="responsive-video" @click="change" width="100%" controls>
                <source :src="url" type="video/mp4">
            </video> 
        </div>    
    </div>
   
 </div>
</template>

<script>
import jQuery from 'jquery';
import {videoPlayer} from 'vue-video-player';
import axios from 'axios';
import store from '@/store';


export default {
    name:'Play',
    data(){
        return{
            videoid:this.$route.params.videoid,
            url:this.$route.params.url,
            video:this.$route.params.video,
            ifplay:Boolean,
            changetime:0.0,
            userid:this.$store.state.account,
        } 
    },
    store,
    mounted(){
        
        var video = document.getElementById("video");
        var last = 0;
        var that = this;
	    //当目前的播放位置已更改时
        video.ontimeupdate = function () {
            var current = video.currentTime;
            var timegap = video.currentTime-that.changetime;
	        if(current - last > 1) {
                video.currentTime = last;
	        } else {
	            last = current;
             }
            if(timegap>180)
            {
                video.pause();
                that.changetime = video.currentTime;
            }
        };
        var that = this;
        video.addEventListener('ended', function(){
            M.toast({html: '您已完成学习'});
            axios
            .post('/studyed',{
                userid:that.userid,
                videoid:that.videoid
            }
            )
            .then(Response => {
                    console.log(Response.data);
                })
            .catch(error => {
                console.log(error);
            });
        },false);
    },
    components:{videoPlayer},
    methods:{
        goback(){
            this.$router.go(-1);
        },
        change()
        {
            var video = document.getElementById("video");
            var that = this;
            that.changetime = video.currentTime;
            video.play();
        },
        onInputFileChange(){
            var file = document.getElementById('file').files[0];
            var url = URL.createObjectURL(file);
        }
    },

}
</script>
<style scoped lang="scss">
.pape {
  height: 100vh;
  .player-container {
    justify-content: center;
  }
}
</style>
<style scoped>
#playcontainer {
  height: 93.4vh;
  width: 100%;
}
</style>



