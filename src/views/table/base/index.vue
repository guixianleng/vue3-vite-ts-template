<template>
  <div style="margin: 0px 20px 20px; background-color: #fff; padding: 20px">
    <a-space direction="vertical" align="end">
      <a-input-search v-model:value="valueKey" placeholder="请输入名称" allowClear enter-button @search="onSearch" />
      <a-table :columns="columns" :data-source="tableData">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
        </template>
      </a-table>
    </a-space>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address 1',
      ellipsis: true,
    },
    {
      title: 'Long Column Long Column Long Column',
      dataIndex: 'address',
      key: 'address 2',
      ellipsis: true,
      responsive: ['md'],
    },
    {
      title: 'Long Column Long Column',
      dataIndex: 'address',
      key: 'address 3',
      ellipsis: true,
      responsive: ['lg'],
    },
    {
      title: 'Long Column',
      dataIndex: 'address',
      key: 'address 4',
      ellipsis: true,
      responsive: ['lg'],
    },
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

  export default defineComponent({
    setup() {
      const valueKey = ref<string>('')
      const tableData = ref<any>(data)

      const onSearch = (searchValue: string) => {
        const newData: Array<any> = []
        data.filter((ele) => {
          if (ele.name.includes(searchValue)) {
            newData.push(ele)
          }
        })
        tableData.value = newData
      }
      return {
        tableData,
        columns,
        valueKey,
        onSearch,
      }
    },
  })
</script>
