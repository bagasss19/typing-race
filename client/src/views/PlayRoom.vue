<template>
  <section id="playroom">
    <div class="title-area bg-dark">
      <h1 v-if="!isPlay">
        Welcome, {{ playerName }}. Your goal is to duplicate the
        provided text below, EXACTLY. Good Luck!
      </h1>
    </div>
    <br />  
    <div class="test-area">
        <p>{{ this.testText }}</p>
    </div>
    <center>
      <textarea v-model="testAreaInput" name="input" form="input" cols="50" rows="4" placeholder="Type here..."
      :style="{
              border: '12px solid ' + this.borderColor,
              borderRadius: '10px',
            }"
      ></textarea>
    </center><br>
    <center><button class="btn btn-warning" @click="getQuote" v-if="users.length> 1">Play the game</button></center>
    <br>
    <button class="btn btn-warning" @click="logout">Logout</button>
    <div>
      <!-- <section id="clock">
        <div class="timer">00:00:00</div>
        </section> -->
    </div>
    <!-- .test-area -->
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PlayRoom",
  data() {
    return {
      // testText: "",
      testAreaInput: "",
      spellCheck: false,
      borderColor: "grey",
      score: 0,
      playerName: "",
      isPlay : false
    };
  },
  sockets : {
    win () {
      this.showWinningMessage()
    },
    lose () {
      this.showLosingMessage()
    }
  },
  methods: {
    reset() {
      this.testAreaInput = "";
    },
    getQuote() {
      this.$socket.emit("getQuote");
      this.isPlay = true
    },
     showWinningMessage () {
      console.log("winning");
      this.$swal.fire(
        'Good job!',
        'You Win!',
        'success'
      )
    },
    showLosingMessage () {
      console.log("losing");
      this.$swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You Lose!',
        footer: '<a href>Why do I have this issue?</a>'
      })
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    }
  },
  computed: {
    // testText() {
    //   return this.$store.state.quotes.quote;
    // },
    users() {
      return this.$store.state.users;
    },
    testText() {
      return this.$store.state.quote;
    },
  },
  watch: {
    testAreaInput() {
      console.log(this.testAreaInput);

      let originTextMatch = this.testText.substring(
        0,
        this.testAreaInput.length
      );

      if (this.testAreaInput == this.testText) {
        this.getQuote();
        this.score += 10;
        const payload = {
          username: this.playerName,
          answer: this.testAreaInput,
          score: this.score,
        };
        console.log(payload, "<<<INI PAYLOAD");
        this.$socket.emit("sendAnswer", payload);
        this.borderColor = "green";
        this.testAreaInput = "";
        // clearInterval(interval);
      } else {
        if (this.testAreaInput == originTextMatch) {
          console.log("true");
          this.borderColor = "green";
          
        } else {
          console.log("false");
          this.borderColor = "red";
        }
      }
    },
  },
  created() {
    // this.$store.dispatch("fetchQuotes");
    this.playerName = localStorage.username;
  },
};
</script>

<style>
/* Typography */

input,
select,
p {
  font-family: "Balsamiq Sans", cursive;
  text-align: center;
  font-size: 25px;
  color: black;
  margin-bottom: 1.5em;
}
/* textarea {
  font-family: 'Balsamiq Sans', cursive;
  font-size: 18px;
  line-height: 1.5;
} */

h1 {
  text-align: center;
  font-size: 20px;
  font-family: "Balsamiq Sans", cursive;
  color: black;
}

/* Layout */
body {
  /* background: cornflowerblue; */
  background-image: url("https://images7.alphacoders.com/896/thumb-1920-896758.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}

.title-area {
  padding: 1em 0.5em;
}

.test-area {
  margin: auto;
  max-width: 550px;
  margin-bottom: 3em;
  padding: 2 2em;
}

#origin-text {
  margin: 1em 0;
  padding: 1em 1em 0;
  background-color: #ededed;
}

.center {
  margin: 0 auto;
  width: 100%;
}

#origin-text p {
  margin: 0;
  padding-bottom: 1em;
}

.timer {
  font-size: 3em;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  margin-left: 30em;
}

.checked {
  color: orange;
}
</style>