import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'

import Layout from '../views/layouts/Layout.vue';
import LayoutDashboard from '../views/layouts/LayoutDashboard.vue';

createInertiaApp({
    resolve: async (name) => {
        const page = require(`../views/pages/${name}`);
        if (name.includes('Dashboard')) {
            page.default.layout = LayoutDashboard;
        } else {
            page.default.layout = Layout;
        }
        

        return page;
    },
    setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
        .use(plugin)
        .mount(el)
    },
})