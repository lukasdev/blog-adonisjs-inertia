<script setup>
import Centralizer from '../components/Centralizer.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <header class="tw-flex tw-w-full tw-bg-slate-300">
        <Centralizer>
            <nav class="tw-flex tw-w-full tw-justify-between tw-py-4">
                <ul class="tw-flex tw-gap-3">
                    <li><Link href="/">Blog</Link></li>
                    <li><Link href="/admin/articles" >Artigos</Link></li>
                    <li><Link href="/admin/articles/new">Novo Artigo</Link></li>
                </ul>

                <ul  class="tw-flex">
                    
                    <li><Link href="/logout" method="post" as="button">Sair</Link></li>
                </ul>
            </nav>
        </Centralizer>
    </header>

    <section class="tw-w-full tw-flex tw-flex-wrap tw-py-4">
        <Centralizer>
            <slot />
        </Centralizer>
    </section>
</template>