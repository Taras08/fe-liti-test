<script lang="ts">
  import {
    defineComponent,
    onBeforeMount,
    reactive,
    useRouter
  } from '@nuxtjs/composition-api'
  import { useAppStore } from '@/src/entities/app.store'
  import AppBlockNavigate from '../../components/AppBlockNavigate.vue'
  import { watch } from 'vue'

  export default defineComponent({
    name: 'SecretPage',
    // middleware: ['auth'],
    components: {
        AppBlockNavigate
    },
    setup() {
      const appStore = useAppStore()
      const state = reactive({
        email: appStore.getEmail,
      })
      const router = useRouter()
      onBeforeMount(() => {
          if (!appStore.getIsAuth) {
            router.push({ path: '/' })
          } else {
            appStore.ADD_EVENT({name: 'auth_secret_shown', props:{}}) 
          }
      })

       watch(
        () => appStore.getIsAuth,
         async val => {
           console.log(val);
           if (!val) router.push({ path: '/' }) 
           
         }
       )
    
      async function submitForm() {
        const old_email = appStore.getEmail
        appStore.SET_EMAIl(state.email)  
        appStore.ADD_EVENT({name: 'email_change', props: {old_email, new_email: state.email }}) 
      }
    
  
      return {
        state,
        router,
        submitForm,
        appStore
      }
    },
  })
  </script>
  
  <template>
    <div>
      <AppBlockNavigate/>
      <h1>{{appStore.getEmail}}</h1>
      <form @submit.prevent="submitForm">
            <label>
              <span>email</span>
              <input type="email" v-model="state.email" />
            </label>
            <button type="submit">save</button>
        </form>
    </div>
  </template>

  