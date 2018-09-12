<template>
    <div class="pc-list-container">
        <div class="pc-list-header">
            <div class="pc-list-header-left">
              <img src="../assets/image/logo.svg" @click="getHome" alt="">
              <div class="pc-list-header-search">
                <el-select v-model="selectData" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <input type="text" v-model="searchValue" @keyup.enter="getSearch" :placeholder="$t('message.placeHolder')">
                <img src="../assets/image/search.svg" @click="getSearch" alt="">
              </div>
            </div>
            <div class="pc-list-header-right">
                <!--<span>登录</span>-->
                <!--<span>注册</span>-->
            </div>
        </div>
        <div class="pc-list-main">
            <div class="pc-list-result">
              <span>“</span><span>{{params.searchWord}}</span><span>”</span>,{{$t('message.resHead')}}{{total}}{{$t('message.resFooter')}}
            </div>
            <div class="pc-list-stencli" v-for="site in finalData">
               <address_stencli v-if="site.searchResultType == 'address'" :message="site"></address_stencli>
               <transaction_stencli v-if="site.searchResultType == 'txn'" :message="site"></transaction_stencli>
               <block_stencli v-if="site.searchResultType == 'block'" :message="site"></block_stencli>
            </div>
        </div>
      <div class="pc-footer">
        <span class="pc-guanyu" @click="getUs">{{$t('message.about')}}</span>
        <span class="pc-mianze" @click="getPath">{{$t("message.disclaimer")}}</span>
        <span>Copyright © 2017 - 2018 北京知帆科技有限公司 版权所有 京ICP备17074962号</span>
      </div>
    </div>
</template>

<script>
    import addressStencli from "../../src/components/detail/addressStencli"
    import transactionStencli from "../../src/components/detail/transactionStencli"
    import blockStencli from "../../src/components/detail/blockStencli"
    export default {
        name: "searchList",
        components:{
          address_stencli:addressStencli,
          transaction_stencli:transactionStencli,
          block_stencli:blockStencli
        },
        data(){
          return {
            parentMessage:"parent",
            selectData:"",
            params:this.$route.params,
            searchValue:"",
            finalData:[],
            total:"",
            options: [{
              value: '',
              label: '全币种'
            }, {
              value: 'btc',
              label: 'BTC'
            }, {
              value: 'bch',
              label: 'BCH'
            }, {
              value: 'ltc',
              label: 'LTC'
            }, {
              value: 'usdt',
              label: 'USDT'
            }],
          }
        },
        methods:{
            getSearch(){
              const self = this;
              console.log(self.searchValue);
              console.log(self.selectData);
              if(self.searchValue == ""){
                //self.$message.error("查询内容不能为空")
              } else {
                // self.$router.push({name:"searchList",params:{searchWord:self.searchValue}})
                self.params.searchWord = self.searchValue;
                self.Cookies.set('selectWord',self.selectData);
                self.Cookies.set('searchWord',self.searchValue);
                self.getData()
              }
            },
            getHome(){
              const self = this;
              self.$router.push({name:"home"})
            },
            getData(){
              const self = this;
              self.axios({
                method:"get",
                url:self.config.configUrl + "/search?coinType="+self.selectData + "&key="+ self.searchValue
              }).then(function (res) {
                console.log(res);
                if(res.data.code == "0"){
                  if(res.data.data == null || res.data.data.length < 1){
                    self.$router.push({name:"nolist",params:{selectWorld:self.selectData,searchWord:self.searchValue}})
                  }else if(res.data.data.length == 1){
                    //self.total = res.data.data.length;
                    //self.finalData = res.data.data;
                    // self.Cookies.remove("selectWord")
                    if(self.selectData == ""){
                      self.total = res.data.data.length;
                      self.finalData = res.data.data;
                      //console.log(11)
                      //console.log(self.selectData)
                    }else {
                      self.Cookies.remove("searchWord")
                      window.location.href = res.data.data[0].searchUrl;
                      console.log(22)
                    }

                  }else {
                    self.total = res.data.data.length;
                    self.finalData = res.data.data;
                    self.params.searchWord = self.searchValue;

                  }
                }else {
                    self.$message.error(res.data.desc)
                }
                console.log($(".pc-list-main").height())
                console.log($("body").height());
                console.log(document.documentElement.clientHeight);
              })
            },
          getPath(){
            window.open("https://www.chaindigg.com/disclaimer")
          },
          getUs(){
            window.open("https://www.chaindigg.com")
          },
          handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            console.log(scrollTop);
            //alert("Qqq11")
            console.log(document.body.clientHeight);
            console.log(document.documentElement.clientHeight);
            if(document.documentElement.clientHeight > document.body.clientHeight && documentElement.clientHeight<=1280){
              $(".pc-footer").css({"position":"static","margin-top":document.documentElement.clientHeight -document.body.clientHeight + 'px'})
            }else if(document.documentElement.clientHeight > document.body.clientHeight && documentElement.clientHeight>1280){
              $(".pc-footer").css({"position":"absolute","bottom":"0","left":"0"})

            }else {
              $(".pc-footer").css({"position":"static","margin-top":"3rem"})

            }
          },
        },
      computed:{
        options2(){
          return [
            {
              value: '',
              label: this.$t("message.currencyKind")
            }, {
              value: 'btc',
              label: 'BTC'
            }, {
              value: 'bch',
              label: 'BCH'
            }, {
              value: 'ltc',
              label: 'LTC'
            }, {
              value: 'usdt',
              label: 'USDT'
            }
          ]
        }
      },
        mounted(){
             const self = this
            self.selectData = self.Cookies.get("selectWord");
            self.searchValue = self.Cookies.get("searchWord");
            self.params.searchWord = self.searchValue;
            if(typeof (self.Cookies.get("searchWord")) != "undefined"){
              self.getData()
            }else {
              self.$router.push({name:"home"})
            }

            if(self.Cookies.get("lang") == undefined){
              self.$i18n.locale  = "zh"
            }else {
              self.$i18n.locale = self.Cookies.get("lang");
            }
          console.log($(".pc-list-main").height())
          console.log($("body").height());
          console.log(document.documentElement.clientHeight);
          this.$nextTick(function(){

/////方法
            console.log($(".pc-list-main").height())
            console.log($("body").height());
            console.log(document.documentElement.clientHeight);
          })
          //   if(document.documentElement.clientHeight > document.body.clientHeight){
          //     $(".pc-footer").css({"position":"absolute","left":"0","bottom":"0"})
          //   }else {
          //     $(".pc-footer").css({"position":"static","margin-top":"3rem"})
          //
          //   }

            //  window.addEventListener('scroll', self.handleScroll)
            //  window.onresize = () => {
            //   return (() => {
            //     // window.screenWidth = document.body.clientHeight
            //     //console.log("1111"+document.body.scrollHeight);
            //     console.log(document.body.clientHeight);
            //     console.log(document.documentElement.clientHeight);
            //     if(document.documentElement.clientHeight > document.body.clientHeight){
            //       $(".pc-footer").css({"position":"absolute","left":"0","bottom":"0"})
            //     }else {
            //       $(".pc-footer").css({"position":"static","margin-top":"3rem"})
            //     }
            //   })()
            // }

        }
    }
