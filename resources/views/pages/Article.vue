<script setup>
import { ref } from 'vue';
import { router,Link } from '@inertiajs/vue3';

const props = defineProps({
    article: Object,
    user: Object
});

const comment = ref('');
const error = ref(null);

const sendComment = () => {
    router.post('/article/comment', {
        article_id: props.article.id,
        comment: comment.value
    }, {
        onSuccess: (r) => {
            error.value = null;
            comment.value = '';
        },
        onError: (e) => {
            const err = Object.values(e)[0];

            if (typeof err === 'string' || err instanceof String) {
                error.value = err;
            } else {
                error.value = err[0]
            }

            console.log('erro: ', e);
        }
    })
};
</script>

<template>
    <h1 class="tw-w-full tw-font-bold tw-text-slate-600 tw-text-[25px] tw-mb-4">{{ article.title }}</h1>

    <p>{{ article.content }}</p>

    <section class="tw-flex tw-w-full tw-flex-wrap tw-py-3">
        <h1 class="tw-w-full tw-text-slate-600 tw-text-[18px]">Comentários</h1>

        <div v-for="(comment, key) in article.comments" :key="key" class="tw-flex tw-flex-wrap tw-w-full tw-p-4 
        tw-bg-white tw-border-[1px] tw-border-slate-400 tw-rounded-md tw-mb-3">
            <span class="tw-inline-flex tw-w-full tw-font-bold tw-text-slate-600">
                {{ comment.user.name }}
            </span>
            <p>{{ comment.comment }}</p>
        </div>
    </section>

    <section class="tw-w-full tw-flex tw-flex-wrap tw-p-4 tw-bg-white tw-shadow-md tw-border-[1px] tw-border-slate-400 
    tw-rounded-md tw-mt-4">

        <div v-if="error" class="tw-w-full tw-p-2 tw-mb-4 tw-bg-red-200 tw-border tw-border-[1px] tw-border-red-400">
            {{ error }}
        </div>
        
        <p class="tw-inline-flex tw-w-full tw-mb-3">Comente</p>

        <form class="tw-w-full" @submit.prevent="sendComment" v-if="user">
            <textarea v-model="comment" class="tw-w-full tw-inline-flex tw-p-3 tw-text-slate-500 
            tw-border-[1px] tw-border-slate-300 tw-outline-none"></textarea>

            <button type="submit" class="tw-inline-flex tw-py-2 tw-px-6 tw-bg-sky-600 tw-text-white tw-rounded-md">Enviar</button>
        </form>
        <div class="tw-flex tw-w-full tw-justify-center tw-flex-wrap" v-else>
            <p class="tw-inline-flex tw-w-full">Para Comentar voce precisa estar logado</p>
            <p><Link href="/login">Faça login</Link></p>
        </div>
    </section>
</template>