<template>
    <div class="multi-uploader">
        <div ref="gridRef" class="multi-uploader__grid">
            <div
                v-for="(id, i) in items"
                :key="id"
                class="multi-uploader__item"
                :class="{ 'is-sortable': sortable, 'is-placeholder': ghost?.id === id }"
                @pointerdown="onPointerDown($event, id)"
                @contextmenu="onContextMenu"
                @dragstart.prevent
            >
                <img :src="getMediaUrl(id)" class="multi-uploader__img" alt="" draggable="false" />
                <button type="button" class="multi-uploader__remove" @click="removeAt(i)">
                    <el-icon><Close /></el-icon>
                </button>
                <span class="multi-uploader__index">{{ i + 1 }}</span>
            </div>

            <el-upload
                v-if="modelValue.length < max"
                class="multi-uploader__add"
                :auto-upload="false"
                :show-file-list="false"
                accept="image/*"
                :on-change="onChange"
            >
                <div class="multi-uploader__add-inner">
                    <el-icon v-if="!uploading"><Plus /></el-icon>
                    <el-icon v-else class="is-loading"><Loading /></el-icon>
                    <span class="multi-uploader__add-text">{{ uploading ? 'Uploading…' : 'Add image' }}</span>
                </div>
            </el-upload>
        </div>
        <p class="multi-uploader__hint">
            <template v-if="Number.isFinite(max)">{{ modelValue.length }} / {{ max }} images</template>
            <template v-else>{{ modelValue.length }} images</template>
            <template v-if="sortable"> · Drag to reorder</template>
        </p>

        <!-- Teleported so no transformed ancestor (the dialog) can offset the fixed positioning. -->
        <Teleport to="body">
            <div v-if="ghost" class="multi-uploader__ghost" :class="{ 'is-settling': ghost.settling }" :style="ghostStyle">
                <div class="multi-uploader__ghost-tile">
                    <img :src="getMediaUrl(ghost.id)" class="multi-uploader__img" alt="" draggable="false" />
                    <span class="multi-uploader__index">{{ items.indexOf(ghost.id) + 1 }}</span>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Plus, Close, Loading } from '@element-plus/icons-vue'
import { ElMessage, useZIndex, type UploadFile } from 'element-plus'
import { useFileStore } from '@/stores'
import { getMediaUrl } from '@/utils/media'

const props = withDefaults(defineProps<{ modelValue: string[]; max?: number }>(), {
    max: 4,
})
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

const fileStore = useFileStore()
const uploading = ref(false)

const onChange = async (file: UploadFile) => {
    const raw = file.raw as File
    if (!raw) return
    if (props.modelValue.length >= props.max) return

    uploading.value = true
    try {
        const response = await fileStore.uploadFile(raw)
        if (response.success && response.data) {
            emit('update:modelValue', [...props.modelValue, response.data.id])
        }
    } catch {
        ElMessage.error('Failed to upload image')
    } finally {
        uploading.value = false
    }
}

function removeAt(i: number) {
    const next = [...props.modelValue]
    next.splice(i, 1)
    emit('update:modelValue', next)
}

// ── Drag to reorder ──────────────────────────────────────────────────────────
const DRAG_THRESHOLD = 5 // px the mouse must travel before a press becomes a drag
const HOLD_MS = 250 // touch picks a tile up by holding, so a swipe still scrolls the dialog
const HOLD_SLOP = 10 // px a finger may drift during that hold
const SWAP_MARGIN = 12 // px a slot must be nearer than the current one before tiles swap
const MOVE_MS = 200 // displaced tiles sliding to their new slot
const SETTLE_MS = 180 // dropped tile flying into its slot — keep in sync with the CSS transition
const EASING = 'cubic-bezier(0.2, 0, 0, 1)'
const SCROLL_EDGE = 48 // px from the scroll container's edge where auto-scroll starts
const SCROLL_SPEED = 14 // max px scrolled per frame

interface Press {
    id: string
    el: HTMLElement
    pointerId: number
    touch: boolean
    startX: number
    startY: number
    x: number
    y: number
}

