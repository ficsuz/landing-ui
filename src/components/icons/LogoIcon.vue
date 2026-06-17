<template>
    <img :class="class" src="@/assets/images/logo.svg" alt="" />
</template>
<script lang="ts">
export default {
    name: 'LogoIcon',
    props: {
        class: {
            type: String,
            default: '',
        },
    },
}
</script>
