<script lang="ts">
import {
    defineComponent,
    onBeforeMount,
    reactive,
    useRouter,
    useRoute
  } from '@nuxtjs/composition-api'
  import { useAppStore } from '@/src/entities/app.store'

 export default defineComponent({

    setup() {
      const appStore = useAppStore()
      const state = reactive({
        email: appStore.getEmail,
      })
      const router = useRouter()
      const route = useRoute()

    function go(key: string) {
        appStore.ADD_EVENT({name: 'navigation ', props: {to: key}}) 
        router.push({ path: key }) 
    }

      return {
        state,
        router,
        appStore,
        go,
        route
      }
    },
  })
  </script>
  
  <template>
     <div class="nav-menu">
      <span v-if='appStore.getIsAuth'> {{appStore.getEmail}}</span>
      <div @click="go('bug')" class="nav-menu__item" >
        bug
      </div>
      <div @click="go('auth/login')"  class="nav-menu__item">
        login
      </div>
      <div @click="go('auth/secret')"  class="nav-menu__item">
        secret
      </div>
      <div  v-if='appStore.getIsAuth' @click="appStore.LOGOUT()"  class="nav-menu__item">
        Logout
      </div>
    </div>
  </template>

  <style lang="scss">
    .nav-menu {
      display: flex;
    }
    .nav-menu__item {
        cursor: pointer;
        margin-left: 8px;
      }
  </style>

  