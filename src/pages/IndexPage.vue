<template>
  <q-page class="flex flex-center" style="gap: 5px;">

    <q-card class="my-card bg-primary text-white" style="width: 350px; text-align: center;">
      <q-card-section>
        <q-icon name="person" size="125px"></q-icon>
        <div class="text-h6">Acesso de Usuário</div>
        <hr/>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="green" @click="this.$router.push('/secure/user')">Login</q-btn>
        <q-btn color="red"   @click="this.$router.push('/secure/register-user')">Registrar</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card bg-purple text-white" style="width: 350px; text-align: center;">
      <q-card-section>
        <q-icon name="person" size="125px"></q-icon>
        <div class="text-h6">Acesso de Administrador</div>
        <hr/>
      </q-card-section>


      <q-card-actions align="center">
        <q-btn color="green" @click="this.$router.push('/secure/admin')">Login</q-btn>
        <q-btn color="red"   @click="this.$router.push('/secure/register-admin')">Registrar</q-btn>
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
