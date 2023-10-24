<template>
    <q-page class="window-height window-width row justify-center items-top row">
        <q-table style="width: 100vw;" flat bordered title="Quadras Disponíveis" :rows="rows" :columns="columns" :rows-per-page-options="[0]" hide-bottom
            row-key="name">

            <template v-slot:top-right>
                <div class="flex text-center">
                    <q-card class="q-pa-sm bg-secondary text-white">
                        <q-h6><q-icon name="calendar_month"></q-icon> Quadras disponíveis na data de: <br>
                        <b class="text-center">{{ this.horarioAtual }}</b></q-h6>
                    </q-card>
                </div>
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
                        <q-btn size="md" color="green" dense label="RESERVAR"
                            @click="this.$router.push('/user/requisicoes/' + props.row.id)" />
                    </q-td>
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                </q-tr>
            </template>

        </q-table>
    </q-page>
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
        label: 'Número do Telefone',
        required: true,
        align: 'left',
        field: row => row.contact_number,
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
            horarioAtual: new Date().toLocaleString(),
            rows: []
        }
    },
    async mounted() {
        setInterval(async () => {
            this.horarioAtual = new Date().toLocaleString();
            this.rows = (await this.$gf.executeMethod('GET', '/sportsCenters')).data.sportsCenters;
        }, 1000 * 1);

        
    }
}
</script>
