<template>
  <div class="mb-home-container">
      <div style="width: 100%;display: flex;justify-content: center">
        <img class="mb-home-image" src="../assets/image/logo3.svg" alt="">
      </div>
    <div class="mb-home-search">
      <select name="" id="" v-model="selectValue">
        <option value="">全币种</option>
        <option value="btc">BTC</option>
        <option value="bch">BCH</option>
        <option value="ltc">LTC</option>
        <option value="usdt">USDT</option>
      </select>
      <input id="tdInp" type="text" v-model="searchValue" @keydown="show($event)" placeholder="区块高度/区块哈希值/交易哈希值/地址哈希值">
      <div class="mb-home-search-btn" @click="getData">
        <img src="../assets/image/search.svg" alt="">
      </div>
    </div>
    <div class="mb-home-hotInfo-desc">
        <span>试一试：</span>
        <div class="mb-home-hotInfo-desc-btn" @click="getHot">
          <img src="../assets/image/change.svg" alt="">
          <span>换一批</span>
        </div>
    </div>
    <div class="mb-home-hotInfo-main">
        <div v-for="site in finalHot" :style="{background:site.color}" @click="hotPath(site.targetUrl)">{{site.name}}</div>
    </div>
    <div class="mb-home-footer" :style="{marginTop:marginTop + 'px'}">
        <div class="mb-home-footer-first">
          <span @touchend="getUS">关于我们</span>
          <span @touchend="getMz">免责声明</span>
        </div>
        <p class="mb-home-footer-second">Copyright © 2017-2018  京ICP备17074962号</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "home",
        data(){
          return {
            message:"zhe",
            selectValue:"",
            searchValue:"",
            hotArr:[],
            finalHot:[],
            footShow:true,
            footShow2:false,
            screenWidth:[],
            marginTop:50
          }
        },
        methods:{
          getUS(){
            window.open("https://www.chaindigg.com/")
          },
          getMz(){
            window.open("https://www.chaindigg.com/disclaimer")
          },
          getData(){
            const self = this;
            console.log(self.selectValue);
            console.log(self.searchValue);
            if(self.searchValue == ""){
              //self.$message.error("查询内容不能为空")
              window.location.reload()
            } else if(self.searchValue != ""){
              console.log(222)
              // self.$router.push({name:"msearchList",params:{searchWord:self.searchValue}})
              self.getList();
            }
          },
          getList(){
            const self = this;
            self.axios({
              method:"get",
              url:self.config.configUrl + "/search?coinType="+self.selectValue + "&key="+ self.searchValue
            }).then(function (res) {
              console.log(res);
              if(res.data.code == "0"){
                if(res.data.data == null || res.data.data.length <1){
                  self.Cookies.set("mbSelecWord",self.selectValue);
                  self.Cookies.set("mbSearchWord",self.searchValue);
                  self.$router.push({name:"mNoList",params:{searchWord:self.searchValue}})
                }else if(res.data.data.length == 1){
                  if(self.selectValue == ""){
                    self.Cookies.set("mbSelecWord",self.selectValue);
                    self.Cookies.set("mbSearchWord",self.searchValue);
                    self.$router.push({name:"msearchList",params:{searchWord:self.searchValue}})
                  }else {
                    window.location.href = res.data.data[0].searchUrl;
                  }
                }else {
                  self.Cookies.set("mbSelecWord",self.selectValue);
                  self.Cookies.set("mbSearchWord",self.searchValue);
                  self.$router.push({name:"msearchList",params:{searchWord:self.searchValue}})

                }
              }else {
                self.$message.error(res.data.desc)
              }
            })
          },
          getHot(){
            const self = this;
            if(self.hotArr.length >4){
              const arr = self.hotArr.slice(0,4);
              self.hotArr = self.hotArr.concat(arr)
              self.hotArr.splice(0,4);
              self.finalHot = self.hotArr.slice(0,4);
              console.log(self.finalHot);
            }else {
              self.finalHot = self.hotArr
            }
          },
          getHotData(){
            const self = this;
            self.axios({
              method:"get",
              url:self.config.configUrl + "/search/getHostInfoList"
            }).then(function (res) {
              console.log(res);
              if(res.data.code == "0"){
                self.hotArr = res.data.data;
                self.finalHot = self.hotArr.slice(0,4);
              }
            })
          },
          hotPath(url){
            window.location.href = url;
          },
          getShow(){
            const self = this;
            self.footShow2 = true;
          },
          getHide(){
            const self = this;
            self.footShow2 = false;
          },
          show: function (ev) {
            const that = this;
            if(ev.keyCode == 13){
              that.getData();
            }
          }

        },
      mounted(){
        // this.finalHot = this.hotArr.slice(0,4);
        const that = this;
        $(document).ready(function () { $('.mb-home-container').css({'height':$(window).height()})});
        //console.log($(window).height());
        that.marginTop = $(window).height()-$(".mb-home-hotInfo-main").offset().top-$(".mb-home-hotInfo-main").height();
        this.getHotData();
        window.onresize = () => {
          return (() => {
            // window.screenWidth = document.body.clientHeight
            //console.log("1111"+document.body.scrollHeight);
            if($(window).height()-$(".mb-home-hotInfo-main").offset().top-$(".mb-home-hotInfo-main").height()<0){
              that.marginTop = 50
            }else {
              that.marginTop = $(window).height()-$(".mb-home-hotInfo-main").offset().top-$(".mb-home-hotInfo-main").height();

            }


          })()
        }

      }
    }