interface Ghost {
    id: string
    x: number
    y: number
    width: number
    height: number
    lineHeight: string
    zIndex: number
    settling: boolean
}

const { nextZIndex } = useZIndex()
const gridRef = ref<HTMLElement | null>(null)
// Working order while a tile is in the air; written back to v-model on drop.
const order = ref<string[] | null>(null)
const ghost = ref<Ghost | null>(null)
const items = computed(() => order.value ?? props.modelValue)
const sortable = computed(() => props.modelValue.length > 1)
const ghostStyle = computed(() => {
    const g = ghost.value
    if (!g) return undefined
    return {
        width: `${g.width}px`,
        height: `${g.height}px`,
        lineHeight: g.lineHeight,
        zIndex: g.zIndex,
        transform: `translate3d(${g.x}px, ${g.y}px, 0)`,
    }
})

let press: Press | null = null
let grabX = 0
let grabY = 0
let holdTimer: number | undefined
let settleTimer: number | undefined
let scrollFrame = 0
let scrollParent: HTMLElement | null = null

function tiles(): HTMLElement[] {
    const grid = gridRef.value
    if (!grid) return []
    return Array.from(grid.children).filter((el): el is HTMLElement => el.classList.contains('multi-uploader__item'))
}

// FLIP: apply a reorder, then slide each displaced tile from where it was to where it now sits.
function flip(change: () => void, skip?: HTMLElement) {
    const before = tiles().map((el) => ({ el, rect: el.getBoundingClientRect() }))
    change()
    nextTick(() => {
        for (const { el, rect } of before) {
            if (el === skip || !el.isConnected) continue
            el.getAnimations().forEach((animation) => animation.cancel())
            const now = el.getBoundingClientRect()
            const dx = rect.left - now.left
            const dy = rect.top - now.top
            if (dx || dy) {
                el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: MOVE_MS, easing: EASING })
            }
        }
    })
}

// Move the dragged id to the slot nearest the ghost's centre. Slots are read from
// offsetLeft/offsetTop, which ignore the transforms of tiles still sliding, so the
// target cannot flicker while neighbours move out of the way.
function reorder() {
    const g = ghost.value
    const list = order.value
    const grid = gridRef.value
    if (!g || !list || !grid || !press) return

    const origin = grid.getBoundingClientRect()
    const cx = g.x + g.width / 2 - origin.left
    const cy = g.y + g.height / 2 - origin.top
    // Carried well clear of the grid: leave the order as it stands.
    if (cx < -g.width || cy < -g.height || cx > origin.width + g.width || cy > origin.height + g.height) return

    const distances = tiles().map((el) => Math.hypot(el.offsetLeft + el.offsetWidth / 2 - cx, el.offsetTop + el.offsetHeight / 2 - cy))
    if (distances.length !== list.length) return
    const from = list.indexOf(g.id)
    const to = distances.indexOf(Math.min(...distances))
    // The margin stops a tile held between two slots from flipping back and forth.
    if (from === -1 || to === -1 || to === from || distances[to] > distances[from] - SWAP_MARGIN) return

    const next = [...list]
    next.splice(to, 0, next.splice(from, 1)[0])
    flip(() => (order.value = next), press.el)
}

function getScrollParent(el: HTMLElement): HTMLElement | null {
    for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
        const { overflowY } = getComputedStyle(node)
        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) return node
    }
    return null
}

// Scroll the dialog while a tile is held near its top or bottom edge, so a long
// gallery can be reordered across rows that are out of view.
function autoScroll() {
    scrollFrame = requestAnimationFrame(autoScroll)
    if (!press || !order.value) return

    const bounds = scrollParent?.getBoundingClientRect()
    const top = Math.max(bounds?.top ?? 0, 0)
    const bottom = Math.min(bounds?.bottom ?? window.innerHeight, window.innerHeight)
    const speed = (depth: number) => Math.ceil(Math.min(depth / SCROLL_EDGE, 1) * SCROLL_SPEED)

    let delta = 0
    if (press.y < top + SCROLL_EDGE) delta = -speed(top + SCROLL_EDGE - press.y)
    else if (press.y > bottom - SCROLL_EDGE) delta = speed(press.y - (bottom - SCROLL_EDGE))
    if (!delta) return

    // The resulting scroll event re-runs reorder() against the shifted grid.
    if (scrollParent) scrollParent.scrollTop += delta
    else window.scrollBy(0, delta)
}

