<template>
  <header>
    <div class="l-content">
    <!-- //tips:为button添加icon  -->
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- //tips:separator是分隔符  面包屑现在 以/分割  ：首页/商品管理/用户管理-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- //tips:下拉栏组件组件 -->
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
            <!-- tips:点击图片实现下拉 -->
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
//tips:引入mapState
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
    //tips:通过require引入
      userImg: require("../assets/images/user.png"),
    };
  },
  methods: {
    handleMenu() {
    //tips:通过vuex修改数据 实现组件间通信
      this.$store.commit("collapseMenu");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    //tips:通过mapState获取面包屑的数据
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>
<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  //tips:左右贴边 上下居中
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
//tips:通过 /deep/ 深度修改
/deep/ .el-breadcrumb__item {
  .el-breadcrumb__inner {
    font-weight: normal;
    &.is-link {
      color: #666;
    }
    a {
      color: #666;
    }
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #fff;
    }
  }
}
</style>