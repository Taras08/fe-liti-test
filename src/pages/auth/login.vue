<script lang="ts">
  import {
    defineComponent,
    useRouter,
    reactive,
  } from '@nuxtjs/composition-api'
  import { useAppStore } from '@/src/entities/app.store'
  
function auth(email: string, password: string) {
        return email == 'tester@test.com' && password == 'TesteR@007' ? {success: true} : {seccess: false, error: 'login or password incorrect'}
  }

  export default defineComponent({
    name: 'LoginPage',
    setup() {
      const state = reactive({
        email: '',
        password: '',
        isError: false
      })
      const appStore = useAppStore()
      const router = useRouter()
      
    
     async function submitForm() {
         const data = await auth(state.email, state.password)
            if (data.success) {
                appStore.SET_USER({email: state.email, password: state.password})
                appStore.SET_IS_AUTH(true)
                appStore.ADD_EVENT({name: 'login_success', props: {email: state.email}}) 
                router.push({ path: 'secret' }) 
            } else {
                appStore.ADD_EVENT({name: 'login_success', props: {email: state.email}}) 
                state.password = ''
                state.isError = true
            }
        
      }

      return {
        state,
        submitForm,
        router,
      }
    },
  })
  </script>
  
  <template>
        <form @submit.prevent="submitForm">
            <label>
              <span>email</span>
              <input type="email" :class="{error: state.isError}" v-model="state.email" />
            </label>
            <label>
              <span>password</span>
              <input type="password" :class="{error: state.isError}" required v-model="state.password" minlength="3" maxlength="20" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%-_']).{3,}" />
            </label>
            <button type="submit">Login</button>
        </form>
  </template>


  <style lang="scss">
    .error {
      border: 1px solid red;
    }
    
  </style>

  