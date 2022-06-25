<template>
  <div class="container">
    <el-form ref="form" :model="model" :rules="rules" status-icon label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="model.account" placeholder="请输入账号" :readonly="model.id != undefined ? 'readonly' : false"></el-input>
      </el-form-item>

      <el-form-item label="账号类型" prop="type">
        <el-select v-model="model.type" placeholder="请选择.." style="width: 100%">
          <el-option v-for="(item, index) in userTypeDesc" :key="index" :label="item.desc" :value="item.type"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="model.remark"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import common from "@/common";

export default {
  name: "AdmUserEdit",

  props: {
    model: {
      type: Object,
    },
  },

  data() {
    return {
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, message: "账号不能少于 2 个字符", trigger: "blur" },
          { max: 10, message: "账号太长", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择账号类型", trigger: "blur" }],
        remark: [
          { required: true, message: "请输入备注信息", trigger: "blur" },
          { min: 2, message: "备注不能少于 2 个字符", trigger: "blur" },
        ],
      },
    };
  },

  computed: {
    userTypeDesc() {
      const typeDesc = [];
      for (const type in common.adminUserTypeDesc) {
        typeDesc.push({ type: type, desc: common.adminUserTypeDesc[type] });
      }
      return typeDesc;
    },
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;

        this.$emit("submit", this.model);
      });
    },
  },
};
</script>
