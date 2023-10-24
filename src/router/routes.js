
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'quadras', component: () => import('pages/quadrasAdmin/quadrasAdmin.vue') },
      { path: 'quadras/edit/', component: () => import('pages/quadrasAdmin/quadrasAdminEdit.vue') },
      { path: 'quadras/edit/:id', component: () => import('pages/quadrasAdmin/quadrasAdminEdit.vue') },
      { path: 'usuarios', component: () => import('pages/usuariosAdmin/usuariosAdmin.vue') },
      { path: 'requisicoes', component: () => import('pages/requisicoesAdmin/requisicoesAdmin.vue') },
      { path: 'home', component: () => import('pages/homeAdmin/homeAdmin.vue') },
      { path: 'inventory', component: () => import('pages/inventory/productList.vue') },
      { path: 'inventory/edit/', component: () => import('pages/inventory/productEdit.vue') },
      { path: 'inventory/edit/:id', component: () => import('pages/inventory/productEdit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'quadras', component: () => import('pages/quadras/quadras.vue') },
      { path: 'requisicoes', component: () => import('pages/requisicoesUser/requisicoesUser.vue') },
      { path: 'requisicoes/:id', component: () => import('pages/requisicoesUser/requisicoesUser.vue') }
    ]
  },
  {
    path: '/secure/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: 'admin', component: () => import('pages/loginAdmin/loginAdmin.vue') },
      { path: 'user', component: () => import('pages/loginUser/loginUser.vue') },
      { path: 'register-user', component: () => import('pages/registerUser/registerUser.vue') },
      { path: 'register-admin', component: () => import('pages/registerAdmin/registerAdmin.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
