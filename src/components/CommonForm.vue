<template>
<!-- tips:表单的具体数据如 name:'河水' 存储在form中 表单每一项如input或者select由formLabel决定-->
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
    <!-- //tips:用obj[a.b]的方式读取对象obj中 key为a.b的value -->
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- tips:其他内容就放在slot里面 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "CommonForm",
  //tips:通过props接收父组件的参数 并且指定数据类型   首字母大写
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
  data() {
    return {};
  },
};
</script>
