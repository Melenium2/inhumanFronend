<template>
  <div class="ei-notification">
    <ei-dropdown class="ei-notification-body">
      <div slot="trigger">
        <ei-button type="icon" icon="bell" size="st"></ei-button>
      </div>
      <div slot="header">
        <div class="ei-notification-header">
          <span>Notifications</span>
          <span class="checker" @click="removeAll">Mark all as read</span>
        </div>
      </div>
      <div slot="content" class="ei-notification-item-container">
        <div v-if="items.length > 0">
          <div v-for="(item, key) in items" :key="key" class="ei-notification-item" 
          :class="[`ei-notification-${replaceString(item.icon)}`]" @click="removeItem(key)">
            <i><awesome-icon :icon="item.icon" /></i>
            <div class="message">
              <span>{{ item.title }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
        </div>
        <div v-else class="ei-notification-item ei-notification-empty">
          <h4>No notifications</h4>
        </div>
      </div>
    </ei-dropdown>
  </div>
</template>

<script>
import EiDropdown from './Ei-dropdown'

export default {
  components: {
    EiDropdown
  },
  data: () => ({
    items: [
      {
        icon: 'info-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '20/03/1999'
      },
      {
        icon: 'question-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '21/12/1930'
      },
      {
        icon: 'times-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '01/01/2001'
      },
      {
        icon: 'info-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '20/03/1999'
      },
      {
        icon: 'question-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '21/12/1930'
      },
      {
        icon: 'times-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '01/01/2001'
      },
      {
        icon: 'info-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '20/03/1999'
      },
      {
        icon: 'question-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '21/12/1930'
      },
      {
        icon: 'times-circle',
        title: 'Kakoyto title dlya notification`a',
        time: '01/01/2001'
      }
    ]
  }),
  methods: {
    replaceString(str) {
      return str.replace('-circle', '')
    },
    removeItem(key) {
      this.items.splice(key, 1)
    },
    removeAll() {
      this.items = []
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/ei-notification.scss';
</style>