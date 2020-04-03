import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faCaretLeft, faChartPie, faCoins,
faNetworkWired, faPaperPlane, faHistory, faPlus,
faExternalLinkAlt, faUser, faAngleDoubleUp, faBell,
faInfoCircle, faQuestionCircle, faTimesCircle, faAngleDown,
faCogs, faSignature, faSignOutAlt, faSyncAlt, faQuoteRight,
faBold, faItalic, faStrikethrough, faUnderline, faHeading,
faListUl, faMinus, faUndoAlt, faRedoAlt, faTimes, faPen, 
faKey, faInfo, faAngleUp, faChevronLeft, faChevronRight, faDirections,
faChevronDown,
faCalendarAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faCaretLeft, faChartPie, faCoins, faNetworkWired,
  faPaperPlane, faHistory, faPlus, faExternalLinkAlt, faUser,
  faAngleDoubleUp, faBell, faInfoCircle, faQuestionCircle, faTimesCircle,
  faAngleDown, faCogs, faSignature, faSignOutAlt, faSyncAlt, faQuoteRight,
  faBold, faItalic, faStrikethrough, faUnderline, faHeading, faListUl,
  faMinus, faUndoAlt, faRedoAlt, faTimes, faPen, faKey, faInfo, faAngleUp,
  faChevronLeft, faChevronRight, faDirections, faChevronDown, faCalendarAlt)

Vue.component('awesome-icon', FontAwesomeIcon)