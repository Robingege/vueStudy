<template>
  <article class="shopcart-list">

    <!-- 商品列表 -->
    <div class="goods" v-for="v in buyGoodsList" :key="v.id">
      <mt-switch class="switch" v-model="v.isSelected"></mt-switch> <img class="img" :src="v.thumb_path">
      <div class="inforight">
        <h4 class="mui-ellipsis-2">{{v.title}}</h4>
        <div class="bottom">
          <ul>
            <li>￥{{ v.sell_price}}</li>
            <li>
              <app-numbox :initVal="getBuyCount(v.id)"></app-numbox>
            </li>
            <li>
              <a href="javascript:void(0)">删除</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 总价 -->
    <div class="total">
      <div class="total_val">
        <ul>
          <li>总计（不含运费）</li>
          <li>已勾选商品{{ getGoodsTotal }}件,总价:￥{{ getTotalPrice }}元</li>
        </ul>
      </div>
      <div class="total_btn">
        <mt-button type="primary">付 款</mt-button>
      </div>
    </div>

  </article>
</template>

<script>
import storage from '../../js/storage.js'
export default{
    data(){
        return {
            buyGoodsList:[]
            }
    },
    methods:{
        getShopCart(){
            let ids = Object.keys(storage.get('buyData')).join(',');
            this.axios.get(`http://vue.studyit.io/api/goods/getshopcarlist/${ids}`)
            .then( res => {
                // 给每个商品补充一个isSelected属性, 默认值为true
                 res.data.message.forEach(v => v.isSelected = true);
                this.buyGoodsList = res.data.message})
        },
        getBuyCount(id){
            return storage.get('buyData')[id];
        }
    },
    created () {
        this.getShopCart();
    },
    computed: {
        // 已勾选的商品总件数
        getGoodsTotal(){
            return this.buyGoodsList.reduce((sum,goods) =>{
                return goods.isSelected ? sum + this.getBuyCount(goods.id) : sum
            },0)             
        },
        getTotalPrice(){
            return this.buyGoodsList.reduce((sum,goods) =>{
                return goods.isSelected ? sum + this.getBuyCount(goods.id) * goods.sell_price : sum
            },0)
        }
    }
}
</script>

<style lang="less" scoped>
  .shopcart-list {
    .goods {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      height: 102px;
      display: flex;
      padding: 5px;
      .switch {
        flex: 0 0 52px;
      }
      .img {
        margin-left: 5px;
        height: 75px;
        width: 75px;
        flex: 0 0 85px;
      }
      .inforight {
        margin-left: 5px;
        flex: 1;
      }
      .inforight ul {
        padding-left: 0px;
      }
      .inforight li {
        list-style: none;
        display: inline-block;
      }
      .inforight h4 {
        color: #0094ff;
        font-size: 14px;
      }
      .bottom li:first-child {
        color: red;
        margin-right: 5px;
      }
      .bottom li:last-child {
        margin-left: 5px;
      }
    }
    .total {
      height: 84px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      padding: 5px 14px;
      ul {
		    padding-left: 0px;
		    margin: 14px 0;
		    li {
		      list-style: none;
		      font-size: 14px;
		    }
		  }
		  &_val {
		  	flex: 1;
		  }
		  &_btn {
		  	flex: 0 0 60px;
	      margin: 18px 0 0 0;
		  }
    }
  }
</style>