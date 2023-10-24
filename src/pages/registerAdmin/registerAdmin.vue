<template>
    <q-page class="bg-light-green window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md"><q-icon name="sports_soccer" /> JogoCerto</h5>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input square filled clearable v-model="dados.name" type="email" label="Nome" />
                            <q-input square filled clearable v-model="dados.cpf" type="number" label="CPF" />
                            <q-input square filled clearable v-model="dados.birthday" type="date" label="Data Nascimento" />
                            <q-input square filled clearable v-model="dados.phoneNumber" type="number"
                                label="Telefone (99) 99999-9999" />
                            <q-input square filled clearable v-model="dados.email" type="email" label="Email" />
                            <q-input square filled clearable v-model="dados.password" type="password" label="Senha" />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn unelevated icon="login" color="light-green-7" size="lg" class="full-width" label="Registrar"
                            @click="this.efetuarRegistro()" />
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
                name: '',
                cpf: '',
                email: '',
                password: '',
                birthday: '',
                phoneNumber: ''
            }
        }
    },
    methods: {
        async efetuarRegistro() {
            try {
                await this.$gf.executeMethod('POST', '/users', this.dados)
                Notify.create({
                    type: 'positive',
                    message: 'Registro efetuado com sucesso. Log-se para proceder com sua reserva!'
                })
            } catch (err) {
                Notify.create({
                    type: 'negative',
                    message: 'Ocorreu um erro ao tentar realizar o cadastro.'
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