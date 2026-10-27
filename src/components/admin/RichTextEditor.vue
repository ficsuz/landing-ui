<template>
    <div class="rte">
        <div v-if="editor" class="rte__toolbar">
            <template v-for="(group, gi) in toolbar" :key="gi">
                <span v-if="gi" class="rte__divider" />
                <button
                    v-for="btn in group"
                    :key="btn.title"
                    type="button"
                    class="rte__btn"
                    :class="{ 'is-active': btn.active?.() }"
                    :title="btn.title"
                    :disabled="btn.disabled?.()"
                    @click="btn.run"
                >
                    <span :class="btn.class">{{ btn.label }}</span>
                </button>
            </template>
        </div>
        <EditorContent :editor="editor" class="rte__content" />
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { toHtml } from '@/utils/richText'

const props = defineProps<{ modelValue: string; placeholder?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editor = useEditor({
    content: toHtml(props.modelValue || ''),
    extensions: [
        StarterKit.configure({ heading: { levels: [2, 3] } }),
        Underline,
        Link.configure({
            openOnClick: false,
            HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
        }),
        Placeholder.configure({ placeholder: props.placeholder || '' }),
    ],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.isEmpty ? '' : editor.getHTML())
    },
})

// Dialog reuses the editor for another row — load its content
watch(
    () => props.modelValue,
    (value) => {
        const ed = editor.value
        if (!ed) return
        const current = ed.isEmpty ? '' : ed.getHTML()
        if ((value || '') !== current) ed.commands.setContent(toHtml(value || ''), false)
    }
)

async function setLink() {
    const ed = editor.value
    if (!ed) return
    try {
        const { value } = await ElMessageBox.prompt('URL', 'Link', {
            inputValue: ed.getAttributes('link').href || 'https://',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        })
        const url = (value || '').trim()
        const chain = ed.chain().focus().extendMarkRange('link')
        if (!url || url === 'https://') chain.unsetLink().run()
        else chain.setLink({ href: url }).run()
    } catch {
        // cancelled
    }
}

const c = () => editor.value!.chain().focus()
const is = (name: string, attrs?: Record<string, unknown>) => () => !!editor.value?.isActive(name, attrs)

const toolbar = [
    [
        { label: 'B', title: 'Bold', class: 'font-bold', run: () => c().toggleBold().run(), active: is('bold') },
        { label: 'I', title: 'Italic', class: 'italic', run: () => c().toggleItalic().run(), active: is('italic') },
        { label: 'U', title: 'Underline', class: 'underline', run: () => c().toggleUnderline().run(), active: is('underline') },
        { label: 'S', title: 'Strikethrough', class: 'line-through', run: () => c().toggleStrike().run(), active: is('strike') },
    ],
    [
        { label: 'H2', title: 'Heading', class: 'font-bold', run: () => c().toggleHeading({ level: 2 }).run(), active: is('heading', { level: 2 }) },
        { label: 'H3', title: 'Subheading', class: 'font-bold', run: () => c().toggleHeading({ level: 3 }).run(), active: is('heading', { level: 3 }) },
    ],
    [
        { label: '• List', title: 'Bullet list', run: () => c().toggleBulletList().run(), active: is('bulletList') },
        { label: '1. List', title: 'Numbered list', run: () => c().toggleOrderedList().run(), active: is('orderedList') },
        { label: '❝', title: 'Quote', run: () => c().toggleBlockquote().run(), active: is('blockquote') },
        { label: '―', title: 'Divider', run: () => c().setHorizontalRule().run() },
    ],
    [
        { label: 'Link', title: 'Link', class: 'underline', run: setLink, active: is('link') },
        { label: 'Clear', title: 'Clear formatting', run: () => c().unsetAllMarks().clearNodes().run() },
    ],
    [
        { label: '↶', title: 'Undo', run: () => c().undo().run(), disabled: () => !editor.value?.can().undo() },
        { label: '↷', title: 'Redo', run: () => c().redo().run(), disabled: () => !editor.value?.can().redo() },
    ],
]

onBeforeUnmount(() => editor.value?.destroy())
</script>

<style scoped>
.rte {
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    background: #fff;
    overflow: hidden;
}

.rte:focus-within {
    border-color: var(--el-color-primary);
}

.rte__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px;
    padding: 6px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    background: #f7f8fa;
}

.rte__divider {
    width: 1px;
    height: 18px;
    margin: 0 4px;
    background: var(--el-border-color);
}

.rte__btn {
    min-width: 30px;
    height: 28px;
    padding: 0 8px;
    border-radius: 6px;
    font-size: 13px;
    line-height: 1;
    color: #1a1e2e;
    transition: background 0.15s;
}

.rte__btn:hover:not(:disabled) {
    background: #eef0f4;
}

.rte__btn.is-active {
    background: #1a1e2e;
    color: #fff;
}

.rte__btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

.rte__content :deep(.ProseMirror) {
    min-height: 220px;
    max-height: 50vh;
    overflow-y: auto;
    padding: 12px 14px;
    font-size: 14px;
    line-height: 1.7;
    color: #444;
    outline: none;
}

.rte__content :deep(.ProseMirror.ProseMirror-focused) {
    outline: none;
}

.rte__content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    color: var(--el-text-color-placeholder);
    pointer-events: none;
}

.rte__content :deep(p) { margin: 0 0 0.8em; }
.rte__content :deep(h2) { font-size: 20px; font-weight: 800; color: #1a1e2e; margin: 1em 0 0.5em; }
.rte__content :deep(h3) { font-size: 17px; font-weight: 700; color: #1a1e2e; margin: 1em 0 0.5em; }
.rte__content :deep(ul) { list-style: disc; padding-left: 1.5em; margin-bottom: 0.8em; }
.rte__content :deep(ol) { list-style: decimal; padding-left: 1.5em; margin-bottom: 0.8em; }
.rte__content :deep(li p) { margin: 0; }
.rte__content :deep(a) { color: #1a1e2e; font-weight: 600; text-decoration: underline; }
.rte__content :deep(strong) { font-weight: 700; color: #1a1e2e; }
.rte__content :deep(blockquote) { border-left: 3px solid #1a1e2e; padding: 4px 12px; margin: 0.8em 0; background: #f7f8fa; color: #505a63; font-style: italic; }
.rte__content :deep(hr) { border: none; border-top: 1px solid #eef0f4; margin: 1.2em 0; }
</style>
