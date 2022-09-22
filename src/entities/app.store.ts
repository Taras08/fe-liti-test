import { defineStore } from 'pinia'

type User = {
  email: string,
  password: string
}
type AnalyticsEvent = {
  name: string
  props: {[key: string]: string | number | boolean}
}
type AppStoreState = {
  loading: boolean,
  isAuth: boolean,
  user: User,
  analytics: Array<AnalyticsEvent>
}



export const useAppStore = defineStore('app', {
  state: (): AppStoreState => {
    return {
      loading: true,
      user: {
        email:'',
        password:''
      },
      isAuth: false,
      analytics: []
    }
  },
  getters: {
    getUser: (state) => state.user,
    getEmail: (state) => state.user.email,
    getIsAuth: (state) => state.isAuth,
  },
  actions: {
    SET_USER(user: User) {
      this.user = user
    },
    SET_EMAIl(email: string) {
      this.user.email = email 
    },
    SET_IS_AUTH(value: boolean) {
      this.isAuth = value
    },
    ADD_EVENT(value: AnalyticsEvent) {
      console.log('analytics.event', value.name, JSON.stringify(value.props))
      this.analytics.push(value)
    },
    LOGOUT() {
      this.isAuth= false
      this.user = {email: '', password: ''}
    }
  },
})
