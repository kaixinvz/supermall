<!--滚动-->
<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }

    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      this.scroll=new BScroll(this.$refs.wrapper,{
        //click:false  button可以监听点击  div不可以
        click:true,
        // probeType:3只要是滚动  2.手指滚动
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
   //监听滚动的位置
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
//监听上啦到顶部的事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('监听到滚动到底部');
          this.$emit('pullingUp')
        })
      }
      //监听上拉事件
      // this.scroll.on('pullingUp',()=>{
      //  this.$emit('pullingUp')
      // })
      // console.log(this.scroll);
      // this.scroll.refresh()
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
      this.scroll &&  this.scroll.finishPullUp()
      },
      refresh(){
        // console.log('=------');
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y:0
      }
    }
  }
</script>

<style scoped>

</style>
