<template>
<div>
<nav id="up">
       <div class="nav-wrapper">
           <img src="../images/logo.png" class="img-responsive"> 
          <a class="brand-logo center">在这里，球迷听你的</a>
       </div>
</nav> 
<div id="back" class="img1 note page" :style ="note">
   <div id="backimg" class="row">
    <div  class="col l3 m5 s8 offset-s1  offset-l8 offset-m5">
      <div style="height:50px"></div>
      <transition name="fade">
      <div id="card" class="card lager card-panel hoverable">
        <div class="card-content white-text">
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s10 offset-s1">
                  <input id="username"  v-model="username" type="text" class="validate">
                  <label for="username">用户名</label>
                </div>
               
                <div class="input-field col s10 offset-s1">
                  <input id="telephone" v-model="telephone" type="text" class="validate">
                  <label for="telephone">手机号</label>
                </div>
                
                <div class="input-field col s10 offset-s1">
                  <input id="password"   v-model="password" type="password" class="validate">
                  <label for="password">密码</label>
                  
                </div>
                <div class="col s10 offset-s1">
                    <label id="gender">性别</label>
                    <select class="browser-default">
                        <option value="" disabled selected>请选择您的性别</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                    </select>
                </div>
              </div> 
            </form>
            </div>
        </div>
        <div id="card-a" class="card-action">
          <div class="row">
            <div style="height:20px"></div>
          <button id="log" class="btn-large red lighten-5 waves-effect waves-pupple col s3 offset-s8" @click="register" >注册</button>
          </div>   
        </div>
      </div>
      </transition>
    </div>
  </div> 
</div>
</div>
</template>


<script>
import axios from 'axios';


export default {
  name: 'register',
  data () {
    return {
      note:{
          backgroundImage: "url(" + require("../images/background.jpg") + ") ",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment:"fixed",  
      }, 
      username:null,
      password:null,
      telephone:null,
    }
  },
    methods:{ 
        register() {
            axios
                .post("http://39.96.177.173/doregister",{
                    userid:this.username,
                    
                    tel:this.telephone,
                    password:this.password,

                })
                .then(Response => {
                   if(Response.data=="OK")
                   {
                     M.toast({html: '注册成功'});
                     this.$router.push('/'); 
                   }
                })
                .catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color:rgb(255, 255, 255);
}
#backimg
{
  height: 89vh;
}
#card
{
  background: rgba(210, 255, 248, 0.5)
}
#card-a
{
    background: rgba(131, 214, 202, 0.1)
}
#username,#password,#telephone{
   background: rgba(255, 255, 255, 0.5)
}
#reg,#log,#gender{
  color:#255;
  font-size:1.2em;
}
#up{
  background: rgb(40, 148, 134);
}
#gender{
    font-size: 1.2em;
    color: rgb(73, 71, 71);
}
.input-field input[type=text]:focus + label {
     font-size: 1.5em;
     color:rgb(29,127,120);
}
.input-field input[type=password]:focus + label {
     font-size: 1.5em;
     color:rgb(29,127,120);
}
.input-field label {
     color: rgb(73, 71, 71);
     font-size: 1.2em;
}
  .img-responsive {
  height: 70px;
  max-width: 70px;
}

.fade-enter {
  opacity:0.8;
}
.fade-leave{
  opacity:0.8;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0.2;
  transition:opacity .5s;
}
</style>