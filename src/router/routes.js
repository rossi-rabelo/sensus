
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      {
        path: '/products',
        name: 'products',
        component: () => import('pages/Products.vue'),
        children: [
          {
            path: 'category=:id/page=:page',
            name: 'category',
            component: () => import('pages/Products.vue')
          },
          {
            path: 'subcategory=:id/page=:page',
            name: 'subcategory',
            component: () => import('pages/Products.vue')
          },
          {
            path: 'search=:query/page=:page',
            name: 'search',
            component: () => import('pages/Products.vue')
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
