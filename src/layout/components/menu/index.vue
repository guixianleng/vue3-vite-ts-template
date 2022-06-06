<script lang="tsx">
  import { defineComponent, ref, computed } from 'vue'
  import { useRouter, RouteRecordRaw, RouteRecordNormalized } from 'vue-router'
  import { useAppStore } from '/@/store'
  import usePermission from '/@/hooks/permission'
  import { listenerRouteChange } from '/@/utils/route-listener'

  import { Icon } from '/@/components/Icon'

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const appStore = useAppStore()
      const permission = usePermission()
      const router = useRouter()
      const collapsed = computed({
        get() {
          if (appStore.device === 'desktop') return appStore.menuCollapse
          return false
        },
        set(value: boolean) {
          appStore.updateSettings({ menuCollapse: value })
        },
      })

      const appRoute = computed(() => {
        return router.getRoutes().find((el) => el.name === 'root') as RouteRecordNormalized
      })

      // menu tree data
      const menuTree = computed(() => {
        const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children))
        copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
          return (a.meta.order || 0) - (b.meta.order || 0)
        })
        function travel(_routes: RouteRecordRaw[], layer: number) {
          if (!_routes) return null
          const collector: any = _routes.map((element) => {
            // no access
            if (!permission.accessRouter(element)) {
              return null
            }

            // leaf node
            if (!element.children) {
              return element
            }

            // route filter hideInMenu true
            element.children = element.children.filter((x) => x.meta?.hideInMenu !== true)

            // Associated child node
            const subItem = travel(element.children, layer)
            if (subItem.length) {
              element.children = subItem
              return element
            }
            // the else logic
            if (layer > 1) {
              element.children = subItem
              return element
            }

            if (element.meta?.hideInMenu === false) {
              return element
            }

            return null
          })
          return collector.filter(Boolean)
        }
        return travel(copyRouter, 0)
      })
      // In this case only two levels of menus are available
      // You can expand as needed

      const selectedKey = ref<string[]>([])
      const openKeys = ref<string[]>([])

      const goto = (item: RouteRecordRaw) => {
        router.push({
          name: item.name,
        })
      }
      listenerRouteChange((newRoute) => {
        if (newRoute.meta.requiresAuth && !newRoute.meta.hideInMenu) {
          const selectKey = newRoute.matched[2]?.name as string
          selectedKey.value = [selectKey]
          const openKey = newRoute.matched[1]?.name as string
          openKeys.value = [openKey]
        }
      }, true)
      const setCollapse = (val: boolean) => {
        if (appStore.device === 'desktop') {
          appStore.updateSettings({ menuCollapse: val })
        }
      }

      const renderSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((element) => {
              // This is demo, modify nodes as needed
              const menuIcon = element?.meta?.icon ? <Icon icon={element?.meta?.icon} /> : ``
              const slots = {
                icon: () => menuIcon,
              }
              const subMenuR = (
                <a-sub-menu key={element?.name} v-slots={slots} title={element?.meta?.locale}>
                  {element?.children?.map((elem) => {
                    return (
                      <a-menu-item key={elem.name} onClick={() => goto(elem)}>
                        {elem?.meta?.locale || ''}
                        {travel(elem.children ?? [])}
                      </a-menu-item>
                    )
                  })}
                </a-sub-menu>
              )
              const menuR = (
                <a-menu-item key={element?.name} onClick={() => goto(element)} v-slots={slots}>
                  {element?.meta?.locale || ''}
                </a-menu-item>
              )
              const r = element?.children ? subMenuR : menuR
              nodes.push(r as never)
            })
          }
          return nodes
        }
        return travel(menuTree.value)
      }
      return () => (
        <a-menu
          v-model:collapsed={collapsed.value}
          show-collapse-button={appStore.device !== 'mobile'}
          v-model:selectedKeys={selectedKey.value}
          style="height: 100%"
          onCollapse={setCollapse}
          mode="inline"
          v-model:open-keys={openKeys.value}
        >
          {renderSubMenu()}
        </a-menu>
      )
    },
  })
</script>
