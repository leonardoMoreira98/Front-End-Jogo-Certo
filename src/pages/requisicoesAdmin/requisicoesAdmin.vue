<template>
    <div class="q-pa-md">
        <q-table flat bordered title="Requisições de Quadras" :rows="rows" :columns="columns" row-key="name"
            :rows-per-page-options="[0]" hide-bottom>

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
                        <q-btn size="md" color="green" dense @click="this.aceitarSolicit(props.row)" icon="thumb_up" />
                        <q-btn class="q-ml-sm" size="md" color="red" dense @click="this.recusarSolicit(props.row)"
                            icon="thumb_down" />
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
        name: 'quadra',
        required: true,
        label: 'Quadra (Solicitada para reserva)',
        align: 'left',
        field: row => row.sportsCourt.name,
        format: val => `${val}`,
        sortable: true,
        style: 'width: 30%'
    },
    {
        name: 'usuario',
        required: true,
        label: 'Usuário (Solicitou a reserva)',
        align: 'left',
        field: row => row.user.name,
        format: val => `${val}`,
        sortable: true,
        style: 'width: 70%'
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
    async mounted() {
        setInterval(async () => {
            this.rows = (await this.$gf.executeMethod('GET', `/sportsCourtRequests/index`)).data.sportsCourts
        }, 1000*1)
    },
    methods: {
        async aceitarSolicit(solicit) {
            if(confirm('Deseja aceitar esta solicitação?')) {
                solicit.status = 'ACCEPTED'
                await this.$gf.executeMethod('PUT', `/sportsCourt/${solicit.id}/update`, solicit)
                this.rows = (await this.$gf.executeMethod('GET', `/sportsCourtRequests/index`)).data.sportsCourts
            }
        },
        async recusarSolicit(solicit) {
            if(confirm('Deseja recusar esta solicitação?')) {
                solicit.status = 'REJECTED'
                await this.$gf.executeMethod('PUT', `/sportsCourt/${solicit.id}/update`, solicit)
                this.rows = (await this.$gf.executeMethod('GET', `/sportsCourtRequests/index`)).data.sportsCourts
            }
        }
    }
}
</script>
  