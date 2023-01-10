# vite-plugin-svmg

This Vite plugin replaces img tags with svg content when the src attribute points to an SVG file, and allows for configuration options to costomize svg color to match the theme.

## Installation

```bash
npm install vite-plugin-svmg -D
```

## Usage
  
```typescript
import { defineConfig } from 'vite'
import svmg from 'vite-plugin-svmg'

export default defineConfig({
  plugins:[
    svmg({
      color: {
        root: {
          white: '#1d1d1d',
        },
        dark: {
          white: '#ffffff',
        },
      },
    })
  ]
})
```
Your component:
```vue
<template>
  <div>
    <img src="./assets/hello.svg" />
  </div>
</template>
```

toggle theme:

```js
document.documentElement.classList.toggle('dark')
```

TODO:
- support resolve src with alias
- compatible with more theme switch ways
- synchronize img tag attributes or style to svg content
