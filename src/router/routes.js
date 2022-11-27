
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'gestioncampeonatos', component: () => import('pages/GestionCampeonatos.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Autenticacion.vue'),
    children: [
      { path: '', component: () => import('src/pages/Login.vue') },
    ]
  },
  {
    path: '/:user',
    component: () => import('layouts/User.vue'),
    children: [
      { path: 'campeonato', component: () => import('src/pages/Campeonato.vue') },
    ],
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
