export default function ({redirect, store}) {
    console.log('====================================');
    console.log(1111);
    console.log('====================================');
    const isAuthenticated = store.state.auth.user ? true : false
    if (!isAuthenticated) {
      redirect({name: 'auth'})
    }
  }