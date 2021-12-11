<template>
    <div class="detail">
    <div class="title">My Account</div>
    <div class="content">
      <div class="progress">
         <img src="../assets/ok.png" alt="success"/>
      </div>
      <div class="footer_info">
        <div class="first_line">
          <span> Maximum Increase Amount</span>
          <span>{{account.maxIncreaseLimit}} </span>
        </div>
        <div class="second_line">
          <span> Increase Limit To</span>
          <span>{{limitTo}}</span>
        </div>
        <div class="second_line">
          <span> Submit Date</span>
          <span>{{submitDate}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   data(){
      return {
         account:{},
         limitTo:'',
         submitDate:''
      }
   },
   mounted(){
      console.log(this.$route.query)
      if(this.$route.query.data){
         this.account=this.$route.query.data
         this.limitTo=this.$route.query.limitTo
         this.submitDate =this.$route.query.submitDate
      }
   }
}
</script>
<style lang="less" scoped>
.title {
  background: green;
  height: 80px;
  color: white;
  font-weight: 600;
  line-height: 80px;
}
.footer_info {
box-sizing: border-box;
  position: absolute;
  padding:0 20px;
  bottom: 150px;
  width: 100%;
  .first_line {
    color: blue;
    display: flex;
    justify-content: space-between;
  }
  .second_line {
    color: blue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/ .el-form-item__label {
      color: blue;
    }
  }
}
</style>