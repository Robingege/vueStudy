<template>
    <article>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell"><router-link :to="{ name:'pl',params:{ id:0 } }">全 部</router-link></li>
            <li class="mui-table-view-cell" v-for="v in photoC" :key="v.id">
                <router-link :to="{ name:'pl',params:{ id:v.id } }">{{v.title}}</router-link>
            </li>
        </ul>
    <!-- 使用mui的卡片视图布局 -->
        <div class="mui-card" v-for="v in photoL" :key="v.id">
				<router-link :to="{name:'pd',params:{ id:v.id }}">
                    <div class="mui-card-header mui-card-media" v-bind='{style:`height:40vw;background-image:url(${ v.img_url })`}'></div>
				    <div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>{{v.title}}</p>
						<p style="color: #333;">{{v.zhaiyao}}</p>
					</div>
				</div>
                </router-link>
			</div>
    </article>
</template>

<script>
    export default {
        data(){
            return {
                photoC:[],
                photoL:[]
            }
        },
        methods: {
            getPhotoC(){
                this.axios.get('http://vue.studyit.io/api/getimgcategory')
                .then( res => this.photoC = res.data.message)
            },
            getPhotoL(){
                this.axios.get(`http://vue.studyit.io/api/getimages/${this.$route.params.id}`)
                .then( res => this.photoL = res.data.message)
            }
        },
        created () {
            this.getPhotoC();
            this.getPhotoL();
        },
        watch: {
            $route(){
            this.getPhotoL();                
            }
        }
    }
</script>

<style lang="less" scoped>
    article{
        .mui-table-view{
            overflow: hidden;
            .mui-table-view-cell{
                float: left;
                color: skyblue;
            }
        }
    }
</style>