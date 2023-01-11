<template>
  <TablePage :options="table" :data="state.data" :where="state.where">
    <template #search>
      <el-input
        class="w200"
        v-model="state.where.UserName"
        placeholder="请输入用户名"
      />
      <DataGroup start-time="2023-01-01"></DataGroup>
      <SelectData :data="options" value="1"></SelectData>
    </template>
    <template #toolbar>
      <el-button type="primary" @click="state.visible = true"
        ><i class="am-icon-plus"></i> 添加</el-button
      >
    </template>
  </TablePage>
  <FormInfo
    :visible="state.visible"
    :model="form"
    @on-close="state.visible = false"
    @on-submit="onSubmit"
    title="添加"
  >
    <el-form-item label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <Translate :data="form.lang"></Translate>
  </FormInfo>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import TablePage from "@/components/TablePage/index.vue";
import FormInfo from "@/components/FormInfo/index.vue";
import Translate from "@/components/Translate/index.vue";
import DataGroup from "@/components/DateGroup/index.vue"
import SelectData from "@/components/SelectData/index.vue"
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  lang: { CHN: "你好", THN: "你好" },
  resource: "",
  desc: "",
});
const options=new Map();
options.set("1","Online activities")
options.set("2","Promotion activities")
options.set("3","Offline activities")
options.set("4","Simple brand exposure")
const where = reactive({});
const state = reactive({
  where: {
    UserName: undefined,
  },
  visible: false,
  data: [
    {
      date: "2016-05-01",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Home",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Office",
    },
    {
      date: "2016-05-03",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Home",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Office",
    },
    {
      date: "2016-05-05",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Office",
    },
  ],
});
const table = {
  where: {
    UserName: undefined,
  },
  cols: [
    {
      type: "sort",
      width: 50,
      event: (data: []) => {
        console.log(data);
      },
    },
    { type: "checkbox", width: 50 },
    { type: "index", title: "编号", width: 50 },
    { name: "date", title: "日期", width: 150, tip: "日期可筛选", sort: true },
    { name: "name", title: "名称", width: 100 },
    {
      name: "state",
      title: "状态",
      width: 100,
      filters: [{ text: "正常", value: "California" }],
    },
    {
      title: "地址",
      cols: [
        { name: "city", title: "市" },
        { name: "address", title: "详细地址" },
      ],
    },
    {
      type: "toolbar",
      title: "操作",
      template: [
        { type: "delete", title: "删除" },
        {
          type: "edit",
          title: "编辑",
          event: () => {
            state.visible = true;
          },
        },
      ],
    },
  ],
  total: [{ title: "统计" }],
};

const onSubmit = () => {};
</script>