function startDrag() {
    if (!press || !press.el.isConnected || !props.modelValue.includes(press.id)) {
        endDrag(false)
        return
    }
    const rect = press.el.getBoundingClientRect()
    grabX = Math.min(Math.max(press.startX - rect.left, 0), rect.width)
    grabY = Math.min(Math.max(press.startY - rect.top, 0), rect.height)

    order.value = [...props.modelValue]
    ghost.value = {
        id: press.id,
        x: press.x - grabX,
        y: press.y - grabY,
        width: rect.width,
        height: rect.height,
        // The ghost lives in <body>, outside the form whose line-height the tile inherits.
        lineHeight: getComputedStyle(press.el).lineHeight,
        zIndex: nextZIndex(),
        settling: false,
    }
    scrollParent = getScrollParent(press.el)
    scrollFrame = requestAnimationFrame(autoScroll)
    document.documentElement.classList.add('multi-uploader-sorting')
}

function endDrag(commit: boolean) {
    const g = ghost.value
    const next = order.value
    const dragged = press?.el

    window.clearTimeout(holdTimer)
    press = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerCancel)
    window.removeEventListener('keydown', onKeyDown, true)
    window.removeEventListener('scroll', onScroll, true)
    window.removeEventListener('blur', onBlur)
    // The press never became a drag — nothing to put down.
    if (!g || !next) return

    cancelAnimationFrame(scrollFrame)
    scrollParent = null
    document.documentElement.classList.remove('multi-uploader-sorting')

    if (commit) {
        order.value = null
        if (next.some((id, i) => id !== props.modelValue[i])) emit('update:modelValue', [...next])
    } else {
        flip(() => (order.value = null), dragged)
    }

    // Fly the ghost into the slot its tile ended up in, then let the real tile take over.
    g.settling = true
    nextTick(() => {
        if (ghost.value !== g) return
        const tile = tiles()[items.value.indexOf(g.id)]
        const grid = tile?.offsetParent
        if (!tile || !grid) {
            ghost.value = null
            return
        }
        const origin = grid.getBoundingClientRect()
        g.x = origin.left + tile.offsetLeft
        g.y = origin.top + tile.offsetTop
        settleTimer = window.setTimeout(finishSettle, SETTLE_MS)
    })
}

function finishSettle() {
    window.clearTimeout(settleTimer)
    if (ghost.value?.settling) ghost.value = null
}

function onPointerDown(e: PointerEvent, id: string) {
    if (!sortable.value || !e.isPrimary || e.button !== 0) return
    if ((e.target as Element).closest('.multi-uploader__remove')) return
    // A press whose release we never saw must not block this one.
    endDrag(false)
    finishSettle()

    // Fingers and pens scroll by dragging, so they pick a tile up by holding instead.
    const touch = e.pointerType !== 'mouse'
    press = {
        id,
        el: e.currentTarget as HTMLElement,
        pointerId: e.pointerId,
        touch,
        startX: e.clientX,
        startY: e.clientY,
        x: e.clientX,
        y: e.clientY,
    }
    if (touch) holdTimer = window.setTimeout(startDrag, HOLD_MS)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerCancel)
    window.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('blur', onBlur)
}

function onPointerMove(e: PointerEvent) {
    if (!press || e.pointerId !== press.pointerId) return
    // The button came up somewhere we could not see it (outside the window, over a native menu).
    if (!press.touch && e.buttons === 0) {
        endDrag(true)
        return
    }
    press.x = e.clientX
    press.y = e.clientY

    if (!order.value) {
        const travelled = Math.hypot(press.x - press.startX, press.y - press.startY)
        if (press.touch) {
            // Moving before the hold elapses is a scroll gesture, not a pick-up.
            if (travelled > HOLD_SLOP) endDrag(false)
            return
        }
        if (travelled < DRAG_THRESHOLD) return
        startDrag()
    }
    if (!ghost.value || !order.value) return
    ghost.value.x = press.x - grabX
    ghost.value.y = press.y - grabY
    reorder()
}

