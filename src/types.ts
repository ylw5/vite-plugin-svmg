export interface PluginOptions {
  color: ColorThemeConfig
}
interface ColorThemeConfig {
  [themeName: string]: {
    [colorName: string]: string
  }
}
