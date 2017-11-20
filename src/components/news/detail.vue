<template>
    <article>
        <div v-for="v in newsDetail" :key="v.id">
            <h3>{{ v.title }}</h3>
            <div class="date">发表时间：{{ v.add_time | date}} <span>{{v.click}} 次浏览</span></div>
            <div class="content" v-html="v.content"></div>
        </div>
    </article>
</template>

<script>
    export default {
        data(){
            return {
                id:'',
                newsDetail:[]
            }
        },
        methods: {
            getNewsDetail(){
                this.id = this.$route.params.id;
                this.axios(`http://vue.studyit.io/api/getnew/${this.id}`)
                .then( res => {
                    this.newsDetail = res.data.message;
                    console.log(this.newsDetail);
                })
            }
        },
        created () {
            this.getNewsDetail()
        }
    }
</script>

<style lang="less" scoped>
    article{
        padding: 8px;
        h3{
            color: skyblue;
            font-size: 20px;
            line-height: 1.5em;
        }
        .date{
            font-size: 12px;
            color: #9b9b9b;
        }
        .content{
            border-top: 2px #9b9b9b solid;
            margin-top: 18px;
            padding-top: 8px;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
    }
</style>

