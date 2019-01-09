<template>

<div id="container" style="" class=""
      @click="selectauther"> 
      <div style="height:50px"></div>
      <div style="font-size:24px"><i class="small material-icons">account_circle</i> 张三</div>
         
     <video-detail 
        v-for=" (c,index) in videolist"
        :video="c"
        :key="c.id"
        class="col s12 m6 l4 offset-s1" style=" padding: 20px"
        @hover="selected = index"
        @video="$emit('video', $event)"/>    
  
</div>


</template>

<script scope>
import VideoDetail from './Video.vue'

export default {
    name:'VideoAuthor',
    props: {
    category: String,
    author:Object,
  },      
  components:{
      VideoDetail,
  },
  data() {
    return {
      videolist: [],
      selected:0,
    };
  },
     created(){
      console.log(this.authorid);
       axios
      .post("http://39.96.177.173/dologin",{
            authorid:this.authorid,
        })
      .then(Response => {
        this.videolist= Response.data;
        console.log(this.videolist)
      })
      .catch(error => {
        console.log(error);
      });
      this.category =  category = this.$route.params.category;
  },
  mounted()
  {
    console.log('mounted');
      if(this.$route.params.category == '我收藏的作者'||this.$route.params.category == '热门作者'){
      this.videolist = [
          {
            id: 1,
            img: "https://outin-f9c6c1c00ce411e9a94400163e1a65b6.oss-cn-shanghai.aliyuncs.com/sv/31b85a6-1682ddae2de/31b85a6-1682ddae2de.mp4?Expires=1546961146&OSSAccessKeyId=LTAIx2xjxmIyFov4&Signature=6EOZcHU22tUq%2Bn05LU%2BRl5Ldmdc%3D",
            jian: "资产评估",
            kind: 1,
            name: "资产评估",
            author:"张三",
            path: null,
            rpath: null,
            url: "https://outin-f9c6c1c00ce411e9a94400163e1a65b6.oss-cn-shanghai.aliyuncs.com/sv/31b85a6-1682ddae2de/31b85a6-1682ddae2de.mp4?Expires=1546961146&OSSAccessKeyId=LTAIx2xjxmIyFov4&Signature=6EOZcHU22tUq%2Bn05LU%2BRl5Ldmdc%3D",
            },
           {
            id: 2,
            img: "https://outin-f9c6c1c00ce411e9a94400163e1a65b6.oss-cn-shanghai.aliyuncs.com/sv/31b85a6-1682ddae2de/31b85a6-1682ddae2de.mp4?Expires=1546961146&OSSAccessKeyId=LTAIx2xjxmIyFov4&Signature=6EOZcHU22tUq%2Bn05LU%2BRl5Ldmdc%3D",
            jian: "资产评估",
            kind: 1,
            name: "资产评估",
            author:"张三",
            path: null,
            rpath: null,
            url: "https://outin-f9c6c1c00ce411e9a94400163e1a65b6.oss-cn-shanghai.aliyuncs.com/sv/31b85a6-1682ddae2de/31b85a6-1682ddae2de.mp4?Expires=1546961146&OSSAccessKeyId=LTAIx2xjxmIyFov4&Signature=6EOZcHU22tUq%2Bn05LU%2BRl5Ldmdc%3D",
            },
            {
                id: 3,
                img: "https://outin-f9c6c1c00ce411e9a94400163e1a65b6.oss-cn-shanghai.aliyuncs.com/sv/31b85a6-1682ddae2de/31b85a6-1682ddae2de.mp4?Expires=1546961146&OSSAccessKeyId=LTAIx2xjxmIyFov4&Signature=6EOZcHU22tUq%2Bn05LU%2BRl5Ldmdc%3D",
                jian: "资产评估",
                kind: 1,
                name: "资产评估",
                author:"张三",
                path: null,
                rpath: null,
                url: "https://outin-f9c6c1c00ce411e9a94400163e1a65b6.oss-cn-shanghai.aliyuncs.com/sv/31b85a6-1682ddae2de/31b85a6-1682ddae2de.mp4?Expires=1546961146&OSSAccessKeyId=LTAIx2xjxmIyFov4&Signature=6EOZcHU22tUq%2Bn05LU%2BRl5Ldmdc%3D",
            }
        ];

  }
  },
  methods:{
    selectauther:function()
    {
      this.$emit("author",this.author);
    }
  },
  computed:{    
  },
}
</script>

<style scoped lang="scss">
</style>