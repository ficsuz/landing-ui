<template>
    <section class="mt-12 md:mt-16" aria-labelledby="working-group-council-title">
        <h4 id="working-group-council-title" class="text-[clamp(22px,3vw,40px)] font-extrabold uppercase text-[#191c1f] mb-6 md:mb-8">
            {{ $t('workingGroupsPage.councilMembersTitle') }}
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3" :aria-busy="membersStore.publicLoading">
            <MemberCategoryCard
                v-for="category in memberCategories"
                :key="category.slug"
                :title="$t(category.titleKey)"
                :count="membersStore.publicMembers ? membersStore.publicMembersByType[category.type].length : null"
                :to="{ name: 'council-members', query: { category: category.slug } }"
            />
        </div>
        <p v-if="membersStore.publicError && !membersStore.publicMembers" role="status" class="mt-4 text-sm text-[#505a63]">
            {{ $t('councilMembersPage.loadError') }}
        </p>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { memberCategories } from '@/features/councilMembers/categories'
import MemberCategoryCard from '@/features/councilMembers/components/MemberCategoryCard.vue'
import { useCouncilMembersStore } from '@/features/councilMembers/store'

const membersStore = useCouncilMembersStore()

onMounted(() => {
    if (!membersStore.publicMembers) membersStore.fetchPublicMembers()
})
</script>
