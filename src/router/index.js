import Home from '../components/home/home.vue';
import NL from '../components/news/list.vue';
import ND from '../components/news/detail.vue';
import PhotoList from '../components/photo/list.vue';
export default {
    routes:[
        {path:'/',redirect: '/index'},
        {path : '/index',component:Home},
        // 新闻路由
        {path : '/news/list',component:NL},
        {path : '/news/detail/:id',component:ND},
        // 图片
        {name:'pl', path : '/photo/list/:id',component:PhotoList},   
    ]
}