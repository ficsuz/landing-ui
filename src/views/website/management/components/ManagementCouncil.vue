<template>
    <section class="bg-white py-16 md:py-24">
        <div class="page-container">
            <h1 class="section-title text-center mb-14">
                {{ $t('management.title') }}
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px] mx-auto">
                <!-- Card 1: Shavkat Mirziyoyev -->
                <div class="bg-white rounded-2xl border border-[#eef0f4] shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-5 md:p-7 flex flex-col items-center">
                    <div class="h-16 flex items-center justify-center mb-5">
                        <img :src="icon1" alt="O'zbekiston Respublikasi Prezidenti" class="h-full w-auto object-contain" />
                    </div>
                    <div class="w-full rounded-xl overflow-hidden mb-5">
                        <img :src="photo1" alt="Shavkat Miromonovich Mirziyoyev" class="w-full aspect-[4/5] object-cover object-top" />
                    </div>
                    <p class="font-bold text-[17px] text-[#1a1e2e] text-center leading-tight">{{ $t('council.card1.name') }}</p>
                    <p class="text-[13px] text-[#8a94a6] text-center mt-1.5 leading-snug">{{ $t('council.card1.role') }}</p>
                </div>

                <!-- Card 2: Odile Renaud-Basso -->
                <div class="bg-white rounded-2xl border border-[#eef0f4] shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-5 md:p-7 flex flex-col items-center">
                    <div class="h-16 flex items-center justify-center mb-5">
                        <img :src="icon2" alt="European Bank for Reconstruction and Development" class="h-full w-auto object-contain" />
                    </div>
                    <div class="w-full rounded-xl overflow-hidden mb-5">
                        <img :src="photo2" alt="Odile Renaud-Basso" class="w-full aspect-[4/5] object-cover object-top" />
                    </div>
                    <p class="font-bold text-[17px] text-[#1a1e2e] text-center leading-tight">{{ $t('council.card2.name') }}</p>
                    <p class="text-[13px] text-[#8a94a6] text-center mt-1.5 leading-snug">{{ $t('council.card2.role') }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import photo1 from '@/assets/images/avatars/image12.png'
import photo2 from '@/assets/images/avatars/image11.png'
import icon1 from '@/assets/images/icons/pr.png'
import icon2 from '@/assets/images/icons/e-bank.png'
</script>
