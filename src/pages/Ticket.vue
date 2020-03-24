<template>
	<div class="ticket main-container-page">
		<div class="main-container-page-header">
			<span class="main-container-subtitle">Ticket №123</span>
			<h2 class="main-container-title">Ticket header</h2>
		</div>
		<div class="ticket-body">
			<div class="ticket-body-chat">
				<div class="chat-header">
					<div class="chat-user">
						<img :src="require('@/assets/images/user-avatar.png')" class="avatar" />
						<span class="username">Nikola Tesla</span>
						<span class="email">(nikolatestla@gmail.com)</span>
					</div>
					<div class="chat-header-creation-time">
						<span class="time-text">Created 34 hours ago.</span>
					</div>
				</div>
				<div class="chat-body">
					<div v-for="(message, key) in messages" :key="key" class="chat-body-message">
						<div class="chat-header">
							<div class="chat-user">
								<img :src="require('@/assets/images/user-avatar.png')" class="avatar" />
								<span class="username">{{ message.username }}</span>
							</div>
							<div>
								<span class="time-text">{{ message.date }}</span>
							</div>
						</div>
						<div class="message">
							<span>{{ message.message }}</span>
						</div>
					</div>
					<ei-text-editor v-model="editorText"></ei-text-editor>
				</div>
        <div class="chat-footer">
          <ei-button class="reply-btn" standart>Reply</ei-button>
          <ei-button class="close-btn" flat with-confirm>Close question</ei-button>
        </div>
			</div>
			<div class="ticket-body-info">
        <div class="information">
          <div class="information-title">
            <span>information</span>
          </div>
          <div class="information-body">
            <span class="placeholder">owner</span>
            <div class="user">
              <img :src="require('@/assets/images/user-avatar.png')" class="avatar" />
              <span class="name">Nikola Tesla</span>
            </div>
            <span class="placeholder">Helper</span>
            <div class="user">
              <img :src="require('@/assets/images/user-avatar.png')" class="avatar" />
              <span class="name">Drugoi chelik</span>
            </div>
          </div>
          <div class="information-footer">
            <div class="wrapper">
              <span class="placeholder">IDENTIFIER</span>
              <div>
                TN28/03-21-2020
              </div>
            </div>
          </div>
        </div>
        <div class="additional">
          <div class="additional-header">
            <span>additional information</span>
          </div>
          <div class="additional-body">
            <div class="body-section">
              <span class="placeholder">Section</span>
              <div class="body-info">
                No info
              </div>
            </div>
            <div class="body-section">
              <span class="placeholder">Title</span>
              <div class="body-info">
                No info
              </div>
            </div>
            <div class="body-section">
              <span class="placeholder">Additional content</span>
              <div class="body-info">
                No info
              </div>
            </div>
            <div class="body-section">
              <span class="placeholder">Status</span>
              <div class="body-info">
                No info
              </div>
            </div>
          </div>
        </div>
      </div>
		</div>
	</div>
</template>

<script>
import EiTextEditor from '../components/Ei-text-editor'

export default {
	components: {
		EiTextEditor
	},
	data: () => ({
    editorText: '',
		messages: [
			{
				picture: '@/assets/images/user-avatar.png',
				username: 'Nikola Tesla',
				date: '20-03-2014',
				message: 'Hello'
			},
			{
				picture: '@/assets/images/user-avatar.png',
				username: 'Drugoi chelik',
				date: '21-03-2014',
				message: 'hello'
			},
			{
				picture: '@/assets/images/user-avatar.png',
				username: 'Nikola Tesla',
				date: '22-03-2014',
				message: 'help me or i will k... oups sorry'
			}
		]
  }),
  methods: {
    
  },
	created() {
		// let ticketId = this.$route.query.id
	}
}
</script>

<style lang='scss'>
@import '@/assets/scss/pages/ticket.scss';
</style>