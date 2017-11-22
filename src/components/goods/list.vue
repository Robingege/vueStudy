<template>
  <article class="goods_list">
    <ul class="mui-table-view mui-grid-view">
      <!-- 商品详情 -->
      <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="v in goodsList" :key="v.id">
      	<router-link v-bind="{to:`/goods/detail/${ v.id }`}">
	        <div class="mui-card">
	          <!-- 商品图片 -->
	          <div class="mui-card-header">
	          	<img :src="v.img_url">
	          </div>
	          <!-- 商品描述 -->
	          <div class="mui-card-footer ">
	            <p class="mui-ellipsis-2">{{v.title}}</p>
	          </div>
	          <!-- 商品价格 -->
	          <div class="mui-card-content">
	            <p class="price">
	            	<span>￥{{v.sell_price}}</span>
	            	<s>￥{{v.market_price}}</s>
	            </p>
	            <p class="tip">
	            	<span>热卖中</span>
	            	<span>剩余{{v.stock_quantity}}件</span>
	            </p>
	          </div>
	        </div>
        </router-link>
      </li>
    </ul>
    <!-- 加载更多 -->
    <button class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" @click="loadMore()">{{moreBtn}}</button>
  </article>
</template>

<script>
  export default {
    data(){
      return {
        goodsList:[],
        pageIndex:1,
        flag:true,
        moreBtn:'加载更多'
      }
    },
    methods: {
      getGoodsList(){
        if(this.flag){
          this.axios.get(`http://vue.studyit.io/api/getgoods?pageindex=${this.pageIndex}`)
          .then( res => {
          this.goodsList.push(...res.data.message);
          if(res.data.message ==0){
            this.flag = false;
            this.moreBtn = '别点了！我是有底线的！！！';
          }
        })
        }
        
      },
      loadMore(){
        this.pageIndex++;
        this.getGoodsList();
      }
    },
    created () {
      this.getGoodsList();
    }
  }
</script>

<style lang="less" scoped>
  	.mui-card {
  		box-shadow: 0px 0px 4px rgba(0, 0, 0, .3);
  	}
  	.mui-card-header {
  		padding: 8px;
  		/*height: 100px;*/
  		img {
  			width: 100%;
  			height: 100%;
  		}
  	}
    .mui-card-content {
      text-align: center;
      .price {
        margin-bottom: 4px;
        color: #000;
        span {
          color: red;
        }
      }
      .tip {
        overflow: hidden;
        padding: 0 8px;
        font-size: 12px;
        span:first-child {
          float: left;
        }
        span:last-child {
          float: right;
        }
      }
    }
</style>