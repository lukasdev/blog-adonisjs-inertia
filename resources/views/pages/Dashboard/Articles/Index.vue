<script setup>
import { Link } from '@inertiajs/vue3';
import { SettingsRound, DeleteRound } from '@vicons/material';

defineProps({
    articles: Object
})
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

                        <n-icon class="tw-text-emerald-600" size="20">
                            <DeleteRound />
                        </n-icon>
                    </div>
                </td>
            </tr>
            
        </tbody>
    </n-table>
</template>