<script setup>
import { reactive, ref, onBeforeMount } from 'vue';
import { router } from '@inertiajs/vue3';
import { CheckRound } from '@vicons/material';

const props = defineProps({
    article: Object
});

const form = reactive({
    title: '',
    content: ''
});

const error = ref(null);
const success = ref(false);

onBeforeMount(() => {
    form.title = props.article.title;
    form.content = props.article.content;
});

const updateArticle = () => {
    router.put(`/admin/articles/${props.article.id}`, {
        title: form.title,
        content: form.content
    },{
        onSuccess: (r) => {
            success.value = true;

            setTimeout(() => {
                success.value = false;
            }, 3000);
        },
        onError: (e) => {
            const err = Object.values(e)[0];

            if (typeof err === 'string' || err instanceof String) {
                error.value = err;
            } else {
                error.value = err[0]
            }
        }
    });
};
</script>

<template>
    <h1 class="tw-w-full tw-py-4 tw-text-slate-600 tw-font-bold">Editar Artigo</h1>

    <div v-if="error" class="tw-w-full tw-p-2 tw-mb-4 tw-bg-red-200 tw-border tw-border-[1px] tw-border-red-400">
        {{ error }}
    </div>
    <div v-if="success" class="tw-w-full tw-p-2 tw-mb-4 tw-bg-green-200 tw-border tw-border-[1px] tw-border-green-400">
        Dados atualizados com sucesso!
    </div>

    <form @submit.prevent="updateArticle">

        <n-input v-model:value="form.title" placeholder="Titulo do artigo" type="text" class="tw-mb-4" />
        <n-input v-model:value="form.content" placeholder="Conteúdo do artigo" type="textarea" class="tw-mb-4" />

        <n-button ghost color="#006699" attr-type="submit">
            <template #icon>
                <n-icon size="20">
                    <CheckRound/>
                </n-icon>
            </template>

            Editar Artigo
        </n-button>
    </form>
</template>