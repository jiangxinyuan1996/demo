<template>
  <div class="home">
    <div class="title">My Account</div>
    <div class="content">
      <div class="cardInfo">
        <div class="pic box">
          <img
            :src="'../assets/bankcard' + value + '.png'"
            style="width: 100%; height: 100%"
          />
        </div>
        <div class="selectCard box">
          <el-select
            v-model="value"
            placeholder="请选择"
            @change="selectChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div>
            <span>{{
              options[value - 1].account.replace(
                /^(\d{4})\d+(\d{4})$/,
                "********$2"
              )
            }}</span>
          </div>
          <div>Card quota:{{options[value-1].limit}}</div>
        </div>
      </div>
      <div class="progress">
        <div>Avaliable Limit</div>
        <el-progress
          style="margin: 30px"
          type="circle"
          :percentage="
            (options[value - 1].used / options[value - 1].limit).toFixed(2) *
            100
          "
        ></el-progress>
      </div>
      <div class="footer_info">
        <div class="first_line">
          <span> Maximum Increase Amount</span>
          <span> {{ "$" + options[value - 1].maxIncreaseLimit }}</span>
        </div>
        <div class="second_line">
          <span> Increase Limit To</span>
          <el-form
            ref="ruleForm"
            v-model="form"
            :rules="rules"
            label-width="20px"
          >
            <el-form-item label="$" style="padding-top: 15px" prop="limitTo">
              <el-input
                v-model.number="form.limitTo"
                placeholder="请输入 Increase Limit"
                @blur="formatNumber(form.limitTo)"
                @focus="change"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >SUBMIT</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: "Home",
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.form.limitTo === "") {
        callback(new Error("请输入提升的额度"));
      } else {
        callback();
      }
    };
    return {
      value: "1",
      form: {
        limitTo: "",
      },
      isSubmit:true,
      rules: {
        limitTo: [{ validator: validatePass, trigger: "blur" }],
      },
      options: [],
    };
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      axios.get('http://10.91.7.159:9080/myaccount').then(res=>{
        if(res.data.status===200){
          this.options = res.data.data
        }
      })
    },
    submitForm() {
      if (this.form.limitTo !== "") {
        if(this.isSubmit){
           axios.get('http://10.91.7.159:9080/submit').then(res=>{
            if(res.data.data){
              const date = new Date();
              this.$router.push({
                path: "/detail",
                query: {
                  data: this.options[this.value - 1],
                  limitTo: this.form.limitTo,
                  submitDate:
                    date.getFullYear() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getDay(),
                },
              });
            }
           })
        }
      } else {
        this.$message({
          type: "warning",
          message: "请输入 Increase Limit To",
        });
      }
    },
    selectChange() {
      this.form.limitTo = "";
    },
    formatNumber(str) {
      if (
        Number(str) > this.options[this.value - 1].maxIncreaseLimit ||
        Number(str) < this.options[this.value - 1].limit
      ) {
        if (this.form.limitTo !== "") {
          this.isSubmit=false
          this.$message({
            type: "warning",
            message: "提升额度需大于卡额度，小于最大额度",
          });
        }
        return;
      }
      this.isSubmit=true
      const newdata = Number(str).toFixed(2);
      this.form.limitTo = newdata
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    change() {
      this.form.limitTo = this.form.limitTo.replace(/(.00)$/g, "");
      this.form.limitTo = this.form.limitTo.replace(/,/g, "");
    },
  },
};
</script>
<style lang="less" scoped>
.title {
  background: green;
  height: 80px;
  color: white;
  font-weight: 600;
  line-height: 80px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cardInfo {
  height: 100px;
  width: 80%;
  display: flex;
  padding: 10px;
  .box {
    flex: 1;
  }
}
.progress {
  margin-top: 30px;
}
.footer_info {
  position: absolute;
  bottom: 50px;
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

