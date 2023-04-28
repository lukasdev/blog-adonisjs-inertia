<script setup>
import { computed } from 'vue';
import Centralizer from '../components/Centralizer.vue'
import { Link, usePage } from '@inertiajs/vue3';
import MenuItem from '../components/assets/MenuItem.vue';

defineProps({
    user: Object
})
</script>

<template>
    <header class="tw-flex tw-flex-wrap tw-w-full tw-shadow-md tw-bg-white">
        <section class="tw-w-full tw-bg-[#F5F0EA] tw-py-3">
            <Centralizer>
                <div class="tw-w-full tw-flex tw-justify-between">
                    <ul class="tw-flex tw-gap-2 tw-text-slate-600">
                        <li><Link href="/pages/about">Sobre</Link></li>
                        <li><Link href="/pages/outra-coisa">Outra Coisa</Link></li>
                        <li><Link href="/pages/mais-uma-coisa">Mais uma coisa</Link></li>
                    </ul>

                    <ul class="tw-flex tw-text-slate-600">
                        <span class="tw-flex tw-gap-2" v-if="user">
                            <li>Olá</li>
                            <li><Link href="/admin">Painel</Link></li>
                        </span>
                        <span class="tw-flex tw-gap-2" v-else>
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/auth/register">Register</Link></li>
                        </span>
                    </ul>
                </div>
            </Centralizer>

        </section>

        <section class="tw-flex tw-w-full tw-py-4 tw-justify-center">
            <h1 class="tw-text-[30px] tw-text-slate-600 tw-font-bold">Susan Johnson</h1>
        </section>

        
        <nav class="tw-w-full tw-flex">
            <Centralizer>
                <ul class="tw-flex tw-w-full tw-justify-center">
                    <MenuItem link="/">Home</MenuItem>
                    <MenuItem link="/about">Sobre</MenuItem>
                    <MenuItem link="/articles">Artigos</MenuItem>
                    <MenuItem link="/contact">Contato</MenuItem>
                </ul>
            </Centralizer>
        </nav>
    </header>

    <section class="tw-w-full tw-flex tw-flex-wrap tw-py-3">
        <Centralizer>
            <slot />
        </Centralizer>
    </section>
</template>