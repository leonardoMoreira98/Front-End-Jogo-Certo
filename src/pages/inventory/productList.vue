<template>
    <q-table
      flat bordered
      :rows="rows"
      hide-bottom
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <q-btn color="green" icon="add" :disable="loading" label="Adicionar" @click="$router.push('inventory/edit')" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
          <q-td style="width: 50px" key="actions" :props="props">
            <q-btn
                class="q-mr-xs"
                padding="xs"
                color="green"
                icon="edit"
            />
            <q-btn
                @click="removeItem(props.row.id)"
                padding="xs"
                color="negative"
                icon="delete"
            />
          </q-td>
          <q-td style="width: 50px" key="photoUrls" :props="props">
            <q-avatar>
                <q-img
                    :src="props.row.photoUrls"
                    fit="cover"
                    style="width: 100%; height: 100%"
                />
            </q-avatar>
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="value" :props="props">
              {{ formatMoney(props.row.value) }}
          </q-td>
          <q-td key="quantity" :props="props">
              {{ props.row.quantity }}
          </q-td>
          <q-td key="description" :props="props">
              {{ props.row.description }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { name: 'actions', label: 'Ações', align: 'center', field: 'actions' },
        { name: 'photoUrls', label: 'Imagem', align: 'center', field: 'photoUrls' },
        { name: 'name', label: 'Nome', align: 'left', field: 'name', sortable: true },
        {
          name: 'value',
          label: 'Valor',
          sortable: true,
          field: 'value',
        },
        { name: 'quantity', label: 'Quantidade', sortable: true, field: 'quantity', align: 'center' },
        { name: 'description', label: 'Descrição', align: 'left', field: 'description' },
      ],
      rows: [], 
    };
  },
  methods: {
    formatMoney(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },

  },
  async mounted() {
    try {
     
      const response = await this.$gf.executeMethod('GET', '/sportsCenters/:sportsCenterId/inventory');
      this.rows = response.data; 

    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
    }
    
  },
};
</script>