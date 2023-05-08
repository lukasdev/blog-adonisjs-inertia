<script setup>
defineProps({
    article: Object
})
</script>

<template>
    <h1 class="tw-w-full tw-font-bold tw-text-slate-600 tw-text-[25px] tw-mb-4">{{ article.title }}</h1>

    <p>{{ article.content }}</p>
</template>