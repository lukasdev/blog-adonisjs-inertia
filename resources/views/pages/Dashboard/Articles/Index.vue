<script setup>
import { Link, router } from '@inertiajs/vue3';
import { SettingsRound, DeleteRound } from '@vicons/material';
import Paginator from '../../../components/assets/Paginator.vue';

defineProps({
    articles: Object
})

const initiateDelete = (id) => {
    if (confirm("Tem certeza que deseja deletar este artigo?") === true) {
        router.delete(`/admin/articles/${id}`, {
            preserveScroll: true,
            onSuccess: (r) => {
                alert('deletou');
            },

            onError: (e) => {

            }
        });
    }
};
</script>

<template>
    <n-table :bordered="false" :single-line="false">
        <thead>
            <tr>
                <th>Titulo</th>
                <th>Data</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(article, key) in articles.data" :key="key">
                <td>{{article.title}}</td>
                <td>{{article.created_at}}</td>
                <td>
                    <div class="tw-flex tw-justify-center">
                        <Link :href="`/admin/articles/${article.id}`">
                            <n-icon class="tw-text-emerald-600" size="20">
                                <SettingsRound />
                            </n-icon>
                        </Link>

                        <n-icon class="tw-text-emerald-600" size="20" @click="initiateDelete(article.id)">
                            <DeleteRound />
                        </n-icon>
                    </div>
                </td>
            </tr>
            
        </tbody>
    </n-table>

    <Paginator :dados="articles" path="/admin/articles"/>
</template>