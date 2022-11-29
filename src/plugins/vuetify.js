import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas, far)

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa',
    values: {
      complete: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'check']
        }
      },
      xmark: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'xmark']
        }
      },
      dropdown: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'caret-down']
        }
      },
      angleUp: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'angle-up']
        }
      },
      checkboxOff: {
        component: FontAwesomeIcon,
        props: {
          icon: ['far', 'square']
        }
      },
      checkboxOn: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'square-check']
        }
      }
    }
  }
})
