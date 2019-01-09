<template>
    <div class="container">
        <transition-group
            id="list"
            tag="div"
            appear
            name = "video-list"
            mode="out-in"
            class="row"
            >
            <video-detail 
                v-for=" (c,index) in videolist"
                :video="c"
                :key="c.videoid"
                class="col s12 m6 l4 offset-s1" style=" padding: 20px"
                @hover="selected = index"
                @video="$emit('video', $event)"    
                />
        </transition-group>
    </div>
</template>

<script>
import VideoDetail from './Video.vue'
import axios from "axios";

export default {
  name: "video-list",
  components:{
      VideoDetail,
  },
  props: {
    category: String,
  },
  data() {
    return {
      videolist: [],
      selected:0,
    };
  },
  created(){
      this.getvideos(this.$route.params.category,this.$store.state.account);
      console.log(this.$store.state.account)
  },
  watch:{
    category:function()
    {
      this.getvideos(this.$route.params.category,this.$store.state.account);
      console.log(this.$store.state.account)
    },
  },
  mounted()
  {
    console.log('mounted');
  },
  methods:{
    getvideos:function(category,id){
      var kind;
      if(category == '我的视频')
      {
        kind = "http://39.96.177.173/mysend"
      }
      else if(category == '我收藏的视频')
      {
        kind = 'http://39.96.177.173/mycare'
      }else if(category == '热门视频')
      {
        kind = 'http://39.96.177.173/videos'
      }
      axios
      .post(kind,{userid :id})
      .then(Response => {
        console.log(Response.data);
        this.videolist = Response.data;
      })
      .catch(error=>{
        console.log(error)
      })
      this.category = this.$route.params.category ;
    },
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
.container{
        width: 100%; 
        max-width: 1200px;      
    }

</style>

