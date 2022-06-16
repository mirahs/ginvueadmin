<template>
  <el-menu background-color="#393D49" text-color="#fff" active-text-color="#ffd04b" router :default-active="$route.path" @select="onSelect">
    <side-bar-item :menus="menus"></side-bar-item>
  </el-menu>
</template>


<script>
import SideBarItem from "@/components/SideBarItem.vue";

export default {
  components: {
    SideBarItem,
  },

  props: {
    menus: {
      type: Array,
      default: [],
    },
  },

  methods: {
    onSelect(key, keyPath) {
      this.$emit("select", key, keyPath);
    },
  },
};
</script>
