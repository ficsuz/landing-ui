<template>
    <div class="min-h-screen flex items-center justify-center bg-white px-4">
        <div class="text-center max-w-[600px] mx-auto">
            <p class="font-black text-[clamp(72px,14vw,160px)] leading-none text-[#1a1e2e]">404</p>
            <h2 class="section-title !text-[clamp(24px,3vw,36px)] mt-2 mb-4">{{ $t('notFound.title') }}</h2>
            <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed mb-8">
                {{ $t('notFound.description') }}
            </p>
            <div class="flex items-center justify-center gap-3 flex-wrap">
                <button
                    @click="$router.go(-1)"
                    class="inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    {{ $t('common.back') }}
                </button>
                <router-link
                    to="/"
                    class="inline-flex items-center gap-2 bg-[#1a1e2e] text-white font-semibold text-[15px] px-7 py-3 rounded-full border border-[#1a1e2e] transition-all duration-200 hover:opacity-90"
                >
                    {{ $t('notFound.backHome') }}
                </router-link>
            </div>
        </div>
    </div>
</template>
