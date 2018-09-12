<template>
  <div class="home-container">
    <div class="pc-lang-change">
      <el-select v-model="langValue" placeholder="请选择" :change="langChange(langValue)">
        <el-option
          v-for="item in langOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="pc-home-container">
      <div class="pc-home-header">
        <!--<span>登录</span>-->
        <!--<span>注册</span>-->
      </div>
      <div class="pc-home-main">
        <div>
          <div class="pc-home-image">
            <img src="../assets/image/logoDesc.svg" alt="">
          </div>
          <div class="pc-home-search">
            <el-select v-model="selectData" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<div class="select-image">-->
              <!--<img style="margin-left: 0" src="../assets/image/Triangle.svg" alt="">-->
            <!--</div>-->
            <input type="text" v-model="searchValue" @keyup.enter="getSearch" :placeholder="$t('message.placeHolder')">
            <img style="cursor: pointer" src="../assets/image/search.svg" @click="getSearch" alt="">
          </div>
        </div>
        <!---->
        <div class="pc-home-hotInfo">
            <span class="pc-home-hotInfo-label">{{$t("message.giveTry")}}：</span>
            <div class="pc-home-hotInfo-click-box">
              <p class="pc-home-hotInfo-click" v-for="site in finalHot" :style="{background:site.color}" @click="hotPath(site.targetUrl)">{{site.name}}</p>
            </div>
            <div class="pc-home-hotInfo-change" @click="getHot"><img src="../assets/image/change.svg" alt=""></div>
        </div>
          <!--<img class="bottom-image" src="../assets/image/bottom.svg" alt="">-->
          <div class="pc-footer">
              <span class="pc-guanyu" @click="getUs">{{$t('message.about')}}</span>
              <span class="pc-mianze" @click="getPath">{{$t("message.disclaimer")}}</span>
              <span>Copyright © 2017 - 2018 北京知帆科技有限公司 版权所有 京ICP备17074962号</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "home",
        data(){
          return {
            message:"zhe",
            selectData:"",
            searchValue:"",
            options: [{
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
            }],
            hotArr:[],
            finalHot:[],
            langOptions: [{
              value: 'zh',
              label: '中文'
            }, {
              value: 'en',
              label: 'English'
            }],
            langValue: 'zh'
          }
        },
        methods:{
          getSearch(){
            const self  = this;
            if(self.searchValue == ""){
              //self.$message.error("查询内容不能为空")
              window.location.reload()
            } else {
              self.axios({
                method:"get",
                url:self.config.configUrl + "/search?coinType="+self.selectData + "&key="+ self.searchValue
              }).then(function (res) {
                console.log(res);
                if(res.data.code == "0"){
                  if(res.data.data == null || res.data.data.length < 1){
                    self.$router.push({name:"nolist",params:{selectWorld:self.selectData,searchWord:self.searchValue}})
                  }else if(res.data.data.length == 1){
                    // self.Cookies.remove("searchWord")
                    if(self.selectData != ""){
                      window.location.href = res.data.data[0].searchUrl;
                      console.log(1);

                    }else {
                      self.Cookies.set('selectWord',self.selectData);
                      self.Cookies.set('searchWord',self.searchValue);
                      self.$router.push({name:"searchList",params:{selectWorld:self.selectData,searchWord:self.searchValue}})
                      console.log(2);
                    }
                  }else {
                    self.Cookies.set('selectWord',self.selectData);
                    self.Cookies.set('searchWord',self.searchValue);
                    self.$router.push({name:"searchList",params:{selectWorld:self.selectData,searchWord:self.searchValue}})
                  }
                }else {
                  self.$message.error(res.data.desc)
                }
              })
            }
          },
          getPath(){
            window.open("https://www.chaindigg.com/disclaimer")
          },
          getUs(){
            window.open("https://www.chaindigg.com")
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
          langChange(value){
            console.log(value);
            this.Cookies.set("lang",value)
            this.$i18n.locale = value
          }
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
        // this.finalHot = this.hotArr.slice(0,4);
        this.getHotData();
        if(this.Cookies.get("lang") == undefined){
          this.$i18n.locale = 'zh'
        }else {
          this.$i18n.locale = this.Cookies.get("lang")
        }
      }
    }
</script>

