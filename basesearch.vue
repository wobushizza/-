<!--
    *名称：弹窗的搜索条件组件
    *功能：methods
      1.点击搜索的方法：@search
      2.搜索条件 props : formItemList
-->

<template>
  <div class="dialog-search">
    <el-form
      :inline="true"
      ref="ruleForm"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item
        v-for="(item, index) in formItemList"
        :key="index"
        :label="item.label"
      >
        <!-- 下拉选择框 -->
        <el-select
          v-if="item.type == 'select'"
          v-model="formInline[item.param]"
          :multiple="item.multiple"
          placeholder="请选择"
          size="mini"
          clearable
        >
          <el-option
            v-for="(item2, index2) in item.selectOptions"
            :key="index2"
            :label="item2.text"
            :value="item2.value"
          ></el-option>
        </el-select>
        <!-- 下拉选择框end -->

        <!-- 输入框 -->
        <el-input
          v-if="item.type == 'input'"
          v-model="formInline[item.param]"
          size="mini"
          placeholder="请输入"
          clearable
        ></el-input>
        <!-- 输入框 -->

        <!-- 日期范围选择框 -->
        <el-date-picker
          v-if="
            item.type == 'daterange' ||
            item.type == 'datetimerange' ||
            item.type == 'date' ||
            item.type == 'datetime'
          "
          v-model="formInline[item.param]"
          :value-format="item.valueFormat || 'yyyy-MM-dd'"
          :format="item.format || 'yyyy-MM-dd'"
          clearable
          :type="item.type || ''"
          :range-separator="item.rangeSeparator || '至'"
          :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder"
          placeholder="请选择"
          size="mini"
        >
        </el-date-picker>
        <!-- 日期范围选择框end -->

        <!-- 级联选择器 -->
        <!-- <el-cascader
          v-if="item.type == 'cascader'"
          v-model="formInline[item.param]"
          size="mini"
          :options="item.options"
          :props="item.props"
          clearable
        ></el-cascader> -->
        <!-- 级联选择器end -->
      </el-form-item>
      <slot name="formItem"></slot>

      <el-form-item style="width: 10rem">
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        <el-button type="" size="mini" @click="resetForm('ruleForm')"
          >重置</el-button
        >
      </el-form-item>

      <!-- 可用于显示其他按钮 -->
      <slot name="formButton"></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BaseSearch",
  props: {
    formItemList: {
      type: Array,
      default() {
        return [
          {
            label: "下拉框",
            type: "select",
            selectOptions: [
              { text: "待处理", value: 1 },
              { text: "处理中", value: 2 },
              { text: "已完成", value: 3 },
              { text: "已取消", value: 4 },
              { text: "草稿", value: 5 },
            ],
            param: "company",
            // defaultSelect: "222", // 下拉框默认选中项
            multiple: true,
          },
          {
            label: "输入框",
            type: "input",
            param: "name",
          },
          {
            label: "日期范围",
            type: "daterange",
            param: "createtime",
          },
          // {
          //   label: "级联选择器",
          //   type: "cascader",
          //   param: "cascader",
          //   options:[],
          //   props:{ multiple: false }
          // }
        ];
      },
    },
  },
  data() {
    return {
      formInline: {},
    };
  },
  watch: {},
  methods: {
    onSubmit() {
      // console.log('submit!',this.formInline);
      this.$emit("search", this.formInline);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();

      this.formInline = {};

      this.$emit("search", this.formInline);
    },
  },
};
</script>

<style  scoped>
</style>