import Vue from 'vue'
import Router from 'vue-router'
import uri from 'urijs'
import VideoList from '../components/VideoList';
import VideoList_author from '../components/VideoList_author';
import Upload from '../components/Upload';
import play from '../components/Play'
import login from '../components/login'
import register from '../components/register'
import Moive from '@/components/Moive'
import ind from '@/components/ind'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: login
    }, {
        name: 'list',
        path: uri('./list/').absoluteTo("/").toString(),
        props: true,
        component: Moive,
        children: [{ path: '/', component: ind }, {
                name: 'channel1',
                path: 'channel1/:category',
                component: VideoList,
                props: true,
            },
            {
                name: 'channel2',
                path: 'channel2/:category',
                component: VideoList_author,
                props: true,
            },
            {
                name: 'channel3',
                path: 'channel2/:category',
                component: Upload,
                props: true,
            }
        ],

    }, {
        name: 'play',
        path: uri('./play/:video').absoluteTo("/").toString(),
        props: true,
        component: play,
    }, {
        name: 'register',
        path: '/register',
        props: true,
        component: register,
    }, {
        name: 'Moive',
        path: '/Moive',
        props: true,
        component: Moive,
    }, {
        name: ' Viist',
        path: '/list',
        props: true,
        component: Moive,
        children: [{
            name: 'movie',
            path: '/:category',
            component: VideoList,
            props: true,
        }]
    }]
})