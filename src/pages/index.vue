<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import AppBlockNavigate from '../components/AppBlockNavigate.vue' 
import { useAppStore } from '@/src/entities/app.store'

export default defineComponent({
  name: 'IndexPage',
  components: {
    AppBlockNavigate
  },
  setup() {
      const appStore = useAppStore()
      
      onBeforeMount(() => {
          appStore.ADD_EVENT({name: 'index_shown', props: {}}) 
      })

    },
})
</script>

<template>
  <div :class="$style.page">
    <div>
      <AppBlockNavigate /> 
      <p>Home page</p>
           
    </div>
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
