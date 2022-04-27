export interface AppState {
  theme: string
  colorWeek: boolean
  navbar: boolean
  menu: boolean
  hideMenu: boolean
  menuCollapse: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  globalSettings: boolean
  device: string
  tabBar: boolean
  breadcrumb: boolean
  [key: string]: unknown
}
