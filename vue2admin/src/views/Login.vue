<template>
  <div class="login-container">
    <el-form :model="model" :rules="rules" status-icon ref="model" label-position="left" label-width="0px" class="login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="model.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="model.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="onClickLogin" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      logining: false,
      model: {
        account: "",
        password: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, message: "账号不能少于 2 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, message: "密码不能少于 5 个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    onClickLogin(event) {
      this.$refs.model.validate((valid) => {
        if (!valid) return false;

        this.logining = true;

        this.$store
          .dispatch("login", this.model)
          .then(() => {
            this.logining = false;

            this.$router.replace({ path: "/" }).catch((err) => {});
          })
          .catch((err) => {
            this.logining = false;
          });
      });
    },
  },
};
</script>


<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
