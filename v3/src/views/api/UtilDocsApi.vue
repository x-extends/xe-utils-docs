<template>
  <div>
    <div v-if="selectItem">
      <vxe-tip status="primary" :title="selectItem.name">
        <div>{{ selectItem.title }}</div>
      </vxe-tip>

      <vxe-grid v-if="gridOptions.columns?.length" v-bind="gridOptions"></vxe-grid>

      <vxe-tip status="success" title="示例"></vxe-tip>
      <CodeList :confs="selectConfs"></CodeList>

      <vxe-row>
        <vxe-col>
          <vxe-button icon="vxe-icon-arrow-left" :disabled="selectIndex <= 0" @click="prevEvent">Previous</vxe-button>
        </vxe-col>
        <vxe-col fill></vxe-col>
        <vxe-col>
          <vxe-button icon="vxe-icon-arrow-right" :disabled="selectIndex >= funcList.length - 1" @click="nextEvent">Next</vxe-button>
        </vxe-col>
      </vxe-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VxeGridProps, VxeGridPropTypes } from 'vxe-table'
import { funcList, funcMaps } from '@/common/func-api'
import XEUtils from 'xe-utils'

const route = useRoute()
const router = useRouter()

const gridOptions = reactive<VxeGridProps>({
  border: true,
  rowConfig: {
    keyField: '0',
    isHover: true,
    isCurrent: true
  },
  columns: [],
  data: []
})

const selectItem = computed(() => {
  return route && route.params ? funcMaps[`${route.params.name}`] : null
})

const selectConfs = computed(() => {
  if (selectItem.value) {
    return selectItem.value.codes.map(code => {
      return {
        language: 'javascript',
        content: code
      }
    })
  }
  return []
})

const selectIndex = computed(() => {
  const sItem = selectItem.value
  return sItem ? XEUtils.findIndexOf(funcList, item => item.name === sItem.name) : -1
})

const loadApiList = () => {
  const tableColumn: VxeGridPropTypes.Columns = []
  const tableData: any[] = []
  if (selectItem.value) {
    if (selectItem.value.params) {
      selectItem.value.params.forEach((list, rIndex) => {
        if (rIndex) {
          const row: Record<string, string> = {}
          tableColumn.forEach((column, cIndex) => {
            row[`${column.field}`] = list[cIndex]
          })
          tableData.push(row)
        } else {
          list.forEach((title, cIndex) => {
            tableColumn.push({
              field: `attr${cIndex}`,
              title: title
            })
          })
        }
      })
    }
  }
  gridOptions.columns = tableColumn
  gridOptions.data = tableData
}

const prevEvent = () => {
  if (selectIndex.value > 0) {
    const targetItem = funcList[selectIndex.value - 1]
    if (targetItem) {
      router.push({
        name: 'DocsApi',
        params: {
          name: targetItem.name
        }
      })
    }
  }
}

const nextEvent = () => {
  if (selectIndex.value < funcList.length - 1) {
    const targetItem = funcList[selectIndex.value + 1]
    if (targetItem) {
      router.push({
        name: 'DocsApi',
        params: {
          name: targetItem.name
        }
      })
    }
  }
}

watch(route, loadApiList)

loadApiList()
</script>
