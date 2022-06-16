<template>
  <div class="container">
    你好, <span style="color: #f56c6c">{{ this.$store.state.userInfo.account }}</span>！
    <template v-if="isFch">
      月卡: {{ userInfo.fch_month_card }}, 年卡: {{ userInfo.fch_year_card }}
    </template>
  </div>
</template>


<script>
import common from "@/common";

export default {
  name: "Welcome",

  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },

    isFch() {
      return this.userInfo.type == common.adminUserTypeFch;
    },
  },
};
</script>
