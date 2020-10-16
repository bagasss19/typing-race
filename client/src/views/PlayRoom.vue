<template>
  <section id="playroom">
    <body>
      <header class="title-area">
        <h1>Test Your Typing Speed</h1>
        <p>
          Welcome to the TYPING RACE. Your goal is to duplicate the provided
          text, EXACTLY, in the field below. Good Luck!
        </p>
      </header>
      <main class="main">
        <div class="intro">
          <!-- {{ this.users }} -->
          <div class="row">
            <ScoreCard v-for="(user, i) in this.users" :key="i" :user="user">
            </ScoreCard>
          </div>
          <h1>Player: {{ playerName }}</h1>
          <!-- <h1>Score: {{ score }}</h1> -->
          <button
            @click="getQuote"
            v-if="users.length > 1 && users[0].username === playerName"
          >
            <!-- <button @click="getQuote" v-if="room.admin == this.playerName"> -->
            Play the game
          </button>
        </div>
        <section class="test-area">
          <div id="origin-text" v-if="isLoaded === true">
            <p class="unselectable">{{ this.testText }}</p>
          </div>
          <div v-else>
            <button class="donutSpinner"></button>
          </div>

          <div
            class="test-wrapper"
            :style="{
              border: '12px solid ' + this.borderColor,
              borderRadius: '10px',
            }"
          >
            <textarea
              v-model="testAreaInput"
              name="textarea"
              rows="6"
              placeholder="Start typing..."
            >
            </textarea>
          </div>
          <div>
            <button @click="reset" id="reset">Start over</button>
          </div>
        </section>
        <!-- .test-area -->
      </main>
    </body>
  </section>
</template>

<script>
import ScoreCard from "@/components/ScoreCard.vue";
import { mapState } from "vuex";
export default {
  name: "PlayRoom",
  components: {
    ScoreCard,
  },
  data() {
    return {
      isLoaded: false,
      testAreaInput: "",
      spellCheck: false,
      borderColor: "grey",
      playerName: "",
    };
  },
  sockets: {
    win() {
      this.showWinningMessage();
    },
    lose() {
      this.showLosingMessage();
    },
    changeLoadedStatus(payload) {
      this.isLoaded = payload;
    },
  },
  methods: {
    reset() {
      this.testAreaInput = "";
    },
    getQuote() {
      this.$socket.emit("getQuote");
    },
    showWinningMessage() {
      // console.log("winning");
      this.$swal.fire("Good job!", "You Win!", "success").then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$socket.emit("resetScore");
        }
      });
    },
    showLosingMessage() {
      console.log("losing");
      this.$swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Lose!",
      });
    },
  },
  computed: {
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
        this.$socket.emit("isLoadedFalse");
        this.getQuote();
        const payload = {
          username: this.playerName,
          answer: this.testAreaInput,
          score: 0,
        };
        // console.log(payload, "<<<INI PAYLOAD");
        this.$socket.emit("sendAnswer", payload);
        this.borderColor = "green";
        this.testAreaInput = "";
      } else {
        if (this.testAreaInput == originTextMatch) {
          // console.log("true");
          this.borderColor = "blue";
        } else {
          // console.log("false");
          this.borderColor = "red";
        }
      }
    },
    getCurrentQuoteState() {
      return this.$store.state.quote;
    },
  },
  created() {
    // this.$store.dispatch("fetchQuotes");
    this.playerName = localStorage.username;
    this.getCurrentQuoteState();
  },
  beforeRouteUpdate(to, from, next) {
    // just use `this`
    return this.$store.state.quote;
    console.log(this.$store.state.quote);
    next();
  },
};
</script>

<style>
/* Typography */

body,
button,
input,
select,
textarea {
  font-family: "Source Sans Pro", "Helvetica", Arial, sans-serif;
  font-size: 18px;
  line-height: 1.5;
}

h1 {
  clear: both;
}

p {
  margin-bottom: 1.5em;
}

/* Layout */
body {
  margin: 0;
  padding: 0;
}

.title-area {
  padding: 1em 2em;
  background-color: #0d1b2e;
  color: white;
}

.test-area {
  margin: 0 auto;
  max-width: 550px;
  margin-bottom: 4em;
  padding: 0 2em;
}

#origin-text {
  margin: 1em 0;
  padding: 1em 1em 0;
  background-color: #ededed;
}

#origin-text p {
  margin: 0;
  padding-bottom: 1em;
}

.test-wrapper {
  display: flex;
}

.test-wrapper textarea {
  flex: 1;
}

.timer {
  font-size: 3em;
  font-weight: bold;
}

.donutSpinner {
  display: inline-block;
  border: 4px solid hsl(222, 100%, 95%);
  border-left-color: hsl(243, 80%, 62%);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.unselectable {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#reset {
  padding: 0.5em 1em;
  font-size: 1.2em;
  font-weight: bold;
  color: #e95d0f;
  background: white;
  border: 10px solid #e95d0f;
}

#reset:hover {
  color: white;
  background-color: #e95d0f;
}
</style>