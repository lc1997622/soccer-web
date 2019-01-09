<template>
    <div class="">
        <transition-group
            id="list"
            tag="div"
            appear
            name = "video-list"
            mode="out-in"
            class="row">
            <Video-Author
              v-for="(c,index) in authorList"
              :author="c"
              :key="c.authorid"
              class="col s8 m10 l10 offset-l1"
              @hover="selected = index"
              @video="$emit('video', $event)"
              @auther="$emit('author',$event)"
              />          
        </transition-group>
    </div>
</template>

<script>
import VideoAuthor from './VideoAuthor.vue'


export default {
  name: "video-list",
  components:{
      VideoAuthor,
  },
  props: {
    category: String
  },
  data() {
    return {
      authorList: [],
      selected:0,
    };
  },
  created(){
      axios
      .post("http://39.96.177.173/getauthorlist",{
        userid:1
      })
      .then(Response => {
        this.authorlist= Response.data;
        console.log(this.videolist)
      })
      .catch(error => {
        console.log(error);
      });
      this.category = this.$route.params.category;
  },
  watch:{
    category:function()
    {
      console.log(this.$route.params.category);
      if(this.$route.params.category == '我收藏的作者'||this.$route.params.category == '热门作者'){
        this.authorList = [
          {
            authorid:1,
            name:"张三",
          },
          {
            authorid:2,
            name:"李四",
          },
          {
            authorid:3,
            name:"王麻子",
          },
        ];
      }
  }
  },
  mounted()
  {
    console.log('mounted');
      if(this.$route.params.category == '我收藏的作者'||this.$route.params.category == '热门作者'){
      this.authorList = [
          {
            authorid:1,
            name:"张三",
            videoList:[ ]
          },
          {
            authorid:2,
            name:"李四",
            videoList:[]
          },
          {
            authorid:3,
            name:"王麻子",
            videoList:[]
          },
      ];}
  },
  computed:{    
  },
}
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
.container{
        width: 100%; 
        max-width: 1200px;      
    }
</style>