</script>

<style scoped>
.mb-home-container{
  /*display: flex;*/
  width: 100%;
  /*flex-direction: column;*/
  align-items: center;
}
  .mb-home-search{
    width: 21.875rem;
    height: 2.5rem;
    background: #FFFFFF;
    border: 0.125rem solid #00A0E9;
    border-radius: 2.5rem;
    /*margin-top: 1.5rem;*/
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    margin:0 auto 0 auto;
  }
  .mb-home-search select{
    border: none;
    background: none;
    outline: none;
    ppearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    padding-right: 1.25rem;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    line-height: 0.875rem;
    margin-left: 1rem;
  }
  .mb-home-search input{
    border: none;
    outline: none;
    width: 25rem;
    padding-left: 1rem;
    font-size: 1rem;
  }
  .mb-home-search-btn{
    width: 2.5rem;
    height: 100%;
    display: inline-flex;
    justify-content: flex-start;
  }
  .mb-home-footer{
    width: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 6.25rem;
    background: #EBEBEB;
    justify-content: center;
  }
  .mb-home-footer-first{
    font-family: PingFangSC-Regular;
    font-size: 1.2rem;
    color: #666666;
    line-height: 1.2rem;
  }
  .mb-home-footer-first span:nth-child(1){
    margin-right: 2.75rem;
  }
  .mb-home-footer-second{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #999999;
    text-align: center;
    line-height: 1rem;
    margin-top: 0.5rem;
  }
  .mb-home-hotInfo-desc{
    width: 22.25rem;
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #666666;
    line-height: 0.75rem;
    align-items: center;
    /*margin-top: 0.125rem;*/
    margin: 0.125rem auto 0 auto;
  }
  .mb-home-hotInfo-desc-btn{
    display: flex;
    align-items: center;
    height: 1.5rem;
    padding-left: 0.5rem;
  }
  .mb-home-hotInfo-desc-btn img{
    width: 0.625rem;
    height: 0.625rem;
    margin-right: 0.25rem;
  }
  .mb-home-hotInfo-main{
    width: 22.25rem;
    text-align: left;
    display: flex;
    flex-wrap:wrap;
    margin:0 auto;
  }
  .mb-home-hotInfo-main div{
    border-radius: 1.75rem;
    padding: 0.3375rem 0.75rem;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    /*line-height: 0.75rem;*/
    margin-bottom: 0.55rem;
    margin-right: 0.3125rem;
    height: 18px;
  }
  /*paid*/
  @media (min-width: 750px) and (max-width: 800px){
    .mb-home-image{
      margin-top: 20rem;
    }
    .mb-home-search{
      width: 34.875rem;
      margin-top: 3rem;
    }
    .mb-home-hotInfo-main{
      width: 34.875rem;

    }
    .mb-home-hotInfo-desc{
      width: 34.875rem;

    }
  }
  @media (min-width: 900px) and (max-width: 1024px){
    .mb-home-image{
      margin-top: 14rem;
    }
    .mb-home-search{
      width: 34.875rem;
      margin-top: 3rem;
    }
    .mb-home-hotInfo-main{
      width: 34.875rem;

    }
    .mb-home-hotInfo-desc{
      width: 34.875rem;

    }
  }
  /*phone*/
  @media (min-width: 350px) and (max-width: 450px){
    .mb-home-image{
      width: 12.875rem;
      height: auto;
      margin-top: 10rem;
    }
    .mb-home-search{
      width: 22rem;
      height: 2.5rem;
    }
    .mb-home-hotInfo-desc{
      width: 21rem;
      height: 2rem;
      margin-top: 0.35rem;
    }
    .mb-home-hotInfo-main{
      width: 22rem;
      /*height: 2.5rem;*/
    }
    .mb-home-search select{
      font-size: 0.75rem;
      padding-right: 1rem;
    }
    .mb-home-search input{
      font-size: 0.75rem;
      padding-left: 0.25rem;
      width: 20rem;
    }
    .mb-home-search-btn{
      align-items: center;
    }
    .mb-home-search-btn img{
      width: 1rem;
      height: 1rem;
    }
    .mb-home-footer{
      height: 3.75rem;
    }
    .mb-home-footer-first{
      font-size: 0.75rem;
    }
    .mb-home-footer-second{
      margin-top: 0.25rem;
      font-size: 0.75rem;
    }
  }
  @media (min-width: 460px) and (max-width: 749px){

    .mb-home-footer{
      height: 4.25rem;
    }
    .mb-home-footer-first{
      font-size: 0.75rem;
    }
    .mb-home-footer-second{
      font-size: 0.75rem;
    }
    .mb-home-image{
      margin-top: 4rem;
    }
    .mb-home-search{
      width: 32rem;
      height: 2.5rem;
      margin-top: 3rem;
    }
    .mb-home-hotInfo-desc{
      width: 32rem;
      height: 2.5rem;
    }
    .mb-home-hotInfo-main{
      width: 32rem;
      height: 2.5rem;
    }
    .mb-home-search select{
      font-size: 0.75rem;
      padding-right: 1.5rem;
    }
    .mb-home-search input{
      font-size: 0.75rem;
      padding-left: 1rem;
      width: 24rem;
    }
    .mb-home-search-btn{
      align-items: center;
    }
    .mb-home-search-btn img{
      width: 1rem;
      height: 1rem;
    }
    .mb-home-image{
      width: 17rem;
    }
    .mb-home-footer{
      position: static;
      margin-top: 3rem;
    }
  }
  @media (min-width: 801px) and (max-width: 820px){

  .mb-home-footer{
    height: 4.25rem;
  }
  .mb-home-footer-first{
    font-size: 0.75rem;
  }
  .mb-home-footer-second{
    font-size: 0.75rem;
  }
  .mb-home-image{
    margin-top: 4rem;
  }
  .mb-home-search{
    width: 32rem;
    height: 2.5rem;
    margin-top: 3rem;
  }
    .mb-home-hotInfo-desc{
      width: 32rem;

    }
    .mb-home-hotInfo-main{
      width: 32rem;
    }
    .mb-home-footer{
      position: static;
      margin-top: 3rem;
    }
  .mb-home-search select{
    font-size: 0.75rem;
    padding-right: 1.5rem;
  }
  .mb-home-search input{
    font-size: 0.75rem;
    padding-left: 1rem;
    width: 24rem;
  }
  .mb-home-search-btn{
    align-items: center;
  }
  .mb-home-search-btn img{
    width: 1rem;
    height: 1rem;
  }
  .mb-home-image{
    width: 17rem;
  }
}

</style>
