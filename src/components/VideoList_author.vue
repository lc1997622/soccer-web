<template>
    <div class="container">
        <transition-group
            id="list"
            tag="div"
            appear
            name = "video-list"
            mode="out-in"
            class="row">
            <video-detial 
                v-for=" (c,index) in videolist"
                :video="c"
                :key="c.id"
                class="col s12 m9 l4"
                @hover="selected = index"
                @video="$emit('video', $event)"/>
        </transition-group>
    </div>
</template>

<script>
import VideoDetial from './Video.vue'
import axios from "axios";

export default {
  name: "video-list",
  components:{
      VideoDetial,
  },
  props: {
    category: String
  },
  data() {
    return {
      videolist: [],
      selected:0,
    };
  },
  created(){
       axios
      .get("http://119.57.75.134:8080/videos")
      .then(Response => {
        this.videolist= Response.data;
        console.log(this.videolist)
      })
      .catch(error => {
        console.log(error);
      });
      this.category =  category = this.$route.params.category;
  },
  watch:{
    category:function()
    {
      console.log(this.$route.params.category);
      if(this.$route.params.category == '我收藏的作者'||this.$route.params.category == '热门作者'){
      this.videolist = [
        {
          id: 1,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          },
          {
          id: 2,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          },
          {
          id: 3,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          }
          ,
          {
          id: 4,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          }
          ,
          {
          id: 5,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          }
          ,
          {
          id: 6,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          }
      ];}
      else{
        this.videolist =[];
      }
    }
  },
  mounted()
  {
    console.log('mounted');
      if(this.$route.params.category == '我收藏的作者'||this.$route.params.category == '热门作者'){
      this.videolist = [
        {
          id: 1,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          },
          {
          id: 2,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          },
          {
          id: 3,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          }
          ,
          {
          id: 4,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          }
          ,
          {
          id: 5,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          }
          ,
          {
          id: 6,
          img: "http://119.57.75.134:8080/my/videos/02021.jpg",
          jian: "资产评估",
          kind: 1,
          name: "资产评估",
          path: null,
          rpath: null,
          url: "http://119.57.75.134:8080/my/videos/0202.mp4",
          }
      ];}
  },
  computed:{    
  },
};
</script>

<style scoped>
.video-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.video-list-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.video-list-item {
  transition: all 0.4s ease;
}

.video-list-enter-active {
  transition: all 0.4s ease 0.4s;
}

.video-list-leave-active {
  transition: all 0.4s ease;
}
</style>