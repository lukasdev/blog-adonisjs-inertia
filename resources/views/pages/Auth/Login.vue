<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

defineProps({
    errors: {
        type: Object,
        default: () => ({})
    }
})

const email = ref('');
const password = ref('');

const loginUser = async () => {

    const data = {
        email: email.value,
        password: password.value
    };
    try {
        await router.post('/login', data, {
            onSuccess: () => {
            },
            onError: (e) => {
                if (e) {
                    console.log('erro: ', e);
                }
            }
        });
    } catch(err) {
        console.log('erro la:', err);
    }
};
</script>

<template>
    {{ errors }}

    <form @submit.prevent="loginUser">
        <input type="text" placeholder="Seu amail" v-model="email"/>

        <input type="password" placeholder="Sua senha" v-model="password"/>

        <button>Login</button>
    </form>
</template>