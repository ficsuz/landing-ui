<template>
    <section class="bg-white py-12 md:pb-20 md:pt-40">
        <div class="page-container">
            <!-- Title -->
            <h1 class="section-title text-center mb-6">
                {{ $t('council.title') }}
            </h1>

            <!-- Subtitle -->
            <p class="text-center text-[clamp(15px,1.4vw,18px)] text-[#666] max-w-[450px] mx-auto leading-relaxed mb-10 md:mb-16">
                {{ $t('council.subtitle') }}
            </p>

            <!-- Management header -->
            <h2 class="text-center font-black text-[18px] uppercase tracking-[0.2em] text-[#1a1e2e] mb-10">
                {{ $t('council.management') }}
            </h2>

            <!-- Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px] mx-auto">
                <!-- Card 1: Shavkat Mirziyoyev -->
                <div class="bg-white rounded-2xl shadow-[0_2px_24px_rgba(0,0,0,0.08)] p-4 md:p-6 flex flex-col items-center">
                    <div class="h-16 flex items-center justify-center mb-5">
                        <img :src="icon1" alt="O'zbekiston Respublikasi Prezidenti" class="h-full w-auto object-contain" />
                    </div>
                    <div class="w-full rounded-xl overflow-hidden mb-4">
                        <img :src="photo1" alt="Shavkat Miromonovich Mirziyoyev" class="w-full aspect-[4/5] object-cover object-top" />
                    </div>
                    <p class="font-bold text-[16px] text-[#1a1e2e] text-center leading-tight mt-1">{{ $t('council.card1.name') }}</p>
                    <p class="text-[13px] text-[#666] text-center mt-1">{{ $t('council.card1.role') }}</p>
                    <p class="text-[13px] text-[#666] text-center mt-0.5">{{ $t('council.card1.subrole') }}</p>
                </div>

                <!-- Card 2: Odile Renaud-Basso -->
                <div class="bg-white rounded-2xl shadow-[0_2px_24px_rgba(0,0,0,0.08)] p-4 md:p-6 flex flex-col items-center">
                    <div class="h-16 flex items-center justify-center mb-5">
                        <img :src="icon2" alt="European Bank for Reconstruction and Development" class="h-full w-auto object-contain" />
                    </div>
                    <div class="w-full rounded-xl overflow-hidden mb-4">
                        <img :src="photo2" alt="Odile Renaud-Basso" class="w-full aspect-[4/5] object-cover object-top" />
                    </div>
                    <p class="font-bold text-[16px] text-[#1a1e2e] text-center leading-tight mt-1">{{ $t('council.card2.name') }}</p>
                    <p class="text-[13px] text-[#666] text-center mt-1">{{ $t('council.card2.role') }}</p>
                    <p class="text-[13px] text-[#666] text-center mt-0.5">{{ $t('council.card2.subrole') }}</p>
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
