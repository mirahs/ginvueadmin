<template>
  <el-container>
    <el-header>
      <el-row type="flex">
        <el-col :xs="19" :sm="20" :md="21" :lg="21" :xl="22">
          <el-menu :default-active="activeHeader" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#23262E" text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item v-for="menu in menus" :key="menu.name" :index="menu.name">{{ menu.desc }}</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="2" class="user-info">
          <template v-if="userInfo">
            <el-dropdown trigger="click" class="user-info-dd">
              <span class="el-dropdown-link">
                <i class="el-icon-user"></i> {{ userInfo.account }}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="jumpTo('/home/Welcome')">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="jumpTo('/sys/AdmUserPassword')">修改密码</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside>
        <the-side-bar :menus="menusAside" @select="handleSelectAside"></the-side-bar>
      </el-aside>

      <el-main>
        <el-breadcrumb class="main-head" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbs[$route.path]" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import { mapState, mapMutations } from "vuex";

import TheSideBar from "@/components/TheSideBar.vue";

export default {
  components: {
    TheSideBar,
  },

  computed: {
    ...mapState("menu", [
      "menus",
      "headerRoutes",
      "menusAside",
      "activeHeader",
      "breadcrumbs",
    ]),

    userInfo() {
      return this.$store.state.userInfo;
    },
  },

  mounted() {
    this.handleSelect(this.activeHeader);
  },

  methods: {
    ...mapMutations("menu", ["onHeaderTap", "onAsideTap"]),

    // 顶部菜单点击
    handleSelect(key, keyPath) {
      if (keyPath != undefined && key == this.activeHeader) return;

      this.onHeaderTap(key);

      this.$router.replace({ path: this.headerRoutes[key] });
    },

    // 左侧菜单点击
    handleSelectAside(key, keyPath) {
      this.onAsideTap(key);
    },

    jumpTo(path) {
      this.$router.replace({ path: path });
    },

    logout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning",
      })
        .then(() => {
          this.$store.dispatch("logout");
        })
        .catch(() => {});
    },
  },
};
</script>


<style scoped>
.el-header {
  padding: 0px;
}
.el-aside {
  width: 200px !important;
  background-color: #393d49;
}
.el-main {
  padding: 0px;
}

.user-info {
  padding-right: 15px;
  margin-bottom: 1px;
  background-color: #23262e;

  display: -webkit-flex;
  display: flex;
  justify-content: flex-end; /*子元素在水平轴上的对齐方式*/
  align-items: center; /*子元素在垂直轴上的对齐方式*/
}
.user-info-dd {
  /* align-self: center; */ /*如果你元素设置了aligh-items为center就不用设置了*/
  color: #ffffff;
}

.main-head {
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  background-color: #eee;
}

.el-main > .container {
  padding: 9px 15px 15px;
  text-align: left;
}
</style>
