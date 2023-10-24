<template>
  <q-page class="bg-light-blue window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md"><q-icon name="sports_soccer" /> JogoCerto</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="dados.email" type="email" label="Email" />
              <q-input square filled clearable v-model="dados.password" type="password" label="Senha" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated icon="login" color="light-blue-7" size="lg" class="full-width" label="Efetuar Login"
              @click="this.efetuarLogin()" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
  
<script>

import axios from 'axios'
import { Notify } from 'quasar'

export default {
  name: 'Login',
  data() {
    return {
      dados: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async efetuarLogin() {
      try {
        let response = await this.$gf.executeMethod('POST', '/sessions', this.dados)

        // Setando o token de autenticação
        localStorage.setItem('token', response.data.token.token)
        localStorage.setItem('user', response.data.user.id)

        Notify.create({
          type: 'positive',
          message: 'Login efetuado com sucesso. Sinta-se a vontade!'
        })

        this.$router.push('/user/quadras')

      } catch (err) {
        Notify.create({
          type: 'negative',
          message: 'Ocorreu um erro ao tentar fazer a autenticação.'
        })
      }
    }
  }
}
</script>
  
<style>
.q-card {
  width: 360px;
}
</style>