<template>
    <div class="q-pa-md">
        <q-btn color="blue" label="VOLTAR" icon="arrow_left" densed @click="this.$router.push('/admin/inventory')" /> <q-btn
            color="green" label="SALVAR" icon="save" densed @click="salvar" />
        <div class="row q-mt-md">
            <div class="col-12 q-pa-sm">
                <q-avatar @click="uploadImage" style="cursor: pointer" rounded size="80px" color="green">
                    <q-img
                        v-if="previewUrl"
                        :src="previewUrl"
                        fit="cover"
                        style="width: 100%; height: 100%"
                    />
                    <q-icon v-else color="white" name="image" />
                </q-avatar>
                <input @change="onFileChange" class="hidden" type="file" accept="image/*" ref="inputFile">
            </div>
            <div class="col-12 col-lg-6 col-md-6 col-sm-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.name" type="text" label="Nome" />
            </div>
            <div class="col-12 col-lg-3 col-md-3 col-sm-12 q-pa-sm">
                <q-input prefix="R$" reverse-fill-mask square filled v-model="dados.value" mask="###,##" label="Valor" />
            </div>
            <div class="col-12 col-lg-3 col-md-3 col-sm-12 q-pa-sm">
                <q-input square filled v-model="dados.quantity" type="number" label="Quantidade" />
            </div>
            <div class="col-12 q-pa-sm">
                <q-input square filled clearable v-model="dados.description" type="textarea" label="Descrição" />
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
                description: '',
                photoUrls: '',
                value: '',
                quantity: ''
            },
            previewUrl: ''
        }
    },
    methods: {
        uploadImage(){
            this.$refs.inputFile.click()
        },
        onFileChange(value){
            let file = value.target.files[0]
            this.dados.photoUrls = file
            this.previewUrl = URL.createObjectURL(file)
        },
        createFormData(){
            let formData = new FormData()

            formData.append('name', this.dados.name)
            formData.append('value', this.dados.value)
            formData.append('quantity', this.dados.quantity)
            formData.append('description', this.dados.description)
            formData.append('photoUrls', this.dados.photoUrls)

            return formData
        },
        async salvar() {
            try {
                let id = this.$route.params.id
                this.dados.owner = localStorage.getItem('user');

                let formData = this.createFormData()

                await this.$gf.executeMethod('POST', '/sportsCenters/:sportsCenterId/inventory', this.dados)
                Notify.create({
                    type: 'positive',
                    message: 'Produto adicionado com sucesso!'
                })
                this.$router.push('/admin/inventory')

            } catch (err) {
                Notify.create({
                    type: 'negative',
                    message: 'Ocorreu um erro ao tentar fazer a autenticação.'
                })
            }
        }
    },
    async created() {
        let id = this.$route.params.id

        if(id) this.dados = (await this.$gf.executeMethod('GET', `/products/${id}`)).data.sportsCourt
    }
}
</script>