<template>

    <div>  
        <div style="height:50px"></div>   
        <div
            class="card hoverable z-depth-2"  style="width:85%">
            <div class="card-image">
            <video id="video" class="responsive-video" @click="switchVideo" >
                <source :src="video.url" type="video/mp4">
            </video>                 
            </div>
            <div
                class="card-content"
                @click="switchVideo">
                <span id="title" class="card-title black-text text-darken-4">
                    {{video.videoname}}
                    <br>
                    <span id="author" class="card-title grey-text  text-darken-2 right">
                        作者：{{video.userid}}
                    </span>
                </span>               
            </div>
        </div>
    </div>
</template>

<script scope>
export default {
    name:'VideoDetail',
    props:{
        video:Object,
        selected:Boolean,
        category: String,
    },
    methods:{
        switchVideo(){
            this.$emit("video",this.video);
        },
    }
}
</script>

<style lang="scss" scoped>

#title{
    font-weight: bold;
    font-size: 18px;
}
#author{
    font-size:14px;
}
p.program-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

div.compact {
  padding: 0px;

  div.card {
    margin: 0.5px;
    border: 1px;
  }
}

div.card {
  cursor: pointer;

  div.card-content {
    padding: 11px;
    min-height: 70px;
  }
}

span.viewers {
  .material-icons {
    font-size: 11px;
    margin-left: 20px;
    margin-right: 4px;
  }
}
</style>


