<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    useRoute,
  } from '@nuxtjs/composition-api'
  import { useAppStore } from '@/src/entities/app.store'
  import AppBlockNavigate from '../components/AppBlockNavigate.vue' 
  
  
  function getName(value: any) {
    return value.name || ''
  }
  
  export default defineComponent({
    name: 'BugPage',
    components: {
      AppBlockNavigate
    },
    setup() {
      const appStore = useAppStore()
      const state = reactive({
        name: '',
      })
      const route = useRoute()
      
      function onShowName() {
        state.name = getName(route.value)
        appStore.ADD_EVENT({name: 'bug_shown', props: {}}) 
      }
  
      onMounted(() => {
        appStore.loading = true
        appStore.ADD_EVENT({name: 'bug_shown', props: {}}) 
      })
  
      return {
        state,
        onShowName,
        route
      }
    },
  })
  </script>
  
  <template>
    <div :class="$style.page">
      <AppBlockNavigate />
      <div>
        Route name: "<strong>{{ state.name }}</strong>"
      </div>
      <button @click="onShowName()">Show Name</button>
    </div>
  </template>
  
  <style lang="scss" scoped module>
  @import '~/assets/scss/variables';
  
  .page {
    $self: &;
  
    // Desktop
    @media screen and (min-width: 1024) {
      width: 300px;
      margin: auto;
    }
  }
  </style>
  