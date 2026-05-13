<template>
  <div>
    <CodeLight>
      <template #tip>
        <vxe-tip status="primary">
          通过调用 setConfig({ ... }) 方法可以给组件设置全局默认参数
        </vxe-tip>
      </template>

      <template #use>
        <pre>
          <pre-code class="javascript">
            import XEUtils from 'xe-utils'

            XEUtils.setConfig({
                cookies: {
                  path: '/'
                },
                treeOptions: {
                  strict: false,
                  parentKey: 'parentId',
                  key: 'id',
                  children: 'children',
                  data: null
                },
                parseDateFormat: 'yyyy-MM-dd HH:mm:ss',
                parseDateRules : {
                  q: {
                    1: '1', // 第一季
                    2: '2', // 第二季
                    3: '3', // 第三季
                    4: '4' // 第四季
                  },
                  E: {
                    0: '7', // 星期天
                    1: '1', // 星期一
                    2: '2', // 星期二
                    3: '3', // 星期三
                    4: '4', // 星期四
                    5: '5', // 星期五
                    6: '6' // 星期六
                  }
                },
                commafyOptions: {
                  spaceNumber: 3,
                  separator: ',',
                  fixed: 0
                }
              })
          </pre-code>
        </pre>
      </template>
    </CodeLight>
  </div>
</template>
