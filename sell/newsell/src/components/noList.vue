<template>
    <div class="pc-list-container">
        <div class="pc-list-header">
            <div class="pc-list-header-left">
              <img src="../assets/image/logo.svg" @click="getHome" alt="">
              <div class="pc-list-header-search">
                <el-select v-model="selectData" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <input type="text" v-model="searchValue" @keyup.enter="getSearch" placeholder="区块高度/区块哈希值/交易哈希值/地址哈希值">
                <img src="../assets/image/search.svg" @click="getSearch" alt="">
              </div>
            </div>
            <div class="pc-list-header-right">
                <!--<span>登录</span>-->
                <!--<span>注册</span>-->
            </div>
        </div>
        <div class="pc-list-main">
          <img :src="imageUrl" alt="">
          <span>抱歉，没有找到 “{{params.searchWord}}” 相关结果，请修改或者尝试搜索其他内容</span>
        </div>
      <div class="pc-footer">
        <span class="pc-guanyu" @click="getUs">关于我们</span>
        <span class="pc-mianze" @click="getPath">免责声明</span>
        <span>Copyright © 2017 - 2018 北京知帆科技有限公司 版权所有 京ICP备17074962号</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "searchList",
        data(){
          return {
            selectData:"",
            params:this.$route.params,
            searchValue:"",
            finalData:[],
            total:"",
            imageUrl:"/static/image/nolist.png",
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
                    self.params.searchWord = self.searchValue;
                  }else {
                    self.Cookies.set('selectWord',self.selectData);
                    self.Cookies.set('searchWord',self.searchValue);
                    self.$router.push({name:"searchList",params:{selectWorld:self.selectData,searchWord:self.searchValue}})

                  }
                }else {
                    self.$message.error(res.data.desc)
                }
              })
            },
          getPath(){
            window.open("https://www.chaindigg.com/disclaimer")
          },
          getUs(){
            window.open("https://www.chaindigg.com")
          },
        },
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
    width: 23rem;
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
  }
  .pc-list-header-right span{
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    line-height: 1rem;
    margin-right: 1.5rem;
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
    letter-spacing: 0;
  }
  /**/
  .pc-list-stencli{
    width: 100%;
    box-sizing: border-box;
    padding:  0 5%;
  }
  .pc-list-main{
    position: absolute;
    top: 4rem;
    left: 0;
    right: 0;
    bottom: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .pc-list-main span{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #666666;
    letter-spacing: 0;
    margin-top: 3rem;
    width: 54rem;
    text-align: center;
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
    padding-left: 0px;
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
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .pc-guanyu,.pc-mianze{
    margin-right: 2rem;
    cursor: pointer;
  }
</style>
