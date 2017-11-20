<template>
    <article>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="v in newsList" :key="v.id">
                <router-link v-bind="{ to: `/news/detail/${v.id}` }">
                    <img class="mui-media-object mui-pull-left" :src="v.img_url">
                    <div class="mui-media-body">
                        <h4 class="mui-ellipsis">{{v.title}}</h4>
                        <p class="mui-ellipsis skyblue">发表时间：{{v.add_time | date}} <span class="fr">点击：{{v.click}}</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
    </article>
</template>

<script>
    export default {
        data(){
            return {
                newsList:[]
            }
        },
        methods: {
            getNewsList(){
                this.axios.get('http://vue.studyit.io/api/getnewslist')
                .then( res => {
                    this.newsList = res.data.message;
                    // console.log(this.newsList);
                })
            }
        },
        created(){
            this.getNewsList();
        }
    }
</script>

<style scoped>
    .fr{
        float: right;
    }
    .skyblue{
        color: skyblue;
    }
    h4{
        font-weight: 200;
    }
</style>