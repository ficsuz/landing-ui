<template>
    <div v-loading="meetingsStore.loading" class="bg-white min-h-[50vh]">
        <div v-if="meeting" class="py-12 md:py-20">
            <div class="page-container">
                <!-- Back button -->
                <button
                    @click="router.back()"
                    class="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1a1e2e] border border-[#d0d5dd] px-4 py-2 rounded-full mb-10 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    {{ $t('common.back') }}
                </button>

                <div class="max-w-4xl mx-auto">
                    <!-- Subject badge -->
                    <span
                        v-if="meeting.subject"
                        class="inline-block text-[12px] font-bold tracking-widest uppercase text-white bg-[#1a1e2e] px-3 py-1 rounded-full mb-5"
                    >
                        {{ resolveTranslation(meeting.subject, locale) }}
                    </span>

                    <!-- Title -->
                    <h1 class="font-black text-[clamp(26px,4vw,46px)] text-[#1a1e2e] leading-tight mb-6">
                        {{ resolveTranslation(meeting.title, locale) }}
                    </h1>

                    <!-- Meta row -->
                    <div class="flex flex-wrap items-center gap-4 text-[13px] text-[#8a94a6] pb-8 border-b border-[#eef0f4]">
                        <span class="flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {{ formatDate(meeting.date || meeting.createdAt) }}
                        </span>
                    </div>

                    <!-- Cover image -->
                    <div v-if="meeting.imageId" class="mt-8 rounded-2xl overflow-hidden aspect-[16/8] bg-[#eef0f4]">
                        <img
                            :src="getMediaUrl(meeting.imageId)"
                            :alt="resolveTranslation(meeting.title, locale)"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- HTML Content -->
                    <div
                        v-if="htmlContent"
                        class="article-body mt-10 md:mt-14"
                        v-html="htmlContent"
                    />
                </div>
            </div>
        </div>

        <div v-else-if="!meetingsStore.loading" class="py-24 text-center text-[#8a94a6]">
            {{ $t('common.noData') }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useMeetingsStore } from '@/features/meetings/store'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()
const meetingsStore = useMeetingsStore()

const meeting = computed(() => meetingsStore.current)

const htmlContent = computed(() => {
    if (!meeting.value?.content) return ''
    return resolveTranslation(meeting.value.content, locale.value)
})

function formatDate(iso?: string | null) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-GB').replace(/\//g, '.')
}

onMounted(() => {
    meetingsStore.fetchOne(String(route.params.id))
})
</script>

<style scoped>
.article-body {
    font-size: clamp(15px, 1.3vw, 18px);
    color: #444;
    line-height: 1.8;
    word-break: break-word;
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4),
.article-body :deep(h5),
.article-body :deep(h6) {
    font-weight: 900;
    color: #1a1e2e;
    line-height: 1.25;
    margin-top: 2em;
    margin-bottom: 0.6em;
}

.article-body :deep(h1) { font-size: clamp(26px, 3.5vw, 40px); }
.article-body :deep(h2) { font-size: clamp(22px, 2.8vw, 34px); }
.article-body :deep(h3) { font-size: clamp(19px, 2.2vw, 28px); }
.article-body :deep(h4) { font-size: clamp(17px, 1.8vw, 22px); }

.article-body :deep(p) {
    margin-bottom: 1.4em;
}

.article-body :deep(strong),
.article-body :deep(b) {
    font-weight: 700;
    color: #1a1e2e;
}

.article-body :deep(em),
.article-body :deep(i) {
    font-style: italic;
}

.article-body :deep(a) {
    color: #1a1e2e;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.2s;
}

.article-body :deep(a:hover) {
    opacity: 0.65;
}

.article-body :deep(ul),
.article-body :deep(ol) {
    padding-left: 1.5em;
    margin-bottom: 1.4em;
    display: flex;
    flex-direction: column;
    gap: 0.45em;
}

.article-body :deep(ul) { list-style-type: disc; }
.article-body :deep(ol) { list-style-type: decimal; }

.article-body :deep(li) {
    padding-left: 0.25em;
}

.article-body :deep(blockquote) {
    border-left: 4px solid #1a1e2e;
    margin: 2em 0;
    padding: 1em 1.5em;
    background: #f7f8fa;
    border-radius: 0 12px 12px 0;
    color: #505a63;
    font-style: italic;
}

.article-body :deep(img) {
    max-width: 100%;
    border-radius: 16px;
    margin: 1.5em 0;
    display: block;
}

.article-body :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 2em 0;
    font-size: 15px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #eef0f4;
}

.article-body :deep(th) {
    background: #1a1e2e;
    color: #fff;
    font-weight: 700;
    padding: 12px 16px;
    text-align: left;
}

.article-body :deep(td) {
    padding: 11px 16px;
    border-bottom: 1px solid #eef0f4;
    vertical-align: top;
}

.article-body :deep(tr:last-child td) {
    border-bottom: none;
}

.article-body :deep(tr:nth-child(even) td) {
    background: #f7f8fa;
}

.article-body :deep(pre) {
    background: #1a1e2e;
    color: #f7f8fa;
    padding: 1.25em 1.5em;
    border-radius: 12px;
    overflow-x: auto;
    font-size: 14px;
    margin: 1.5em 0;
}

.article-body :deep(code) {
    background: #eef0f4;
    color: #1a1e2e;
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 0.9em;
}

.article-body :deep(pre code) {
    background: transparent;
    color: inherit;
    padding: 0;
}

.article-body :deep(hr) {
    border: none;
    border-top: 1px solid #eef0f4;
    margin: 2.5em 0;
}
</style>
