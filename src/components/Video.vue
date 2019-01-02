<template>
    <div>
        <div
            class="card hoverable z-depth-2">
            <div class="card-image">
                <img 
                :src="video.img"
                @click="switchVideo">
                <a 
                    class="btn-floating halfway-fab"
                    @click="switchVideo">
                    <i class="material-icons red darken-4">play_arrow</i>
                 </a>
            </div>
            <div
                class="card-content"
                @click="switchVideo">
                <p class="title">
                    {{ video.name }}
                </p>
            </div>
        </div>
    </div>
</template>

<script scope>
export default {
    name:'VideoDetial',
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
.title {
  font-size: 13px;
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


