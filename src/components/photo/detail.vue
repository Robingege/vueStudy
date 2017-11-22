<template>
    <div class="mui-card">
        <div class="mui-card-header">
            <h4>{{ photoDetail.title }}</h4>
            <p>
                <span>创建时间：{{ photoDetail.add_time | date }}</span>
                <span>{{ photoDetail.click }}次浏览</span>
            </p>
        </div>
        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-4" v-for="v in photoThumList" :key="v.src">
                    <img class="mui-media-object" :src="v.src" v-preview="v.src">
            </li>
        </ul>
        <div class="mui-card-footer">{{photoDetail.content}}</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                photoDetail:{},
                photoThumList:[]
            }
        },
        methods:{
            getDetail(){
                this.axios.get(`http://vue.studyit.io/api/getimageInfo/${this.$route.params.id}`)
                .then( res => this.photoDetail = res.data.message[0])
            },
            getThumList(){
                this.axios.get(`http://vue.studyit.io/api/getthumimages/${this.$route.params.id}`)
                .then( res => this.photoThumList = res.data.message)
            },
        },
        created () {
            this.getDetail();
            this.getThumList();
        }
    }
</script>

<style scoped>
 .mui-card-header,.mui-card-footer{
     display: block;
 }
</style>