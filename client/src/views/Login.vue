<template>
  <div class="custom-card custom-bg p-5 mb-5 text-center bg-login">
    <br />
    <h1>
      Typing Racer
      <br />
      <h4 class="text-muted">Show your fast finger !</h4>
    </h1>
    <div class="row justify-content-center" style="display: flex; justify-content: center">
      <div class="col-8" style="width: 50%">
        <form class="login" style="width: 100%" @submit.prevent="submitUsername">
          <div class="input-group">
  <input
        required
        v-model="username"
        type="text"
        placeholder="insert your name"
        class="form-control" style="200px"
      />
  <div class="input-group-btn">
    <!-- Buttons -->
    <button type="submit" class="btn btn-primary">Play</button>
  </div>
</div>
    </form>
      </div>
    </div>
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
    },
  },
};
</script>

<style>
.login {
  text-align: center;
  width: 37%;
}
</style>
