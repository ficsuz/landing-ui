import type { App } from 'vue'
import * as elIcons from '@element-plus/icons-vue'
import Icon from '@/components/icon/index.vue'

export function registerIcons(app: App) {
    app.component('Icon', Icon)

    const icons = elIcons as any
    for (const i in icons) {
        app.component(`el-icon-${icons[i].name}`, icons[i])
    }
}

/**
 * @param {string} path
 * @return {Boolean}
 */
export function isExternal(path: string) {
    return /^(https?|ftp|mailto|tel):/.test(path)
}
