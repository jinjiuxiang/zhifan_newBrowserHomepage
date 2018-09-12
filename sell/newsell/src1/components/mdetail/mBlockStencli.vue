<template>
  <div class="m-stencli-container">
      <div class="m-stencli-header">
          <div class="m-stencli-header-image">
            <img :src="changeImage(message.coinType)" alt="">
            <span>{{message.coinType | filterName}}</span>
          </div>
        <div class="m-stencli-info">
          <span class="m-stencli-info-label">区块哈希：</span>
          <span class="m-stencli-info-res">{{message.blockHash}}</span>
        </div>
      </div>
      <div class="m-stencli-main">
        <div class="m-stencli-info">
          <span class="m-stencli-info-label">区块高度：</span>
          <span class="m-stencli-info-desc">{{message.blockHeight}}</span>
        </div>
        <div class="m-stencli-info">
          <span class="m-stencli-info-label">总交易数：</span>
          <span class="m-stencli-info-desc">{{message.totalTxNum}}</span>
        </div>
        <div class="m-stencli-info">
          <span class="m-stencli-info-label">总输出：</span>
          <span class="m-stencli-info-desc">{{message.totalOutput}}&nbsp;{{message.coinType}}</span>
        </div>
        <div class="m-stencli-info">
          <span class="m-stencli-info-label">时间：</span>
          <span class="m-stencli-info-desc">{{message.blockTime | timeFilter}}</span>
        </div>
        <div class="m-stencli-info">
          <span class="m-stencli-info-label"></span>
          <a class="m-stencli-info-detail" :href="message.searchUrl"  target="_Blank">查看详情</a>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "mAddressStencli",
        props:{
          message:Object
        },
        methods:{
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
  .m-stencli-container{
    width: 21.875rem;
    background-color:#FFFFFF;
    border: 1px solid rgba(0,160,233,0.2);
    border-radius: 8px;
    margin-top: 1rem;
  }
  .m-stencli-header{
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color:rgba(0,160,233,0.1);
    border-radius: 8px 8px 0 0;
    padding: 1rem;
    box-sizing: border-box;
  }
  .m-stencli-header-image{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  .m-stencli-header-image img{
    width: 1.375rem;
    height: 1.375rem;
    margin-right: 0.25rem;
  }
  .m-stencli-header-image span{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #333333;
    line-height: 0.875rem;
  }
  .m-stencli-info{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .m-stencli-info-label{
    font-family: PingFangSC-Regular;
    width: 5.5rem;
    font-size: 0.875rem;
    color: #999999;
    line-height: 0.875rem;
    text-align: left;
  }
  .m-stencli-info-res{
    font-family: PingFangSC-Regular;
    width: 15rem;
    font-size: 0.75rem;
    color: #333333;
    line-height: 1rem;
    word-wrap: break-word;
    text-align: right;
  }
  .m-stencli-info-desc{
    font-family: PingFangSC-Regular;
    width: 14rem;
    font-size: 0.875rem;
    color: #333333;
    line-height: 0.875rem;
    word-wrap: break-word;
    text-align: right;
  }
  .m-stencli-main{
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
  }
  .m-stencli-main .m-stencli-info:nth-child(1){
    margin-top: 0;
  }
  .m-stencli-info-detail{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #00A0E9;
    line-height: 0.875rem;
    text-decoration: none;

  }
  @media (min-width: 420px) and (max-width: 740px){
    .m-stencli-container{
      width: 34.875rem;
    }
  }
  @media (min-width: 750px) and (max-width: 1024px){
    .m-stencli-container{
      width: 36.875rem;
      margin-top: 2rem;
    }
    .m-stencli-info-label{
      font-size: 1rem;
      width: 7rem;
    }
    .m-stencli-info-desc{
      font-size: 1rem;
      width: 20rem;
    }
    .m-stencli-info-res{
      width: 20rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    .m-stencli-info-detail{
      font-size: 1rem;
    }
    .m-stencli-info{
      margin-top: 1.25rem;
    }
  }
</style>
