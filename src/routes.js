module.exports = {
    routes: [
        {
            path: '*/home.html',
            name: 'home',
            component: ()=>import('@/pages/home.vue')
        },
        {
            path: '*/about.html',
            name: 'about',
            component: ()=>import('@/pages/about.vue')
        }
    ]
}