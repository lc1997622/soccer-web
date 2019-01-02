// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery';
import axios from 'axios';
import store from './store';
import VideoPlayer from 'vue-video-player'

// 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到我其他业务组件可能也会用到视频播放，所以就放在了main.js内
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


// Materialize-css
import 'materialize-css/sass/materialize.scss';
import 'materialize-css'; // bind Materialize to window

// Material-Design-Icons
import 'material-design-icons/iconfont/material-icons.css';

// Material-Design-Iconic-Font
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';

// Font Awesome
import 'font-awesome/css/font-awesome.css';

// Flowplayer
import 'flowplayer/dist/skin/skin.css';

Vue.config.productionTip = false

Vue.use(VideoPlayer);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    jQuery,
    router,
    axios,
    store,
    components: { App },
    template: '<App/>'
})