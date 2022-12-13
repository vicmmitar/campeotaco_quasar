
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'gestioncampeonatos', component: () => import('pages/GestionCampeonatos.vue') },
      { path: 'gestioncampeonatos/:titulo', name:'campeonato' ,component: () => import('pages/Campeonato.vue'), props: true },
      { path: 'gestioncampeonatos/:titulo/:titulo2', name:'equipo' ,component: () => import('pages/Campeonato.vue'), props: true },
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
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Usuario.vue') },
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
