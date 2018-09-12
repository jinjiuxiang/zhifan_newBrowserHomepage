<template>
  <div class="m-list-container">
      <div class="m-list-header">
          <div class="m-list-header-btn"></div>
          <img src="../assets/image/logo.svg" alt="" @touchend="backToHome">
          <div class="m-list-header-btn">
            <img src="../assets/image/search1.svg" @touchend="hideShowChange" alt="">
          </div>
      </div>
      <div class="m-search-hide-box">
        <div class="mb-hide-search" v-show="hideShow">
          <select name="" id="" v-model="selectValue">
            <option value="">全币种</option>
            <option value="btc">BTC</option>
            <option value="bch">BCH</option>
            <option value="ltc">LTC</option>
            <option value="usdt">USDT</option>
          </select>
          <input type="text" v-model="searchValue" @keydown="show($event)" placeholder="区块高度/区块哈希值/交易哈希值/地址哈希值">
          <div class="mb-hide-search-btn" @touchend="getSearch">
            <img src="../assets/image/search.svg" alt="">
          </div>
        </div>
      </div>
      <div class="noList-iamge">
        <img src="../../static/image/nolist.png" alt="">
        <span>抱歉，没有找到 “{{cookieDAta}}” 相关结果，请修改或者尝试搜索其他内容</span>
      </div>
  </div>
</template>

<script>

    export default {
        name: "mSearchList",
        data(){
          return {
            params:this.$route.params,
            selectValue:"",
            searchValue:"",
            selectData:"",
            searchData:"",
            cookieDAta:"",
            hideShow:false,
            hideShow2:false,
            dataList:[],
            total:""
          }
        },
        methods:{
          hideShowChange(){
            const self = this;
            // self.hideShow = !self.hideShow;
            $(".mb-hide-search").slideToggle("slow")
          },
          getDataList(){
            const self  = this;
            self.axios({
              method:"get",
              url:self.config.configUrl + "/search?coinType="+self.selectData + "&key="+ self.searchData
            }).then(function (res) {
              console.log(res);
              if(res.data.code == "0"){
                if(res.data.data == null || res.data.data.length < 1){
                  window.location.reload()
                }else if(res.data.data.length == 1){
                  // if(self.selectData == ""){
                  //
                  // }
                  window.open(res.data.data[0].searchUrl)
                }else {
                  self.dataList = res.data.data;
                  self.total = res.data.data.length;
                  self.params.searchWord = self.searchData;
                  self.Cookies.set("mbSelecWord",self.selectData);
                  self.Cookies.set("mbSearchWord",self.searchData);
                }
              }else {
                self.$message.error(res.data.desc)
              }
            })
          },
          backToHome(){
            const self  = this;
            self.$router.push({name:"home"})
          },
          getSearch(){
            const self = this;
            self.selectData = self.selectValue;
            self.searchData = self.searchValue;
            console.log(self.selectData);
            console.log(self.searchData);
            if(self.searchValue == ""){
              //self.$message.error("查询内容不能为空")
              window.location.reload()
            }else {
              self.Cookies.set("mbSelecWord",self.selectData);
              self.Cookies.set("mbSearchWord",self.searchData);
              self.$router.push("msearchList")

            }
          },
          show: function (ev) {
            const that = this;
            if(ev.keyCode == 13){
              that.getSearch();
            }
          }
        },
        mounted(){
          const self = this;
          self.selectData = self.Cookies.get("mbSelecWord")
          self.searchData = self.Cookies.get("mbSearchWord");
          console.log(self.searchData);
          self.cookieDAta = self.searchData;
          console.log(self.params.searchWord)
          //self.getDataList();
        }
    }
</script>

<style scoped>
  .m-list-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3rem;
  }
  .m-list-header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 3.375rem;
    position: fixed;
    background: #ffffff;
    top: 0;
    left: 0;
    border-bottom: 1px solid #C8C8C8;
    align-items: center;
    z-index: 99;
  }
  .m-list-header-btn{
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
  }
  .m-list-header img{
    width: 9.875rem;
    height: auto;
  }
  .m-list-header-btn img{
    width: 1.5rem;
    height: 1.5rem;
  }
  .m-list-info{
    width: 21.875rem;
    text-align: left;
    margin-top: 2rem;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #151515;
    letter-spacing: 0;
  }
  .m-list-info span{
    color: #00A0E9;
    word-wrap: break-word;

  }
  .m-list-min{
    /*margin-bottom: 2rem;*/
  }
  .m-search-hide-box{
    margin-top: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .mb-hide-search{
    width: 22.875rem;
    height: 2.5rem;
    background: #FFFFFF;
    border: 0.125rem solid #00A0E9;
    border-radius: 2.5rem;
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
  }
  .mb-hide-search select{
    border: none;
    background: none;
    outline: none;
    ppearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    font-family: PingFangSC-Regular;
    color: #333333;
    line-height: 0.875rem;
    margin-left: 1rem;
    font-size: 0.75rem;
    padding-right: 1rem;
  }
  .mb-hide-search input{
    border: none;
    outline: none;
    font-size: 0.75rem;
    padding-left: 0.25rem;
    width: 20rem;
    box-sizing: border-box;
  }
  .mb-hide-search-btn{
    width: 2.5rem;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;

  }
  .mb-hide-search-btn img{
    width: 1rem;
    height: 1rem;
  }
  .noList-iamge{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .noList-iamge img{
    width:7.75rem;
    margin-top: 11rem;
  }
  .noList-iamge span{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #666666;
    letter-spacing: 0;
    text-align: center;
    width: 18rem;
    margin-top: 2rem;
    line-height: 1.5rem;
  }
  /**/
  @media (min-width: 420px) and (max-width: 740px){
    .m-list-info{
      width: 34.875rem;
    }
  }
  @media (min-width: 750px) and (max-width: 1024px){
    .m-list-info{
      width: 36.875rem;
      margin-top: 6rem;
    }
    .m-list-min{
      margin-bottom: 3rem;
    }
  }
</style>
