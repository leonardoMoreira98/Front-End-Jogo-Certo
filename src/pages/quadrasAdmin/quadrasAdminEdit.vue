<template>
    <div class="q-pa-md">
        <q-btn color="blue" label="VOLTAR" icon="arrow_left" densed @click="this.$router.push('/admin/quadras')" /> <q-btn
            color="green" label="SALVAR" icon="save" densed @click="this.salvar()" />
        <div class="row q-mt-md">
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.name" type="Nome" label="Nome" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.photoUrls" type="Photo" label="Photo" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.events" type="Events" label="Eventos" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.contactNumber" type="Contact Number" label="Contato" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.parking" type="Parking" label="Estacionamento" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.steakhouse" type="Steak House" label="Churrasqueira" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.street" type="Street" label="Rua" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.streetNumber" type="text" label="Número" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.zipCode" type="text" label="CEP" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.state" type="text" label="Estado" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.city" type="text" label="Cidade" />
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.neighborhood" type="text" label="Bairro" />
            </div>
        </div>
    </div>
</template>
  
<script>

import { Notify } from 'quasar'

export default {
    data() {
        return {
            dados: {
                name: '',
                photoUrls: '',
                events: '',
                contactNumber: '',
                parking: '',
                steakhouse: '',
                owner: '',
                street: '',
                streetNumber: '',
                zipCode: '',
                state:'',
                city:'',
                neighborhood:''
            }
        }
    },
    methods: {
        async salvar() {
            try {
                let sportsCerterId = this.$route.params.sportsCerterId
                this.dados.owner = localStorage.getItem('user');

                await this.$gf.executeMethod( sportsCerterId ? 'PUT' : 'POST', sportsCerterId ? '/sportsCenters/' + sportsCerterId : '/sportsCenters', this.dados)
                Notify.create({
                    type: 'positive',
                    message: 'Quadra criada com sucesso!'
                })
                this.$router.push('/admin/quadras')

            } catch (err) {
                Notify.create({
                    type: 'negative',
                    message: 'Ocorreu um erro ao tentar fazer a autenticação.'
                })
            }
        }
    },
    async created() {
        let id = this.$route.params.sportsCerterId

        if(id) this.dados = (await this.$gf.executeMethod('GET', `/sportsCenters/${id}`)).data.sportsCenters
    }
}
</script>
  