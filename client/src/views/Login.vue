<template>
  <div class="custom-card custom-bg p-5 mb-5 bg-login">
    <br />
    <h1>
      Typing Racer
      <br />
      <h4 class="text-muted">Show your fast finger !</h4>
    </h1>

<<<<<<< HEAD
    <form class="login" @submit.prevent="submitUsername">
=======
    <form @submit.prevent="submitUsername">
>>>>>>> 29234a58089a71110ed63ad616208e79ba87ac14
      <input
        required
        v-model="username"
        type="text"
        placeholder="insert your name"
      />
      <button type="submit" class="btn btn-primary">Play</button>
    </form>
<<<<<<< HEAD
=======

>>>>>>> 29234a58089a71110ed63ad616208e79ba87ac14
    <br />
    <img src="https://media.giphy.com/media/Y0P6qNNkCyItnnx9c1/giphy.gif" />
    <br />
    <br />
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModalCenter"
    >
      Click me !
    </button>
    <br />
    <br />
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="exampleModalLongTitle">
              Gimana cara mainnya?
            </h1>
          </div>
          <div class="modal-body">
            Gampang aja, kamu hanya perlu input nama kamu. Klik tombol start.
            Mulai deh ngetiknya, tunjukkan speedmuu..🚀
            #easypeasydoryrotistroberi
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              Ok, baiq
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    submitUsername() {
      const payload = {
        username: this.username,
        score: 0,
      };
      this.$socket.emit("userConnect", payload);
      localStorage.setItem("username", payload.username);
      this.$router.push({ name: "PlayRoom" });
<<<<<<< HEAD
      //this.$router.push({ name: "Rooms" }); // kalau room sudah jadi
=======
      // this.$router.push({ name: "Rooms" }); // kalau room sudah jadi
>>>>>>> 29234a58089a71110ed63ad616208e79ba87ac14
    },
  },
};
</script>

<style>
<<<<<<< HEAD
.login {
  text-align: center;
  width: 37%;
}
</style>
=======
</style>
>>>>>>> 29234a58089a71110ed63ad616208e79ba87ac14
