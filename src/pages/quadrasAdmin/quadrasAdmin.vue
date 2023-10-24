<template>
    <div class="q-pa-md">
        <q-table title="Cadastro de Quadras" :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[0]"
            hide-bottom>
            <template v-slot:top-left>
                <q-btn color="green" label="Adicionar" icon="add" densed @click="this.$router.push('/admin/quadras/edit')" />
            </template>

            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width />
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                        <q-btn size="md" color="green" dense @click="this.EditarRegistro(props.row.id)" icon="edit" />
                        <q-btn class="q-ml-sm" size="md" color="red" dense @click="this.apagarRegistro(props.row.id)" icon="delete" />
                    </q-td>
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>
  
<script>

const columns = [
    {
        name: 'name',
        label: 'Quadra',
        required: true,
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true,
        style: 'width: 20%'
    },
    {
        name: 'description',
        label: 'Descrição',
        required: true,
        align: 'left',
        field: row => row.description,
        format: val => `${val}`,
        sortable: true,
        style: 'width: 40%'
    },
    {
        name: 'location',
        label: 'Local',
        required: true,
        align: 'left',
        field: row => row.location,
        format: val => `${val}`,
        sortable: true,
        style: 'width: 40%'
    }
]


export default {
    setup() {
        return {
            columns
        }
    },
    data() {
        return {
            rows: []
        }
    },
    methods: {
        async apagarRegistro(id) {
            if(confirm('Deseja apagar este registro?')) {
                await this.$gf.executeMethod('DELETE', '/sportsCenters/' + id)
                this.rows = (await this.$gf.executeMethod('GET', '/sportsCenters')).data.sportsCenters
            }
        },

        async EditarRegistro(id) {
            await this.$gf.executeMethod('PUT', '/sportsCenters/' + id)
            this.$router.push('/admin/quadras/edit/' + props.row.id)
        }
    },
    //this.$router.push('/admin/quadras/edit/' + props.row.id)
    async mounted() {
       this.rows = (await this.$gf.executeMethod('GET', '/sportsCenters')).data.sportsCenters
    }
}
</script>
  
