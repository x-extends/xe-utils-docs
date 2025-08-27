<template>
  <div>
    <CodeLight>
      <template #tip>
        <vxe-tip status="primary" title="NPM 方式">
          <div>一个纯原生 javaascript 工具类函数库。</div>
        </vxe-tip>
      </template>

      <template #use>
        <pre>
          <pre-code
            language="shell"
            :content="`
            npm install ${ utilCDNLib }
            # 或者
            yarn add ${ utilCDNLib }
            # 或者
            pnpm add ${ utilCDNLib }
            `">
          </pre-code>
          <pre-code
            language="javascript"
            content="
            // ...
            import XEUtils from 'xe-utils'
            // ...

            XEUtils.toStringDate('2017/12/20 10:10:30', 'yyyy/MM/dd HH:mm:ss') // Wed Dec 20 2017 10:10:30 GMT+0800 (中国标准时间)
            // ...">
          </pre-code>
        </pre>
      </template>
    </CodeLight>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const utilCDNLib = computed(() => appStore.utilCDNLib)
</script>
