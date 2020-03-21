<template>
  <div class="support">
    <div class="support-header">
      <span class="main-container-subtitle">User support</span>
      <h2 class="main-container-title">Support</h2>
      <span class="main-container-page-description">You can ask your questions here</span>
    </div>
    <div class="support-body">
      <div class="controll-panel">
        <ei-group-buttons v-model="activeItem">
          <ei-group-item>Opened</ei-group-item>
          <ei-group-item>Completed</ei-group-item>
        </ei-group-buttons>
      </div>
      <ei-ticket-table
        :rows="tickets"
        @more="uploadMore"
        upload
      ></ei-ticket-table>
    </div>
  </div>
</template>

<script>
import EiGroupItem from '../components/EiGroupButtons/Ei-group-item'
import EiGroupButtons from '../components/EiGroupButtons/Ei-group-buttons.vue'
import EiTicketTable from '../components/Ei-ticket-table'


export default {
  components: {
    EiGroupButtons,
    EiGroupItem,
    EiTicketTable
  },
  data: () => ({
    activeItem: 0,
    uncompletedTickets: [
      {
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Processing'
      },
      {
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Opened'
      }
    ],
    completedTickets: [
      {
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Done'
      },
      {
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Done'
      },
      {
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Done'
      },
    ]
  }),
  computed: {
    tickets() {
      if (this.activeItem === 0) return this.uncompletedTickets
      else return this.completedTickets
    }
  },
  methods: {
    uploadMore() {
			// this.uploadTicketsWithStatusAndSlice('completed', this.completedRows.length, this.completedRows.length + 5)
		}
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/support.scss';
</style>