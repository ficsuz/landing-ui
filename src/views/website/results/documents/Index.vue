<template>
    <div class="documents-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- Header -->
                <div class="text-center mb-12 md:mb-16 mx-auto">
                    <h2 class="font-black text-[clamp(22px,2.8vw,38px)] leading-snug text-[#1a1e2e] mb-4 md:mb-6">
                        {{ $t('resultsPage.documentsPage.pageTitle') }}
                    </h2>
                    <p class="text-[clamp(13px,1.1vw,15px)] text-[#8a94a6] leading-relaxed">
                        {{ $t('resultsPage.documentsPage.pageSubtitle') }}
                    </p>
                </div>

                <!-- Filter tabs -->
                <div class="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
                    <button
                        @click="activeCategory = ''"
                        :class="[
                            'px-5 py-2.5 rounded-full text-[13px] font-semibold border transition-all duration-200',
                            activeCategory === ''
                                ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                : 'bg-white text-[#344054] border-[#d0d5dd] hover:border-[#1a1e2e]',
                        ]"
                    >
                        {{ $t('resultsPage.documentsPage.filterAll') }}
                    </button>
                    <button
                        v-for="cat in categories"
                        :key="cat.id"
                        @click="activeCategory = cat.id"
                        :class="[
                            'px-5 py-2.5 rounded-full text-[13px] font-semibold border transition-all duration-200',
                            activeCategory === cat.id
                                ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                : 'bg-white text-[#344054] border-[#d0d5dd] hover:border-[#1a1e2e]',
                        ]"
                    >
                        {{ resolveTranslation(cat.name) }}
                    </button>
                </div>

                <!-- Document list -->
                <div v-loading="documentsStore.loading" class="flex flex-col gap-3 mx-auto min-h-[80px]">
                    <component
                        :is="fileUrl(doc) ? 'a' : 'div'"
                        v-for="doc in filteredDocs"
                        :key="doc.id"
                        :href="fileUrl(doc) || undefined"
                        target="_blank"
                        rel="noopener"
                        class="flex items-center gap-4 rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] px-5 py-4 hover:border-[#d0d5dd] hover:bg-white transition-all duration-200 group no-underline"
                    >
                        <!-- File icon -->
                        <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4361ee"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>

                        <!-- Title -->
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-[15px] text-[#1a1e2e] leading-snug">{{ resolveTranslation(doc.title) }}</p>
                        </div>

                        <!-- Download button -->
                        <span
                            v-if="fileUrl(doc)"
                            class="flex-shrink-0 flex items-center gap-1.5 text-[13px] font-semibold text-[#4361ee] bg-[#eff4ff] px-4 py-2 rounded-full group-hover:bg-[#4361ee] group-hover:text-white transition-all duration-200 whitespace-nowrap"
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            {{ $t('resultsPage.documentsPage.downloadLabel') }}
                        </span>
                    </component>

                    <el-empty
                        v-if="!documentsStore.loading && filteredDocs.length === 0"
                        :description="$t('common.noData')"
                        class="py-10"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElEmpty } from 'element-plus'
import { useDocumentsStore } from '@/features/documents/store'
import { useDocumentCategoriesStore } from '@/features/documentCategories/store'
import { getMediaUrl } from '@/utils/media'
import type { DocumentItem, TranslatedFile } from '@/features/documents/types'
import type { Translation } from '@/types/server/api.types'

const { locale } = useI18n()
const documentsStore = useDocumentsStore()
const categoriesStore = useDocumentCategoriesStore()

const activeCategory = ref('')

const categories = computed(() => categoriesStore.items.filter((c) => c.status))

const publishedDocs = computed(() => documentsStore.items.filter((d) => d.status))

const filteredDocs = computed(() =>
    activeCategory.value ? publishedDocs.value.filter((d) => d.categoryId === activeCategory.value) : publishedDocs.value
)

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function fileUrl(doc: DocumentItem) {
    const id = doc.file?.[locale.value as keyof TranslatedFile] || doc.file?.uz || doc.file?.en || doc.file?.ru
    return id ? getMediaUrl(id) : ''
}

onMounted(() => {
    categoriesStore.fetchAll({ limit: 100, sortBy: 'order', order: 'asc' })
    documentsStore.fetchAll({ limit: 200, sortBy: 'order', order: 'asc' })
})
</script>
