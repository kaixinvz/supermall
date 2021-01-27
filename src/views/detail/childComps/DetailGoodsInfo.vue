<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc" clear-fix>
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
     <div class="info-list">
       <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item"  @load="imageLoad" alt="">
     </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props:{
      detailInfo:{
        type:Object,
        default(){
          return {

          }
        }

      }
    },
    data(){
      return{
        counter:0,
        imagesLength:0
      }
    },
    methods:{
      imageLoad(){
        // if(++this.counter===this.imagesLength){
          this.$emit('detailImageLoad')

      }
    },
    watch:{
      detailInf(){
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
.goods-info{
  padding:20px 0;
}
  .info-desc{
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    margin:15px;
  }
.info-key{
  text-align: center;
  font-size: 18px;
  margin-bottom: 15px;
}
  .info-list img{
    width:100%;
  }
</style>
