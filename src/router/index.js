import Home from '../components/home/home.vue';
import NL from '../components/news/list.vue';
import ND from '../components/news/detail.vue';
import PhotoList from '../components/photo/list.vue';
import PhotoDetail from '../components/photo/detail.vue';
export default {
    routes:[
        {path:'/',redirect: '/index'},
        {path : '/index',component:Home},
        // 新闻路由
        {path : '/news/list',component:NL},
        {path : '/news/detail/:id',component:ND},
        // 图片
        {name:'pl', path : '/photo/list/:id',component:PhotoList},  
        {name:'pd', path : '/photo/detail/:id',component:PhotoDetail},  
    ]
}