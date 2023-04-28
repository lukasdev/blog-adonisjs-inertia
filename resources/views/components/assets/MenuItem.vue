<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    link: String,
})
</script>

<template>
    <li class="tw-inline-flex tw-p-3 tw-font-medium tw-text-[16px] tw-uppercase tw-text-slate-600">
        <Link :href="link">
            <slot />
        </Link>
    </li>
</template>