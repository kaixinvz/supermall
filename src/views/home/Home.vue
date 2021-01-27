<template>
<div id="home" >
  <nav-bar class="home-nav">
    <div slot="center">首页</div>
  </nav-bar>
  <tab-control :titles="['流行','新款','精选']"
               @tabClick="tabClick"
               ref="tabControl1"
               class="tab-control" v-show="isTabFixed"/>
   <scroll class="content"
           ref="scroll"
           @scroll="contentScroll"
           :probe-type="3"
           :pull-up-load="true"
           @pullingUp="loadMore"

   >
<!--   上面class里面的   @pullingUp="loadMore"-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
         />
      <good-list :goods="goods[currentType].list"/>

   </scroll>
  <back-top  @click.native="backClick()"  v-show="isShowBackTop"/>
<!--  <ul>-->
<!--    <li>商品列表1</li>-->
<!--    <li>商品列表2</li>-->
<!--    <li>商品列表3</li>-->
<!--    <li>商品列表4</li>-->
<!--    <li>商品列表5</li>-->
<!--    <li>商品列表6</li>-->
<!--    <li>商品列表7</li>-->
<!--    <li>商品列表8</li>-->
<!--    <li>商品列表9</li>-->
<!--    <li>商品列表10</li>-->
<!--  </ul>-->
</div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView';
import FeatureView from "./childComps/FeatureView";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";


import {getHomeMultidata,getHomeGoods} from 'network/home';
import {debounce} from "common/utils";
import {itemListenerMixin,backTopMixin} from "common/mixin"


export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,

  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      currentType:'pop',
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },

      tabOffsetTop:0,
      isTabFixed: false,
      saveY:0
    }
  },
  computed:{
     showGoods(){
       return  this.goods[this.currentType].list
     }
  },
  destroyed() {
    console.log('home destroyed');
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
    // console.log(this.saveY);
  },
  deactivated() {
    this.saveY =this.$refs.scroll.getScrollY()


  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
   //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
   //3.赋值
   //  this.tabOffsetTop = this.$refs.tabControl

  },
  mounted() {
    //防抖动
    const refresh =debounce(this.$refs.scroll.refresh,50)
    //3.监听Item中图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
      // console.log('----');
       refresh()
    })
    //2.获取tabcontrol的offsetTop
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods:{
    //防抖动

    //事件监听相关的方法
    tabClick(index){
      switch (index) {
         case 0:
           this.currentType = 'pop'
          break
        case 1:
          this.currentType  = 'new'
          break
        case 2:
          this.currentType  = 'sell'
          break
      }
      // this.showGoods = this.goods[this.currentType].list
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
  // methods: {
  //   tabClick(index){
  //     console.log(index);
  //   },
  //   backClick(){
  //     this.$refs.scroll.scrollTo(0,0)
  //     console.log('backClick');
  //   },
    //监听首页滚动
    contentScroll(position){
      // console.log(position);
      // position.y>1000
      //判断BackTop是否显示
      this.listenShowBackTop(position)
      //决定Tabcontrol是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      // this.$refs.scroll.scroll.refresh()
      // console.log('加载更多方法');
    },
    swiperImageLoad(){
      this.tabOffsetTop =this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求相关的方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        // console.log(res);
        // this.result=res;
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      })
    },
    //请求流行，新款，精品  后面加载的数据以及页数
    //动态获取page
    getHomeGoods(type){
      const page=this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        //遍历数据 ... res
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
//完成上啦加载更多
        this.$refs.scroll.finishPullUp()
      })
    },

  }
}
</script>

<style scoped>
  #home{
    /*padding-top: 40px;*/
    height:100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color:white;

  /*position:fixed;*/
  /*left:0;*/
  /*right:0;*/
  /*top:0;*/
  /*z-index: 9;*/
}
  /*.tab-control{*/
  /*  position:sticky;*/
  /*  top:40px;*/
  /*  z-index: 9;*/
  /*}*/
  .tab-control{
    position: relative;
    z-index: 9;
  }
.content{
  /*height:300px;*/
  overflow: hidden;

  position: absolute;
  top:40px;
  bottom: 49px;
  left:0;
  right:0;
}
  /*.content{*/
  /*  height:calc(100% - 93px);*/
  /*  overflow:hidden;*/
  /*  margin-top:51px;*/
  /*}*/
  /*.fixed{*/
  /*  position: fixed;*/
  /*  left:0;*/
  /*  right:0;*/
  /*  top:44px;*/
  /*}*/
</style>
