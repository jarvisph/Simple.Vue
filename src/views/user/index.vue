<template>
  <TablePage :options="table" :where="state.where">
    <template #search>
      <el-input
        class="w200"
        v-model="state.where.UserName"
        placeholder="请输入用户名"
      />
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
  </FormInfo>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import TablePage from "@/components/TablePage/index.vue";
import FormInfo from "@/components/FormInfo/index.vue";

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const where = reactive({});
const state = reactive({
  where: {
    UserName: undefined,
  },
  visible: false,
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
    { name: "date", title: "日期", width: 150, tip: "日期可筛选" },
    { name: "name", title: "名称", width: 100 },
    { name: "state", title: "状态", width: 100 },
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
  ],
};

const onSubmit = () => {};
</script>
