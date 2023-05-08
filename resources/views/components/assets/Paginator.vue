<script setup>
import { onBeforeMount, watch } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    dark: {
        type: Boolean,
        default: false
    },
    path: {
        type: String,
        default: ''
    },
    dados: {
        type: Object,
        default: []
    },
    extraQuerys: {
        type: Object,
        default: []
    }
});

const extraUrl =  '';
const maxLinks = 4;

const firstLinks = [];
const lastLinks = [];

onBeforeMount(() => {
    if (Object.entries(props.extraQuerys).length > 0) {
        Object.keys(props.extraQuerys).forEach((key) => {
            extraUrl += '&'+key+'='+props.extraQuerys[key];
        });
    }
});


watch(props.dados, (newValue) => {
    const meta = newValue.meta;

    const pg = meta.current_page;
    for(let i = pg - maxLinks; i <= pg-1;i++) {
        if(i < pg && i > 0) {
            firstLinks.push({
                path: props.path+'?page='+i,
                label: i
            });
        }
    }

    let paginas = Math.ceil(meta.total/meta.per_page);

    for (let i = pg+1; i<= pg + maxLinks;i++) {
        if (i <= paginas) {
            lastLinks.push({
                path: props.path+'?page='+i,
                label: i
            });
        }
    }
}, {
    immediate: true,
    deep: true
});

</script>

<template>
    <div class="paginator tw-flex tw-shadow-md tw-w-full tw-p-5 tw-rounded-bl-md tw-rounded-br-md" v-if="dados.meta && dados.meta.total > dados.meta.per_page"
        :class="(!dark) ? 'tw-bg-white' : 'tw-bg-[#132238]'"    
    >
        <ul class="tw-inline-flex tw-mx-auto tw-rounded-t-md tw-rounded-b-md">
            <Link :href="`${path}${dados.meta.first_page_url}${extraUrl}`">
                <li class="tw-flex tw-min-w-[40px] tw-min-h-[40px] tw-items-center tw-justify-center  tw-text-slate-400 tw-transition-[background,color] tw-duration-[.2s] tw-ease-in-out tw-cursor-pointer tw-px-2 
                tw-border-solid tw-border-[1px] tw-border-gray tw-rounded-md" 
                :class="(!dark) ? 'tw-bg-blue-50 hover:tw-bg-white hover:tw-text-slate-500' : 'tw-bg-transparent hover:tw-bg-[#0E1B2E] hover:tw-text-white tw-border-black'"
                >Primeira Pagina</li>
            </link>


            <!--- first links -->
            <Link 
                v-for="(link,key) in firstLinks" :key="key" 
                :href="`${link.path}${extraUrl}`"
            >
                <li class="tw-flex tw-min-w-[40px] tw-min-h-[40px] tw-items-center tw-justify-center tw-transition-[background,color] tw-duration-[.2s] tw-ease-in-out tw-cursor-pointer tw-text-blue-400 tw-mx-1  
                tw-border-solid tw-border-[1px] tw-border-gray tw-rounded-md"

                :class="(!dark) ? 'tw-bg-blue-50 hover:tw-bg-white' : 'tw-bg-transparent hover:tw-bg-[#0E1B2E] tw-border-black'"
                >{{link.label}}</li>
            </Link>

            <!--- ativo -->
            <li class="tw-flex tw-min-w-[40px] tw-min-h-[40px] tw-items-center tw-justify-center tw-transition-[background,color] tw-duration-[.2s] tw-ease-in-out text-blue-400 tw-mx-1 
                    tw-border-solid tw-border-[1px] tw-rounded-md" 
                    :class="(dark) ? 'tw-bg-[#0E1B2E] tw-border-black' : 'tw-bg-transparent tw-border-gray tw-text-slate-600'"
                    >
                    {{dados.meta.current_page}}
            </li>

            <!--- last links -->
            <Link 
                v-for="(link,key) in lastLinks" :key="key" 
                :href="`${link.path}${extraUrl}`"
            >
                <li class="tw-flex tw-min-w-[40px] tw-min-h-[40px] tw-items-center tw-justify-center tw-transition-[background,color] tw-duration-[.2s] tw-ease-in-out tw-cursor-pointer tw-text-blue-400 tw-mx-1  
                tw-border-solid tw-border-[1px] tw-border-gray tw-rounded-md"

                :class="(!dark) ? 'tw-bg-blue-50 hover:tw-bg-white' : 'tw-bg-transparent hover:tw-bg-[#0E1B2E] tw-border-black'"
                >{{link.label}}</li>
            </Link>
            
            <Link :href="`${path}${dados.meta.last_page_url}${extraUrl}`">
                <li class="tw-flex tw-min-w-[40px] tw-min-h-[40px] tw-items-center tw-justify-center tw-text-slate-400 tw-transition-[background,color] tw-duration-[.2s] tw-ease-in-out tw-cursor-pointer  tw-px-2 
                tw-border-solid tw-border-[1px] tw-border-gray tw-rounded-md"

                :class="(!dark) ? 'tw-bg-blue-50 hover:tw-bg-white hover:tw-text-slate-500' : 'tw-bg-transparent hover:tw-bg-[#0E1B2E] hover:tw-text-white tw-border-black'"
                >Última Pagina</li>
            </link>
        </ul>
    </div>
</template>