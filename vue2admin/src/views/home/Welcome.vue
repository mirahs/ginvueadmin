<template>
  <div class="container">
    你好, <span style="color: #f56c6c">{{ userInfo.account }}</span>！
  </div>
</template>


<script>
export default {
  name: "Welcome",

  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>
