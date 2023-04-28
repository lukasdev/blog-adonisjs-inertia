<script setup>
defineProps({
    articles: Object
})
</script>

<template>
    <h1 class="tw-flex tw-w-full tw-text-slate-600 tw-font-bold tw-mb-4">Ultimos artigos</h1>

    <ul class="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
        <li class="tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-md" 
        v-for="(article,key) in articles" :key="key">
            <img src="https://placehold.it/300x200" alt="Thumbnail" class="tw-w-full tw-h-48 tw-object-cover">
            <div class="tw-p-4">
                <h3 class="tw-font-bold tw-text-lg tw-mb-2">{{ article.title }}</h3>
                <p class="tw-text-gray-700 tw-mb-2">
                    {{ article.content }}
                </p>
                <a href="#" class="tw-block tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 
                tw-rounded hover:tw-bg-blue-600 tw-text-center">Ler Mais</a>
            </div>
        </li>
    </ul>
</template>