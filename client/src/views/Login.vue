<template>
  <div>
    <form @submit.prevent="submitUsername">
      <input required v-model="username" type="text" placeholder="insert your name">
      <button type="submit">Play</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    submitUsername () {
      const payload = {
        username: this.username
      }
      this.$socket.emit('userConnect', payload)
      localStorage.setItem('username', payload.username)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
