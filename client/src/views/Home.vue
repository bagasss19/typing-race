<template>
  <div>
    <h1>Player list, you are: {{ username }}</h1>
    <div class="card-format" >
      <div class="container" v-for="(user,i) in users" :key="i">
        <div class="card">
          <img src="img_avatar.png" alt="Avatar" style="width:100%">
          <div class="container">
            <h4><b>{{ user.username }}</b></h4>
            <p>Architect & Engineer</p>
          </div>
        </div>
      </div>
    </div><br><br>
    <form @submit.prevent="sendAnswer">
      <input type="text" placeholder="type here" v-model="answer">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Home',
<<<<<<< HEAD
  components: {
    HelloWorld
  },
  sockets : {
    connect: function (data) {
      console.log(data,'<<<<<ini data dari home');
=======
  data () {
    return {
      users: [],
      username: '',
      answer: ''
    }
  },
  sockets: {
    userConnected (data) {
      this.users = data
    }
  },
  created () {
    this.username = localStorage.username
  },
  methods: {
    sendAnswer () {
      const payload = {
        username: this.username,
        answer: this.answer
      }
      this.$socket.emit('sendAnswer', payload)
      this.answer = ''
>>>>>>> ffe4f8495a9990c2684a3a3a62de40ea451c3978
    }
  }
}
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
}

.card-format {
  display: flex;
  flex-direction: row;
}
</style>
