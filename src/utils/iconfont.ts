import { nextTick } from 'vue'
import * as elIcons from '@element-plus/icons-vue'

export default function init() {
    // Add custom icon CSS sources here if needed
    // import { loadCss } from './common'; loadCss('https://...')
}

export function getLocalIconfontNames() {
    return new Promise<string[]>((resolve, reject) => {
        nextTick(() => {
            const svgEl = document.getElementById('local-icon')
            if (svgEl?.dataset.iconName) {
                resolve((svgEl.dataset.iconName as string).split(','))
            } else {
                reject('No local icons found')
            }
        })
    })
}

export function getElementPlusIconfontNames() {
    return new Promise<string[]>((resolve, reject) => {
        nextTick(() => {
            const icons = elIcons as any
            const iconfonts = Object.keys(icons).map((key) => `el-icon-${icons[key].name}`)
            if (iconfonts.length > 0) {
                resolve(iconfonts)
            } else {
                reject('No ElementPlus Icons')
            }
        })
    })
}
