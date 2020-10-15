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
          <h1>Player: IkhsanGama</h1>
        </div>
        <section class="test-area">
          <div id="origin-text">
            <p>{{ this.testText }}</p>
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
            <!-- <section id="clock">
              <div class="timer">00:00:00</div>
            </section> -->

            <button @click="reset" id="reset">Start over</button>
          </div>
        </section>
        <!-- .test-area -->
      </main>
    </body>
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
    };
  },
  methods: {
    reset() {
      this.testAreaInput = "";
    },
  },
  computed: {
    testText() {
      return this.$store.state.quotes.quote;
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
        console.log("finish");
        this.borderColor = "green";
        // clearInterval(interval);
      } else {
        if (this.testAreaInput == originTextMatch) {
          console.log("true");
          this.borderColor = "blue";
        } else {
          console.log("false");
          this.borderColor = "red";
        }
      }
    },
  },
  created() {
    this.$store.dispatch("fetchQuotes");
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