</script>

<style scoped>
  .pc-list-header{
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #F1F1F2 solid;
  }
  .pc-list-header img{
    cursor: pointer;
  }
  .pc-list-header-left{
    display: flex;
    margin-left: 3rem;
  }
  .pc-list-header-search{
    width: 30rem;
    height: 2rem;
    background: #FFFFFF;
    border: 0.125rem solid #00A0E9;
    border-radius: 2.5rem;
    margin-left: 3.75rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }
  .pc-list-header-search select{
    border: none;
    background: none;
    outline: none;
    ppearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    padding-right: 1.25rem;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #333333;
    line-height: 0.875rem;
    margin-left: 1rem;
  }
  .pc-list-header-search input{
    width: 22rem;
    padding-left: 1rem;
    height: 2rem;
    outline: none;
    border: none;
    font-size: 0.875rem;
    padding-right: 1rem;
    box-sizing: border-box;
  }
  .pc-list-header-search img{
   width: 1.125rem;
    position: absolute;
    right: 1.5rem;
    top: 0.525rem;
  }
  .pc-list-header-right span{
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    line-height: 1rem;
    margin-right: 2.5rem;
  }
  .pc-list-header-right span:nth-child(2){
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    line-height: 1rem;
    margin-right: 3rem;
  }
  /**/
  .pc-list-result{
    display: flex;
    justify-content: flex-start;
    padding: 0 5%;
    margin: 3rem 0 1rem 0;
  }
  .pc-list-result span{
    ont-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #00A0E9;
    letter-spacing: ;ing: 0;
  }
  /**/
  .pc-list-stencli{
    width: 100%;
    box-sizing: border-box;
    padding:  0 5%;
  }
  .pc-list-main{
    margin-bottom: 5rem;
    min-height: 48.5rem;
  }
  .el-select{
    width: 85px;
    font-size: 0.875rem;
    background-image:url("../../src/assets/image/Triangle.svg");
    background-repeat: no-repeat;
    background-position:right center;
  }
  .el-input__inner{
    font-size: 1rem !important;
  }
  .el-select .el-input__inner:focus{
  }
  .select-image img{
    margin-left: 0;
    width: 0.75rem;
  }
  .pc-footer{
    width: 100%;
    height: 36px;
    background: #EBEBEB;
    display: flex;
    justify-content: center;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #666666;
    align-items: center;
  }
  .pc-guanyu,.pc-mianze{
    margin-right: 2rem;
    cursor: pointer;
  }
</style>
