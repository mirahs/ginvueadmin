<template>
  <div class="container">
    <el-table :data="datas" border stripe style="width: 100%">
      <el-table-column prop="account" label="账号" fixed> </el-table-column>
      <el-table-column prop="type" label="类型" :formatter="formatType"> </el-table-column>
      <el-table-column prop="created_at" label="创建时间" :formatter="formatDate">
      </el-table-column>
      <el-table-column prop="login_times" label="登录次数"> </el-table-column>
      <el-table-column prop="login_at" label="最后登陆时间" :formatter="formatDate">
      </el-table-column>
      <el-table-column prop="login_ip" label="最后登陆IP"> </el-table-column>

      <el-table-column prop="locked" label="锁定">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.locked" active-color="#13ce66" @change="onChangeLocked(scope.row.id)"></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="备注"> </el-table-column>

      <el-table-column fixed="right" align="center" label="操作" width="180">
        <template slot="header">
          <el-button @click="onClickAdd" type="primary" icon="el-icon-plus" size="mini">新增</el-button>
        </template>

        <template slot-scope="scope">
          <el-button @click="onClickReset(scope.row)" type="warning" size="mini">重置密码</el-button>
          <el-button @click="onClickEdit(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
          <el-button @click="onClickDelete(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageCurrent" :page-sizes="[5, 10, 20]"
      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
    </el-pagination>

    <el-dialog :title="model.id != null ? '管理员更新' : '管理员添加'" :visible.sync="editShow" center width="30%" :close-on-click-modal="false">
      <adm-user-edit :model="model" @submit="editSubmit" />
    </el-dialog>
  </div>
</template>


<script>
import moment from "moment";
import common from "@/common";

import AdmUserEdit from "./components/AdmUserEdit.vue";
import user_service from "@/service/adm_user_service";

export default {
  name: "AdmUser",

  components: {
    AdmUserEdit,
  },

  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,

      count: 0,
      datas: [],

      editShow: false,
      model: {},
    };
  },

  created() {
    this.loadDatas();
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },

  methods: {
    handleCurrentChange(val) {
      this.pageCurrent = val;
      this.loadDatas();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadDatas();
    },

    onClickAdd() {
      this.editShow = true;
      this.model = {};
    },

    onClickEdit(row) {
      this.editShow = true;

      this.model = { ...this.getDataById(row.id) };
      this.model.type = this.model.type + "";
    },

    async editSubmit(model) {
      const model2 = { ...model };
      model2.type = parseInt(model2.type);

      if (this.model.id == undefined) {
        const res = await user_service.add(model2);
        if (!res || res.code != 0) return;

        this.editShow = false;
        this.loadDatas();

        const password = res.data;
        this.$alert("密码为 " + password, "管理员添加成功", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$copyText(password)
              .then(() => {
                this.$message.success({ message: "密码已复制到剪贴板" });
              })
              .catch(() => {
                this.$message.error({ message: "密码复制失败" });
              });
          },
        });
      } else {
        const res = await user_service.edit(model2.id, model2);
        if (!res || res.code != 0) return;

        this.editShow = false;
        this.loadDatas();

        this.$message.success("管理员更新成功");
      }
    },

    onClickReset(row) {
      if (row.id == this.userInfo.id) {
        this.$message.error({ message: "不能操作自己" });
        return;
      }

      this.$confirm(row.account + " 用户密码将重置，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await user_service.reset(row.id);
          if (!res || res.code != 0) return;

          const password = res.data;
          this.$alert("密码为 " + password, "重置用户密码成功", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$copyText(password)
                .then(() => {
                  this.$message.success({ message: "密码已复制到剪贴板" });
                })
                .catch(() => {
                  this.$message.error({ message: "密码复制失败" });
                });
            },
          });
        })
        .catch(() => {});
    },

    onClickDelete(row) {
      if (row.id == this.userInfo.id) {
        this.$message.error({
          message: "不能操作自己",
        });
        return;
      }

      this.$confirm(row.account + " 用户将永久删除，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await user_service.del(row.id);
          if (!res || res.code != 0) return;

          this.loadDatas();

          this.$message({
            type: "success",
            message: "用户删除成功",
          });
        })
        .catch(() => {});
    },

    async onChangeLocked(id) {
      // 回调时数据已经改变了，这里把改变过后的值发送给后端
      const data = this.getDataById(id);

      const res = await user_service.lock(id);
      if (!res || res.code != 0) {
        data.locked = !data.locked;
      }
    },

    getDataById(id) {
      for (let i = 0; i < this.datas.length; i++) {
        if (this.datas[i].id == id) {
          return this.datas[i];
        }
      }
    },

    async loadDatas() {
      const res = await user_service.getAll(this.pageCurrent, this.pageSize);
      if (!res || res.code != 0) return;

      this.count = res.data.count;
      this.datas = res.data.datas;
    },

    formatType(row, column) {
      return common.adminUserTypeDesc[row[column.property]];
    },

    formatDate(row, column) {
      return moment(row[column.property] * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>
