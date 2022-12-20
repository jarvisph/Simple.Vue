<template>
  <TablePage :options="table"></TablePage>
</template>

<script lang="ts" setup>
import TablePage from "@/components/TablePage/index.vue";
const table = {
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
        { type: "edit", title: "编辑" },
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
</script>
