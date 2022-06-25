<template>
  <div class="container">
    <el-form ref="passwordForm" :model="model" :rules="rules" status-icon label-width="100px">
      <el-form-item label="账号">
        <el-col :span="6">
          <el-input v-model="model.account" readonly></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="新密码" prop="password">
        <el-col :span="6">
          <el-input type="password" v-model="model.password" placeholder="请输入新密码" autocomplete="new-password"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="确认新密码" prop="repassword">
        <el-col :span="6">
          <el-input type="password" v-model="model.repassword" placeholder="请输入确认新密码" autocomplete="new-password"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('passwordForm')">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import user_service from "@/service/adm_user_service";

export default {
  name: "AdmUserPassword",

  data() {
    return {
      id: this.$store.state.userInfo.id,

      model: {
        account: this.$store.state.userInfo.account,
        password: "",
        repassword: "",
      },

      rules: {
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 5, message: "密码不能少于5个字符", trigger: "blur" },
        ],
        repassword: [
          { required: true, message: "请输入确认新密码", trigger: "blur" },
          { min: 5, message: "密码不能少于5个字符", trigger: "blur" },
          { validator: this.validatePasswordSame, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;

        var res = await user_service.password({
          password: this.model.password,
        });
        if (res.code != 0) return;

        this.$message.success("密码更新成功");

        this.model.password = "";
        this.model.repassword = "";
      });
    },

    validatePasswordSame(rule, value, callback) {
      if (value !== this.model.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    },
  },
};
</script>
