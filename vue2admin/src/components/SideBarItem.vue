<template>
  <div>
    <template v-for="menu in menus">
      <el-submenu v-if="menu.children" :key="menu.name" :index="menu.name">
        <template slot="title"
          ><span>{{ menu.desc }}</span></template
        >
        <side-bar-item :menus="menu.children"></side-bar-item>
      </el-submenu>
      <el-menu-item v-else :key="menu.name" :index="menu.route" :route="menu.route"
        ><span slot="title">{{ menu.desc }}</span></el-menu-item
      >
    </template>
  </div>
</template>

<script>
export default {
  name: "SideBarItem",
  props: {
    menus: {
      type: Array,
      default: [],
    },
  },
};
</script>
