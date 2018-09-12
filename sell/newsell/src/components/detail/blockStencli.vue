<template>
  <div class="pc-stencli-container">
      <div class="pc-stencli-header">
        <div class="pc-stencli-header-left">
          <img :src="changeImage(message.coinType)" alt="">
          <span class="pc-stencli-name">{{message.coinType | filterName}}</span>
        </div>
        <div class="pc-stencli-header-right">
          <span class="pc-stencli-label" style="color: #333333">{{$t('message.block')}}：</span>
          <span class="pc-stencli-text">{{message.blockHash}}</span>
        </div>
      </div>
      <div class="pc-stencli-main">
        <div class="pc-stencli-main-left">
          <div class="pc-stencli-main-box">
            <span class="pc-stencli-label">{{$t('message.blockHeight')}}：</span>
            <span class="pc-stencli-text">{{message.blockHeight}}</span>
          </div>
          <div class="pc-stencli-main-box">
            <span class="pc-stencli-label">{{$t('message.totalOutput')}}：</span>
            <span class="pc-stencli-text">{{message.totalOutput}}&nbsp;{{message.coinType}}</span>
          </div>
        </div>
        <div class="pc-stencli-main-right">
          <div class="pc-stencli-main-box">
            <span class="pc-stencli-label">{{$t("message.numTxn")}}：</span>
            <span class="pc-stencli-text">{{message.totalTxNum}}</span>
          </div>
          <div class="pc-stencli-main-box">
            <span class="pc-stencli-label">{{$t("message.time")}}：</span>
            <span class="pc-stencli-text">{{message.blockTime | timeFilter}}</span>
          </div>
        </div>
      </div>
      <a class="pc-stencli-detail" :href="message.searchUrl"  target="_Blank">{{$t("message.seeDetails")}}</a>
  </div>
</template>

<script>
    export default {
        name: "addressStencli",
        props:{
          message:Object
        },
        methods:{
          getPathToDetail(url){
            window.location.href = url
          },
          changeImage(value){
            switch (value) {
              case 'BTC':
                return "/static/image/btc.png";
                break;
              case  'BCH':
                return "/static/image/bch.svg";
                break;
              case  'LTC':
                return "/static/image/ltc.png";
                break;
              case 'TetherUS':
                return "/static/image/usdt.svg";
                break;
            }
          }
        },
        filters:{
          timeFilter(value){
            var date = new Date(value);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '.' + m + '.' + d+' '+h+':'+minute+':'+second;
          },
          filterName(value){
            if(value == "TetherUS"){
              return "USDT"
            }else {
              return value
            }
          }
        },


    }
</script>

<style scoped>
  .pc-stencli-container{
    width: 100%;
    height: 9.5rem;
    margin-top: 1.57rem;
    background: #FFFFFF;
    border: 1px solid rgba(0,160,233,0.2);
    border-radius: 0.5rem;
    position: relative;
  }
  .pc-stencli-header{
    width: 100%;
    height: 3rem;
    background-color: rgba(0,160,233,0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  .pc-stencli-header-left{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 2.5rem;
    width: 36%;
  }
  .pc-stencli-header-left img{
    width: 1.5rem;
    height: 1.5rem;
  }
  .pc-stencli-header-right{
    flex: 1;
    display: flex;
    justify-content: flex-start;
  }
  .pc-stencli-name{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    margin-left: 0.5rem;
  }
  .pc-stencli-label{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #999999;
    line-height: 1rem;
  }
  .pc-stencli-text{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #151515;
    line-height: 1rem;
  }
  /**/
  .pc-stencli-main{
    display: flex;
  }
  .pc-stencli-main-left{
    width: 36%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2.5rem;
    box-sizing: border-box;
  }
  .pc-stencli-main-right{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .pc-stencli-main-box{
    margin-top: 1.5rem;
  }
  .pc-stencli-main-box:nth-child(2){
    margin-top: 1.1rem;
  }
  .pc-stencli-detail{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #00A0E9;
    line-height: 1rem;
    position: absolute;
    right: 2.5rem;
    bottom: 2.75rem;
    cursor: pointer;
    text-decoration: none;
  }
  @media (max-width: 1280px) {
    .pc-stencli-main-left{
      width: 30%;
    }
    .pc-stencli-header-left{
      width: 30%;
    }
  }
</style>
