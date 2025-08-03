import { NavVO } from './nav'
import { funcGroup } from './func-api'

export const navConfigList: NavVO[] = [
  {
    i18nKey: 'app.aside.menu.guide',
    isExpand: true,
    children: [
      {
        i18nKey: 'app.aside.menu.insrall',
        isExpand: true,
        children: [
          { i18nKey: 'app.aside.menu.useNPM', routerLink: { name: 'StartUtilInstall' } },
          { i18nKey: 'app.aside.menu.useCDN', routerLink: { name: 'StartUtilCDN' } }
        ]
      },
      { i18nKey: 'app.aside.menu.globalConfig', routerLink: { name: 'StartConfig' } }
    ]
  }
]

funcGroup.forEach(group => {
  navConfigList.push({
    title: group.label,
    isExpand: group.expand,
    children: group.children.map(item => {
      return {
        title: item.name,
        routerLink: { name: 'DocsApi', params: { name: item.name } },
        describe: item.title,
        isSelfAPI: true
      }
    })
  })
})
