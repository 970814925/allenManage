<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
        
      >
      <!-- tips:插槽 -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <!-- //tips:slot-scope="."和v-slot='haha' 完全一样 当前组件是element的父组件 正在往子组件塞东西（两个按钮）haha只是形参 用以接收element传递的参数  haha.name1.name2  haha是父组件接收的形参名，name1是子组件传递的形参名，name2是子组件真正传递来的参数名--->
        <!-- <template slot-scope="scope"> -->
            <template v-slot="scope">
        <!-- //tips:点击时调用handleEdit方法 -->
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
          <!-- //tips:   :current-page.sync相当于父子组件间的双向数据绑定 -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
    
  </div>
</template>
<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleEdit(row) {
    //tips:通过emit向父组件传递数据
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    changePage(page) {
        console.log(page,'page')
      this.$emit("changePage2",page);
    },
  },
};
</script>
<style lang="less" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
