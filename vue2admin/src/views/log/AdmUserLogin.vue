<template>
  <div class="container">
    <el-form :inline="true" :model="search">
      <el-form-item label="账号">
        <el-input v-model="search.account" placeholder="管理员账号" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="datas" border stripe style="width: 100%">
      <el-table-column prop="account" label="账号" fixed> </el-table-column>
      <el-table-column prop="type" label="登录类型" fixed :formatter="formatLoginType"> </el-table-column>
      <el-table-column prop="time" label="时间" fixed :formatter="formatDate"></el-table-column>

      <el-table-column prop="status" label="状态" :formatter="formatStatus"> </el-table-column>
      <el-table-column prop="ip" label="IP地址"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>

      <el-table-column fixed="right" align="center" label="操作" width="60">
        <template slot-scope="scope">
          <el-button @click="onClickDelete(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageCurrent" :page-sizes="[5, 10, 20]"
      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</template>


<script>
import moment from "moment";

import logService from "@/service/log_service";

export default {
  name: "AdmUserLogin",

  data() {
    return {
      pageCurrent: 1,
      pageSize: 10,

      count: 0,
      datas: [],

      search: {
        account: "",
      },
    };
  },

  created() {
    this.loadDatas();
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

    async onSearch() {
      await this.loadDatas();
    },

    async loadDatas() {
      const params = { account: this.search.account };

      const res = await logService.getLoginAdmUser(
        this.pageCurrent,
        this.pageSize,
        params
      );
      if (!res || res.code != 0) return;

      this.count = res.data.count;
      this.datas = res.data.datas;
    },

    async onClickDelete(row) {
      const res = await logService.delLoginAdmUser(row.id);
      if (!res || res.code != 0) return;

      this.loadDatas();

      this.$message.success("日志删除成功");
    },

    getDataById(id) {
      for (let i = 0; i < this.datas.length; i++) {
        if (this.datas[i].id == id) {
          return this.datas[i];
        }
      }
    },

    formatLoginType(row, column) {
      return row[column.property] == 1 ? "账号登录" : "token登录";
    },

    formatStatus(row, column) {
      return row[column.property] == 0 ? "失败" : "成功";
    },

    formatDate(row, column) {
      return moment(row[column.property] * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>
