<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { CheckRound } from '@vicons/material';

const form = useForm({
    title: '',
    content: '',
    image: ''
});
const error = ref(null);

const storeArticle = async () => {
    await form.post('/admin/articles/new', {
        onSuccess: () => {
            form.image = '';
            form.title = '';
            form.content = '';
            error.value = null;
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
    <h1 class="tw-w-full tw-py-4 tw-text-slate-600 tw-font-bold">Cadastrar Artigo</h1>

    <div v-if="error" class="tw-w-full tw-p-2 tw-mb-4 tw-bg-red-200 tw-border tw-border-[1px] tw-border-red-400">
        {{ error }}
    </div>

    <form @submit.prevent="storeArticle">
        
        <input type="file" @input="form.image = $event.target.files[0]" />
        <n-input v-model:value="form.title" placeholder="Titulo do artigo" type="text" class="tw-mb-4" />
        <n-input v-model:value="form.content" placeholder="Conteúdo do artigo" type="textarea" class="tw-mb-4" />
        
        <n-button ghost color="#006699" attr-type="submit">
            <template #icon>
                <n-icon size="20">
                    <CheckRound/>
                </n-icon>
            </template>

            Cadastrar
        </n-button>
    </form>
</template>