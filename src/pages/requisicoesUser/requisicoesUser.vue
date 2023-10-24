<template>
    <q-page class="window-height window-width row justify-center items-center">
        <q-card v-if="this.view == 'form'" class="bg-light text-dark" style="width: 40vw;">
            <q-card-section>
                <q-select outlined v-model="tempo_aluguel" :options="options" label="Horários" />
            </q-card-section>
            <q-card-actions>
                <q-btn color="green" icon="done" label="CONFIRMAR RESERVA" @click="this.confirmarReserva()"></q-btn>
            </q-card-actions>
        </q-card>
        <q-card v-if="this.view == 'loading'" class="bg-light text-dark" style="width: 40vw;">

            <q-card-section v-if="status == 'PENDING'">
                <q-card-section class="text-center">
                    <q-spinner color="red" size="6em" />
                </q-card-section>
                <div class="text-h6"><q-icon name="sentiment_satisfied"></q-icon> Você esta tentando alugar a quadra: {{
                    dados.name }}</div>
                <div class="text-subtitle2">Aguardando aprovação/rejeição do administrador....</div>
            </q-card-section>
            <q-card-section v-if="status == 'ACCEPTED'">
                <div class="text-h6 text-success"><q-icon name="done"></q-icon> Aceito! Sua reserva foi concluida com
                    sucesso!</div>
            </q-card-section>
            <q-card-section v-if="status == 'REJECTED'">
                <div class="text-h6 text-success"><q-icon name="cancel"></q-icon> Rejeitado! Sua reserva foi rejeitada!
                </div>
            </q-card-section>

            <q-card-actions v-if="status == 'PENDING'">
                <q-btn color="red" icon="cancel" label="CANCELAR RESERVA" @click="this.cancelarSolicitacao()"></q-btn>
            </q-card-actions>
            <q-card-actions v-else="status == 'PENDING'">
                <q-btn color="green" icon="cancel" label="SOLICITAR NOVA RESERVA"
                    @click="this.$router.push('/user/quadras')"></q-btn>
            </q-card-actions>
        </q-card>
    </q-page>
</template>
        
<script>
import { Notify } from 'quasar'


export default {
    data() {
        return {
            view: 'form',
            tempo_aluguel: '',
            dados: {

            },
            solicitId: '',
            status: 'PENDING',
            options: [
                {
                    label: '17:00 às 18:00 (R$ 175,00)',
                    value: '18:00:00',
                    icon: 'calendar'
                },
                {
                    label: '18:00 às 19:00 (R$ 175,00)',
                    value: '19:00:00',
                    icon: 'calendar'
                },
                {
                    label: '19:00 às 20:00 (R$ 175,00)',
                    value: '20:00:00',
                    icon: 'calendar'
                },
                {
                    label: '20:00 às 21:00 (R$ 175,00)',
                    value: '21:00:00',
                    icon: 'calendar'
                },
                {
                    label: '21:00 às 22:00 (R$ 175,00)',
                    value: '22:00:00',
                    icon: 'calendar'
                },
                {
                    label: '22:00 às 23:00 (R$ 175,00)',
                    value: '23:00:00',
                    icon: 'calendar'
                },
            ]
        }
    },
    methods: {
        async confirmarReserva() {
            let id = this.$route.params.id
            let dados = (await this.$gf.executeMethod('GET', `/sportsCourt/${id}`)).data.sportsCourt
            this.dados = dados
            this.dados.user_id = localStorage.getItem('user')
            this.dados.sports_court_id = dados.id
            this.dados.reservation_time = (new Date).getTime()
            this.view = 'loading'
            try {
                let response = await this.$gf.executeMethod('POST', `/sportsCourt/${id}/requests`, this.dados)
                if (response) {
                    this.solicitId = response.data.sportsCourtRequest.id
                    this.getStatusFromReserva(response.data.sportsCourtRequest.id)
                } else {
                    Notify.create({ color: 'red', message: 'Esta quadra já foi solicitada para outro usuário. Escolha outra quadra!' })
                    this.$router.push('/user/quadras')
                }
            } catch (err) {
                Notify.create({ color: 'red', message: 'Ocorreu um erro..' })
            }
        },
        async getStatusFromReserva(id) {
            setTimeout(async () => {
                let status_requisicao = await this.$gf.executeMethod('GET', `/sportsCourt/${id}/requests_status`)

                if (!status_requisicao) {
                    this.status = 'REJECTED';
                    return;
                }

                if (status_requisicao.data.sportsCourtRequest.status != 'PENDING') {
                    this.status = status_requisicao.data.sportsCourtRequest.status;
                    return;
                }
                this.getStatusFromReserva(id)
            }, 1000 * 1)
        },
        async cancelarSolicitacao() {
            await this.$gf.executeMethod('DELETE', `/sportsCourt/${this.solicitId}/delete`)
            Notify.create({ color: 'green', message: 'Solicitação de reserva cancelada com sucesso!' })
            this.$router.push('/user/quadras')
        }

    }
}
</script>
  