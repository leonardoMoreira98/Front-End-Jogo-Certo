<template>
    <q-layout view="hHh lpR fFf">

        <q-header elevated class="bg-green text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    <q-icon name="sports_soccer" /> JogoCerto - Admin
                </q-toolbar-title>
                <q-btn dense color="light-secondary" icon="logout" label="Logout" @click="this.logout()" />
            </q-toolbar>

            <q-tabs align="left">
                <q-route-tab to="/users" label="Usuários" />
                <q-route-tab to="/sportsCenters" label="Centros Esportivos" />
                <q-route-tab to="/sportsCenters/:sportsCenterId/inventory', 'ProductsController.index" label="Estoque" />
            </q-tabs>

        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>


        <q-footer elevated class="bg-green text-white">
            <q-toolbar>
                <q-toolbar-title class="text-center">
                    <q-icon name="sports_soccer" />
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>
<script>

export default {
  name: 'AdminLayout',
  methods: {
    logout() {
      // rota de logout da API
      this.$router.push('/logout'); // rota de logout
    }
  }
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>