function onPointerUp(e: PointerEvent) {
    if (press && e.pointerId === press.pointerId) endDrag(true)
}

function onPointerCancel(e: PointerEvent) {
    if (press && e.pointerId === press.pointerId) endDrag(false)
}

function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Escape' || !order.value) return
    // Escape puts the tile back; keep it from also closing the surrounding dialog.
    e.preventDefault()
    e.stopPropagation()
    endDrag(false)
}

function onScroll() {
    if (order.value) reorder()
}

function onBlur() {
    endDrag(false)
}

// A long press on an image opens the browser's own menu on touch devices.
function onContextMenu(e: Event) {
    if (press?.touch) e.preventDefault()
}

// touch-action is left alone so a swipe over the thumbnails still scrolls the dialog;
// once a tile is picked up the page must stop following the finger instead.
function onTouchMove(e: TouchEvent) {
    if (order.value && e.cancelable) e.preventDefault()
}

// An upload that finishes mid-drag appends an id underneath us — fold it into the working order.
watch(
    () => [...props.modelValue],
    (value) => {
        const g = ghost.value
        if (!order.value || !g) return
        if (!value.includes(g.id)) {
            endDrag(false)
            return
        }
        const kept = order.value.filter((id) => value.includes(id))
        order.value = [...kept, ...value.filter((id) => !kept.includes(id))]
    }
)

onMounted(() => {
    gridRef.value?.addEventListener('touchmove', onTouchMove, { passive: false })
})

onBeforeUnmount(() => {
    endDrag(false)
    finishSettle()
    gridRef.value?.removeEventListener('touchmove', onTouchMove)
})
</script>

<style scoped>
.multi-uploader__grid {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
.multi-uploader__item {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #eef0f4;
    background: #f7f8fa;
}
.multi-uploader__item.is-sortable {
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
}
.multi-uploader__item.is-placeholder {
    border: 1px dashed #c8cdd6;
    background: #eef0f4;
}
.multi-uploader__item.is-placeholder > * { visibility: hidden; }
.multi-uploader__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.multi-uploader__remove {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(26, 30, 46, 0.75);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
}
.multi-uploader__remove:hover { background: #d92d20; }
.multi-uploader__index {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    background: rgba(26, 30, 46, 0.7);
    padding: 1px 7px;
    border-radius: 999px;
}
.multi-uploader__ghost {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
}
.multi-uploader__ghost.is-settling { transition: transform 0.18s cubic-bezier(0.2, 0, 0, 1); }
.multi-uploader__ghost-tile {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    background: #f7f8fa;
    transform: scale(1.05);
    box-shadow: 0 14px 32px rgba(26, 30, 46, 0.28);
    animation: multi-uploader-lift 0.15s ease-out;
}
.multi-uploader__ghost.is-settling .multi-uploader__ghost-tile {
    transform: none;
    box-shadow: 0 2px 8px rgba(26, 30, 46, 0.12);
    transition: transform 0.18s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.18s cubic-bezier(0.2, 0, 0, 1);
    animation: none;
}
@keyframes multi-uploader-lift {
    from {
        transform: none;
        box-shadow: 0 2px 8px rgba(26, 30, 46, 0.12);
    }
}
.multi-uploader__add :deep(.el-upload) {
    width: 120px;
    height: 120px;
}
.multi-uploader__add-inner {
    width: 120px;
    height: 120px;
    border: 1px dashed #c8cdd6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: #8a94a6;
    transition: border-color 0.2s, color 0.2s;
}
.multi-uploader__add-inner:hover { border-color: #1a1e2e; color: #1a1e2e; }
.multi-uploader__add-text { font-size: 12px; }
.multi-uploader__hint { margin-top: 8px; font-size: 12px; color: #8a94a6; }
</style>

<style>
/* Set on <html> while a tile is in the air, so the cursor stays "grabbing" wherever the pointer roams. */
.multi-uploader-sorting,
.multi-uploader-sorting * {
    cursor: grabbing !important;
    user-select: none !important;
    -webkit-user-select: none !important;
}
</style>
