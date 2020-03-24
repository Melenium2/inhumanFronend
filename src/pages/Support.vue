<template>
  <div class="support main-container-page">
    <ei-modal class="ticket-modal" :visible="isModalActive">
      <div class="ticket-modal-header" slot="header">
        Ask your question
        <awesome-icon class="close-icon" icon="times" @click="activateModal"></awesome-icon>
      </div>
      <div class="ticket-modal-body" slot="body">
        <div class="modal-body-block">
          <span>Title</span>
          <ei-input placeholder="Required field" required></ei-input>
        </div>
        <div class="modal-body-block">
          <span>Select question section</span>
          <ei-select 
          placeholder="Required field"
          required
          :items="[
            {
              text: '123'
            },
            { 
              text: '4323'
            },
            {
              text: 'agagaga'
            }
          ]">
          </ei-select>
        </div>
        <div class="modal-body-block">
          <span>Description</span>
          <ei-text-editor class="description-block"></ei-text-editor>
        </div>
      </div>
      <div class="ticket-modal-footer" slot="footer">
        <ei-button class="close" type="with-icon" icon="times" flat @click="activateModal">Close</ei-button>
        <ei-button class="send" type="with-icon" icon="pen" standart>Send</ei-button>
      </div>
    </ei-modal>
    <div class="support-header main-container-page-header">
      <span class="main-container-subtitle">Your tickets</span>
      <h2 class="main-container-title">Support</h2>
      <span class="main-container-page-description">You can ask your questions here</span>
    </div>
    <div class="support-body">
      <div class="controll-panel">
        <ei-group-buttons v-model="activeItem">
          <ei-group-item>Opened</ei-group-item>
          <ei-group-item>Completed</ei-group-item>
        </ei-group-buttons>
        <ei-button class="create-btn" standart @click="activateModal">Create ticket</ei-button>
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
import EiModal from '../components/Ei-modal'
import EiInput from '../components/Ei-input'
import EiSelect from '../components/Ei-select'
import EiTextEditor from '../components/Ei-text-editor'

export default {
  components: {
    EiGroupButtons,
    EiGroupItem,
    EiTicketTable,
    EiModal,
    EiInput,
    EiSelect,
    EiTextEditor
  },
  data: () => ({
    activeItem: 0,
    isModalActive: false,
    uncompletedTickets: [
      {
        id: 1,
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Processing'
      },
      {
        id: 2,
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Opened'
      }
    ],
    completedTickets: [
      {
        id: 3,
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Done'
      },
      {
        id: 4,
        subject: 'Y menya problemi',
        section: 'Technical question',
        date: '1232131232131231',
        status: 'Done'
      },
      {
        id: 5,
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
    },
    activateModal() {
      this.isModalActive = !this.isModalActive
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/support.scss';
</style>