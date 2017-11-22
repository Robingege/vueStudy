<template>
  <article class="goods-detail">
        <!-- 轮播图 -->
    <mt-swipe :auto="1000">
        <mt-swipe-item v-for="item in lunbos" v-bind:key="item.src">
            <!-- <router-link v-bind:to="item.url"> -->
                <img v-bind:src="item.src">
            <!-- </router-link> -->
        </mt-swipe-item>
    </mt-swipe>
  	<!-- 商品购买 -->
    <div class="mui-card">
      <!-- 名称 -->
      <div class="mui-card-header">{{goodsDetail.title}}</div>
      <!-- 价格 -->
      <div class="mui-card-content mui-card-content-inner">
        <div class="price"> <s>市场价:￥{{goodsDetail.market_price}}</s> <span>销售价: </span> <em>￥{{goodsDetail.sell_price}}</em> </div>
        <div> <span>购买数量：</span>
          <!--数字输入框 -->
         <app-numbox v-bind:initVal="count" @change="getTotal"></app-numbox>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="mui-card-footer">
      	<button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">结算</button>
        <div></div>
        <button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" @click="addSC">加入购物车</button>
      </div>
    </div>

		<!-- 评论与介绍 -->
		<div class="mui-card">
			<!-- 选项卡 -->
		    <mt-navbar v-model="tab">
			  <mt-tab-item id="tab-container1">商品评论</mt-tab-item>
			  <mt-tab-item id="tab-container2">图文介绍</mt-tab-item>
			</mt-navbar>
			<!-- 内容 -->
		    <mt-tab-container v-model="tab">
			  <mt-tab-container-item id="tab-container1">
			    <mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="tab-container2">
          <div class="mui-card">
            <div class="mui-card-header">{{tuWen.title}}</div>
            <div class="mui-card-content">
              <div class="mui-card-content-inner" v-html="tuWen.content">
                
              </div>
            </div>
        </div>
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>

  </article>
</template>

<script>
import storage from '../../js/storage.js';
  export default {
    data(){
      return {
        id:this.$route.params.id,
        goodsDetail:{},
        lunbos:[],
        tuWen:{},
        tab:'tab-container2',
        count:0
      }
    },
    methods: {
      getGoodsDetail(){
        this.count = storage.get('buyData')[this.id] || 1;        
        this.axios.get(`http://vue.studyit.io/api/goods/getinfo/${ this.id}`)
        .then( res => {
          this.goodsDetail = res.data.message[0];
        })
      },
      getLunbo(){
        this.axios.get(`http://vue.studyit.io/api/getthumimages/${ this.id}`)
        .then( res => {
          this.lunbos = res.data.message;
        })
      },
      getTuWen(){
        this.axios.get(`http://vue.studyit.io/api/goods/getdesc/${ this.id}`)
        .then( res => {
          this.tuWen = res.data.message[0];
        })
      },
      getTotal(val){
        this.count = val;       
      },
      addSC(){
         // 获取最新的购买数量, 并存储起来
        let oldData = storage.get('buyData') || {};
        oldData[this.id] = this.count;
        storage.set('buyData',oldData);
      }
    },
    created () {
      this.getGoodsDetail();
      this.getLunbo();
      this.getTuWen();
      
    }
  }
</script>

<style lang="less" scoped>
  .goods-detail {
    .mui-card-content {
      .price {
        color: rgb(51, 51, 51);
        margin-bottom: 4px;
        span {
          margin-left: 6px;
        }
        em {
          font-size: 18px;
          color: red;
        }
      }
    }
    .mui-card-footer {
      div {
        width: 100%;
      }
      .mui-btn {
        padding: 8px 0;
        font-size: 16px;
      }
    }
    .mint-tab-item {
    	&.is-selected {
    		margin-bottom: 0;
    		border-bottom: 3px solid #2ce094;
    		color: #2ce094;
    	}
    }
    .mint-tab-item-label {
    	font-size: 18px;
    	color: #2ce094;
    }
   .mint-swipe{
    height: 260px;
    background-color: #fff;
    img{
      display: block;
      margin: 0 auto;
      height: 260px;
      width: auto !important;
    }
  }
  }
  
</style>