<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"  @open="handleOpen" 
    @close="handleClose" :collapse="isCollapse">
    <!-- //tips:通过判别式展示标题内容 -->
        <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path"> 
           <!-- noChildren -->
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :index="item.label" :key="item.label">  
              <!-- hasChildren -->
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="(subItem, subIndex) in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subIndex.toString()">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
      height: 100%;
      border: none;
      h3 {
          color: #fff;
          text-align: center;
          line-height: 48px
      }
  }
</style>

<script>
  export default {
    data() {
      return {
        menu: []
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item) {
          this.$router.push({
            //   name: item.name,      //跳转到对应name或者path的页面
            path: item.path
          })
          this.$store.commit('selectMenu', item)
      }
    },
    computed: {
        noChildren() {
            return this.asyncMenu.filter(item => !item.children) //单纯一级菜单
        },
        hasChildren() {
            return this.asyncMenu.filter(item => item.children) //含有子菜单
        },
        isCollapse() {
            //tips:获取vuex中的数据
          return this.$store.state.tab.isCollapse
        },
        asyncMenu() {
          return this.$store.state.tab.menu
        }
    }
  }
</script>