<style scoped>
  .pc-home-header{
    height: 3.75em;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .pc-home-header span{
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    line-height: 1rem;
    margin-right: 2.5rem;
  }
  .pc-home-header span:nth-child(2){
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    line-height: 1rem;
    margin-right:3rem;
  }
  .pc-home-main{
    display: flex;
    flex-direction:column;
    align-items: center;
    overflow: auto;
    justify-content: space-between;
  }
  .pc-home-search{
    width: 37.5rem;
    height: 3.25rem;
    background: pink;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border: 0.125rem solid #00A0E9;
    border-radius: 2.5rem;
    margin-top: 3rem;
    box-sizing: border-box;
    position:relative;
  }
  select::-ms-expand { display: none; }
  .pc-home-search select{
    border: none;
    background: none;
    outline: none;
    ppearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    padding-right: 1.25rem;
    ont-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    line-height: 1rem;
    margin-left: 1.5rem;
  }
  pc-home-search option{
    width: 200px;
  }
  .pc-home-search input{
    width: 25rem;
    padding-left: 1rem;
    height: 2rem;
    outline: none;
    border: none;
    font-size: 1rem;
  }
  .pc-home-search img{
    /*margin-left: 3.5rem;*/
    /*cursor: pointer;*/
    position: absolute;
    right: 1.5rem;
    top: 0.775rem;
  }
  .pc-home-image{
    margin-top: 10.5rem;
  }
  .pc-home-desc{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #666666;
    line-height: 1rem;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
  }
  /**/
  .bottom-image{
    width: 100%;
    height: auto;
  }
  .bottom-image img{
    width: 100%;
    height: 100%;
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
  .el-select{
    width: 96px;
    background-image:url("../../src/assets/image/Triangle.svg");
    background-repeat: no-repeat;
    background-position:right center;

  }
  .el-input__inner{
    font-size: 1rem !important;
  }
  .el-select .el-input__inner:focus{
  }
  .select-image{
    margin-left: 0;
  }
  .pc-home-hotInfo{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
  }
  .pc-home-hotInfo-label{
    ont-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #666666;
    margin-left: 3px;
  }
  .pc-home-hotInfo-click{
    font-family: PingFangSC-Regular;
    display: inline-flex;
    padding: 0.4375rem 0.75rem;
    font-size: 0.75rem;
    color: #FFFFFF;
    line-height: 0.75rem;
    border-radius: 0.75rem;
    background: pink;
    margin-right: 0.3125rem;
    cursor: pointer;
  }
  .pc-home-hotInfo-change{
    width: 1.5rem;
    height: 1.5rem;
    background: #ffffff;
    cursor: pointer;
    margin-left: 1.45rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .pc-home-hotInfo-change img{
    width: 0.75rem;
    height: 0.75rem;
  }
  .pc-home-hotInfo-click-box{
    width: 31.4rem;
    display: flex;
    justify-content: flex-start;
  }
  .pc-lang-change{
    border: 1px solid #dcdfe6;
    width: 95px;
    float: right;
    margin-top: 2rem;
    margin-right: 6px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 5px;
  }
  .pc-lang-change .el-select{
    background-position: 80% center;
    background: none;
  }
  .pc-lang-change .el-input__inner{
    padding-left: 0px;
  }
  @media (max-height:770px) and (max-width: 1100px){
    .bottom-image{
      display: flex;
      margin-top: 6.25rem;
      width: 1100px;
      /*position: absolute;*/
      /*left: 0;*/
      /*bottom: 0;*/
    }
    .pc-footer{
      margin-top: 16rem;
      width: 100%;
    }
  }
  @media (max-height:770px) and (min-width: 1100px){
    .bottom-image{
      display: flex;
      margin-top: 6.25rem;
      width: 100%;
      /*position: absolute;*/
      /*left: 0;*/
      /*bottom: 0;*/
    }
    .pc-footer{
      margin-top: 16rem;
      position: static;
      width:100%;
      position: static;
    }
  }
  @media (min-height:770px) and (min-width: 1100px){
    .bottom-image{
      /*margin-top: 6.25rem;*/
      /*width: 1100px;*/
      position: absolute;
      left: 0;
      bottom: 2.25rem;
    }
    .pc-footer{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  @media (min-height:770px) and (max-width: 1100px){
    .bottom-image{
      /*margin-top: 6.25rem;*/
      /*width: 1100px;*/
      position: absolute;
      left: 0;
      bottom: 2.25rem;
    }
    .pc-footer{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
