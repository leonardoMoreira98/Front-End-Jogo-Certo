<template>
    <q-page class="justify-center">
        <q-card class="q-ma-md row">
            <div class="q-pa-lg col-lg-4 col-md-6 col-sm-12">
                <q-card class="q-pa-lg bg-secondary text-white text-center">
                    <q-card-section>
                        <q-icon class="text-h3" name="person"></q-icon>
                        <div class="text-h6">Total de Usuários: 2</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="q-pa-lg col-lg-4 col-md-6 col-sm-12">
                <q-card class="q-pa-lg bg-secondary text-white text-center">
                    <q-card-section>
                        <q-icon class="text-h3" name="stadium"></q-icon>
                        <div class="text-h6">Total de Quadras: 2</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="q-pa-lg col-lg-4 col-md-6 col-sm-12">
                <q-card class="q-pa-lg bg-secondary text-white text-center">
                    <q-card-section>
                        <q-icon class="text-h3" name="task"></q-icon>
                        <div class="text-h6">Total de Requisições: 2</div>
                    </q-card-section>
                </q-card>
            </div>
        </q-card>
    </q-page>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'homeAdmin'
})
</script>

<style>
.grafico-container {
    height: 50vh;
}
</style>