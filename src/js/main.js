// 要把组件渲染到页面中, 我们就必须要导入Vue这个库, 然后才可以new他
// es6语法导入的Vue与我们在浏览器中使用的Vue有点小区别, 失去了浏览器模版编译功能,
// 失去该功能的原因是, 你使用es6语法, vue知道你一定使用了构建工具, 那么使用构建工具,
// 你应该会使用vue-loader, 使用了vue-loader他会在本地打包时把模版编译好, 
// 在浏览器中直接使用, 相比咱们以往的方式性能会有提升.
import Vue from 'Vue';
import VueRouter from 'vue-router';
// 手动启用Vue插件, 在以前VueRouter插件会自动调用use, 
// 但是我们使用了模块化之后, window下没有Vue全局变量, 插件就无法自调use了
Vue.use(VueRouter);

import App from '../components/App.vue';
import Home from '../components/home/home.vue';
import List from '../components/list/list.vue';
   // 以前这里写的是template与methods等等东西,
    // 现在这些代码都统一放在了App.vue里面来写, 
    // App.vue就是咱们项目的根组件
new Vue({
    el:'#app',
    render(c){
        return c(App);
    },
    router : new VueRouter({
        routes: [
            { path:'/',component : Home},
            { path:'/list',component : List}
        ]
    })
})