<template>
  <div class="cart">
    <!--    导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>

    <!--     商品的列表-->
    <div class="content">
      <div class="cont-left"> <ul>
        <li>dsfsd</li>
        <li>dsfd</li>
        <li>sdf</li>
        <li>dsf</li>
        <li>sdf</li>
        <li>fsd</li>
        <li>sdf</li>
        <li>sdf</li>
        <li>sfdd</li>
        <li>sdf</li>
        <li>sdf</li>
        <li>sdf</li>
        <li>sdf</li>
        <li>sdf</li>
        <li>fsddf</li>
        <li>sdf</li>
        <li>sfd</li>
        <li>sdf</li>
        <li>sdf</li>
        <li>sdfs</li>
        <li>df</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul></div>
      <div class="cont-right"></div>
    </div>
    <!--     底部汇总-->

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import BScroll from 'better-scroll'
    export default {
        name: "Category",
      components:{
        NavBar
      },
      data(){
        return{
          scroll:null
        }
      },
      created() {
          // this.scroll=new  BScroll(this.$refs.aaaa,{
          //
          // })
      },
      mounted() {
        // console.log(this.$refs.aaa);
        // console.log(document.querySelector('.wrapper'));
        this.scroll =new BScroll(document.querySelector('.wrapper'),{
          probeType:3,
          pullUpLoad:true
        })
        this.scroll.on('scroll',(position)=>{
          console.log(position);
        })
        this.scroll.on('pullingUp',()=>{
          console.log('上拉加载更多');
        })

  },
      methods:{
          btnClick(){
            console.log('btnclick');
          }
      }
    }

</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }
</style>
