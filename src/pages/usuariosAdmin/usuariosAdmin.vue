<template>
    <div class="q-pa-md">
        <q-table title="Cadastro de Quadras" :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[0]"
            hide-bottom>
            <template v-slot:top-left>
                <q-btn color="green" label="Adicionar" icon="add" densed />
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
                        <q-btn size="md" color="green" dense @click="props.expand = !props.expand" icon="edit" />
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
        required: true,
        label: 'Nome',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    }
]

const rows = [
    {
        name: 'Teste'
    }
]

export default {
    setup() {
        return {
            columns,
            rows
        }
    }
}
</script>
  