import * as fs from 'fs'
import * as path from 'path'
import type { Plugin } from 'vite'
import type { PluginOptions } from './types'
export default function themedSvgPlugin(options: PluginOptions): Plugin {
  return {
    name: 'themed-svg',
    load(id) {
      if (!id.endsWith('.vue'))
        return
      const colorConfig = options.color
      let cssStr = ''
      const colorMap = new Map()
      Object.keys(colorConfig).forEach((themeName) => {
        const themeColors = colorConfig[themeName]
        const queryName = themeName === 'root' ? ':root' : `.${themeName.toLowerCase()}`

        const variableStrs: string[] = []
        Object.keys(themeColors).forEach((colorName) => {
          const colorVarName = `--tg-${colorName}`
          const colorValue = themeColors[colorName]

          queryName === ':root' && colorMap.set(colorVarName, colorValue)
          variableStrs.push(`${colorVarName}:${colorValue}`)
        })

        cssStr += `${queryName}{${variableStrs.join(';')}}`
      })
      const styleStr = `<style>${cssStr}</style>`

      const code = fs
        .readFileSync(id, 'utf-8')
        // replace img tag with svg
        .replaceAll(/<img src="([^"]*.svg)".*>/g, (match: string, p1: string) => {
          const imgSvgPath = resolveImgPath(id, p1)
          let svgStr = fs.readFileSync(imgSvgPath, 'utf-8')
          // replace color with css variables
          colorMap.forEach((colorValue, colorVarName) => {
            svgStr = svgStr.replaceAll(`${colorValue}`, `var(${colorVarName})`)
          })

          return svgStr
        })
        .concat(styleStr)

      return {
        code,
      }
    },

  }
}

function resolveImgPath(dir: string, imgPath: string) {
  // ./assets/test.svg => ['..', 'assets', 'test.svg']
  const pathToResolve = imgPath.split('/').reduce((prev, p) => {
    const t = p.startsWith('.')
      ? '..'.repeat(p.split('').length)
      : p
    return [...prev, t]
  }, [] as string[])
  return path.resolve(dir, ...pathToResolve)
}
