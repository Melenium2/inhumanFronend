import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faCaretLeft, faChartPie, faCoins,
faNetworkWired, faPaperPlane, faChartLine, faPlus,
faExternalLinkAlt, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faCaretLeft, faChartPie, faCoins, faNetworkWired,
  faPaperPlane, faChartLine, faPlus, faExternalLinkAlt, faUser)

Vue.component('awesome-icon', FontAwesomeIcon)