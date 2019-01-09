<template>
<div
    id = "body"
    class="grey lighten-4">
    <header>
    <nav id="up">
    <div class="nav-wrapper">
      <a class="brand-logo center">足球精选 </a>
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>

  <ul id="slide-out" class="sidenav sidenav-fixed">
    <li>
        <div class="user-view">
            <div class="background">
               <img :src="background">
            </div>
            <a class="center"><img class="circle" :src="user.Img"></a>
            <a><span class="black-text name">用户名：{{user.Name}}</span></a>
            <a><span class="black-text uid">ID：{{user.ID}}</span></a>
        </div>
    </li>
    <li>
        <a @click="index()">首页</a>
    </li>
    <li><div class="divider"></div></li>
    <li
      v-for="c in Categories2"
      :key="c.Name"
      :class="{active: c.Name == category}">
        <router-link
        :to="categoryLink(c)"
        replace>{{ c.Name }}</router-link>
    </li>
    <li><div class="divider"></div></li>
    <li
      v-for="c in Categories1"
      :key="c.Name"
      :class="{active: c.Name == category}">
        <router-link
        :to="categoryLink(c)"
        replace>{{ c.Name }}</router-link>
    </li>
    
    <li><div class="divider"></div></li>
    <li>
        <a @click="logout()">登出</a>
    </li>
  </ul>
  </header>

  <main>
      <router-view
        :filter="filter"
        @video="switchVideo($event)"
      />
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Modal Header</h4>
           <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
  </main>
</div>
</template>


<script>
import jQuery from "jquery";
import axios from "axios";
import { categoryLink, videoLink } from "../router/link.js";
import store from '@/store';

import background from '../images/ba.jpg';

document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      this.instances = M.Sidenav.init(elems);
  });


export default {
  name: "Moive",
  components: {},
  props: {
    category: String
  },
  data() {
    return {
      navBtn: null,
      background,
      filter: "",
      user: {
        Img: "http://119.57.75.134:8080/my/images/yuna.jpg",
        Name: this.$store.state.username,
        ID: this.$store.state.account,
      },
      Categories1: [
        {
          Name: "我的视频"
        },
        {
          Name: "我收藏的视频"
        },
        {
          Name: "我收藏的作者"
        },
        {
          Name:"上传视频"
        }
      ],
      Categories2: [
        {
          Name: "热门视频"
        },
        {
          Name: "热门作者"
        }
      ],
    };
  },
  mounted() {
  
  },
  methods: {
    switchVideo(video) {
      if(this.$store.state.account == null)
      {
           this.$router.push('/login');
      }
      else
      this.$router.push(videoLink(video));
    },
    logout(){
      this.$store.commit('logout');
      this.$router.push('/');
    },
    index(){
      this.$store.commit('index');
      this.$router.push('/list/');
    },
    upload(){
      this.$store.commit('upload');
      this.$router.push('/Upload');
    },
    categoryLink
  },
  store,
};
</script>

<style>
header,
main,
footer {
  padding-left: 300px;
}

@media only screen and (max-width: 992px) {
  header,
  main,
  footer {
    padding-left: 0;
  }
}

main {
  padding-top: 10px;
}
.container {
  width: 93%;
}
#up{
  background:rgb(40, 148, 134);
}
</style>