<template>
    <div class="h-screen flex items-center flex-col gap-5 justify-center">
        <h2 class="text-4xl font-semibold">Page not found</h2>
        <p class="w-full mx-auto max-w-[600px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam alias eum quo odit laboriosam corporis dolor officia quas dolores
            debitis molestias voluptates reprehenderit omnis id, praesentium sed aspernatur? Asperiores, sed?
        </p>
        <button
            @click="$router.go(-1)"
            class="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1a1e2e] border border-[#d0d5dd] px-4 py-2 rounded-full hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {{ $t('common.back') }}
        </button>
    </div>
</template>